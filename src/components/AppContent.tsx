import { useState, useEffect } from 'react';
import Boot from './Boot';
import PixelTweaks, { useTweaks } from './PixelTweaks';
import PixelHero from './PixelHero';
import PixelWorldMap from './PixelWorldMap';
import PixelChat from './PixelChat';
import { PixelAbout, PixelProjects, PixelStack, PixelHomelab, PixelExperience, PixelCerts, PixelComms, PixelFooter } from './PixelSections';
import { Sprite, SPRITE_HEART, SPRITE_COIN } from './Sprites';
import { PIXEL_DATA } from '../utils/pixelData';
import type { Lang, I18n } from '../utils/pixelData';
import { playHover, playClick, playLevelUp } from '../utils/audio';
import QuestHelper from './QuestHelper';

const LEVEL_LABELS: Record<string, { en: string; es: string }> = {
  about:    { en: 'ENTER LORE',     es: 'ENTRAR EN LORE' },
  projects: { en: 'QUEST LOG',      es: 'REGISTRO DE QUESTS' },
  stack:    { en: 'OPEN INVENTORY', es: 'ABRIR INVENTARIO' },
  xp:       { en: 'TIMELINE',       es: 'CRONOLOGÍA' },
  comms:    { en: 'OPEN COMMS',     es: 'ABRIR COMMS' },
  worldmap: { en: 'WORLD MAP',      es: 'MAPAMUNDI' },
  hero:     { en: 'RETURN HOME',    es: 'VOLVER AL INICIO' },
};

const NAV_SECTIONS = ['hero', 'worldmap', 'about', 'projects', 'stack', 'xp', 'comms'] as const;

