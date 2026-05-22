import { useEffect } from 'react';
import type { Tweaks } from './PixelTweaks';
import { playClick, playToggle } from '../utils/audio';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  tweaks: Tweaks;
  setTweak: (key: keyof Tweaks, value: Tweaks[keyof Tweaks]) => void;
  navigate: (id: string) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  tweaks,
  setTweak,
  navigate,
}: MobileMenuProps) {
  const lang = tweaks.lang;

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    if (tweaks.sfx) playClick();
    navigate(id);
    onClose();
  };

  const handleTweakChange = (key: keyof Tweaks, value: any) => {
    if (tweaks.sfx) playToggle();
    setTweak(key, value);
  };

  if (!isOpen) return null;

  const navItems = [
    { id: 'about',    label: lang === 'es' ? 'ENTRAR EN LORE' : 'ENTER LORE',     n: '01' },
    { id: 'projects', label: lang === 'es' ? 'REGISTRO QUESTS' : 'QUEST LOG',      n: '02' },
    { id: 'stack',    label: lang === 'es' ? 'ABRIR INVENTARIO' : 'INVENTORY',    n: '03' },
    { id: 'xp',       label: lang === 'es' ? 'CRONOLOGÍA' : 'TIMELINE',           n: '04' },
    { id: 'comms',    label: lang === 'es' ? 'ABRIR COMMS' : 'OPEN COMMS',        n: '05' },
  ];

  return (
    <div className="mobile-menu-overlay open" aria-modal="true" role="dialog">
      <div className="mobile-menu-scanline" />
      <div className="mobile-menu-flicker" />

      {/* Frame border */}
      <div className="pda-frame">
        {/* Header */}
        <div className="pda-header">
          <div className="pda-led-group">
            <span className="pda-led red pulse" />
            <span className="pda-led yellow" />
            <span className="pda-led green" />
          </div>
          <span className="pda-title pixel">VODTINKER.PDA</span>
          <button 
            type="button" 
            className="pda-close-btn" 
            onClick={() => {
              if (tweaks.sfx) playToggle();
              onClose();
            }}
            aria-label={lang === 'es' ? 'Cerrar menú' : 'Close menu'}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="pda-content">
          
          {/* Level Nav Section */}
          <div className="pda-section-title pixel">◆ SELECT LEVEL</div>
          <div className="pda-nav-list">
            {navItems.map(it => (
              <button
                key={it.id}
                type="button"
                className="pda-nav-item pixel"
                onClick={() => handleNavClick(it.id)}
              >
                <span className="pda-nav-num">{it.n}</span>
                <span className="pda-nav-text">{it.label}</span>
                <span className="pda-nav-arrow">▶</span>
              </button>
            ))}
          </div>

          {/* Arcade Tweaks Controls Section */}
          <div className="pda-section-title pixel" style={{ marginTop: '24px' }}>◆ SYSTEM SETTINGS</div>
          
          <div className="pda-tweaks-box">
            
            {/* Color Theme Selector */}
            <div className="pda-tweak-group">
              <span className="pda-tweak-label pixel">{lang === 'es' ? 'ESQUEMA DE COLOR' : 'COLOR PALETTE'}</span>
              <div className="pda-theme-grid">
                {(['midnight', 'sunset', 'terminal', 'gameboy', 'cyberneon'] as const).map(v => (
                  <button
                    key={v}
                    type="button"
                    className={`pda-theme-btn pixel ${v} ${tweaks.mode === v ? 'active' : ''}`}
                    onClick={() => handleTweakChange('mode', v)}
                  >
                    {v === 'cyberneon' ? 'cyberpunk' : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="pda-tweak-group">
              <span className="pda-tweak-label pixel">{lang === 'es' ? 'IDIOMA' : 'LANGUAGE'}</span>
              <div className="pda-lang-row">
                <button
                  type="button"
                  className={`pda-lang-btn pixel en ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => handleTweakChange('lang', 'en')}
                >
                  ENGLISH
                </button>
                <button
                  type="button"
                  className={`pda-lang-btn pixel es ${lang === 'es' ? 'active' : ''}`}
                  onClick={() => handleTweakChange('lang', 'es')}
                >
                  ESPAÑOL
                </button>
              </div>
            </div>

            {/* Scanline Toggle */}
            <div className="pda-toggle-row">
              <span className="pda-tweak-label pixel">{lang === 'es' ? 'EFECTO SCANLINES' : 'CRT SCANLINES'}</span>
              <button
                type="button"
                className={`pda-switch-btn pixel ${tweaks.scanlines ? 'on' : 'off'}`}
                onClick={() => handleTweakChange('scanlines', !tweaks.scanlines)}
              >
                {tweaks.scanlines ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="pda-toggle-row">
              <span className="pda-tweak-label pixel">{lang === 'es' ? 'SONIDO CHIPTUNE' : 'CHIPTUNE SFX'}</span>
              <button
                type="button"
                className={`pda-switch-btn pixel ${tweaks.sfx ? 'on' : 'off'}`}
                onClick={() => handleTweakChange('sfx', !tweaks.sfx)}
              >
                {tweaks.sfx ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Animation Speed Slider */}
            <div className="pda-tweak-group" style={{ borderBottom: 'none', paddingBottom: '0' }}>
              <div className="pda-slider-header">
                <span className="pda-tweak-label pixel">{lang === 'es' ? 'VELOCIDAD DE ANIMACIÓN' : 'MOTION SPEED'}</span>
                <span className="pda-slider-value pixel">{tweaks.animations.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                className="pda-slider"
                min={0}
                max={2}
                step={0.1}
                value={tweaks.animations}
                onChange={e => handleTweakChange('animations', parseFloat(e.target.value))}
              />
            </div>

          </div>

        </div>
        
        {/* Decorative D-Pad / Buttons inside PDA footer */}
        <div className="pda-footer">
          <div className="pda-dpad">
            <div className="pda-dpad-btn up" />
            <div className="pda-dpad-btn down" />
            <div className="pda-dpad-btn left" />
            <div className="pda-dpad-btn right" />
            <div className="pda-dpad-center" />
          </div>
          <div className="pda-buttons-decor">
            <span className="pda-btn-decor a">A</span>
            <span className="pda-btn-decor b">B</span>
          </div>
        </div>
      </div>
    </div>
  );
}
