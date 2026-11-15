import { useEffect, useRef, useState } from "react";

/**
 * Pantalla de arranque estilo BIOS / consola retro.
 *
 * Fases: encendido del CRT (línea → pantalla) · test de memoria · checklist
 * con barra de carga · "READY" · salida con barrido escalonado.
 * Se salta con cualquier tecla / clic / toque y no aparece con reduced-motion.
 */

interface BootProps {
  onDone: () => void;
}

type L10n = { en: string; es: string };

const CHECKS: Array<{ at: number; label: L10n; value: L10n; warn?: boolean }> = [
  { at: 520, label: { en: "CPU", es: "CPU" }, value: { en: "8x ARCH-RISC", es: "8x ARCH-RISC" } },
  { at: 640, label: { en: "VIDEO", es: "VÍDEO" }, value: { en: "NEON-RTX", es: "NEON-RTX" } },
  { at: 760, label: { en: "NETWORK", es: "RED" }, value: { en: "LINK 1 Gb/s", es: "ENLACE 1 Gb/s" } },
  { at: 880, label: { en: "HOMELAB", es: "HOMELAB" }, value: { en: "ONLINE", es: "EN LÍNEA" } },
  { at: 1000, label: { en: "COFFEE", es: "CAFÉ" }, value: { en: "LOW", es: "BAJO" }, warn: true },
  { at: 1120, label: { en: "SPRITES", es: "SPRITES" }, value: { en: "LOADED", es: "CARGADOS" } },
];

const MEM_KB = 16384;
const MEM_FROM = 160;
const MEM_TO = 600;
const READY_AT = 1300;
const EXIT_AT = 1900;
const DONE_AT = 2300;
const SEGMENTS = 20;

export default function Boot({ onDone }: BootProps) {
  const [now, setNow] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const es =
    typeof document !== "undefined" && document.documentElement.lang === "es";

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.getElementById("preboot")?.remove();
      onDoneRef.current();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    // El preboot estático ya no hace falta: esta pantalla lo cubre
    document.getElementById("preboot")?.remove();

    const t0 = performance.now();
    let offset = 0; // saltar = adelantar el reloj hasta la salida
    let raf = 0;
    const tick = () => {
      const t = performance.now() - t0 + offset;
      setNow(t);
      if (t >= DONE_AT) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      const t = performance.now() - t0 + offset;
      if (t < EXIT_AT) offset += EXIT_AT - t;
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  const memP = Math.min(1, Math.max(0, (now - MEM_FROM) / (MEM_TO - MEM_FROM)));
  // Cuenta en bloques de 64 KB, como las BIOS de verdad
  const mem = Math.floor((memP * MEM_KB) / 64) * 64;
  const memDone = memP >= 1;
  const progress = Math.min(1, Math.max(0, (now - MEM_FROM) / (READY_AT - MEM_FROM)));
  const filled = Math.round(progress * SEGMENTS);
  const ready = now >= READY_AT;
  const exiting = now >= EXIT_AT;

  return (
    <div
      id="boot"
      className={exiting ? "exit" : ""}
      role="status"
      aria-label={es ? "Cargando" : "Loading"}
    >
      <div className="boot-screen">
        <header className="boot-head">
          <div className="boot-logo pixel" aria-hidden="true">
            VOD<span>TINKER</span>
          </div>
          <div className="boot-sub">
            VOD-OS BIOS v2.5 · © 2026 vodtinker.dev
          </div>
        </header>

        <div className="boot-mem">
          <span className="boot-k">{es ? "MEMORIA" : "MEMORY"}</span>
          <span className="boot-v">
            {String(mem).padStart(5, " ")} KB{memDone ? " " : ""}
            {memDone && <b className="boot-ok">OK</b>}
          </span>
        </div>

        <ul className="boot-checks">
          {CHECKS.filter((c) => now >= c.at).map((c) => (
            <li key={c.label.en} className={c.warn ? "warn" : ""}>
              <span className="boot-k">{c.label[es ? "es" : "en"]}</span>
              <span className="boot-dots" aria-hidden="true" />
              <span className="boot-v">{c.value[es ? "es" : "en"]}</span>
              <b className={c.warn ? "boot-warn" : "boot-ok"}>
                {c.warn ? "WARN" : "OK"}
              </b>
            </li>
          ))}
        </ul>

        <div className="boot-bar" aria-hidden="true">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: segmentos fijos
            <span key={i} className={i < filled ? "on" : ""} />
          ))}
          <em>{Math.round(progress * 100)}%</em>
        </div>

        <div className={`boot-ready pixel${ready ? " show" : ""}`}>
          {ready ? (es ? "▶ LISTO. PULSA START" : "▶ READY. PRESS START") : " "}
        </div>

        <div className="boot-skip">
          {es ? "[ pulsa cualquier tecla para saltar ]" : "[ press any key to skip ]"}
        </div>
      </div>
    </div>
  );
}
