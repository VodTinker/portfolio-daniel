import { Fragment, useEffect, useRef, useState } from "react";
import type { Lang } from "../utils/pixelData";
import { SPRITE_AVATAR_S, SPRITE_HEART, Sprite } from "./Sprites";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: number;
  error?: boolean;
}

const MAX_LEN = 500;
const HISTORY_SENT = 10;

const INITIAL: Record<Lang, string> = {
  en: "Hi! I'm DANIEL AI, Daniel's assistant. Ask me about his projects, his homelab or how to reach him.",
  es: "¡Hola! Soy DANIEL AI, el asistente de Daniel. Pregúntame por sus proyectos, su homelab o cómo contactarle.",
};

const SUGGESTIONS: Record<Lang, string[]> = {
  en: ["What projects has he built?", "What's his tech stack?", "Tell me about the homelab", "How can I contact him?"],
  es: ["¿Qué proyectos ha hecho?", "¿Qué stack usa?", "Háblame del homelab", "¿Cómo le contacto?"],
};

/** Texto plano → enlaces clicables y **negrita**, sin HTML inyectado */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const key = `${i}-${p.slice(0, 8)}`;
        if (/^https?:\/\//.test(p)) {
          return (
            <a key={key} href={p} target="_blank" rel="noopener noreferrer">
              {p.replace(/^https?:\/\//, "")}
            </a>
          );
        }
        if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={key}>{p.slice(2, -2)}</strong>;
        return <Fragment key={key}>{p}</Fragment>;
      })}
    </>
  );
}

/** Revela el texto por pasos (efecto diálogo de RPG) */
function Typewriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [n, setN] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? text.length : 0,
  );
  useEffect(() => {
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const step = Math.max(2, Math.ceil(text.length / 120));
    const t = setTimeout(() => setN((v) => Math.min(text.length, v + step)), 16);
    return () => clearTimeout(t);
  }, [n, text, onDone]);
  const done = n >= text.length;
  return (
    <>
      {done ? <RichText text={text} /> : text.slice(0, n)}
      {!done && <span className="pixel-chat-caret" aria-hidden="true">▌</span>}
    </>
  );
}

interface Props {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}

