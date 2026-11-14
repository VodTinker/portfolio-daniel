"""
Blender -> pixel-art sprite sheet para vodtinker.dev
====================================================

Renderiza una animación a baja resolución (sin antialiasing, cámara ortográfica
isométrica, fondo transparente), reduce los colores a la paleta de la web y
empaqueta los frames en una tira horizontal PNG lista para <PixelSprite />.

Requisitos: Blender 4.2+ (probado en 5.2) e ImageMagick (`magick`) en el PATH.

Uso:
  # Escena demo (servidor isométrico con LEDs parpadeando y turntable)
  blender -b -P blender/render_sprite.py -- --demo server --out public/sprites/server.png

  # Tu propio .blend (usa su cámara si existe; si no, crea una isométrica)
  blender -b mi_escena.blend -P blender/render_sprite.py -- --out public/sprites/rack.png \
      --size 128 --frames 24

Opciones:
  --out PATH        PNG de salida (tira horizontal de frames)
  --size N          Lado del frame en píxeles (por defecto 96)
  --frames N        Nº de frames (por defecto: rango de la escena, o 24 en demo)
  --demo NAME       Construye una escena demo: "server"
  --no-palette      No reducir a la paleta de la web
  --keep-camera     Usar la cámara del .blend tal cual
  --ortho-scale F   Encuadre de la cámara isométrica auto (por defecto 2.8)
  --dither          Dithering Floyd-Steinberg al reducir a la paleta (por defecto planos)

Consejos para tus propios modelos:
  - Low-poly y formas grandes: a 96-128 px los detalles finos desaparecen.
  - Nombra materiales con colores de la web (ver PALETTE) o usa colores planos;
    el motor Workbench usa el "Viewport Display > Color" de cada material.
  - Para un loop perfecto, el último frame debe enlazar con el primero
    (en turntables: rota 360° en N+1 frames y renderiza solo N).
"""

import argparse
import math
import os
import shutil
import subprocess
import sys
import tempfile

import bpy

# Paleta del tema "midnight" (src/index.css :root)
PALETTE = {
    "bg-0": "#0b0420",
    "bg-1": "#1a0b3d",
    "bg-2": "#2d1466",
    "panel": "#15082e",
    "panel-2": "#1f0c47",
    "ink": "#efeaff",
    "ink-dim": "#b4a5e8",
    "ink-faint": "#6b5b9c",
    "violet": "#7c3aed",
    "violet-2": "#a855f7",
    "magenta": "#ec4899",
    "pink": "#f472b6",
    "cyan": "#22d3ee",
    "cyan-2": "#67e8f9",
    "gold": "#fbbf24",
    "green": "#4ade80",
    "red": "#ff5470",
}


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--out", required=True)
    p.add_argument("--size", type=int, default=96)
    p.add_argument("--frames", type=int, default=0)
    p.add_argument("--demo", choices=["server"], default=None)
    p.add_argument("--no-palette", action="store_true")
    p.add_argument("--keep-camera", action="store_true")
    p.add_argument("--ortho-scale", type=float, default=2.8)
    p.add_argument("--dither", action="store_true")
    return p.parse_args(argv)


def hex_to_rgba(h, a=1.0):
    h = h.lstrip("#")
    srgb = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    # Workbench trabaja en lineal: convertir sRGB -> lineal
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb]
    return (*lin, a)


def material(name, color_hex):
    m = bpy.data.materials.new(name)
    m.diffuse_color = hex_to_rgba(color_hex)
    return m


def box(name, size, loc, mat):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = size
    o.data.materials.append(mat)
    return o


