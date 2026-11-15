import { useEffect, useRef, useState } from "react";
import type { Lang } from "../utils/pixelData";
import { SPRITE_AVATAR_S, SPRITE_STAR, Sprite } from "./Sprites";

type L10n = { en: string; es: string };

interface Quest {
  title: L10n;
  desc: L10n;
  hint: { desktop: L10n; mobile: L10n };
  /** Selector del elemento objetivo (puede variar en móvil) */
  target: { desktop: string; mobile: string };
}

const QUESTS: Quest[] = [
  {
    title: { en: "Power Up", es: "Encendido" },
    desc: {
      en: "Turn the CRT monitor off or on.",
      es: "Apaga o enciende el monitor CRT.",
    },
    hint: {
      desktop: {
        en: "Click the round switch at the bottom-right of the CRT.",
        es: "Haz clic en el interruptor redondo abajo a la derecha del CRT.",
      },
      mobile: {
        en: "Tap the round switch at the bottom-right of the CRT.",
        es: "Toca el interruptor redondo abajo a la derecha del CRT.",
      },
    },
    target: { desktop: ".crt-power-switch", mobile: ".crt-power-switch" },
  },
  {
    title: { en: "Phosphor Shift", es: "Cambio de fósforo" },
    desc: {
      en: "Change the phosphor color of the terminal.",
      es: "Cambia el color de fósforo de la terminal.",
    },
    hint: {
      desktop: {
        en: "Click the green dot in the terminal title bar (power the CRT on first).",
        es: "Haz clic en el punto verde de la barra de la terminal (con el CRT encendido).",
      },
      mobile: {
        en: "Tap the green dot in the terminal title bar (power the CRT on first).",
        es: "Toca el punto verde de la barra de la terminal (con el CRT encendido).",
      },
    },
    target: { desktop: ".term-dot.g", mobile: ".term-dot.g" },
  },
  {
    title: { en: "Glitch Wave", es: "Interferencia" },
    desc: {
      en: "Toggle the static glitch on the terminal.",
      es: "Activa o desactiva las interferencias de la terminal.",
    },
    hint: {
      desktop: {
        en: "Click the yellow dot in the terminal title bar.",
        es: "Haz clic en el punto amarillo de la barra de la terminal.",
      },
      mobile: {
        en: "Tap the yellow dot in the terminal title bar.",
        es: "Toca el punto amarillo de la barra de la terminal.",
      },
    },
    target: { desktop: ".term-dot.y", mobile: ".term-dot.y" },
  },
  {
    title: { en: "Style Config", es: "Estilo visual" },
    desc: {
      en: "Switch the site to a different color theme.",
      es: "Cambia la web a otro tema de color.",
    },
    hint: {
      desktop: {
        en: 'Open the "TWEAKS" tab on the right edge and pick a theme.',
        es: 'Abre la pestaña "TWEAKS" del borde derecho y elige un tema.',
      },
      mobile: {
        en: "Tap MENU at the top-right and pick a different theme.",
        es: "Toca MENU arriba a la derecha y elige otro tema.",
      },
    },
    target: { desktop: ".tweaks-toggle", mobile: ".mobile-menu-btn" },
  },
  {
    title: { en: "AI Companion", es: "Asistente IA" },
    desc: {
      en: "Meet my AI assistant.",
      es: "Conoce a mi asistente de IA.",
    },
    hint: {
      desktop: {
        en: 'Click the cyan "AI" button at the bottom-right.',
        es: 'Haz clic en el botón cian "AI" abajo a la derecha.',
      },
      mobile: {
        en: 'Tap the cyan "AI" button at the bottom-right.',
        es: 'Toca el botón cian "AI" abajo a la derecha.',
      },
    },
    target: { desktop: ".chat-fab", mobile: ".chat-fab" },
  },
];

const TOTAL = QUESTS.length;
const MOBILE_MQ = "(max-width: 800px)";

