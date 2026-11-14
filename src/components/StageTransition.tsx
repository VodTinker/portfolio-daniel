import { useEffect, useRef, useState } from "react";

/**
 * Transiciones entre secciones con estética de videojuego retro.
 *
 * - <StageTransition>: pantalla completa que se cubre con bloques pixel en
 *   orden de dithering Bayer 4x4, muestra "STAGE 0X · NOMBRE", salta a la
 *   sección y se descubre en orden inverso.
 * - <StageToast>: aviso pequeño bajo el navbar cuando cambias de sección
 *   haciendo scroll.
 */

const COLS = 16;
const ROWS = 9;
// Matriz de Bayer 4x4 → orden de aparición de cada bloque (0..15)
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const x = i % COLS;
  const y = Math.floor(i / COLS);
  // Bayer + un ligero barrido diagonal para que se note la dirección
  return {
    id: `${x}-${y}`,
    d: BAYER[y % 4][x % 4] / 16 + (x + y) / (COLS + ROWS) / 2.5,
  };
});

export const COVER_MS = 360;
export const HOLD_MS = 260;
export const REVEAL_MS = 360;

export interface StageInfo {
  n: string;
  label: string;
  key: number;
}

export function StageTransition({
  stage,
  phase,
}: {
  stage: StageInfo | null;
  phase: "idle" | "cover" | "reveal";
}) {
  if (!stage || phase === "idle") return null;
  return (
    <div
      className={`stage-tx ${phase}`}
      aria-hidden="true"
      style={
        {
          "--cover-ms": `${COVER_MS}ms`,
          "--reveal-ms": `${REVEAL_MS}ms`,
        } as React.CSSProperties
      }
    >
      <div className="stage-tx-grid">
        {CELLS.map(({ id, d }) => (
          <span
            key={id}
            className="stage-tx-cell"
            style={{ "--d": d.toFixed(3) } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="stage-tx-card" key={stage.key}>
        <span className="stage-tx-n">STAGE {stage.n}</span>
        <span className="stage-tx-label">{stage.label}</span>
        <span className="stage-tx-bar" />
      </div>
    </div>
  );
}

export function StageToast({
  n,
  label,
  suppressed,
}: {
  n: string | null;
  label: string | null;
  suppressed: boolean;
}) {
  const [shown, setShown] = useState<{ n: string; label: string; k: number } | null>(
    null,
  );
  // Última sección ya "vista": la inicial, o la que se alcanzó con una
  // transición de navegación (que ya mostró su propio rótulo).
  const lastN = useRef<string | null>(n);

  useEffect(() => {
    if (!n || !label) return;
    if (suppressed) {
      lastN.current = n;
      return;
    }
    if (n === lastN.current) return;
    const show = setTimeout(() => {
      lastN.current = n;
      setShown({ n, label, k: Date.now() });
    }, 280); // debounce: scroll rápido no dispara avisos intermedios
    return () => clearTimeout(show);
  }, [n, label, suppressed]);

  useEffect(() => {
    if (!shown) return;
    const hide = setTimeout(() => setShown(null), 1700);
    return () => clearTimeout(hide);
  }, [shown]);

  if (!shown) return null;
  return (
    <div className="stage-toast" key={shown.k} role="status">
      <span className="stage-toast-arrow">▶</span>
      <span className="stage-toast-n">STAGE {shown.n}</span>
      <span className="stage-toast-sep">·</span>
      <span>{shown.label}</span>
    </div>
  );
}