# ----------------------------------------------------------------------------
# Escena demo: servidor tipo torre/1U apilado, isométrico, LEDs parpadeando
# ----------------------------------------------------------------------------
def build_demo_server(frames):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene

    pivot = bpy.data.objects.new("Pivot", None)
    scene.collection.objects.link(pivot)

    body = material("body", PALETTE["ink-faint"])
    face = material("face", PALETTE["bg-2"])
    trim = material("trim", PALETTE["violet-2"])
    bay = material("bay", PALETTE["bg-0"])
    vent = material("vent", PALETTE["ink-dim"])

    parts = []
    # Chasis
    parts.append(box("chassis", (1.4, 1.0, 2.0), (0, 0, 1.0), body))
    # Frontal ligeramente sobresaliente
    parts.append(box("front", (1.3, 0.06, 1.9), (0, -0.53, 1.0), face))
    # Tapa superior con borde violeta
    parts.append(box("top", (1.44, 1.04, 0.06), (0, 0, 2.03), trim))
    # 4 bahías de disco
    for i in range(4):
        z = 1.65 - i * 0.28
        parts.append(box(f"bay{i}", (0.9, 0.04, 0.18), (-0.12, -0.57, z), bay))
    # Rejilla de ventilación
    for i in range(5):
        parts.append(box(f"vent{i}", (1.0, 0.04, 0.04), (0, -0.57, 0.55 - i * 0.09), vent))

    # LEDs: un material por LED con color animado (parpadeo)
    led_colors = [PALETTE["cyan"], PALETTE["green"], PALETTE["magenta"], PALETTE["gold"]]
    off = hex_to_rgba(PALETTE["bg-1"])
    for i, col in enumerate(led_colors):
        z = 1.65 - i * 0.28
        m = material(f"led{i}", col)
        on = hex_to_rgba(col)
        # Patrón de parpadeo distinto por LED (en frames)
        pattern = [(f, (f // (2 + i)) % 2 == 0 or (f * (i + 3)) % 7 == 0) for f in range(frames + 1)]
        for f, is_on in pattern:
            m.diffuse_color = on if is_on else off
            m.keyframe_insert("diffuse_color", frame=f + 1)
        for fc in _fcurves(m):
            for kp in fc.keyframe_points:
                kp.interpolation = "CONSTANT"
        parts.append(box(f"led{i}", (0.16, 0.05, 0.14), (0.47, -0.58, z), m))

    # Power LED coral
    parts.append(box("power", (0.16, 0.05, 0.14), (0.47, -0.58, 0.45), material("pwr", PALETTE["red"])))

    for o in parts:
        o.parent = pivot

    # Turntable: 360° en frames -> loop perfecto (frame N+1 == frame 1)
    pivot.rotation_euler = (0, 0, 0)
    pivot.keyframe_insert("rotation_euler", index=2, frame=1)
    pivot.rotation_euler = (0, 0, math.radians(360))
    pivot.keyframe_insert("rotation_euler", index=2, frame=frames + 1)
    for fc in _fcurves(pivot):
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"

    scene.frame_start = 1
    scene.frame_end = frames
    return scene


def _fcurves(idblock):
    """F-curves de un datablock, compatible con Blender 4.x y 5.x (slotted actions)."""
    ad = idblock.animation_data
    if not ad or not ad.action:
        return []
    act = ad.action
    if hasattr(act, "fcurves") and len(getattr(act, "fcurves", [])):
        return list(act.fcurves)
    out = []
    for layer in getattr(act, "layers", []):
        for strip in layer.strips:
            for bag in strip.channelbags:
                out.extend(bag.fcurves)
    return out


def ensure_iso_camera(scene, ortho_scale, center_z=1.0):
    cam_data = bpy.data.cameras.new("IsoCam")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = ortho_scale
    cam = bpy.data.objects.new("IsoCam", cam_data)
    scene.collection.objects.link(cam)
    # Isométrica clásica: 35.264° de elevación, 45° de giro
    dist = 10
    elev = math.radians(35.264)
    azim = math.radians(-45)
    cam.location = (
        dist * math.cos(elev) * math.sin(-azim),
        -dist * math.cos(elev) * math.cos(azim),
        center_z + dist * math.sin(elev),
    )
    target = bpy.data.objects.new("IsoTarget", None)
    target.location = (0, 0, center_z)
    scene.collection.objects.link(target)
    track = cam.constraints.new("TRACK_TO")
    track.target = target
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"
    scene.camera = cam


def setup_render(scene, size):
    r = scene.render
    r.engine = "BLENDER_WORKBENCH"
    r.resolution_x = size
    r.resolution_y = size
    r.resolution_percentage = 100
    r.film_transparent = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGBA"
    # Sin antialiasing -> píxeles nítidos
    scene.display.render_aa = "OFF"
    sh = scene.display.shading
    sh.light = "STUDIO"
    sh.color_type = "MATERIAL"
    sh.show_object_outline = True
    sh.object_outline_color = hex_to_rgba(PALETTE["bg-0"])[:3]
    sh.show_cavity = True
    sh.cavity_type = "WORLD"
    sh.show_specular_highlight = False
    try:
        scene.view_settings.view_transform = "Standard"
    except TypeError:
        pass


def magick(*args):
    exe = shutil.which("magick") or shutil.which("convert")
    if not exe:
        raise SystemExit("ImageMagick no encontrado (instala 'imagemagick').")
    subprocess.run([exe, *args], check=True)


def main():
    a = parse_args()
    frames = a.frames or (24 if a.demo else 0)

    if a.demo == "server":
        scene = build_demo_server(frames)
        ensure_iso_camera(scene, a.ortho_scale)
    else:
        scene = bpy.context.scene
        if frames:
            scene.frame_end = scene.frame_start + frames - 1
        if not a.keep_camera or scene.camera is None:
            ensure_iso_camera(scene, a.ortho_scale)

    setup_render(scene, a.size)

    tmp = tempfile.mkdtemp(prefix="sprite_")
    scene.render.filepath = os.path.join(tmp, "f_")
    bpy.ops.render.render(animation=True)

    frame_files = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
    if not frame_files:
        raise SystemExit("No se generaron frames.")
    paths = [os.path.join(tmp, f) for f in frame_files]

    out = os.path.abspath(a.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)

    strip = os.path.join(tmp, "strip.png")
    magick(*paths, "+append", strip)

    if a.no_palette:
        shutil.copy(strip, out)
    else:
        pal = os.path.join(tmp, "palette.png")
        magick(*[f"xc:{c}" for c in PALETTE.values()], "+append", pal)
        # Reduce el RGB a la paleta (colores planos o dithering) y recompone
        # un alpha binario (sin bordes semitransparentes).
        alpha = os.path.join(tmp, "alpha.png")
        rgb = os.path.join(tmp, "rgb.png")
        magick(strip, "-alpha", "extract", "-threshold", "50%", alpha)
        dither = "FloydSteinberg" if a.dither else "None"
        magick(strip, "-alpha", "off", "-dither", dither, "-remap", pal, rgb)
        magick(
            rgb, alpha,
            "-compose", "CopyOpacity", "-composite",
            "-define", "png:compression-level=9",
            out,
        )

    shutil.rmtree(tmp, ignore_errors=True)
    print(f"\n[sprite] {len(paths)} frames de {a.size}x{a.size} -> {out}")
    print(f'[sprite] <PixelSprite src="/{os.path.relpath(out, "public")}" frames={{{len(paths)}}} size={{{a.size}}} />')


main()
