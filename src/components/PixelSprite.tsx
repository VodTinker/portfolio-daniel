import { useEffect, useRef } from "react";

/**
 * Reproduce una tira horizontal de frames (sprite sheet) generada con
 * blender/render_sprite.py. Sin JS de animación: CSS `steps()` + pixelated.
 *
 * - Se pausa fuera de pantalla (IntersectionObserver).
 * - Con prefers-reduced-motion se queda en el primer frame (regla global en index.css).
 * - playOn="hover" anima solo al pasar el ratón / foco.
 */
interface PixelSpriteProps {
  src: string;
  frames: number;
  /** Lado del frame en píxeles del PNG */
  size: number;
  /** Factor de escalado entero (mantener entero para píxeles nítidos) */
  scale?: number;
  fps?: number;
  playOn?: "always" | "hover";
  label?: string;
  className?: string;
}

export default function PixelSprite({
  src,
  frames,
  size,
  scale = 2,
  fps = 12,
  playOn = "always",
  label,
  className = "",
}: PixelSpriteProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const px = size * scale;
  const style = {
    width: px,
    height: px,
    backgroundImage: `url(${src})`,
    backgroundSize: `${frames * px}px ${px}px`,
    "--sprite-end": `${-frames * px}px`,
    "--sprite-frames": frames,
    "--sprite-duration": `${frames / fps}s`,
  } as React.CSSProperties;

  const cls = `pixel-sprite${playOn === "hover" ? " on-hover" : ""} ${className}`;

  return label ? (
    <div ref={ref} className={cls} style={style} role="img" aria-label={label} />
  ) : (
    <div ref={ref} className={cls} style={style} aria-hidden="true" />
  );
}