function useIsMobile() {
  const [mobile, setMobile] = useState(() => {
    try {
      return window.matchMedia(MOBILE_MQ).matches;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function Progress({ step }: { step: number }) {
  return (
    <span className="quest-progress" aria-hidden="true">
      {QUESTS.map((q, i) => (
        <span
          key={q.title.en}
          className={`quest-progress-seg${i < step ? " done" : i === step ? " current" : ""}`}
        />
      ))}
    </span>
  );
}

interface QuestHelperProps {
  lang: Lang;
  step: number;
  onSkip: () => void;
  /** Panel cerrado por el usuario (se puede reabrir desde Tweaks / MENU) */
  dismissed: boolean;
  onDismiss: () => void;
  onRestart: () => void;
}

export default function QuestHelper({
  lang,
  step,
  onSkip,
  dismissed,
  onDismiss,
  onRestart,
}: QuestHelperProps) {
  const isMobile = useIsMobile();
  // En pantallas pequeñas arranca plegado para no tapar el contenido
  const [minimized, setMinimized] = useState(() => {
    try {
      return window.matchMedia("(max-width: 1000px)").matches;
    } catch {
      return false;
    }
  });
  const [toast, setToast] = useState<{ step: number; k: number } | null>(null);
  const handleDismiss = onDismiss;

  // Notificación solo cuando el paso AVANZA (no al cargar ni al cambiar idioma)
  const prevStep = useRef(step);
  useEffect(() => {
    if (step > prevStep.current) {
      setToast({ step, k: Date.now() });
    }
    prevStep.current = step;
  }, [step]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Al terminar todas (en este momento, no al reabrir): se cierra solo
  useEffect(() => {
    if (toast && toast.step >= TOTAL) {
      const t = setTimeout(onDismiss, 8000);
      return () => clearTimeout(t);
    }
  }, [toast, onDismiss]);

  const locate = () => {
    const q = QUESTS[step];
    if (!q) return;
    // Las misiones de la terminal necesitan el CRT encendido
    if (step === 1 || step === 2) {
      const sw = document.querySelector<HTMLElement>(".crt-power-switch.off");
      sw?.click();
    }
    const el = document.querySelector<HTMLElement>(
      isMobile ? q.target.mobile : q.target.desktop,
    );
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (getComputedStyle(el).position !== "fixed") {
      el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
    }
    el.classList.remove("quest-ping");
    void el.offsetWidth; // reinicia la animación
    el.classList.add("quest-ping");
    setTimeout(() => el.classList.remove("quest-ping"), 2600);
    if (isMobile) setMinimized(true);
  };

  const toastEl = toast && (
    <div className="quest-toast" key={toast.k} role="status">
      <div className="quest-toast-icon" aria-hidden="true">
        <Sprite grid={SPRITE_STAR} scale={2} />
      </div>
      <div className="quest-toast-text">
        <span className="quest-toast-title pixel">
          {toast.step >= TOTAL
            ? lang === "es"
              ? "¡TODAS LAS MISIONES!"
              : "ALL QUESTS CLEAR!"
            : lang === "es"
              ? "MISIÓN COMPLETADA"
              : "QUEST COMPLETE"}
        </span>
        <span className="quest-toast-sub">
          +1000 PTS
          {toast.step < TOTAL && (
            <>
              {" · "}
              {lang === "es" ? "Siguiente: " : "Next: "}
              {QUESTS[toast.step].title[lang]}
            </>
          )}
        </span>
      </div>
      <span className="quest-toast-count pixel">
        {Math.min(toast.step, TOTAL)}/{TOTAL}
      </span>
    </div>
  );

  if (dismissed) return toastEl || null;

  if (step >= TOTAL) {
    return (
      <>
        {toastEl}
        <div className="quest-hud completed">
          <div className="quest-hud-header">
            <span className="quest-icon" aria-hidden="true">
              🏆
            </span>
            <span className="quest-title pixel">
              {lang === "es" ? "¡HÉROE RETRO!" : "RETRO CHAMP!"}
            </span>
            <button
              type="button"
              className="quest-hud-close-btn"
              onClick={handleDismiss}
              aria-label={lang === "es" ? "Cerrar" : "Close"}
            >
              ✕
            </button>
          </div>
          <div className="quest-hud-body">
            <div className="quest-avatar">
              <Sprite grid={SPRITE_AVATAR_S} scale={2} animated />
            </div>
            <div className="quest-details">
              <p className="quest-desc">
                {lang === "es"
                  ? "Has completado las 5 misiones. ¡Disfruta del portfolio!"
                  : "All 5 quests completed. Enjoy the portfolio!"}
              </p>
              <div className="quest-actions">
                <button type="button" className="quest-skip-btn" onClick={onRestart}>
                  {lang === "es" ? "⟲ JUGAR OTRA VEZ" : "⟲ PLAY AGAIN"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const q = QUESTS[step];
  const label = lang === "es" ? "MISIÓN" : "QUEST";

  return (
    <>
      {toastEl}
      <div
        role="region"
        className={`quest-hud${minimized ? " minimized" : ""}`}
        aria-label={lang === "es" ? "Misiones" : "Quests"}
      >
        <div className="quest-hud-header">
          <button
            type="button"
            className="quest-hud-head-btn"
            onClick={() => setMinimized(!minimized)}
            aria-expanded={!minimized}
          >
            <span className="quest-hud-indicator pulse" aria-hidden="true" />
            <span className="quest-title pixel">
              {minimized ? (
                <>
                  ▶ {label} {step + 1}/{TOTAL}
                </>
              ) : (
                <>
                  <span className="quest-num">
                    {label} {step + 1}/{TOTAL}
                  </span>{" "}
                  {q.title[lang]}
                </>
              )}
            </span>
          </button>
          <div className="quest-hud-ctrls">
            <button
              type="button"
              className="quest-hud-toggle-btn"
              onClick={() => setMinimized(!minimized)}
              aria-label={
                minimized
                  ? lang === "es"
                    ? "Desplegar"
                    : "Expand"
                  : lang === "es"
                    ? "Plegar"
                    : "Collapse"
              }
            >
              {minimized ? "+" : "−"}
            </button>
            <button
              type="button"
              className="quest-hud-close-btn"
              onClick={handleDismiss}
              aria-label={lang === "es" ? "Cerrar misiones" : "Close quests"}
            >
              ✕
            </button>
          </div>
        </div>
        <Progress step={step} />

        {!minimized && (
          <div className="quest-hud-body">
            <div className="quest-avatar" aria-hidden="true">
              <Sprite grid={SPRITE_AVATAR_S} scale={2.5} animated />
            </div>
            <div className="quest-details">
              <p className="quest-desc">{q.desc[lang]}</p>
              <p className="quest-hint">
                <span className="hint-label">HINT:</span>{" "}
                {q.hint[isMobile ? "mobile" : "desktop"][lang]}
              </p>
              <div className="quest-actions">
                <button type="button" className="quest-locate-btn" onClick={locate}>
                  {lang === "es" ? "MOSTRAR ▶" : "SHOW ME ▶"}
                </button>
                <button type="button" className="quest-skip-btn" onClick={onSkip}>
                  {lang === "es" ? "SALTAR" : "SKIP"}
                </button>
                <span className="quest-rewards-preview">
                  <Sprite grid={SPRITE_STAR} scale={1} />
                  <span className="reward-text">+1000</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