export default function AppContent() {
  const [tweaks, setTweak] = useTweaks({
    mode: 'midnight',
    animations: 1,
    scanlines: true,
    lang: 'en',
    sfx: false,
  });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [questStep, setQuestStep] = useState(() => {
    try {
      const saved = localStorage.getItem('vod-quest-step');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [questCoins, setQuestCoins] = useState(() => {
    try {
      const saved = localStorage.getItem('vod-quest-step');
      const step = saved ? parseInt(saved, 10) : 0;
      return step * 5;
    } catch {
      return 0;
    }
  });
  const [questScore, setQuestScore] = useState(() => {
    try {
      const saved = localStorage.getItem('vod-quest-step');
      const step = saved ? parseInt(saved, 10) : 0;
      return step * 1000;
    } catch {
      return 0;
    }
  });

  const completeQuestStep = (stepIndex: number) => {
    if (questStep === stepIndex) {
      const nextStep = stepIndex + 1;
      setQuestStep(nextStep);
      try { localStorage.setItem('vod-quest-step', String(nextStep)); } catch {}
      
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
    try { return !!sessionStorage.getItem('vod-booted'); } catch { return false; }
  });

  /* Watch tweaks.mode changes to complete Quest 4 */
  useEffect(() => {
    if (booted && tweaks.mode !== 'midnight') {
      completeQuestStep(3);
    }
  }, [tweaks.mode, booted]);

  const [active, setActive] = useState('hero');
  const [levelup, setLevelup] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const lang = tweaks.lang as Lang;
  const t = PIXEL_DATA.i18n[lang] as I18n;

  /* Apply tweaks to <html> */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--anim-mult', String(tweaks.animations || 1));
    root.dataset.mode = tweaks.mode;
    root.dataset.scanlines = tweaks.scanlines ? 'on' : 'off';
    root.lang = tweaks.lang;
  }, [tweaks]);

  /* Retro chiptune sound effects listeners */
  useEffect(() => {
    if (!tweaks.sfx) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .tweak-radio, .tweak-toggle-btn, .scroll-dot, .lang-btn')) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('button, a, .tweak-radio, .tweak-toggle-btn, .scroll-dot, .lang-btn');
      if (btn) {
        if (btn.classList.contains('nav-link') || btn.classList.contains('nav-logo') || btn.classList.contains('scroll-dot')) {
          return; // Nav links trigger playLevelUp/playClick directly in navigate()
        }
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [tweaks.sfx]);

  /* Active section tracking */
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    NAV_SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [booted]);

  /* Section reveal on scroll */
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('section:not(#hero)').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [booted]);

  /* Konami code */
  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf.push(e.key);
      if (buf.length > code.length) buf = buf.slice(-code.length);
      if (buf.length === code.length && buf.every((k, i) => k.toLowerCase() === code[i].toLowerCase())) {
        const toast = document.getElementById('konami-toast');
        if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }
        buf = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigate = (id: string) => {
    const label = LEVEL_LABELS[id];
    setLevelup(label ? label[lang] : id.toUpperCase());
    if (tweaks.sfx) {
      if (label) {
        playLevelUp();
      } else {
        playClick();
      }
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
    setTimeout(() => setLevelup(null), 900);
  };

  const navItems = [
    { id: 'about',    label: t.nav_about,    n: '01' },
    { id: 'projects', label: t.nav_projects, n: '02' },
    { id: 'stack',    label: t.nav_stack,    n: '03' },
    { id: 'xp',       label: t.nav_xp,       n: '04' },
    { id: 'comms',    label: t.nav_comms,    n: '05' },
  ];

  return (
    <>
      {!booted && <Boot onDone={() => {
        try { sessionStorage.setItem('vod-booted', '1'); } catch {}
        setBooted(true);
      }} />}

      <nav className="navbar" style={{ '--scroll-pct': `${scrollPct}%` } as React.CSSProperties}>
        <div className="navbar-progress" />
        <button type="button" className="nav-logo" onClick={() => navigate('hero')}>
          <span className="v">V</span>
          <div className="nav-logo-meta">
            <span className="nav-logo-text">VODTINKER<span className="nav-logo-dot">.DEV</span></span>
            <span className="nav-logo-sub">1UP!</span>
          </div>
        </button>

        <div className="nav-stats">
          <div className="nav-stat-item score">
            <span className="stat-label">SCORE</span>
            <span className="stat-val">{String(Math.floor(scrollPct * 133.7) + questScore).padStart(6, '0')}</span>
          </div>
          <div className="nav-stat-item coins">
            <div className="stat-coin">
              <Sprite grid={SPRITE_COIN} scale={2} />
            </div>
            <span className="stat-val">x{String(Math.floor(scrollPct) + questCoins).padStart(2, '0')}</span>
          </div>
          <div className="nav-stat-item lives">
            <span className="stat-label">LIVES</span>
            <div className="stat-hearts">
              <span className="stat-heart full">
                <Sprite grid={SPRITE_HEART} scale={2} />
              </span>
              <span className={`stat-heart ${scrollPct > 33 ? 'full' : 'empty'}`}>
                <Sprite grid={SPRITE_HEART} scale={2} />
              </span>
              <span className={`stat-heart ${scrollPct > 66 ? 'full' : 'empty'}`}>
                <Sprite grid={SPRITE_HEART} scale={2} />
              </span>
            </div>
          </div>
        </div>

        <div className="nav-links">
          {navItems.map(it => (
            <button key={it.id} type="button"
              className={`nav-link${active === it.id ? ' active' : ''}`}
              onClick={() => navigate(it.id)}>
              <span className="nav-num">{it.n}</span>
              <span>{it.label}</span>
            </button>
          ))}
        </div>
        
        <div className="nav-right">
          <div className="lang-toggle arcade-buttons">
            <button type="button" className={`lang-btn mode-btn mid${tweaks.mode === 'midnight' ? ' active' : ''}`} onClick={() => setTweak('mode', 'midnight')}>A</button>
            <button type="button" className={`lang-btn mode-btn sun${tweaks.mode === 'sunset' ? ' active' : ''}`}   onClick={() => setTweak('mode', 'sunset')}>B</button>
          </div>
          <div className="lang-toggle arcade-buttons">
            <button type="button" className={`lang-btn lang-select en${lang === 'en' ? ' active' : ''}`} onClick={() => setTweak('lang', 'en')}>EN</button>
            <button type="button" className={`lang-btn lang-select es${lang === 'es' ? ' active' : ''}`} onClick={() => setTweak('lang', 'es')}>ES</button>
          </div>
        </div>
      </nav>

      <nav className="scroll-dots" aria-label="section navigation">
        {NAV_SECTIONS.map(id => (
          <button key={id} type="button"
            className={`scroll-dot${active === id ? ' active' : ''}`}
            onClick={() => navigate(id)}
            aria-label={`Go to ${id}`}
          />
        ))}
      </nav>

      <PixelHero
        t={t}
        lang={lang}
        onNavigate={navigate}
        questStep={questStep}
        completeQuestStep={completeQuestStep}
      />
      <PixelWorldMap t={t} lang={lang} onNavigate={navigate} />
      <PixelAbout    t={t} />
      <PixelProjects t={t} lang={lang} />
      <PixelStack    t={t} lang={lang} />
      <PixelHomelab  t={t} lang={lang} />
      <PixelExperience t={t} lang={lang} />
      <PixelCerts    t={t} lang={lang} />
      <PixelComms    t={t} lang={lang} />
      <PixelFooter   t={t} lang={lang} onNavigate={navigate} />

      <button type="button" className={`chat-fab${questStep === 4 ? ' quest-highlight' : ''}`} onClick={() => {
        setChatOpen(o => !o);
        if (!chatOpen) {
          completeQuestStep(4);
        }
      }}
        aria-label={chatOpen ? 'Close chat' : 'Open AI chat'}>
        <span className="chat-fab-badge" />
        {chatOpen ? '✕' : 'AI'}
      </button>
      
      <button
        type="button"
        className={`back-to-top-fab${scrollPct > 8 ? ' visible' : ''}`}
        onClick={() => navigate('hero')}
        aria-label={lang === 'es' ? 'Volver al inicio' : 'Return to top'}
      >
        ▲
      </button>

      <div className={`chat-drawer${chatOpen ? ' open' : ''}`} aria-hidden={!chatOpen}>
        <PixelChat lang={lang} />
      </div>

      <QuestHelper
        lang={lang}
        step={questStep}
        onSkip={() => {
          setQuestStep(5);
          try { localStorage.setItem('vod-quest-step', '5'); } catch {}
          setQuestCoins(25);
          setQuestScore(5000);
        }}
      />

      <div id="levelup" className={levelup ? 'active' : ''}>
        {levelup && (
          <div className="lu-card">
            ★ LEVEL UP ★
            <span className="sub">▸ {levelup}</span>
          </div>
        )}
      </div>

      <div id="konami-toast">★ CHEAT UNLOCKED · 30 LIVES GRANTED ★</div>

      <PixelTweaks tweaks={tweaks} setTweak={setTweak} questStep={questStep} />
    </>
  );
}
