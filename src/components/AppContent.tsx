import { useCallback, useEffect, useRef, useState } from "react";
import { playClick, playHover, playLevelUp } from "../utils/audio";
import type { I18n, Lang } from "../utils/pixelData";
import { PIXEL_DATA } from "../utils/pixelData";
import Boot from "./Boot";
import MobileMenu from "./MobileMenu";
import PixelChat from "./PixelChat";
import PixelHero from "./PixelHero";
import {
  PixelAbout,
  PixelCerts,
  PixelComms,
  PixelExperience,
  PixelFooter,
  PixelHomelab,
  PixelLabNotes,
  PixelProjects,
  PixelStack,
} from "./PixelSections";
import PixelTweaks, { useTweaks } from "./PixelTweaks";
import PixelWorldMap from "./PixelWorldMap";
import QuestHelper from "./QuestHelper";
import { BackToTop, NavStats, ScrollProgress } from "./NavHud";
import {
  COVER_MS,
  HOLD_MS,
  REVEAL_MS,
  type StageInfo,
  StageToast,
  StageTransition,
} from "./StageTransition";

/** Secciones sin entrada propia en el navbar → entrada que se resalta */
const SECTION_PARENT: Record<string, string> = {
  homelab: "stack",
  certs: "xp",
};

/** Número de "stage" que se muestra en transiciones y avisos */
const STAGE_NUM: Record<string, string> = {
  hero: "00",
  worldmap: "★",
  about: "01",
  projects: "02",
  stack: "03",
  xp: "04",
  labnotes: "05",
  comms: "06",
};

const LEVEL_LABELS: Record<string, { en: string; es: string }> = {
  about: { en: "ENTER LORE", es: "ENTRAR EN LORE" },
  projects: { en: "QUEST LOG", es: "REGISTRO DE QUESTS" },
  stack: { en: "OPEN INVENTORY", es: "ABRIR INVENTARIO" },
  xp: { en: "TIMELINE", es: "CRONOLOGÍA" },
  labnotes: { en: "LAB NOTES", es: "NOTAS DE LAB" },
  comms: { en: "OPEN COMMS", es: "ABRIR COMMS" },
  worldmap: { en: "WORLD MAP", es: "MAPAMUNDI" },
  hero: { en: "RETURN HOME", es: "VOLVER AL INICIO" },
};

const NAV_SECTIONS = [
  "hero",
  "worldmap",
  "about",
  "projects",
  "stack",
  "xp",
  "labnotes",
  "comms",
] as const;

