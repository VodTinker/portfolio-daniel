import { useEffect, useRef, useState } from "react";
import { playClick, playHover } from "../utils/audio";
import type { I18n, Lang } from "../utils/pixelData";
import { SPRITE_CLAW, SPRITE_CLOUD, Sprite } from "./Sprites";


function Skyline() {
  return (
    <div className="skyline">
      <div className="skyline-grad" />
      <div className="skyline-stars">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className={`star star-${["s", "s", "m", "m", "l"][(i * 7) % 5]}`}
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 68}%`,
              animationDelay: `${(i * 0.17) % 3}s`,
            }}
          />
        ))}
        <div className="shooting-star" />
        <div className="shooting-star shooting-star-2" />
      </div>
      <div className="skyline-clouds">
        {[
          { top: 12, scale: 8, delay: 0, dur: 28 },
          { top: 28, scale: 6, delay: 6, dur: 36 },
          { top: 8, scale: 10, delay: 14, dur: 44 },
          { top: 40, scale: 6, delay: 22, dur: 32 },
          { top: 22, scale: 9, delay: 10, dur: 50 },
        ].map((c, i) => (
          <div
            key={i}
            className="sky-cloud"
            style={{
              top: `${c.top}%`,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <Sprite grid={SPRITE_CLOUD} scale={c.scale} />
          </div>
        ))}
      </div>
      <div className="skyline-sun-rays" />
      <div className="skyline-moon" />
      <div className="skyline-grid" />
      {/* Skyline renderizado en Blender: blender/render_sprite.py --demo city */}
      <div className="skyline-city" />
      <div className="skyline-fog" />
    </div>
  );
}

interface TermLineProps {
  type?: "cmd" | "out";
  delay?: number;
  children: React.ReactNode;
}

function TermLine({ type = "cmd", delay = 0, children }: TermLineProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <div className={`term-line term-${type}`}>
      {type === "cmd" && <span className="term-prompt">vodtinker@homelab</span>}
      {type === "cmd" && <span className="term-sep">:</span>}
      {type === "cmd" && <span className="term-path">~</span>}
      {type === "cmd" && <span className="term-sep">$</span>}
      <span className="term-text">{children}</span>
    </div>
  );
}

interface CrtProps {
  t: I18n;
  lang: Lang;
  questStep: number;
  completeQuestStep: (stepIndex: number) => void;
}

/** Monitor CRT interactivo (objetivo de las misiones 1–3). Vive en "About". */
export function CrtTerminal({ t, lang, questStep, completeQuestStep }: CrtProps) {
  const [typed, setTyped] = useState("");
  const [isTerminalOn, setIsTerminalOn] = useState(true);
  const [terminalColor, setTerminalColor] = useState<
    "green" | "amber" | "cyan"
  >("green");
  const [glitchActive, setGlitchActive] = useState(false);
  const fullCmd = "whoami --recursive";

  useEffect(() => {
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(fullCmd.slice(0, i));
      if (i >= fullCmd.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [isTerminalOn]); // Re-type when powered on

  return (
    <div className="crt-bezel-frame">
      <div className="crt-bezel-screw tl">+</div>
      <div className="crt-bezel-screw tr">+</div>
      <div className="crt-bezel-screw bl">+</div>
      <div className="crt-bezel-screw br">+</div>

      <div
        className={`terminal ${isTerminalOn ? "power-on" : "power-off"} color-${terminalColor} ${glitchActive ? "glitch-interference" : ""}`}
      >
        <div className="term-bar">
          <div className="term-dots">
            <span
              className={`term-dot r${questStep === 0 ? " quest-highlight" : ""}`}
              onClick={() => {
                setIsTerminalOn(!isTerminalOn);
                completeQuestStep(0);
              }}
              style={{ cursor: "pointer" }}
              title="Power Toggle"
            />
            <span
              className={`term-dot y${questStep === 2 ? " quest-highlight" : ""}`}
              onClick={() => {
                setGlitchActive(!glitchActive);
                completeQuestStep(2);
              }}
              style={{ cursor: "pointer" }}
              title="Interference Glitch Overlay"
            />
            <span
              className={`term-dot g${questStep === 1 ? " quest-highlight" : ""}`}
              onClick={() => {
                setTerminalColor((c) =>
                  c === "green"
                    ? "amber"
                    : c === "amber"
                      ? "cyan"
                      : "green",
                );
                completeQuestStep(1);
              }}
              style={{ cursor: "pointer" }}
              title="Cycle Phosphor Color Theme"
            />
          </div>
          <div className="term-title pixel">
            {t.hero_terminal_label}
          </div>
          <div className="term-power-indicator">
            <span className="power-label">
              {isTerminalOn ? "SYS ON" : "SYS OFF"}
            </span>
            <span
              className={`power-led ${isTerminalOn ? "pulse" : "off"}`}
            />
          </div>
        </div>

        {isTerminalOn && (
          <div className="term-body">
            <TermLine type="cmd" delay={300}>
              <span className="typed">{typed}</span>
              <span className="cursor">▌</span>
            </TermLine>
            <TermLine type="out" delay={1400}>
              <span className="term-out-label">vodtinker</span>
              {" — "}
              {lang === "es"
                ? "estudiante ASIR · sysadmin · web dev"
                : "ASIR student · sysadmin · web dev"}
            </TermLine>
            <TermLine type="out" delay={1700}>
              <span className="term-out-label-gold">uptime</span>&nbsp;
              {lang === "es" ? "22 años, Gijón" : "22 years old, Gijón"}
            </TermLine>
            <TermLine type="out" delay={2000}>
              <span className="term-out-label-gold">shell</span>
              &nbsp;&nbsp;fish 3.7
            </TermLine>
            <TermLine type="out" delay={2300}>
              <span className="term-out-label-gold">editor</span>{" "}
              <span className="term-out-special">claude code 24/7</span>{" "}
              <span className="term-out-dim">(i love claw)</span>
            </TermLine>
            <TermLine type="out" delay={2500}>
              <span className="claw-inline">
                <Sprite grid={SPRITE_CLAW} scale={2} animated />
                <span className="claw-label pixel">CLAUDE CODE</span>
              </span>
            </TermLine>
            <TermLine type="cmd" delay={2900}>
              <span className="cursor">▌</span>
            </TermLine>
          </div>
        )}

        {!isTerminalOn && (
          <div className="term-body term-body-off">
            <div className="crt-screen-off-indicator" />
          </div>
        )}

        <div className="term-scanline" />
        <div className="crt-screen-flicker" />
      </div>

      <div className="crt-bezel-bottom">
        <div className="crt-bezel-logo pixel">VOD-1980 CRT</div>
        <div className="crt-bezel-controls">
          <div className="crt-color-badge pixel">
            {terminalColor.toUpperCase()} SCAN
          </div>
          <button
            className={`crt-power-switch ${isTerminalOn ? "on" : "off"}${questStep === 0 ? " quest-highlight" : ""}`}
            onClick={() => {
              setIsTerminalOn(!isTerminalOn);
              completeQuestStep(0);
            }}
            aria-label="CRT Power Monitor"
          >
            <span className="crt-power-led" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======= PANTALLA DE TÍTULO ======= */
interface MenuItem {
  id: string;
  game: { en: string; es: string };
  real: { en: string; es: string };
}

const MENU: MenuItem[] = [
  { id: "projects", game: { en: "NEW GAME", es: "NUEVA PARTIDA" }, real: { en: "Projects", es: "Proyectos" } },
  { id: "xp", game: { en: "CONTINUE", es: "CONTINUAR" }, real: { en: "Experience", es: "Experiencia" } },
  { id: "stack", game: { en: "INVENTORY", es: "INVENTARIO" }, real: { en: "Tech stack", es: "Stack" } },
  { id: "comms", game: { en: "CREDITS", es: "CRÉDITOS" }, real: { en: "Contact", es: "Contacto" } },
  { id: "options", game: { en: "OPTIONS", es: "OPCIONES" }, real: { en: "Theme · language", es: "Tema · idioma" } },
];

interface HeroProps {
  t: I18n;
  lang: Lang;
  onNavigate: (id: string) => void;
  onOptions: () => void;
  sfx: boolean;
}

export default function PixelHero({ t, lang, onNavigate, onOptions, sfx }: HeroProps) {
  const [sel, setSel] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const heroRef = useRef<HTMLElement>(null);

  const activate = (i: number) => {
    const item = MENU[i];
    if (sfx) playClick();
    if (item.id === "options") onOptions();
    else onNavigate(item.id);
  };

  const move = (delta: number) => {
    setSel((s) => {
      const n = (s + delta + MENU.length) % MENU.length;
      itemRefs.current[n]?.focus({ preventScroll: true });
      return n;
    });
    if (sfx) playHover();
  };

  // Flechas ↑↓ / W S cuando estás arriba del todo y nada tiene el foco:
  // se comporta como el menú de un juego. Más abajo, las flechas hacen scroll normal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const hero = heroRef.current;
      if (!hero) return;
      const inMenu = hero.contains(document.activeElement);
      const atTop = window.scrollY < hero.offsetHeight * 0.4;
      const idle = document.activeElement === document.body;
      if (!inMenu && !(atTop && idle)) return;
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        move(-1);
      } else if (!inMenu && e.key === "Enter") {
        e.preventDefault();
        activate(sel);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const es = lang === "es";

  return (
    <section id="hero" ref={heroRef}>
      <Skyline />
      <div className="shell hero-shell title-screen">
        <p className="title-pre pixel">
          <span className="dot pulse" /> {es ? "1 JUGADOR · 2026" : "1 PLAYER · 2026"}
        </p>
        <h1 className="title-logo">
          {/* El nombre va en el h1 para SEO/lectores de pantalla, sin protagonismo visual */}
          <span className="sr-only">Daniel Fonov — </span>
          <span className="title-logo-name">
            VOD<span className="title-logo-accent">TINKER</span>
          </span>
          <span className="title-logo-tag">
            {t.hero_title} {t.hero_title_2}
          </span>
        </h1>
        <p className="title-sub">
          {es
            ? "Estudiante ASIR · sysadmin · web dev · Gijón"
            : "ASIR student · sysadmin · web dev · Gijón"}
        </p>

        <nav className="title-menu" aria-label={es ? "Menú principal" : "Main menu"}>
          {MENU.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              className={`title-item${sel === i ? " sel" : ""}`}
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => activate(i)}
              tabIndex={sel === i ? 0 : -1}
            >
              <span className="title-cursor" aria-hidden="true">
                ▶
              </span>
              <span className="title-item-game">{item.game[lang]}</span>
              <span className="title-item-real">{item.real[lang]}</span>
            </button>
          ))}
        </nav>

        <button type="button" className="title-start pixel" onClick={() => activate(sel)}>
          — {es ? "PULSA START" : "PRESS START"} —
        </button>
        <p className="title-keys pixel" aria-hidden="true">
          <span className="only-desktop">
            ↑↓ {es ? "ELEGIR" : "SELECT"} · ENTER {es ? "ACEPTAR" : "CONFIRM"}
          </span>
          <span className="only-touch">{es ? "TOCA UNA OPCIÓN" : "TAP AN OPTION"}</span>
        </p>
      </div>

      <div className="title-footer pixel" aria-hidden="true">
        <span>© 2026 DANIEL FONOV</span>
        <span className="title-credit">CREDIT 01</span>
        <span className="title-hi">HI 013369</span>
      </div>
    </section>
  );
}
