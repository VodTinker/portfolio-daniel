import { useState } from 'react';
import { playToggle } from '../utils/audio';

export interface Tweaks {
  mode: 'midnight' | 'sunset' | 'terminal' | 'gameboy' | 'cyberneon';
  animations: number;
  scanlines: boolean;
  lang: 'en' | 'es';
  sfx: boolean;
}

const STORAGE_KEY = 'vod-tweaks';

function loadTweaks(defaults: Tweaks): Tweaks {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaults, ...JSON.parse(saved) };
  } catch {}
  return defaults;
}

export function useTweaks(defaults: Tweaks): [Tweaks, (key: keyof Tweaks, value: Tweaks[keyof Tweaks]) => void] {
  const [tweaks, setTweaks] = useState<Tweaks>(() => loadTweaks(defaults));
  const setTweak = (key: keyof Tweaks, value: Tweaks[keyof Tweaks]) => {
    setTweaks(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return [tweaks, setTweak];
}

interface TweaksProps {
  tweaks: Tweaks;
  setTweak: (key: keyof Tweaks, value: Tweaks[keyof Tweaks]) => void;
  questStep?: number;
}

export default function PixelTweaks({ tweaks, setTweak, questStep }: TweaksProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        className={`tweaks-toggle${questStep === 3 ? ' quest-highlight' : ''}`} 
        onClick={() => {
          setOpen(o => !o);
          if (tweaks.sfx) playToggle();
        }}
      >
        TWEAKS
      </button>
      <div className={`tweaks-panel${open ? ' open' : ''}`}>
        <div className="tweaks-header">
          <span>⚙ TWEAKS</span>
          <button 
            className="tweaks-close" 
            onClick={() => {
              setOpen(false);
              if (tweaks.sfx) playToggle();
            }}
          >
            ✕
          </button>
        </div>
        <div className="tweaks-body">
          <div className="tweak-section">Display</div>
          
          <div className="tweak-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span className="tweak-label">Color Scheme</span>
            <div className="tweak-radio-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', width: '100%' }}>
              {(['midnight', 'sunset', 'terminal', 'gameboy', 'cyberneon'] as const).map(v => (
                <button 
                  key={v} 
                  className={`tweak-radio${tweaks.mode === v ? ' selected' : ''}`} 
                  onClick={() => {
                    setTweak('mode', v);
                    if (tweaks.sfx) playToggle();
                  }}
                  style={{ textTransform: 'capitalize', fontSize: '10px', padding: '6px 4px' }}
                >
                  {v === 'cyberneon' ? 'cyberpunk' : v}
                </button>
              ))}
            </div>
          </div>

          <div className="tweak-row">
            <span className="tweak-label">Scanlines</span>
            <div className="tweak-toggle-wrap">
              <button
                className={`tweak-toggle-btn${tweaks.scanlines ? ' on' : ''}`}
                onClick={() => {
                  setTweak('scanlines', !tweaks.scanlines);
                  if (tweaks.sfx) playToggle();
                }}
              />
              <span className="tweak-label">{tweaks.scanlines ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div className="tweak-row">
            <span className="tweak-label">Chiptune SFX</span>
            <div className="tweak-toggle-wrap">
              <button
                className={`tweak-toggle-btn${tweaks.sfx ? ' on' : ''}`}
                onClick={() => {
                  const next = !tweaks.sfx;
                  setTweak('sfx', next);
                  if (next) setTimeout(playToggle, 50);
                }}
              />
              <span className="tweak-label">{tweaks.sfx ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div className="tweak-section">Motion</div>
          <div className="tweak-row">
            <span className="tweak-label">Anim speed: {tweaks.animations.toFixed(1)}x</span>
            <input
              type="range" className="tweak-slider"
              min={0} max={2} step={0.1}
              value={tweaks.animations}
              onChange={e => {
                setTweak('animations', parseFloat(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
