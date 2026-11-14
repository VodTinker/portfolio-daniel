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
  --demo NAME       Construye una escena demo: "server" | "city"
  --width/--height  Frame no cuadrado (p.ej. city: --width 512 --height 128)
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
import random
import os
import shutil
import subprocess
import sys
import tempfile

import bmesh
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
    p.add_argument("--width", type=int, default=0, help="ancho del frame (por defecto = size)")
    p.add_argument("--height", type=int, default=0, help="alto del frame (por defecto = size)")
    p.add_argument("--frames", type=int, default=0)
    p.add_argument("--demo", choices=["server", "city"], default=None)
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


# ----------------------------------------------------------------------------
# Escena demo: skyline pixel art en perspectiva para el fondo del hero.
# Tres filas de edificios (cerca/medio/lejos), datacenter con parabólica,
# torre de radio, depósitos de agua y ventanas que parpadean.
# Iluminación FLAT: cada cara usa exactamente su color de paleta
# (frontal / lateral / techo), como en pixel art hecho a mano.
# ----------------------------------------------------------------------------
CITY_ROWS = [
    # depth, x half-span, height range, width range, front, side, top, window palette
    dict(y=45, span=40, h=(5, 14), w=(2.0, 5.0), front="bg-2", side="panel-2", top="violet",
         win=["violet", "violet", "ink-faint"], win_off="panel-2", density=0.35),
    dict(y=20, span=31, h=(3.5, 11), w=(1.8, 4.5), front="panel-2", side="panel", top="bg-2",
         win=["cyan", "violet-2", "gold"], win_off="panel", density=0.4),
    dict(y=0, span=23, h=(2.5, 8.5), w=(1.6, 4.0), front="panel", side="bg-0", top="bg-2",
         win=["cyan", "cyan", "gold", "magenta"], win_off="bg-0", density=0.45),
]


def _mat_cache():
    cache = {}

    def get(key):
        if key not in cache:
            cache[key] = material(f"c_{key}", PALETTE[key])
        return cache[key]

    return cache, get


def _add_box(bm, x0, y0, z0, x1, y1, z1):
    """Añade una caja al bmesh y devuelve sus caras."""
    vs = [bm.verts.new(v) for v in [
        (x0, y0, z0), (x1, y0, z0), (x1, y1, z0), (x0, y1, z0),
        (x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1),
    ]]
    idx = [(0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7), (4, 5, 6, 7), (3, 2, 1, 0)]
    return [bm.faces.new([vs[i] for i in f]) for f in idx]


def _mesh_object(scene, name, bm, mats):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for m in mats:
        me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    scene.collection.objects.link(ob)
    return ob


def _blink(mat, on_hex, off_hex, frames, pattern):
    on, off = hex_to_rgba(PALETTE[on_hex]), hex_to_rgba(PALETTE[off_hex])
    for f in range(frames):
        mat.diffuse_color = on if pattern(f) else off
        mat.keyframe_insert("diffuse_color", frame=f + 1)
    for fc in _fcurves(mat):
        for kp in fc.keyframe_points:
            kp.interpolation = "CONSTANT"


