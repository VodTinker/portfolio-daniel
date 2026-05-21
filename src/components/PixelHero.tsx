import { useState, useEffect } from 'react';
import { Sprite, SPRITE_CLAW, SPRITE_CLOUD, SPRITE_AVATAR_S } from './Sprites';
import type { I18n, Lang } from '../utils/pixelData';

const BUILDINGS = [
  { h: 38, w: 7,  c: 'var(--violet)',  l: 5,  glow: 'violet',  antenna: false },
  { h: 52, w: 5,  c: 'var(--bg-1)',    l: 12, glow: null,       antenna: true  },
  { h: 30, w: 8,  c: 'var(--magenta)', l: 18, glow: 'magenta',  antenna: false },
  { h: 64, w: 6,  c: 'var(--bg-1)',    l: 27, glow: null,       antenna: true  },
  { h: 44, w: 9,  c: 'var(--violet)',  l: 34, glow: 'violet',   antenna: false },
  { h: 56, w: 5,  c: 'var(--bg-2)',    l: 44, glow: null,       antenna: false },
  { h: 72, w: 7,  c: 'var(--bg-1)',    l: 50, glow: null,       antenna: true  },
  { h: 40, w: 8,  c: 'var(--cyan)',    l: 58, glow: 'cyan',     antenna: false },
  { h: 50, w: 6,  c: 'var(--bg-1)',    l: 67, glow: null,       antenna: true  },
  { h: 34, w: 9,  c: 'var(--magenta)', l: 74, glow: 'magenta',  antenna: false },
  { h: 60, w: 6,  c: 'var(--bg-2)',    l: 84, glow: null,       antenna: false },
  { h: 46, w: 8,  c: 'var(--violet)',  l: 91, glow: 'violet',   antenna: true  },
];

