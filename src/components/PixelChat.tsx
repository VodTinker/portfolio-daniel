import { useState, useRef, useEffect } from 'react';
import type { Lang } from '../utils/pixelData';
import { Sprite, SPRITE_AVATAR_S, SPRITE_HEART } from './Sprites';

interface Message { role: 'user' | 'assistant'; content: string; id: number; }

const INITIAL: Record<Lang, string> = {
  en: "Hi! I'm Daniel's AI assistant. Ask me anything about his work.",
  es: '¡Hola! Soy el asistente IA de Daniel. Pregúntame lo que quieras sobre su trabajo.',
};

interface Props { lang: Lang; }

export default function PixelChat({ lang }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL[lang], id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgIdRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: INITIAL[lang], id: 0 }]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text, id: ++msgIdRef.current }]);
    setLoading(true);
    try {
      const res = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || '...', id: ++msgIdRef.current }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: lang === 'es' ? 'Error de transmisión. Reintenta.' : 'Transmission error. Try again.',
        id: ++msgIdRef.current,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="pixel-chat">
      <style>{`
        .pixel-chat { margin-top: 32px; }
        .pixel-chat-window {
          background: #0a1a0d;
          box-shadow: 0 0 0 4px var(--cyan), inset 0 0 0 4px var(--bg-0), 0 0 0 8px var(--bg-0), 8px 8px 0 0 rgba(0,0,0,0.7), 0 0 32px rgba(34,211,238,0.25);
          overflow: hidden;
        }
        .pixel-chat-bar {
          display: flex; align-items: center; gap: 12px;
          background: var(--bg-2); padding: 8px 12px; border-bottom: 2px solid var(--bg-0);
        }
        .pixel-chat-dots { display: flex; gap: 6px; }
        .pixel-chat-dots .dot { width: 10px; height: 10px; box-shadow: inset 0 0 0 2px rgba(0,0,0,0.4); }
        .pixel-chat-dots .dot:nth-child(1) { background: var(--red); }
        .pixel-chat-dots .dot:nth-child(2) { background: var(--gold); }
        .pixel-chat-dots .dot:nth-child(3) { background: var(--green); }
        .pixel-chat-label { font-size: 8px; color: var(--ink-dim); flex: 1; text-align: center; font-family: var(--pixel-font); letter-spacing: 0.06em; }
        .pixel-chat-status { display: flex; align-items: center; gap: 4px; font-size: 8px; color: var(--green); font-family: var(--pixel-font); }
        .pixel-chat-status-dot { width: 6px; height: 6px; background: var(--green); animation: blink 1.5s steps(2) infinite; }
        .pixel-chat-messages {
          padding: 12px 14px; max-height: 280px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin; scrollbar-color: var(--violet) var(--bg-0);
          position: relative;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
          background-size: 100% 4px, 6px 100%;
        }
        .pixel-chat-msg { display: flex; gap: 8px; align-items: flex-start; }
        .pixel-chat-msg.user { flex-direction: row-reverse; }
        .pixel-chat-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          background: var(--bg-2); box-shadow: inset 0 0 0 2px var(--cyan);
          display: grid; place-items: center;
          font-family: var(--pixel-font); font-size: 7px; color: var(--cyan); letter-spacing: 0;
          border-radius: 2px; overflow: hidden;
        }
        .pixel-chat-msg.user .pixel-chat-avatar { box-shadow: inset 0 0 0 2px var(--magenta); color: var(--magenta); }
        .pixel-chat-bubble {
          background: var(--bg-1); color: var(--ink);
          padding: 8px 12px; font-size: 12px; line-height: 1.6;
          font-family: var(--mono-font); max-width: calc(100% - 80px);
          box-shadow: inset 0 0 0 2px var(--cyan), 3px 3px 0 var(--bg-0);
        }
        .pixel-chat-msg.user .pixel-chat-bubble {
          background: var(--violet); color: var(--ink);
          box-shadow: inset 0 0 0 2px var(--violet-2), 3px 3px 0 var(--bg-0);
        }
        .pixel-chat-typing { display: flex; gap: 4px; align-items: center; padding: 6px 0; }
        .pixel-chat-typing span {
          width: 6px; height: 6px; background: var(--cyan);
          animation: blink 0.8s steps(2) infinite;
        }
        .pixel-chat-typing span:nth-child(2) { animation-delay: 0.27s; }
        .pixel-chat-typing span:nth-child(3) { animation-delay: 0.54s; }
        .pixel-chat-input-row {
          display: flex; border-top: 2px solid var(--bg-1);
        }
        .pixel-chat-input {
          flex: 1; background: var(--bg-0); border: 0; outline: none;
          color: var(--ink); font-family: var(--mono-font); font-size: 12px;
          padding: 10px 12px;
        }
        .pixel-chat-input::placeholder { color: var(--ink-dim); }
        .pixel-chat-send {
          background: var(--cyan); color: var(--bg-0); border: 0;
          padding: 10px 14px; cursor: pointer;
          font-family: var(--pixel-font); font-size: 9px; letter-spacing: 0.06em;
          box-shadow: inset 0 -3px 0 0 rgba(0,0,0,0.4), 0 3px 0 var(--bg-0);
          transition: transform 0.05s steps(2);
        }
        .pixel-chat-send:hover:not(:disabled) { filter: brightness(1.15); }
        .pixel-chat-send:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.4), 0 1px 0 var(--bg-0);
        }
        .pixel-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="pixel-chat-window">
        <div className="pixel-chat-bar">
          <div className="pixel-chat-dots">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
          <div className="pixel-chat-label">DANIEL AI · v2.4</div>
          <div className="pixel-chat-status">
            <span className="pixel-chat-status-dot" />
            ONLINE
          </div>
        </div>

        <div className="pixel-chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`pixel-chat-msg${msg.role === 'user' ? ' user' : ''}`}>
              <div className="pixel-chat-avatar">
                {msg.role === 'assistant' ? (
                  <Sprite grid={SPRITE_AVATAR_S} scale={1.5} />
                ) : (
                  <Sprite grid={SPRITE_HEART} scale={2} />
                )}
              </div>
              <div className="pixel-chat-bubble">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="pixel-chat-msg">
              <div className="pixel-chat-avatar">
                <Sprite grid={SPRITE_AVATAR_S} scale={1.5} />
              </div>
              <div className="pixel-chat-bubble">
                <div className="pixel-chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="pixel-chat-input-row">
          <input
            className="pixel-chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={lang === 'es' ? 'escribe tu mensaje...' : 'type your message...'}
            disabled={loading}
          />
          <button className="pixel-chat-send" onClick={send} disabled={loading || !input.trim()}>
            SEND ▶
          </button>
        </div>
      </div>
    </div>
  );
}