def build_demo_city(frames, width, height):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    rng = random.Random(7)
    _, M = _mat_cache()

    # Grupos de parpadeo: materiales animados compartidos por muchas ventanas
    flick = []
    for g in range(4):
        m = material(f"flick{g}", PALETTE["cyan"])
        _blink(m, ["cyan", "gold", "magenta", "cyan-2"][g], "bg-0", frames,
               lambda f, g=g: ((f * (g + 3) + g * 5) % 7) > 1)
        flick.append(m)

    near_roofs = []  # (cx, cy, h) de la fila cercana, sin remate
    for ri, row in enumerate(CITY_ROWS):
        bm_b = bmesh.new()
        bm_w = bmesh.new()
        body_mats = [M(row["front"]), M(row["side"]), M(row["top"])]
        win_keys = row["win"] + [row["win_off"]]
        win_mats = [M(k) for k in win_keys] + flick
        x = -row["span"]
        while x < row["span"]:
            w = rng.uniform(*row["w"])
            h = rng.uniform(*row["h"])
            d = rng.uniform(2.0, 4.0)
            y0 = row["y"] + rng.uniform(-1.5, 1.5)
            for f in _add_box(bm_b, x, y0, 0, x + w, y0 + d, h):
                f.normal_update(); n = f.normal
                f.material_index = 0 if n.y < -0.5 else (2 if n.z > 0.5 else 1)
            # Remate de azotea (escalonado) en algunos edificios
            crowned = rng.random() < 0.35 and w > 2.2
            if ri == len(CITY_ROWS) - 1 and not crowned and w > 1.8:
                near_roofs.append((x + w / 2, y0 + d / 2, h))
            if crowned:
                inset = w * 0.22
                h2 = h + rng.uniform(0.6, 1.6)
                for f in _add_box(bm_b, x + inset, y0 + 0.4, h, x + w - inset, y0 + d - 0.4, h2):
                    f.normal_update(); n = f.normal
                    f.material_index = 0 if n.y < -0.5 else (2 if n.z > 0.5 else 1)
            # Ventanas en la fachada frontal
            ws, gap = 0.28, 0.62
            cols = int((w - 0.5) / gap)
            rows_n = int((h - 0.9) / gap)
            ox = x + (w - (cols - 1) * gap) / 2 - ws / 2
            for r in range(rows_n):
                for c in range(cols):
                    if rng.random() > row["density"] + 0.35:
                        continue
                    roll = rng.random()
                    if roll < row["density"] * 0.25 and ri > 0:
                        mi = len(win_keys) + rng.randrange(4)  # parpadea
                    elif roll < row["density"]:
                        mi = rng.randrange(len(row["win"]))  # encendida
                    else:
                        mi = len(win_keys) - 1  # apagada
                    wx = ox + c * gap
                    wz = 0.6 + r * gap
                    for f in _add_box(bm_w, wx, y0 - 0.05, wz, wx + ws, y0 - 0.02, wz + ws * 1.3):
                        f.material_index = mi
            x += w + rng.uniform(0.15, 1.2)
        _mesh_object(scene, f"row{ri}", bm_b, body_mats)
        _mesh_object(scene, f"win{ri}", bm_w, win_mats)

    # --- Datacenter (fila cercana, izquierda): bloque ancho y bajo con LEDs
    dc = bmesh.new()
    dcx, dcy, dcw, dch = -14.5, -3.0, 7.0, 3.2
    for f in _add_box(dc, dcx, dcy, 0, dcx + dcw, dcy + 3.5, dch):
        f.normal_update(); n = f.normal
        f.material_index = 0 if n.y < -0.5 else (2 if n.z > 0.5 else 1)
    # Unidades de clima en la azotea
    for i in range(3):
        ax = dcx + 0.6 + i * 1.3
        for f in _add_box(dc, ax, dcy + 0.8, dch, ax + 0.9, dcy + 2.0, dch + 0.5):
            f.normal_update(); n = f.normal
            f.material_index = 0 if n.y < -0.5 else (2 if n.z > 0.5 else 1)
    _mesh_object(scene, "datacenter", dc, [M("panel-2"), M("bg-0"), M("violet")])
    # Franjas de LEDs de racks (parpadean)
    leds = bmesh.new()
    for r in range(3):
        for c in range(14):
            lx = dcx + 0.45 + c * 0.45
            lz = 0.7 + r * 0.8
            for f in _add_box(leds, lx, dcy - 0.05, lz, lx + 0.2, dcy - 0.02, lz + 0.18):
                f.material_index = (r * 7 + c * 3) % 4
    _mesh_object(scene, "dc_leds", leds, flick)
    # Rótulo "DC" luminoso
    sign = bmesh.new()
    for f in _add_box(sign, dcx + 0.4, dcy - 0.06, dch - 0.55, dcx + dcw - 0.4, dcy - 0.03, dch - 0.35):
        f.material_index = 0
    _mesh_object(scene, "dc_sign", sign, [M("magenta")])
    # Parabólica
    bpy.ops.mesh.primitive_cone_add(vertices=12, radius1=0.6, radius2=0.1, depth=0.3,
                                    location=(dcx + dcw - 1.0, dcy + 1.6, dch + 0.95),
                                    rotation=(math.radians(55), 0, math.radians(-25)))
    dish = bpy.context.active_object
    dish.data.materials.append(M("ink-faint"))
    bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=0.06, depth=0.8,
                                        location=(dcx + dcw - 1.0, dcy + 1.6, dch + 0.4))
    bpy.context.active_object.data.materials.append(M("ink-faint"))

    # --- Torre de radio (fila media, derecha) con luz roja intermitente
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.9, radius2=0.12, depth=13,
                                    location=(17.5, 19, 6.5))
    tower = bpy.context.active_object
    tower.data.materials.append(M("bg-2"))
    for i, z in enumerate([4.5, 8.5, 12.6]):
        bpy.ops.mesh.primitive_cube_add(size=0.32, location=(17.5, 18.6, z))
        lamp = bpy.context.active_object
        m = material(f"lamp{i}", PALETTE["red"])
        _blink(m, "red", "bg-1", frames, lambda f, i=i: (f + i) % 4 < 2)
        lamp.data.materials.append(m)

    # --- Depósitos de agua y antenas en azoteas de la fila cercana
    # (se descartan los que caen sobre el datacenter)
    tops = sorted(
        (r for r in near_roofs if not (dcx - 1 < r[0] < dcx + dcw + 1)),
        key=lambda c: -c[2],
    )
    used = []
    for (tx, ty, tz) in tops:
        if len(used) >= 6:
            break
        if any(abs(tx - u) < 4 for u in used):
            continue
        used.append(tx)
        if len(used) % 2:
            bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.45, depth=0.8,
                                                location=(tx, ty, tz + 0.4))
            bpy.context.active_object.data.materials.append(M("bg-2"))
        else:
            bpy.ops.mesh.primitive_cube_add(size=1, location=(tx, ty, tz + 0.9))
            ant = bpy.context.active_object
            ant.scale = (0.07, 0.07, 1.8)
            ant.data.materials.append(M("violet"))
            bpy.ops.mesh.primitive_cube_add(size=0.2, location=(tx, ty, tz + 1.85))
            m = material(f"antlamp{len(used)}", PALETTE["cyan"])
            _blink(m, "cyan", "panel", frames, lambda f, k=len(used): (f + k) % 3 != 0)
            bpy.context.active_object.data.materials.append(m)

    # Cámara en perspectiva, ligeramente por debajo del centro mirando al skyline
    cam_data = bpy.data.cameras.new("CityCam")
    cam_data.lens = 50
    cam_data.sensor_fit = "HORIZONTAL"
    cam_data.sensor_width = 36
    cam_data.clip_end = 500
    cam = bpy.data.objects.new("CityCam", cam_data)
    scene.collection.objects.link(cam)
    cam.location = (0, -60, 3.2)
    cam.rotation_euler = (math.radians(92.5), 0, 0)
    scene.camera = cam

    scene.frame_start = 1
    scene.frame_end = frames
    return scene


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