function Skyline() {
  return (
    <div className="skyline">
      <div className="skyline-grad" />
      <div className="skyline-stars">
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className={`star star-${['s','s','m','m','l'][(i * 7) % 5]}`} style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 68}%`,
            animationDelay: `${(i * 0.17) % 3}s`,
          }} />
        ))}
        <div className="shooting-star" />
        <div className="shooting-star shooting-star-2" />
      </div>
      <div className="skyline-clouds">
        {[
          { top: 12, scale: 8,  delay: 0,   dur: 28 },
          { top: 28, scale: 6,  delay: 6,   dur: 36 },
          { top:  8, scale: 10, delay: 14,  dur: 44 },
          { top: 40, scale: 6,  delay: 22,  dur: 32 },
          { top: 22, scale: 9,  delay: 10,  dur: 50 },
        ].map((c, i) => (
          <div key={i} className="sky-cloud" style={{
            top: `${c.top}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}>
            <Sprite grid={SPRITE_CLOUD} scale={c.scale} />
          </div>
        ))}
      </div>
      <div className="skyline-sun-rays" />
      <div className="skyline-moon" />
      <div className="skyline-grid" />
      <div className="skyline-buildings">
        {BUILDINGS.map((b, i) => (
          <div key={i}
            className="bldg"
            data-glow={b.glow ?? undefined}
            style={{ height: `${b.h}%`, width: `${b.w}%`, left: `${b.l}%`, background: b.c }}
          >
            {b.antenna && <div className="bldg-antenna" />}
            {Array.from({ length: Math.floor(b.h / 6) }).map((_, j) => (
              <div className="bldg-row" key={j}>
                {Array.from({ length: Math.floor(b.w / 1.5) }).map((_, k) => (
                  <div key={k} className="bldg-window" style={{
                    opacity: ((i + j + k) * 13) % 10 > 5 ? 0.9 : 0.1,
                    background: ((i + j + k) * 7) % 4 === 0 ? 'var(--gold)' : 'var(--cyan-2)',
                  }} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="skyline-fog" />
    </div>
  );
}

interface TermLineProps {
  type?: 'cmd' | 'out';
  delay?: number;
  children: React.ReactNode;
}

function TermLine({ type = 'cmd', delay = 0, children }: TermLineProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <div className={`term-line term-${type}`}>
      {type === 'cmd' && <span className="term-prompt">vodtinker@homelab</span>}
      {type === 'cmd' && <span className="term-sep">:</span>}
      {type === 'cmd' && <span className="term-path">~</span>}
      {type === 'cmd' && <span className="term-sep">$</span>}
      <span className="term-text">{children}</span>
    </div>
  );
}

interface HeroProps {
  t: I18n;
  lang: Lang;
  onNavigate: (id: string) => void;
  questStep: number;
  completeQuestStep: (stepIndex: number) => void;
}

export default function PixelHero({ t, lang, onNavigate, questStep, completeQuestStep }: HeroProps) {
  const [typed, setTyped] = useState('');
  const [isTerminalOn, setIsTerminalOn] = useState(true);
  const [terminalColor, setTerminalColor] = useState<'green' | 'amber' | 'cyan'>('green');
  const [glitchActive, setGlitchActive] = useState(false);
  const fullCmd = 'whoami --recursive';

  useEffect(() => {
    let i = 0;
    setTyped('');
    const id = setInterval(() => {
      i++;
      setTyped(fullCmd.slice(0, i));
      if (i >= fullCmd.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [isTerminalOn]); // Re-type when powered on

  return (
    <section id="hero">
      <Skyline />
      <div className="shell hero-shell">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-pretitle pixel">
              <span className="dot pulse" />
              {t.hero_pretitle}
            </div>
            <h1 className="hero-title">
              <span className="hero-title-1">{t.hero_title}</span>
              <span className="hero-title-2">{t.hero_title_2}</span>
            </h1>
            <p className="hero-sub">{t.hero_sub}</p>
            <div className="row mt-32 hero-cta-row">
              <button className="pixel-btn cyan primary-cta" onClick={() => onNavigate('projects')}>
                <span className="btn-arrow">▶</span> {t.hero_cta_1}
              </button>
              <button className="pixel-btn ghost secondary-cta" onClick={() => onNavigate('comms')}>
                <span className="btn-arrow">✉</span> {t.hero_cta_2}
              </button>
            </div>
            <div className="hero-stats mt-32">
              <div className="hero-avatar-frame">
                <div className="hud-corner tl" />
                <div className="hud-corner tr" />
                <div className="hud-corner bl" />
                <div className="hud-corner br" />
                <div className="hero-avatar-box">
                  <Sprite grid={SPRITE_AVATAR_S} scale={3} />
                  <div className="avatar-scanline" />
                </div>
                <span className="hero-avatar-tag">P1 READY</span>
              </div>
              <div className="hero-stats-info">
                <div className="hero-stats-row">
                  <div className="hero-stat-col" data-hint="Daniel Fonov">
                    <span className="stat-label">NAME</span>
                    <span className="stat-val">DANIEL</span>
                  </div>
                  <div className="hero-stat-col" data-hint="ASIR Graduate">
                    <span className="stat-label">LV</span>
                    <span className="stat-val">21</span>
                  </div>
                  <div className="hero-stat-col" data-hint="Systems Operator">
                    <span className="stat-label">CLASS</span>
                    <span className="stat-val">SYSADMIN</span>
                  </div>
                </div>
                <div className="hero-stats-bars">
                  <div className="hero-stat-bar-item">
                    <span className="stat-label">HP</span>
                    <div className="stat-bar">
                      <div className="stat-bar-fill hp" style={{ width: '92%' }} />
                    </div>
                    <span className="stat-bar-text">92/100</span>
                  </div>
                  <div className="hero-stat-bar-item">
                    <span className="stat-label">MP</span>
                    <div className="stat-bar">
                      <div className="stat-bar-fill mp" style={{ width: '68%' }} />
                    </div>
                    <span className="stat-bar-text">68/100</span>
                  </div>
                  <div className="hero-stat-bar-item">
                    <span className="stat-label">XP</span>
                    <div className="stat-bar">
                      <div className="stat-bar-fill xp" style={{ width: '85%' }} />
                    </div>
                    <span className="stat-bar-text">85% TO LV22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="crt-bezel-frame">
              <div className="crt-bezel-screw tl">+</div>
              <div className="crt-bezel-screw tr">+</div>
              <div className="crt-bezel-screw bl">+</div>
              <div className="crt-bezel-screw br">+</div>
              
              <div className={`terminal ${isTerminalOn ? 'power-on' : 'power-off'} color-${terminalColor} ${glitchActive ? 'glitch-interference' : ''}`}>
                <div className="term-bar">
                  <div className="term-dots">
                    <span className={`term-dot r${questStep === 0 ? ' quest-highlight' : ''}`} onClick={() => { setIsTerminalOn(!isTerminalOn); completeQuestStep(0); }} style={{ cursor: 'pointer' }} title="Power Toggle" />
                    <span className={`term-dot y${questStep === 2 ? ' quest-highlight' : ''}`} onClick={() => { setGlitchActive(!glitchActive); completeQuestStep(2); }} style={{ cursor: 'pointer' }} title="Interference Glitch Overlay" />
                    <span className={`term-dot g${questStep === 1 ? ' quest-highlight' : ''}`} onClick={() => {
                      setTerminalColor(c => c === 'green' ? 'amber' : c === 'amber' ? 'cyan' : 'green');
                      completeQuestStep(1);
                    }} style={{ cursor: 'pointer' }} title="Cycle Phosphor Color Theme" />
                  </div>
                  <div className="term-title pixel">{t.hero_terminal_label}</div>
                  <div className="term-power-indicator">
                    <span className="power-label">{isTerminalOn ? 'SYS ON' : 'SYS OFF'}</span>
                    <span className={`power-led ${isTerminalOn ? 'pulse' : 'off'}`} />
                  </div>
                </div>
                
                {isTerminalOn && (
                  <div className="term-body">
                    <TermLine type="cmd" delay={300}>
                      <span className="typed">{typed}</span><span className="cursor">▌</span>
                    </TermLine>
                    <TermLine type="out" delay={1400}>
                      <span className="term-out-label">vodtinker</span>{' — '}
                      {lang === 'es' ? 'estudiante ASIR · sysadmin · web dev' : 'ASIR student · sysadmin · web dev'}
                    </TermLine>
                    <TermLine type="out" delay={1700}>
                      <span className="term-out-label-gold">uptime</span>&nbsp;
                      {lang === 'es' ? '21 años, Gijón' : '21 years old, Gijón'}
                    </TermLine>
                    <TermLine type="out" delay={2000}>
                      <span className="term-out-label-gold">shell</span>&nbsp;&nbsp;fish 3.7
                    </TermLine>
                    <TermLine type="out" delay={2300}>
                      <span className="term-out-label-gold">editor</span>{' '}
                      <span className="term-out-special">claude code 24/7</span>{' '}
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
                  <div className="crt-color-badge pixel">{terminalColor.toUpperCase()} SCAN</div>
                  <button className={`crt-power-switch ${isTerminalOn ? 'on' : 'off'}${questStep === 0 ? ' quest-highlight' : ''}`} onClick={() => { setIsTerminalOn(!isTerminalOn); completeQuestStep(0); }} aria-label="CRT Power Monitor">
                    <span className="crt-power-led" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