export default function PixelChat({ lang, open, onClose }: Props) {
  const greeting = (l: Lang): Message => ({ role: "assistant", content: INITIAL[l], id: 0 });
  const [messages, setMessages] = useState<Message[]>([greeting(lang)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingId, setTypingId] = useState<number | null>(null);
  const msgIdRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const es = lang === "es";

  // Cambiar de idioma solo reinicia si aún no ha empezado la conversación
  useEffect(() => {
    setMessages((prev) => (prev.length <= 1 ? [greeting(lang)] : prev));
  }, [lang]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 220);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const push = (m: Omit<Message, "id">) => {
    const id = ++msgIdRef.current;
    setMessages((prev) => [...prev, { ...m, id }]);
    return id;
  };

  const send = async (raw?: string, excludeId?: number) => {
    const text = (raw ?? input).trim().slice(0, MAX_LEN);
    if (!text || loading) return;
    setInput("");
    const history = messages
      .filter((m) => m.id !== 0 && !m.error && m.id !== excludeId)
      .slice(-HISTORY_SENT)
      .map(({ role, content }) => ({ role, content }));
    push({ role: "user", content: text });
    setLoading(true);
    try {
      const res = await fetch("/api/openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || String(res.status));
      setTypingId(push({ role: "assistant", content: data.reply }));
    } catch {
      push({
        role: "assistant",
        error: true,
        content: es
          ? "⚠ Se perdió la señal con el servidor. Inténtalo de nuevo en unos segundos."
          : "⚠ Lost the signal to the server. Please try again in a few seconds.",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([greeting(lang)]);
    setTypingId(null);
    inputRef.current?.focus();
  };

  const fresh = messages.length === 1;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const lastIsError = messages[messages.length - 1]?.error;

  return (
    <div
      className="pixel-chat"
      role="dialog"
      aria-modal="false"
      aria-label={es ? "Chat con DANIEL AI" : "Chat with DANIEL AI"}
    >
      <div className="pixel-chat-bar">
        <span className="pixel-chat-face" aria-hidden="true">
          <Sprite grid={SPRITE_AVATAR_S} scale={1.5} animated />
        </span>
        <div className="pixel-chat-title">
          <span className="pixel-chat-name">DANIEL AI</span>
          <span className="pixel-chat-status">
            <span className="pixel-chat-status-dot" />
            {loading ? (es ? "ESCRIBIENDO…" : "TYPING…") : "ONLINE"}
          </span>
        </div>
        <button
          type="button"
          className="pixel-chat-icon-btn"
          onClick={reset}
          disabled={fresh}
          title={es ? "Nueva conversación" : "New chat"}
          aria-label={es ? "Nueva conversación" : "New chat"}
        >
          ⟲
        </button>
        <button
          type="button"
          className="pixel-chat-icon-btn"
          onClick={onClose}
          title={es ? "Cerrar (Esc)" : "Close (Esc)"}
          aria-label={es ? "Cerrar chat" : "Close chat"}
        >
          ✕
        </button>
      </div>

      <div className="pixel-chat-messages" ref={logRef} role="log" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`pixel-chat-msg ${msg.role}${msg.error ? " error" : ""}`}
          >
            <div className="pixel-chat-avatar" aria-hidden="true">
              {msg.role === "assistant" ? (
                <Sprite grid={SPRITE_AVATAR_S} scale={1.5} />
              ) : (
                <Sprite grid={SPRITE_HEART} scale={2} />
              )}
            </div>
            <div className="pixel-chat-bubble">
              <span className="sr-only">{msg.role === "user" ? (es ? "Tú: " : "You: ") : "DANIEL AI: "}</span>
              {msg.id === typingId ? (
                <Typewriter text={msg.content} onDone={() => setTypingId(null)} />
              ) : (
                <RichText text={msg.content} />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="pixel-chat-msg assistant">
            <div className="pixel-chat-avatar" aria-hidden="true">
              <Sprite grid={SPRITE_AVATAR_S} scale={1.5} />
            </div>
            <div className="pixel-chat-bubble">
              <div className="pixel-chat-typing" aria-label={es ? "Escribiendo" : "Typing"}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}

        {fresh && (
          <div className="pixel-chat-suggest">
            <span className="pixel-chat-suggest-head">{es ? "▶ ELIGE UNA OPCIÓN" : "▶ PICK AN OPTION"}</span>
            {SUGGESTIONS[lang].map((q) => (
              <button key={q} type="button" className="pixel-chat-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {lastIsError && lastUser && !loading && (
          <button
            type="button"
            className="pixel-chat-chip retry"
            onClick={() => {
              setMessages((prev) => prev.filter((m) => m.id !== lastUser.id && !m.error));
              send(lastUser.content, lastUser.id);
            }}
          >
            ⟲ {es ? "Reintentar" : "Retry"}
          </button>
        )}
      </div>

      <form
        className="pixel-chat-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <span className="pixel-chat-prompt" aria-hidden="true">
          &gt;
        </span>
        <input
          ref={inputRef}
          className="pixel-chat-input"
          value={input}
          maxLength={MAX_LEN}
          onChange={(e) => setInput(e.target.value)}
          placeholder={es ? "Escribe tu pregunta…" : "Type your question…"}
          aria-label={es ? "Mensaje" : "Message"}
          disabled={loading}
        />
        {input.length > MAX_LEN - 100 && (
          <span className="pixel-chat-count">{MAX_LEN - input.length}</span>
        )}
        <button type="submit" className="pixel-chat-send" disabled={loading || !input.trim()}>
          {es ? "ENVIAR" : "SEND"} ▶
        </button>
      </form>
      <p className="pixel-chat-note">
        {es
          ? "IA experimental: puede equivocarse. Para algo importante, escríbele a Daniel."
          : "Experimental AI: it can be wrong. For anything important, email Daniel."}
      </p>
    </div>
  );
}
