import { useMemo } from "react";
import type { Lang } from "../utils/pixelData";

/**
 * Luna y sol en pixel art, generados como SVG (crispEdges) para que escalen
 * nítidos y se recoloreen con variables CSS por tema.
 *
 * - Luna: esfera sombreada en 4 tonos con dithering Bayer, cráteres y halo.
 *   Muestra la FASE LUNAR REAL del día.
 * - Sol (modo sunset): disco synthwave en bandas con franjas outrun que
 *   bajan (4 frames) y rayos pixel que laten.
 */

type Px = { x: number; y: number; w: number; c: string };

const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16 - 0.5));

/** Junta píxeles contiguos del mismo color en una fila → menos nodos SVG */
function runs(grid: (string | null)[][]): Px[] {
  const out: Px[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (!c) {
        x++;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === c) w++;
      out.push({ x, y, w, c });
      x += w;
    }
  });
  return out;
}

function Rects({ px, className }: { px: Px[]; className?: string }) {
  return (
    <g className={className}>
      {px.map((p) => (
        <rect
          key={`${p.x}-${p.y}-${p.c}`}
          x={p.x}
          y={p.y}
          width={p.w}
          height={1}
          fill={p.c}
        />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------- LUNA */

const SYNODIC = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14); // luna nueva de referencia

/** 0 = nueva, 0.25 = cuarto creciente, 0.5 = llena, 0.75 = menguante */
export function moonPhase(date = new Date()) {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  return (((days % SYNODIC) + SYNODIC) % SYNODIC) / SYNODIC;
}

function phaseName(p: number, lang: Lang) {
  const names = {
    en: ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"],
    es: ["Luna nueva", "Creciente", "Cuarto creciente", "Gibosa creciente", "Luna llena", "Gibosa menguante", "Cuarto menguante", "Menguante"],
  };
  return names[lang][Math.round(p * 8) % 8];
}

const MOON_N = 34;
const MOON_R = 11;
const CRATERS: [number, number, number][] = [
  [-4.2, -4.0, 2.6],
  [3.4, 1.2, 3.0],
  [-2.0, 4.6, 1.9],
  [4.6, -5.0, 1.6],
  [-6.4, 1.4, 1.5],
  [0.6, -1.4, 1.2],
];

function buildMoon(phase: number) {
  const c = MOON_N / 2;
  const theta = phase * 2 * Math.PI;
  // Dirección del sol respecto a la luna vista desde la Tierra
  const sx = Math.sin(theta);
  const sz = -Math.cos(theta);
  const disc: (string | null)[][] = [];
  const haloA: (string | null)[][] = [];
  const haloB: (string | null)[][] = [];

  for (let y = 0; y < MOON_N; y++) {
    disc.push([]);
    haloA.push([]);
    haloB.push([]);
    for (let x = 0; x < MOON_N; x++) {
      const dx = x + 0.5 - c;
      const dy = y + 0.5 - c;
      const d = Math.hypot(dx, dy);
      let cell: string | null = null;
      let ha: string | null = null;
      let hb: string | null = null;

      if (d <= MOON_R) {
        const nx = dx / MOON_R;
        const ny = -dy / MOON_R;
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
        const lit = nx * sx + nz * sz;
        // Sombreado: luz de fase + ligero oscurecimiento en el borde
        let v = lit > 0 ? 0.45 + 0.55 * Math.min(1, lit * 1.6) : -1;
        if (v > 0) v *= 0.78 + 0.22 * nz;
        for (const [cx, cy, r] of CRATERS) {
          const cd = Math.hypot(dx - cx, dy - cy);
          if (cd < r) v -= 0.2;
          else if (cd < r + 0.9 && dx - cx + (dy - cy) > 0) v += 0.08; // borde iluminado
        }
        const t = v + BAYER4[y % 4][x % 4] * 0.16;
        if (v < 0) {
          // Luz cenicienta: disco en sombra visible pero tenue, con textura
          const e = 0.35 + 0.4 * nz + BAYER4[y % 4][x % 4] * 0.6;
          cell = e > 0.62 ? "var(--m-earth-2)" : "var(--m-earth)";
        }
        else if (t > 0.86) cell = "var(--m-hi)";
        else if (t > 0.66) cell = "var(--m-mid)";
        else if (t > 0.46) cell = "var(--m-lo)";
        else cell = "var(--m-dk)";
      } else if (d <= MOON_R + 6) {
        // Halo que se desvanece: densidad de dithering decreciente con la distancia
        const fall = 1 - (d - MOON_R) / 6; // 1 junto al borde → 0 fuera
        const th = BAYER4[y % 4][x % 4] + 0.5; // 0..1
        if (th < fall * 0.55) {
          const col = d <= MOON_R + 2.5 ? "var(--m-halo)" : "var(--m-halo-2)";
          if ((x + y) % 2 === 0) ha = col;
          else hb = col;
        }
      }
      disc[y].push(cell);
      haloA[y].push(ha);
      haloB[y].push(hb);
    }
  }
  return { disc: runs(disc), haloA: runs(haloA), haloB: runs(haloB) };
}

/* ----------------------------------------------------------------- SOL */

const SUN_N = 44;
const SUN_R = 13;
const SUN_BANDS = ["#fff7c2", "#fde68a", "#fbbf24", "#fb923c", "#f472b6", "#db2777"];
const SUN_FRAMES = 4;

function buildSun() {
  const c = SUN_N / 2;
  const frames: Px[][] = [];
  for (let f = 0; f < SUN_FRAMES; f++) {
    // Franjas outrun: empiezan finas por la mitad y engordan al bajar
    const cut = new Set<number>();
    const K = 3;
    for (let k = 0; k < K; k++) {
      const u = (k + f / SUN_FRAMES) / K; // 0..1 a lo largo de la mitad inferior
      const y0 = Math.round(c + 2 + u * (SUN_R - 3));
      const th = 1 + Math.floor(u * 1.9);
      for (let i = 0; i < th; i++) cut.add(y0 + i);
    }
    const g: (string | null)[][] = [];
    for (let y = 0; y < SUN_N; y++) {
      g.push([]);
      for (let x = 0; x < SUN_N; x++) {
        const dx = x + 0.5 - c;
        const dy = y + 0.5 - c;
        if (Math.hypot(dx, dy) > SUN_R || cut.has(y)) {
          g[y].push(null);
          continue;
        }
        const t = (dy + SUN_R) / (2 * SUN_R); // 0 arriba → 1 abajo
        const bi = Math.min(
          SUN_BANDS.length - 1,
          Math.max(0, Math.floor(t * SUN_BANDS.length + BAYER4[y % 4][x % 4] * 0.9)),
        );
        g[y].push(SUN_BANDS[bi]);
      }
    }
    frames.push(runs(g));
  }

  // Rayos: 8 direcciones, dos longitudes que alternan (latido)
  const rays = (len: number) => {
    const g: (string | null)[][] = Array.from({ length: SUN_N }, () =>
      Array<string | null>(SUN_N).fill(null),
    );
    const dirs = [
      [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1],
    ];
    for (const [ux, uy] of dirs) {
      const diag = ux !== 0 && uy !== 0;
      const start = diag ? 12 : 16;
      for (let i = 0; i < len; i++) {
        const px = Math.floor(c + ux * (start + i));
        const py = Math.floor(c + uy * (start + i));
        if (px >= 0 && py >= 0 && px < SUN_N && py < SUN_N) {
          g[py][px] = i === 0 ? "#fde68a" : "#fbbf24";
        }
      }
    }
    return runs(g);
  };
  return { frames, raysShort: rays(3), raysLong: rays(5) };
}

/* -------------------------------------------------------------- RENDER */

export default function SkyBodies({ lang }: { lang: Lang }) {
  const phase = useMemo(() => moonPhase(), []);
  const moon = useMemo(() => buildMoon(phase), [phase]);
  const sun = useMemo(() => buildSun(), []);
  const illum = Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100);
  const moonLabel = `${phaseName(phase, lang)} · ${illum}%`;

  return (
    <>
      <div className="sky-body sky-moon" title={moonLabel}>
        <svg
          viewBox={`0 0 ${MOON_N} ${MOON_N}`}
          shapeRendering="crispEdges"
          role="img"
          aria-label={moonLabel}
        >
          <Rects px={moon.haloA} className="halo-a" />
          <Rects px={moon.haloB} className="halo-b" />
          <Rects px={moon.disc} />
        </svg>
      </div>
      <div className="sky-body sky-sun" aria-hidden="true">
        <svg viewBox={`0 0 ${SUN_N} ${SUN_N}`} shapeRendering="crispEdges">
          <Rects px={sun.raysShort} className="rays-a" />
          <Rects px={sun.raysLong} className="rays-b" />
          {sun.frames.map((px, i) => (
            <Rects key={`f${i}`} px={px} className={`sun-f sun-f${i}`} />
          ))}
        </svg>
      </div>
    </>
  );
}