def setup_render(scene, width, height, flat=False):
    r = scene.render
    r.engine = "BLENDER_WORKBENCH"
    r.resolution_x = width
    r.resolution_y = height
    r.resolution_percentage = 100
    r.film_transparent = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGBA"
    # Sin antialiasing -> píxeles nítidos
    scene.display.render_aa = "OFF"
    sh = scene.display.shading
    sh.light = "FLAT" if flat else "STUDIO"
    sh.color_type = "MATERIAL"
    sh.show_object_outline = not flat
    sh.object_outline_color = hex_to_rgba(PALETTE["bg-0"])[:3]
    sh.show_cavity = not flat
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
    frames = a.frames or {"server": 24, "city": 8}.get(a.demo, 0)
    width = a.width or a.size
    height = a.height or a.size

    if a.demo == "city":
        scene = build_demo_city(frames, width, height)
    elif a.demo == "server":
        scene = build_demo_server(frames)
        ensure_iso_camera(scene, a.ortho_scale)
    else:
        scene = bpy.context.scene
        if frames:
            scene.frame_end = scene.frame_start + frames - 1
        if not a.keep_camera or scene.camera is None:
            ensure_iso_camera(scene, a.ortho_scale)

    setup_render(scene, width, height, flat=(a.demo == "city"))

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
    print(f"\n[sprite] {len(paths)} frames de {width}x{height} -> {out}")
    print(f'[sprite] <PixelSprite src="/{os.path.relpath(out, "public")}" frames={{{len(paths)}}} size={{{a.size}}} />')


main()
