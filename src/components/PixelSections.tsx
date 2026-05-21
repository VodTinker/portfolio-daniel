import { useState } from 'react';
import { Sprite, SPRITE_STAR, SPRITE_SERVER, SPRITE_GEAR, SPRITE_MUSHROOM, SPRITE_SWORD, SPRITE_MONITOR, SPRITE_CHEST, SPRITE_NETBIRD, SPRITE_GLOBE, SPRITE_VPS_SERVER, SPRITE_DESKTOP, SPRITE_PROXMOX_RACK, SPRITE_IPAD, SPRITE_PHONE } from './Sprites';
import { PIXEL_DATA } from '../utils/pixelData';
import type { I18n, Lang } from '../utils/pixelData';

/* ======= ABOUT ======= */
export function PixelAbout({ t }: { t: I18n }) {
  const stats = [
    { k: t.stat_focus,     v: 90, c: 'cyan'    },
    { k: t.stat_curiosity, v: 97, c: 'magenta' },
    { k: t.stat_patience,  v: 70, c: 'gold'    },
    { k: t.stat_caffeine,  v: 99, c: 'green'   },
  ];
  return (
    <section id="about">
      <div className="shell">
        <div className="section-banner violet pixel">{t.about_banner}</div>
        <h2 className="section-title">{t.about_title}</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>{t.about_p1}</p>
            <p className="mt-16">{t.about_p2}</p>
            <p className="mt-16">{t.about_p3}</p>
            <div className="row mt-24">
              <span className="chip cyan">linux</span>
              <span className="chip magenta">web</span>
              <span className="chip gold">homelab</span>
              <span className="chip green">automation</span>
            </div>
          </div>
          <div className="about-card">
            <div className="about-card-head pixel">{t.about_stats}</div>
            <div className="about-stats-list">
              {stats.map(s => (
                <div className="about-stat-row" key={s.k}>
                  <div className="about-stat-k">{s.k}</div>
                  <div className="about-stat-bar">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className={`bar-cell ${s.c}`} style={{ opacity: i < Math.round(s.v / 5) ? 1 : 0.15 }} />
                    ))}
                  </div>
                  <div className="about-stat-v">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="about-card-foot pixel">
              <span style={{ color: 'var(--gold)' }}>♥</span> 21yo · GJN · ASIR · ☕☕☕
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======= PROJECTS ======= */
const SPRITES_MAP: Record<string, string> = {
  'mail-infra':    SPRITE_SERVER,
  'discord-bot':   SPRITE_MONITOR,
  'classroom-bot': SPRITE_CHEST,
  'vpn-netbird':   SPRITE_NETBIRD,
  'openxixon':     SPRITE_SERVER,
  'web-scraper':   SPRITE_GEAR,
};

const COLOR_VAR: Record<string, string> = {
  cyan: 'var(--cyan)', magenta: 'var(--magenta)', gold: 'var(--gold)',
  green: 'var(--green)', violet: 'var(--violet-2)',
};

const LVL_COLOR: Record<string, string> = {
  S: 'var(--gold)', A: 'var(--cyan)', B: 'var(--magenta)', C: 'var(--ink-dim)',
};

function ProjectCard({ p, lang }: { p: (typeof PIXEL_DATA.projects)[number]; lang: Lang }) {
  const statusColor = p.stats.status === 'live' ? 'var(--green)' : 'var(--gold)';
  const sprite = SPRITES_MAP[p.id] ?? SPRITE_CHEST;
  const cardColor = COLOR_VAR[p.color] ?? 'var(--cyan)';
  return (
    <div className="project-wrap" style={{ '--project-c': cardColor } as React.CSSProperties}>
      <a href={p.link} target="_blank" rel="noopener noreferrer"
         className={`project-card hover-lift project-card-${p.color}`}>
        <div className="project-art">
          <div className="project-art-bg" />
          <div className="project-art-icon">
            <Sprite grid={sprite} scale={3} />
          </div>
          <div className="project-lvl pixel" style={{ color: LVL_COLOR[p.stats.lvl] ?? 'var(--ink)' }}>
            LV {p.stats.lvl}
          </div>
        </div>
        <div className="project-body">
          <div className="project-head">
            <h3 className="project-title">{p.title}</h3>
            <div className="project-status" style={{ color: statusColor }}>
              <span className="dot-blink" style={{ background: statusColor }} />
              {p.stats.status}
            </div>
          </div>
          <p className="project-tag pixel">{p.tagline[lang]}</p>
          <p className="project-desc">{p.desc[lang]}</p>
          <div className="project-tags">
            {p.tags.map(tg => <span key={tg} className="chip">{tg}</span>)}
          </div>
          <div className="project-footer">
            <span className="project-stat"><span className="pixel">★</span> {p.stats.lvl}</span>
            <span className="project-arrow pixel">OPEN ▶</span>
          </div>
        </div>
      </a>

      {/* side panel */}
      <div className="project-panel">
        <div className="project-panel-head pixel">◆ QUEST LOG</div>
        <ul className="project-panel-features">
          {p.details.features[lang].map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="project-panel-meta pixel">
          <span style={{ color: 'var(--gold)' }}>◷</span> {p.details.date}
        </div>
        <div className="project-panel-rewards pixel">
          <span style={{ color: 'var(--project-c)' }}>★ XP GAINED</span>
          <div className="project-panel-xp">
            {p.details.rewards.map(r => <span key={r} className="chip">{r}</span>)}
          </div>
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
           className="project-panel-cta pixel" onClick={e => e.stopPropagation()}>
          OPEN ▶
        </a>
      </div>
    </div>
  );
}

export function PixelProjects({ t, lang }: { t: I18n; lang: Lang }) {
  return (
    <section id="projects">
      <div className="shell">
        <div className="section-banner magenta pixel">{t.projects_banner}</div>
        <h2 className="section-title">{t.projects_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.projects_sub}</p>
        <div className="projects-grid">
          {PIXEL_DATA.projects.map(p => <ProjectCard key={p.id} p={p} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}

/* ======= STACK ======= */
const COLORS = ['cyan', 'magenta', 'gold', 'violet', 'green', 'cyan'];

const TECH_META: Record<string, { abbr: string; color: string; lvl: number }> = {
  'Linux':      { abbr: 'LNX', color: 'var(--gold)',    lvl: 5 },
  'Debian':     { abbr: 'DEB', color: '#c70036',        lvl: 4 },
  'Arch':       { abbr: 'ARC', color: 'var(--cyan)',    lvl: 4 },
  'Windows':    { abbr: 'WIN', color: '#00adef',        lvl: 2 },
  'Docker':     { abbr: 'DOC', color: '#2496ed',        lvl: 4 },
  'Proxmox':    { abbr: 'PMX', color: 'var(--magenta)', lvl: 4 },
  'Caddy':      { abbr: 'CAD', color: 'var(--green)',   lvl: 3 },
  'Nginx':      { abbr: 'NGX', color: 'var(--green)',   lvl: 4 },
  'Tailscale':  { abbr: 'TLS', color: 'var(--violet)',  lvl: 3 },
  'TypeScript': { abbr: 'TS',  color: '#3178c6',        lvl: 4 },
  'Astro':      { abbr: 'AST', color: '#ff5d01',        lvl: 5 },
  'React':      { abbr: 'RCT', color: 'var(--cyan)',    lvl: 3 },
  'Tailwind':   { abbr: 'TWD', color: '#38bdf8',        lvl: 4 },
  'Postgres':   { abbr: 'PG',  color: '#336791',        lvl: 3 },
  'Redis':      { abbr: 'RDS', color: '#dc382d',        lvl: 3 },
  'SQLite':     { abbr: 'SQL', color: 'var(--cyan)',    lvl: 3 },
  'Neovim':     { abbr: 'NVM', color: '#57a143',        lvl: 4 },
  'Tmux':       { abbr: 'TMX', color: 'var(--green)',   lvl: 4 },
  'Git':        { abbr: 'GIT', color: '#f05032',        lvl: 5 },
  'n8n':        { abbr: 'N8N', color: 'var(--violet)',  lvl: 3 },
  'Python':     { abbr: 'PY',  color: 'var(--gold)',    lvl: 3 },
  'Bash':       { abbr: 'SH',  color: 'var(--green)',   lvl: 4 },
  'Node.js':    { abbr: 'NOD', color: '#84c729',        lvl: 3 },
  'Rust':       { abbr: 'RST', color: '#ce4a00',        lvl: 2 },
};

function InvSlot({ item }: { item: string }) {
  const meta = TECH_META[item] ?? { abbr: item.slice(0, 3).toUpperCase(), color: 'var(--cyan)', lvl: 3 };
  return (
    <div className="inv-slot" style={{ '--slot-c': meta.color } as React.CSSProperties}>
      <div className="inv-slot-icon pixel">{meta.abbr}</div>
      <div className="inv-slot-name">{item}</div>
      <div className="inv-slot-dots">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`inv-dot${i < meta.lvl ? ' on' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export function PixelStack({ t }: { t: I18n; lang?: Lang }) {
  return (
    <section id="stack">
      <div className="shell">
        <div className="section-banner cyan pixel">{t.stack_banner}</div>
        <h2 className="section-title">{t.stack_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.stack_sub}</p>
        <div className="inv-grid">
          {PIXEL_DATA.stack.map((cat, idx) => (
            <div key={cat.cat} className={`inv-cat inv-${COLORS[idx]}`}>
              <div className="inv-cat-head pixel">
                ▸ {t.stack_labels[cat.cat as keyof typeof t.stack_labels]}
                <span className="inv-cat-count">{cat.items.length}/6</span>
              </div>
              <div className="inv-slots">
                {cat.items.map(item => <InvSlot key={item} item={item} />)}
                {Array.from({ length: Math.max(0, 6 - cat.items.length) }).map((_, i) => (
                  <div key={`e${i}`} className="inv-slot empty">
                    <span className="inv-slot-lock">?</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= HOMELAB ======= */
const HL_NODES = [
  {
    id: 'net',
    label: { en: 'INTERNET', es: 'INTERNET' },
    sub:   '',
    sprite: SPRITE_GLOBE,
    x: 50, y: 7,
    color: 'var(--cyan)',
    services: { en: [] as string[], es: [] as string[] },
  },
  {
    id: 'vps',
    label: { en: 'VPS', es: 'VPS' },
    sub:   'cloud vm · Ubuntu',
    sprite: SPRITE_VPS_SERVER,
    x: 14, y: 38,
    color: 'var(--cyan)',
    services: {
      en: ['Stalwart mail (JMAP/IMAP)', 'Caddy reverse proxy', 'DoH / DoQ DNS', 'Netbird relay'],
      es: ['Stalwart mail (JMAP/IMAP)', 'Reverse proxy Caddy', 'DNS DoH / DoQ', 'Relay Netbird'],
    },
  },
  {
    id: 'pc',
    label: { en: 'WORKSTATION', es: 'WORKSTATION' },
    sub:   'arch linux',
    sprite: SPRITE_DESKTOP,
    x: 86, y: 38,
    color: 'var(--violet-2)',
    services: {
      en: ['Arch Linux', 'Fish + Neovim', 'Netbird client', 'Claude Code 24/7'],
      es: ['Arch Linux', 'Fish + Neovim', 'Cliente Netbird', 'Claude Code 24/7'],
    },
  },
  {
    id: 'xiaomi',
    label: { en: 'XIAOMI', es: 'XIAOMI' },
    sub:   'android · phone',
    sprite: SPRITE_PHONE,
    x: 14, y: 74,
    color: 'var(--red)',
    services: {
      en: ['Netbird client', 'Remote access'],
      es: ['Cliente Netbird', 'Acceso remoto'],
    },
  },
  {
    id: 'ipad',
    label: { en: 'IPAD', es: 'IPAD' },
    sub:   'iPadOS · tablet',
    sprite: SPRITE_IPAD,
    x: 86, y: 74,
    color: 'var(--cyan-2)',
    services: {
      en: ['Netbird client', 'Remote access'],
      es: ['Cliente Netbird', 'Acceso remoto'],
    },
  },
  {
    id: 'pmx',
    label: { en: 'PROXMOX', es: 'PROXMOX' },
    sub:   'bedroom.local',
    sprite: SPRITE_PROXMOX_RACK,
    x: 50, y: 88,
    color: 'var(--magenta)',
    services: {
      en: ['Proxmox VE hypervisor', 'Docker stack', 'Netbird control plane', 'Self-hosted services'],
      es: ['Hypervisor Proxmox VE', 'Stack Docker', 'Control plane Netbird', 'Servicios autoalojados'],
    },
  },
];

const HL_EDGES = [
  { a: 'net',    b: 'vps',    vpn: false },
  { a: 'net',    b: 'pc',     vpn: false },
  { a: 'net',    b: 'pmx',    vpn: false },
  { a: 'net',    b: 'xiaomi', vpn: false },
  { a: 'net',    b: 'ipad',   vpn: false },
  { a: 'vps',    b: 'pmx',    vpn: true  },
  { a: 'vps',    b: 'pc',     vpn: true  },
  { a: 'vps',    b: 'xiaomi', vpn: true  },
  { a: 'vps',    b: 'ipad',   vpn: true  },
  { a: 'pmx',    b: 'pc',     vpn: true  },
  { a: 'pmx',    b: 'xiaomi', vpn: true  },
  { a: 'pmx',    b: 'ipad',   vpn: true  },
];

export function PixelHomelab({ t, lang }: { t: I18n; lang: Lang }) {
  const [hover, setHover] = useState<string | null>(null);
  const hovNode = hover ? HL_NODES.find(n => n.id === hover) : null;

  return (
    <section id="homelab">
      <div className="shell">
        <div className="section-banner violet pixel">{t.homelab_banner}</div>
        <h2 className="section-title">{t.homelab_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.homelab_sub}</p>

        <div className="hl-frame">
          <div className="hl-diagram">
            {/* HUD & Radar scanner overlays */}
            <div className="hl-scanline" />
            <div className="hl-radar-sweep" />
            
            {/* Decorative corners */}
            <div className="hl-corner hl-tl" /><div className="hl-corner hl-tr" />
            <div className="hl-corner hl-bl" /><div className="hl-corner hl-br" />
            
            {/* Background grid */}
            <div className="hl-grid" />

            {/* Faint HUD status information */}
            <div className="hl-hud-info">
              <div className="hl-hud-title">SYS_TELEMETRY v2.0</div>
              <div className="hl-hud-log">STATUS: <span className="green">ONLINE</span></div>
              <div className="hl-hud-log">SUBNET: 100.64.0.0/16</div>
              <div className="hl-hud-log">P2P LINKS: <span className="green">ESTABLISHED</span></div>
              {hover && (
                <div className="hl-hud-log">
                  FOCUS: <span className="gold">{hover.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Spotlight backdrop behind hovered node */}
            {hover && hovNode && (
              <div
                className="hl-spotlight"
                style={{
                  left: `${hovNode.x}%`,
                  top: `${hovNode.y}%`,
                  background: `radial-gradient(circle, ${hovNode.color}22 0%, transparent 70%)`
                } as React.CSSProperties}
              />
            )}

            <svg className="hl-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* base track lines */}
              {HL_EDGES.map((e, i) => {
                const a = HL_NODES.find(n => n.id === e.a)!;
                const b = HL_NODES.find(n => n.id === e.b)!;
                const active = hover === e.a || hover === e.b;
                return (
                  <line key={`base-${i}`}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={e.vpn ? 'var(--cyan)' : 'var(--ink-faint)'}
                    strokeWidth="0.6"
                    opacity={active ? 0.35 : 0.12}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
              {/* animated flow on VPN lines */}
              {HL_EDGES.filter(e => e.vpn).map((e, i) => {
                const a = HL_NODES.find(n => n.id === e.a)!;
                const b = HL_NODES.find(n => n.id === e.b)!;
                const active = hover === e.a || hover === e.b;
                return (
                  <g key={`flow-group-${i}`}>
                    {/* Base VPN grid wire */}
                    <line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="var(--cyan)"
                      strokeWidth={active ? '1.2' : '0.6'}
                      strokeDasharray="4 6"
                      opacity={active ? 0.75 : 0.25}
                      vectorEffect="non-scaling-stroke"
                      className="hl-flow"
                      style={{ animationDuration: active ? '1s' : '2.5s' } as React.CSSProperties}
                    />
                    {/* Clean glowing data stream ticks (no stretching distortion) */}
                    <line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="var(--cyan)"
                      strokeWidth={active ? '2.2' : '1.4'}
                      strokeDasharray="2 24"
                      opacity={active ? 0.95 : 0.45}
                      vectorEffect="non-scaling-stroke"
                      className="hl-flow"
                      filter="url(#neon-glow-cyan)"
                      style={{ animationDuration: active ? '0.7s' : '1.8s' } as React.CSSProperties}
                    />
                  </g>
                );
              })}
              {/* HTTP lines with subtle dash */}
              {HL_EDGES.filter(e => !e.vpn).map((e, i) => {
                const a = HL_NODES.find(n => n.id === e.a)!;
                const b = HL_NODES.find(n => n.id === e.b)!;
                const active = hover === e.a || hover === e.b;
                return (
                  <line key={`http-${i}`}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="var(--ink-dim)"
                    strokeWidth={active ? '1.0' : '0.6'}
                    strokeDasharray="2 6"
                    opacity={active ? 0.6 : 0.2}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
              {/* center label */}
              <text x="50" y="52" textAnchor="middle" fontSize="1.8"
                fill="var(--cyan)" opacity="0.3"
                style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                NETBIRD MESH
              </text>
            </svg>

            {HL_NODES.map(n => (
              <div
                key={n.id}
                className={`hl-node${hover === n.id ? ' active' : ''}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, '--hl-c': n.color } as React.CSSProperties}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                {/* HUD terminal header */}
                <div className="hl-node-header">
                  <span className="hl-node-id">[SYS:{n.id.toUpperCase()}]</span>
                  <div className="hl-node-dots">
                    <span className="hl-node-dot" />
                    <span className="hl-node-dot" />
                    <span className="hl-node-dot red" />
                  </div>
                </div>

                {/* HUD terminal body */}
                <div className="hl-node-body">
                  {/* top-left corner accent */}
                  <div className="hl-node-corner-tl" />
                  <div className="hl-sprite">
                    <Sprite grid={n.sprite} scale={4} />
                  </div>
                  <div className="hl-label pixel">{n.label[lang]}</div>
                  {n.sub && <div className="hl-sub">{n.sub}</div>}
                  {n.id !== 'net' && (
                    <div className="hl-status-row">
                      <span className="hl-dot" /><span className="hl-dot-label pixel">ONLINE</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* info bar */}
          <div className="hl-bar">
            {hovNode ? (
              <div className="hl-bar-content">
                <div className="hl-bar-name pixel" style={{ color: hovNode.color }}>
                  ▸ [SYS_{hovNode.id.toUpperCase()}]: ACTIVE
                </div>
                {hovNode.sub && <div className="hl-bar-sub">{hovNode.sub}</div>}
                {hovNode.services[lang].length > 0 && (
                  <div className="hl-bar-chips">
                    {hovNode.services[lang].map(s => <span key={s} className="chip cyan">{s}</span>)}
                  </div>
                )}
              </div>
            ) : (
              <div className="hl-bar-hint pixel">{t.homelab_hover}</div>
            )}
            <div className="hl-legend pixel">
              <span className="hl-leg-item"><span className="hl-leg-line dashed" />WireGuard</span>
              <span className="hl-leg-item"><span className="hl-leg-line dotted" />HTTP/S</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======= EXPERIENCE ======= */
const XP_COLOR_VAR: Record<string, string> = {
  cyan: 'var(--cyan)', magenta: 'var(--magenta)', gold: 'var(--gold)', violet: 'var(--violet-2)',
};

export function PixelExperience({ t, lang }: { t: I18n; lang: Lang }) {
  return (
    <section id="xp">
      <div className="shell">
        <div className="section-banner gold pixel">{t.xp_banner}</div>
        <h2 className="section-title">{t.xp_title}</h2>
        <div className="xp-timeline">
          <div className="xp-line" />
          {PIXEL_DATA.experience.map((e, i) => {
            const c = XP_COLOR_VAR[e.color] ?? 'var(--gold)';
            return (
              <div key={i} className={`xp-item xp-item-${i % 2 === 0 ? 'l' : 'r'}`}
                   style={{ '--xp-c': c } as React.CSSProperties}>
                <div className="xp-marker">
                  <div><Sprite grid={SPRITE_STAR} scale={2} /></div>
                </div>
                <div className="xp-card">
                  <div className="xp-card-top">
                    <div className="xp-year">{e.year}</div>
                    <div className="xp-lvl pixel">XP {e.lvl}</div>
                  </div>
                  <div className="xp-role">{e.role[lang]}</div>
                  <div className="xp-org">@ {e.org}</div>
                  <p className="xp-desc">{e.desc[lang]}</p>
                  <div className="xp-tags">
                    {e.tags.map(tg => <span key={tg} className="chip">{tg}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ======= CERTS ======= */
const CERT_COLOR: Record<string, string> = {
  magenta: 'var(--magenta)', cyan: 'var(--cyan)', violet: 'var(--violet-2)', gold: 'var(--gold)',
};

export function PixelCerts({ t, lang }: { t: I18n; lang: Lang }) {
  return (
    <section id="certs">
      <div className="shell">
        <div className="section-banner magenta pixel">{t.certs_banner}</div>
        <h2 className="section-title">{t.certs_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.certs_sub}</p>
        <div className="certs-grid">
          {PIXEL_DATA.certs.map(c => {
            const col = CERT_COLOR[c.color] ?? 'var(--cyan)';
            return (
              <div key={c.id} className="cert-card" style={{ '--cert-c': col } as React.CSSProperties}>
                <div className="cert-badge pixel">{c.glyph}</div>
                <div className="cert-body">
                  <div className="cert-issuer pixel">{c.issuer}</div>
                  <div className="cert-title">{c.title[lang]}</div>
                  <div className="cert-meta pixel">
                    <span style={{ color: 'var(--gold)' }}>◷</span>{' '}
                    {c.date.replace('-', '/')}
                    {c.credId && <span className="cert-id"> · ID: {c.credId}</span>}
                  </div>
                  <div className="cert-skills">
                    {c.skills.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
                <div className="cert-unlocked pixel">★ UNLOCKED</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ======= COMMS ======= */
export function PixelComms({ t, lang }: { t: I18n; lang: Lang }) {
  return (
    <section id="comms">
      <div className="shell">
        <div className="section-banner gold pixel">{t.comms_banner}</div>
        <h2 className="section-title">{t.comms_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.comms_sub}</p>
        <div className="comms-channels-wrap">
          <div className="comms-channels">
            {PIXEL_DATA.socials.map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                 className="comms-channel hover-lift">
                <div className="comms-glyph">{s.glyph}</div>
                <div className="comms-info">
                  <div className="comms-label">{s.label}</div>
                  <div className="comms-handle">{s.handle}</div>
                </div>
                <div className="comms-arrow">▶</div>
              </a>
            ))}
          </div>
          <div className="comms-cta pixel-box cyan">
            <div className="comms-cta-head pixel">
              <span style={{ color: 'var(--cyan)' }}>◉</span>{' '}
              {lang === 'es' ? 'CANAL ABIERTO' : 'OPEN CHANNEL'}
            </div>
            <p className="comms-cta-body">
              {lang === 'es'
                ? 'Disponible para proyectos freelance, colaboraciones y cualquier cosa interesante.'
                : "Available for freelance work, collaborations, and anything interesting."}
            </p>
            <a href="mailto:danielfonov71@gmail.com" className="pixel-btn cyan mt-16">
              ✉ {lang === 'es' ? 'ESCRIBIR EMAIL' : 'SEND EMAIL'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======= FOOTER ======= */
const FOOTER_NAV = ['about', 'projects', 'stack', 'xp', 'comms'] as const;
const FOOTER_NAV_LABELS: Record<string, { en: string; es: string }> = {
  about:    { en: 'About',      es: 'Sobre mí'   },
  projects: { en: 'Projects',   es: 'Proyectos'  },
  stack:    { en: 'Stack',      es: 'Stack'       },
  xp:       { en: 'Experience', es: 'Experiencia' },
  comms:    { en: 'Contact',    es: 'Contacto'    },
};

interface FooterProps { t: I18n; lang: Lang; onNavigate?: (id: string) => void; }

export function PixelFooter({ t, lang, onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-scanline" />
      <div className="shell">
        <div className="footer-grid">

          {/* col 1 — brand */}
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: 12 }}>
              <span className="v">V</span>VODTINKER.DEV
            </div>
            <p className="footer-tagline">{t.footer_built}</p>
            <div className="footer-badge pixel">
              <span style={{ color: 'var(--gold)' }}>◆</span> v2.4.1 · GJN · ASIR
            </div>
          </div>

          {/* col 2 — nav */}
          <div className="footer-nav-col">
            <div className="footer-col-head pixel">NAVIGATE</div>
            {FOOTER_NAV.map(id => (
              <button key={id} type="button" className="footer-nav-link"
                onClick={() => onNavigate?.(id)}>
                ▸ {FOOTER_NAV_LABELS[id][lang]}
              </button>
            ))}
          </div>

          {/* col 3 — socials */}
          <div className="footer-socials-col">
            <div className="footer-col-head pixel">CHANNELS</div>
            {PIXEL_DATA.socials.map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                 className="footer-social-link">
                <span className="footer-social-glyph pixel">{s.glyph}</span>
                <span className="footer-social-handle">{s.handle}</span>
              </a>
            ))}
          </div>

        </div>

        {/* bottom bar */}
        <div className="footer-bottom">
          <div className="pixel" style={{ color: 'var(--ink-faint)', fontSize: 7 }}>
            {t.footer_year} DANIEL FONOV · ALL SYSTEMS NOMINAL
          </div>
          <div className="pixel" style={{ color: 'var(--cyan)', fontSize: 7 }}>
            {t.easter_hint}
          </div>
        </div>
      </div>
    </footer>
  );
}
