import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TYPEWRITER_DELAY_MS = 18;
const TYPEWRITER_SNAP_THRESHOLD = 120;

interface Message {
  role: "user" | "assistant";
  content: string;
  id: number;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE } as Transition,
});

function TypewriterText({ text, isNew }: { text: string; isNew: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isNew || shouldReduceMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      i++;
      if (i >= text.length || i > TYPEWRITER_SNAP_THRESHOLD) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, i));
    }, TYPEWRITER_DELAY_MS);
    return () => clearInterval(interval);
  }, [text, shouldReduceMotion, isNew]);

  return (
    <span className="whitespace-pre-line">
      {displayed}
      {!done && <span className="chat-cursor">|</span>}
    </span>
  );
}

function ChatDots() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return (
      <div className="flex gap-2 items-center py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full bg-coral opacity-60 inline-block" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center h-10">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-coral block flex-shrink-0"
          animate={{ y: [0, -10, 0] }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 10,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.12,
            duration: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroUnique() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chat.initialMessage, id: 0 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latestAssistantId, setLatestAssistantId] = useState<number | null>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(0);

  // Actualizar mensaje inicial cuando cambie el idioma
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t.chat.initialMessage, id: 0 }];
      }
      return prev;
    });
  }, [t.chat.initialMessage]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus input after assistant responds
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const text = inputValue;
    const userMsg: Message = { role: "user", content: text, id: ++messageIdRef.current };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.reply) {
        const newId = ++messageIdRef.current;
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, id: newId }]);
        setLatestAssistantId(newId);
      } else {
        throw new Error("No reply");
      }
    } catch {
      const errId = ++messageIdRef.current;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.chat.errorMessage, id: errId },
      ]);
      setLatestAssistantId(errId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-24 sm:pt-24 sm:pb-32 text-center relative overflow-hidden"
    >
      {/* Available badge */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted border border-[hsl(var(--border))] px-3 py-1.5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(114_30%_55%)] inline-block" />
          {t.hero.available}
        </span>
      </motion.div>

      {/* Headline — kioku scale */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-light leading-[1.04] tracking-tight text-ink mb-6 max-w-5xl"
      >
        {t.hero.headline1}
        <br />
        <em className="italic text-coral">{t.hero.headline2}</em>
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="text-base sm:text-lg text-muted leading-relaxed max-w-md mb-10"
      >
        {t.hero.description}
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-ink text-[hsl(var(--bg))] text-sm font-medium rounded-sm hover:opacity-85 transition-opacity"
        >
          {t.hero.cta} →
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[hsl(var(--border))] text-ink text-sm font-medium rounded-sm hover:border-[hsl(var(--muted))] transition-colors"
        >
          {(t.hero as any).ctaSecondary ?? "Contact"}
        </a>
      </motion.div>

      {/* Social icons row */}
      <motion.div {...fadeUp(0.35)} className="flex items-center gap-5 mb-16">
        <a
          href="https://github.com/VodTinker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/daniel-fonov"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://discord.com/users/vodtinker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        </a>
      </motion.div>

      {/* Chat funcional */}
      <motion.div
        {...fadeUp(0.45)}
        className="w-full max-w-2xl rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--online))]" aria-hidden="true" />
            <span className="text-sm font-medium text-ink">Daniel AI</span>
          </div>
          <span className="text-muted text-sm opacity-40" aria-hidden="true">✕</span>
        </div>

        {/* Messages */}
        <div className="px-4 pt-4 pb-2 max-h-[350px] overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "assistant" && (
                <div
                  aria-hidden="true"
                  className="w-7 h-7 rounded-full border border-[hsl(var(--coral)/0.25)] flex-shrink-0 flex items-center justify-center"
                  style={{ background: "hsl(var(--coral) / 0.1)" }}
                >
                  <span className="text-[9px] font-mono text-coral">AI</span>
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-3 text-sm leading-relaxed text-left max-w-sm ${
                  msg.role === "user"
                    ? "bg-ink text-[hsl(var(--bg))]"
                    : "bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-ink"
                }`}
              >
                {msg.role === "assistant" ? (
                  <TypewriterText text={msg.content} isNew={msg.id === latestAssistantId} />
                ) : (
                  <span className="whitespace-pre-line">{msg.content}</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div
                aria-hidden="true"
                className="w-7 h-7 rounded-full border border-[hsl(var(--coral)/0.25)] flex-shrink-0 flex items-center justify-center"
                style={{ background: "hsl(var(--coral) / 0.1)" }}
              >
                <span className="text-[9px] font-mono text-coral">AI</span>
              </div>
              <div className="bg-[hsl(var(--bg))] border border-[hsl(var(--border))] rounded-lg px-4 py-1">
                <ChatDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--bg))] px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 text-sm text-ink bg-transparent outline-none placeholder:text-muted"
              placeholder={t.chat.placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="text-muted hover:text-ink transition-colors disabled:opacity-30 flex-shrink-0"
              aria-label={t.chat.sendLabel}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