export default function AppContent() {
  const [tweaks, setTweak] = useTweaks({
    mode: "midnight",
    animations: 1,
    scanlines: true,
    lang: "en",
    sfx: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* Navbar: transparente arriba del todo, sólida al hacer scroll (sin re-render) */
  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [questStep, setQuestStep] = useState(() => {
    try {
      const saved = localStorage.getItem("vod-quest-step");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [questCoins, setQuestCoins] = useState(() => {
    try {
      const saved = localStorage.getItem("vod-quest-step");
      const step = saved ? parseInt(saved, 10) : 0;
      return step * 5;
    } catch {
      return 0;
    }
  });
  const [questScore, setQuestScore] = useState(() => {
    try {
      const saved = localStorage.getItem("vod-quest-step");
      const step = saved ? parseInt(saved, 10) : 0;
      return step * 1000;
    } catch {
      return 0;
    }
  });

  const [questDismissed, setQuestDismissed] = useState(() => {
    try {
      return localStorage.getItem("vod-quest-dismissed") === "1";
    } catch {
      return false;
    }
  });
  const setQuestVisible = useCallback((visible: boolean) => {
    setQuestDismissed(!visible);
    try {
      localStorage.setItem("vod-quest-dismissed", visible ? "0" : "1");
    } catch {}
  }, []);
  const dismissQuests = useCallback(() => setQuestVisible(false), [setQuestVisible]);
  const restartQuests = () => {
    setQuestStep(0);
    setQuestCoins(0);
    setQuestScore(0);
    try {
      localStorage.setItem("vod-quest-step", "0");
    } catch {}
    setQuestVisible(true);
  };

  const completeQuestStep = (stepIndex: number) => {
    if (questStep === stepIndex) {
      const nextStep = stepIndex + 1;
      setQuestStep(nextStep);
      try {
        localStorage.setItem("vod-quest-step", String(nextStep));
      } catch {}

      if (tweaks.sfx) {
        if (nextStep === 5) {
          playLevelUp();
        } else {
          playClick();
        }
      }

      setQuestCoins(nextStep * 5);
      setQuestScore(nextStep * 1000);
    }
  };

  const [booted, setBooted] = useState(() => {
    try {
      return !!sessionStorage.getItem("vod-booted");
    } catch {
      return false;
    }
  });

  /* Watch tweaks.mode changes to complete Quest 4 */
  useEffect(() => {
    if (booted && tweaks.mode !== "midnight") {
      completeQuestStep(3);
    }
  }, [tweaks.mode, booted]);

  const [active, setActive] = useState("hero");
  const [stage, setStage] = useState<StageInfo | null>(null);
  const [stagePhase, setStagePhase] = useState<"idle" | "cover" | "reveal">(
    "idle",
  );
  const txBusy = useRef(false);
  const [chatOpen, setChatOpen] = useState(false);

  const lang = tweaks.lang as Lang;
  const t = PIXEL_DATA.i18n[lang] as I18n;

  /* Apply tweaks to <html> */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--anim-mult", String(tweaks.animations || 1));
    root.dataset.mode = tweaks.mode;
    root.dataset.scanlines = tweaks.scanlines ? "on" : "off";
    root.lang = tweaks.lang;
  }, [tweaks]);

  /* Retro chiptune sound effects listeners */
  useEffect(() => {
    if (!tweaks.sfx) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "button, a, .tweak-radio, .tweak-toggle-btn, .scroll-dot, .lang-btn",
        )
      ) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(
        "button, a, .tweak-radio, .tweak-toggle-btn, .scroll-dot, .lang-btn",
      );
      if (btn) {
        if (
          btn.classList.contains("nav-link") ||
          btn.classList.contains("nav-logo") ||
          btn.classList.contains("scroll-dot")
        ) {
          return; // Nav links trigger playLevelUp/playClick directly in navigate()
        }
        playClick();
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, [tweaks.sfx]);

  /* Active section tracking */
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(SECTION_PARENT[e.target.id] ?? e.target.id);
        });
      },
      // Activa la sección que cruza la línea central del viewport
      // (funciona también con secciones más altas que la pantalla).
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );
    [...NAV_SECTIONS, ...Object.keys(SECTION_PARENT)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [booted]);

  /* Section reveal on scroll */
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    document
      .querySelectorAll("section:not(#hero)")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [booted]);

  /* Konami code */
  useEffect(() => {
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf.push(e.key);
      if (buf.length > code.length) buf = buf.slice(-code.length);
      if (
        buf.length === code.length &&
        buf.every((k, i) => k.toLowerCase() === code[i].toLowerCase())
      ) {
        const toast = document.getElementById("konami-toast");
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 4000);
        }
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    document.querySelector<HTMLElement>(".chat-fab")?.focus();
  }, []);

  const navigate = (id: string) => {
    const label = LEVEL_LABELS[id];
    if (tweaks.sfx) {
      if (label) {
        playLevelUp();
      } else {
        playClick();
      }
    }
    const jump = (behavior: ScrollBehavior) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior });
      }
    };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || tweaks.animations === 0) {
      jump("instant");
      return;
    }
    if (txBusy.current) return;
    txBusy.current = true;
    // 1) cubrir con bloques pixel → 2) saltar sin scroll suave → 3) descubrir
    setStage({
      n: STAGE_NUM[id] ?? "--",
      label: label ? label[lang] : id.toUpperCase(),
      key: Date.now(),
    });
    setStagePhase("cover");
    setTimeout(() => {
      jump("instant");
      setStagePhase("reveal");
    }, COVER_MS + HOLD_MS);
    setTimeout(() => {
      setStagePhase("idle");
      txBusy.current = false;
    }, COVER_MS + HOLD_MS + REVEAL_MS);
  };

  const navItems = [
    { id: "about", label: t.nav_about, n: "01" },
    { id: "projects", label: t.nav_projects, n: "02" },
    { id: "stack", label: t.nav_stack, n: "03" },
    { id: "xp", label: t.nav_xp, n: "04" },
    { id: "labnotes", label: t.nav_notes, n: "05" },
    { id: "comms", label: t.nav_comms, n: "06" },
  ];

  return (
    <>
      {!booted && (
        <Boot
          onDone={() => {
            try {
              sessionStorage.setItem("vod-booted", "1");
            } catch {}
            setBooted(true);
          }}
        />
      )}

      <nav ref={navRef} className="navbar" aria-label="main">
        <ScrollProgress />
        <button
          type="button"
          className="nav-logo"
          onClick={() => navigate("hero")}
          aria-label="VodTinker.dev — home"
        >
          <span className="v" aria-hidden="true">V</span>
          <div className="nav-logo-meta">
            <span className="nav-logo-text">
              VODTINKER<span className="nav-logo-dot">.DEV</span>
            </span>
            <span className="nav-logo-sub">1UP!</span>
          </div>
        </button>

        <NavStats questScore={questScore} questCoins={questCoins} />

        <div className="nav-links">
          {navItems.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`nav-link${active === it.id ? " active" : ""}`}
              onClick={() => navigate(it.id)}
              aria-current={active === it.id ? "location" : undefined}
            >
              <span className="nav-num" aria-hidden="true">
                {it.n}
              </span>
              <span>{it.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div
            className="lang-toggle arcade-buttons"
            role="group"
            aria-label={lang === "es" ? "Tema" : "Theme"}
          >
            <span className="arcade-label" aria-hidden="true">
              {lang === "es" ? "TEMA" : "THEME"}
            </span>
            <button
              type="button"
              className={`lang-btn mode-btn mid${tweaks.mode === "midnight" ? " active" : ""}`}
              onClick={() => setTweak("mode", "midnight")}
              aria-pressed={tweaks.mode === "midnight"}
              aria-label="Midnight"
              title="Midnight"
            >
              A
            </button>
            <button
              type="button"
              className={`lang-btn mode-btn sun${tweaks.mode === "sunset" ? " active" : ""}`}
              onClick={() => setTweak("mode", "sunset")}
              aria-pressed={tweaks.mode === "sunset"}
              aria-label="Sunset"
              title="Sunset"
            >
              B
            </button>
          </div>
          <div
            className="lang-toggle arcade-buttons"
            role="group"
            aria-label={lang === "es" ? "Idioma" : "Language"}
          >
            <button
              type="button"
              className={`lang-btn lang-select en${lang === "en" ? " active" : ""}`}
              onClick={() => setTweak("lang", "en")}
              aria-pressed={lang === "en"}
              aria-label="English"
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn lang-select es${lang === "es" ? " active" : ""}`}
              onClick={() => setTweak("lang", "es")}
              aria-pressed={lang === "es"}
              aria-label="Español"
              title="Español"
            >
              ES
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`mobile-menu-btn pixel${questStep === 3 ? " quest-highlight" : ""}`}
          aria-haspopup="dialog"
          aria-expanded={mobileMenuOpen}
          onClick={() => {
            if (tweaks.sfx) playClick();
            setMobileMenuOpen(true);
          }}
        >
          MENU
        </button>
      </nav>

      <nav className="scroll-dots" aria-label="section navigation">
        {NAV_SECTIONS.map((id) => (
          <button
            key={id}
            type="button"
            className={`scroll-dot${active === id ? " active" : ""}`}
            onClick={() => navigate(id)}
            aria-label={`Go to ${id}`}
          />
        ))}
      </nav>

      <PixelHero
        t={t}
        lang={lang}
        onNavigate={navigate}
        sfx={tweaks.sfx}
        onOptions={() => {
          if (window.matchMedia("(max-width: 800px)").matches) {
            setMobileMenuOpen(true);
          } else {
            document.querySelector<HTMLElement>(".tweaks-toggle")?.click();
          }
        }}
      />
      <PixelWorldMap t={t} lang={lang} onNavigate={navigate} />
      <PixelAbout
        t={t}
        lang={lang}
        questStep={questStep}
        completeQuestStep={completeQuestStep}
      />
      <PixelProjects t={t} lang={lang} />
      <PixelStack t={t} lang={lang} />
      <PixelHomelab t={t} lang={lang} />
      <PixelExperience t={t} lang={lang} />
      <PixelCerts t={t} lang={lang} />
      <PixelLabNotes t={t} lang={lang} />
      <PixelComms t={t} lang={lang} />
      <PixelFooter t={t} lang={lang} onNavigate={navigate} />

      <button
        type="button"
        className={`chat-fab${questStep === 4 ? " quest-highlight" : ""}`}
        onClick={() => {
          setChatOpen((o) => !o);
          if (!chatOpen) {
            completeQuestStep(4);
          }
        }}
        aria-label={chatOpen ? "Close chat" : "Open AI chat"}
      >
        <span className="chat-fab-badge" />
        {chatOpen ? "✕" : "AI"}
      </button>

      <BackToTop
        onClick={() => navigate("hero")}
        label={lang === "es" ? "Volver al inicio" : "Return to top"}
      />

      <div
        className={`chat-drawer${chatOpen ? " open" : ""}`}
        aria-hidden={!chatOpen}
        // inert: con el chat cerrado su contenido no recibe foco
        inert={!chatOpen}
      >
        <PixelChat lang={lang} open={chatOpen} onClose={closeChat} />
      </div>

      <QuestHelper
        lang={lang}
        step={questStep}
        onSkip={() => {
          setQuestStep(5);
          try {
            localStorage.setItem("vod-quest-step", "5");
          } catch {}
          setQuestCoins(25);
          setQuestScore(5000);
        }}
        dismissed={questDismissed}
        onDismiss={dismissQuests}
        onRestart={restartQuests}
      />

      <StageTransition stage={stage} phase={stagePhase} />
      <StageToast
        n={STAGE_NUM[active] ?? null}
        label={LEVEL_LABELS[active]?.[lang] ?? null}
        suppressed={stagePhase !== "idle"}
      />

      <div id="konami-toast">★ CHEAT UNLOCKED · 30 LIVES GRANTED ★</div>

      <PixelTweaks
        tweaks={tweaks}
        setTweak={setTweak}
        questStep={questStep}
        questsVisible={!questDismissed}
        setQuestsVisible={setQuestVisible}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        tweaks={tweaks}
        setTweak={setTweak}
        navigate={navigate}
        questsVisible={!questDismissed}
        setQuestsVisible={setQuestVisible}
      />
    </>
  );
}
