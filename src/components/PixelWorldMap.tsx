import { useState, useRef, useCallback } from 'react';
import { Sprite, SPRITE_CLOUD, SPRITE_MUSHROOM, SPRITE_GEAR, SPRITE_HEART } from './Sprites';
import { PIXEL_DATA } from '../utils/pixelData';
import type { I18n, Lang } from '../utils/pixelData';

const ZONE_META: Record<string, { en: string; es: string; glyph: string }> = {
  about:    { en: 'LORE',      es: 'HISTORIA',  glyph: '◈' },
  projects: { en: 'QUESTS',    es: 'MISIONES',  glyph: '⚔' },
  stack:    { en: 'INVENTORY', es: 'INVENTARIO', glyph: '▦' },
  xp:       { en: 'TIMELINE',  es: 'CRONOLOGÍA', glyph: '★' },
  comms:    { en: 'COMMS',     es: 'COMMS',     glyph: '◉' },
};

interface WorldMapProps {
  t: I18n;
  lang: Lang;
  onNavigate: (id: string) => void;
}

export default function PixelWorldMap({ t, lang, onNavigate }: WorldMapProps) {
  const [hover, setHover] = useState<string | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [cursor, setCursor] = useState({ x: 50.0, y: 50.0 });
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const bgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!bgRef.current) return;
    const rect = bgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursor({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleZoneEnter = useCallback((z: typeof PIXEL_DATA.zones[number]) => {
    setHover(z.id);
    setPlayerPos({ x: z.x, y: z.y });
  }, []);

  const handleZoneLeave = useCallback(() => {
    setHover(null);
    setPlayerPos({ x: 50, y: 50 });
  }, []);

  const handleZoneClick = useCallback((id: string) => {
    setVisited(prev => new Set([...prev, id]));
    onNavigate(id);
  }, [onNavigate]);

  const hoveredMeta = hover ? ZONE_META[hover] : null;

  return (
    <section id="worldmap">
      <div className="shell">
        <div className="section-banner gold pixel">◆ MAP — VODNET ◆</div>
        <h2 className="section-title">{t.world_title}</h2>
        <p className="muted" style={{ marginBottom: 32 }}>{t.world_sub}</p>

        <div className="worldmap-frame">
          <div
            className="worldmap-bg"
            ref={bgRef}
            onMouseMove={handleMouseMove}
          >
            <div className="wm-grid" />

            {/* decorative tiles */}
            <div className="wm-tile" style={{ left: '8%',  top: '12%', '--c': 'var(--cyan)'    } as React.CSSProperties}><Sprite grid={SPRITE_CLOUD}    scale={3} /></div>
            <div className="wm-tile" style={{ left: '88%', top: '8%',  '--c': 'var(--cyan)'    } as React.CSSProperties}><Sprite grid={SPRITE_CLOUD}    scale={3} /></div>
            <div className="wm-tile" style={{ left: '6%',  top: '78%', '--c': 'var(--violet)'  } as React.CSSProperties}><Sprite grid={SPRITE_GEAR}     scale={2} /></div>
            <div className="wm-tile" style={{ left: '92%', top: '82%', '--c': 'var(--gold)'    } as React.CSSProperties}><Sprite grid={SPRITE_HEART}    scale={3} /></div>

            {/* path — orden sin cruces: LORE → QUESTS → INVENTORY → COMMS → TIMELINE */}
            <svg className="wm-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0,42 L 14,32 Q 32,12 50,22 Q 64,28 78,38 Q 73,56 66,70 Q 48,72 30,65 L 0,62"
                fill="none" stroke="var(--cyan)" strokeWidth="2"
                strokeDasharray="6,5" opacity="0.7"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* zones */}
            {PIXEL_DATA.zones.map(z => {
              const meta = ZONE_META[z.id];
              const isHovered = hover === z.id;
              const isVisited = visited.has(z.id);
              return (
                <button
                  key={z.id}
                  className={`wm-zone wm-zone-${z.id}${isHovered ? ' hover' : ''}${isVisited ? ' visited' : ''}`}
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  onClick={() => handleZoneClick(z.id)}
                  onMouseEnter={() => handleZoneEnter(z)}
                  onMouseLeave={handleZoneLeave}
                >
                  <div className="wm-marker">
                    <div className="wm-pin">
                      <span className="wm-glyph">{meta.glyph}</span>
                    </div>
                    <div className="wm-pulse" />
                    {isVisited && <div className="wm-visited-mark pixel">✓</div>}
                  </div>
                  <div className="wm-label pixel">{meta[lang]}</div>
                </button>
              );
            })}

            {/* player */}
            <div
              className="wm-player"
              style={{
                left: `${playerPos.x}%`,
                top: `${playerPos.y}%`,
                transition: 'left 0.4s steps(8), top 0.4s steps(8)',
              }}
            >
              <div className="wm-player-label pixel">{lang === 'es' ? 'TÚ' : 'YOU'}</div>
              <Sprite grid={SPRITE_MUSHROOM} scale={2} />
            </div>
          </div>

          <div className="worldmap-legend">
            <div className="wm-help pixel">
              {hoveredMeta
                ? <><span style={{ color: 'var(--gold)' }}>▶</span> {lang === 'es' ? 'NAVEGAR A:' : 'NAVIGATE TO:'} <span style={{ color: 'var(--cyan)' }}>{hoveredMeta[lang]}</span></>
                : lang === 'es' ? 'HAZ CLIC EN UNA ZONA' : 'CLICK ZONE TO NAVIGATE'}
            </div>
            <div className="wm-coords pixel">
              <span className="muted">XY:</span> {cursor.x.toFixed(2)} / {cursor.y.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
