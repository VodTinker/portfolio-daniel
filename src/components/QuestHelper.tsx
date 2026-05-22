import { useState, useEffect } from 'react';
import { Sprite, SPRITE_AVATAR_S, SPRITE_STAR } from './Sprites';
import type { Lang } from '../utils/pixelData';

interface Quest {
  title: { en: string; es: string };
  desc: { en: string; es: string };
  hint: { en: string; es: string };
}

const QUESTS: Quest[] = [
  {
    title: { en: 'Quest 1: Power Up', es: 'Misión 1: Encendido' },
    desc: {
      en: 'Power on or off the CRT monitor using the orange switch or red terminal dot.',
      es: 'Apaga o enciende la pantalla CRT usando el interruptor naranja o el punto rojo.',
    },
    hint: { en: 'Click the toggle button at the bottom-right of the CRT monitor.', es: 'Haz clic en el interruptor de encendido abajo a la derecha del monitor.' }
  },
  {
    title: { en: 'Quest 2: Phosphor Shift', es: 'Misión 2: Cambio de Fósforo' },
    desc: {
      en: 'Cycle the phosphor scan color of the terminal screen using the green button.',
      es: 'Cambia el color de fósforo de la terminal usando el botón verde.',
    },
    hint: { en: 'Click the green circle dot in the top-left bar of the CRT terminal.', es: 'Haz clic en el círculo verde en la barra superior izquierda de la terminal.' }
  },
  {
    title: { en: 'Quest 3: Glitch Wave', es: 'Misión 3: Interferencia' },
    desc: {
      en: 'Toggle screen static glitch interference with the yellow terminal button.',
      es: 'Activa o desactiva las interferencias usando el botón amarillo.',
    },
    hint: { en: 'Click the yellow circle dot in the top-left bar of the CRT terminal.', es: 'Haz clic en el círculo amarillo en la barra superior izquierda de la terminal.' }
  },
  {
    title: { en: 'Quest 4: Style Config', es: 'Misión 4: Estilo Visual' },
    desc: {
      en: 'Expand the Retro Tweaks panel on the right side and select a different theme.',
      es: 'Abre el panel de Tweaks en la derecha y cambia el tema global de colores.',
    },
    hint: { en: 'Click the vertical "TWEAKS" tab on the right edge, then choose a theme.', es: 'Haz clic en la pestaña vertical "TWEAKS" en la derecha y cambia el tema.' }
  },
  {
    title: { en: 'Quest 5: AI Companion', es: 'Misión 5: Asistente IA' },
    desc: {
      en: 'Click the "AI" floating button at the bottom-right to meet my helper chatbot.',
      es: 'Abre el Chatbot de IA haciendo clic en el botón flotante "AI" abajo a la derecha.',
    },
    hint: { en: 'Click the cyan "AI" button at the bottom-right corner.', es: 'Haz clic en el botón cian "AI" abajo a la derecha.' }
  }
];

interface QuestHelperProps {
  lang: Lang;
  step: number;
  onSkip: () => void;
}

export default function QuestHelper({ lang, step, onSkip }: QuestHelperProps) {
  const [minimized, setMinimized] = useState(false);
  const [alertText, setAlertText] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('vod-quest-dismissed') === '1';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('vod-quest-dismissed', '1');
    } catch {}
  };

  useEffect(() => {
    if (step > 0 && step <= QUESTS.length) {
      setAlertText(lang === 'es' ? '★ ¡MISIÓN COMPLETADA! +1000 PUNTOS' : '★ QUEST COMPLETED! +1000 PTS');
      const t = setTimeout(() => setAlertText(null), 3000);
      return () => clearTimeout(t);
    }
  }, [step, lang]);

  // Auto-dismiss completed HUD after 8 seconds so it doesn't clutter the screen
  useEffect(() => {
    if (step === QUESTS.length && !dismissed) {
      const t = setTimeout(() => {
        handleDismiss();
      }, 8000);
      return () => clearTimeout(t);
    }
  }, [step, dismissed]);

  if (dismissed) {
    return null;
  }

  if (step >= QUESTS.length) {
    return (
      <div className="quest-hud completed">
        <div className="quest-hud-header">
          <span className="quest-icon">🏆</span>
          <span className="quest-title pixel">{lang === 'es' ? '¡HÉROE RETRO!' : 'RETRO CHAMP!'}</span>
          <button 
            type="button" 
            className="quest-hud-close-btn"
            onClick={handleDismiss}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="quest-hud-body">
          <div className="quest-avatar">
            <Sprite grid={SPRITE_AVATAR_S} scale={2} animated />
          </div>
          <div className="quest-details">
            <p className="quest-desc pixel">
              {lang === 'es' 
                ? '★ ¡Misiones completadas! Eres un operador certificado. ¡Disfruta del portafolio!' 
                : '★ All quests completed! You are a certified operator. Enjoy the portfolio!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeQuest = QUESTS[step];

  return (
    <div className={`quest-hud${minimized ? ' minimized' : ''}`}>
      {alertText && (
        <div className="quest-alert-bubble pixel-font animated-alert">
          {alertText}
        </div>
      )}
      
      <div className="quest-hud-header" onClick={() => setMinimized(!minimized)}>
        <span className="quest-hud-indicator pulse" />
        <span className="quest-title pixel">
          {minimized ? (lang === 'es' ? '▶ QUEST ACTIVA' : '▶ ACTIVE QUEST') : activeQuest.title[lang]}
        </span>
        <div className="quest-hud-ctrls" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button" 
            className="quest-hud-toggle-btn"
            onClick={() => setMinimized(!minimized)}
            aria-label={minimized ? 'Expand' : 'Collapse'}
          >
            {minimized ? '+' : '-'}
          </button>
          <button 
            type="button" 
            className="quest-hud-close-btn"
            onClick={handleDismiss}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="quest-hud-body">
          <div className="quest-avatar">
            <Sprite grid={SPRITE_AVATAR_S} scale={2.5} animated />
          </div>
          <div className="quest-details">
            <p className="quest-desc">
              {activeQuest.desc[lang]}
            </p>
            <div className="quest-hint">
              <span className="hint-label">HINT:</span> {activeQuest.hint[lang]}
            </div>
            <div className="quest-actions mt-8">
              <button type="button" className="quest-skip-btn pixel-font" onClick={onSkip}>
                {lang === 'es' ? 'SALTAR' : 'SKIP'}
              </button>
              <div className="quest-rewards-preview">
                <Sprite grid={SPRITE_STAR} scale={1} />
                <span className="reward-text">+1000 PTS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
