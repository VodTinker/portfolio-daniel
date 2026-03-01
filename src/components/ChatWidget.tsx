import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ChatButton from "./ChatButton";
import ChatLoader from "./ChatLoader";
import { useLanguage } from "../contexts/LanguageContext";
import "./ChatWidget.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  id: number;
}

const TYPEWRITER_DELAY_MS = 18;
const TYPEWRITER_SNAP_THRESHOLD = 120;

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
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.chat.initialMessage,
      timestamp: new Date(),
      id: 0,
    },
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
        return [{
          role: "assistant",
          content: t.chat.initialMessage,
          timestamp: new Date(),
          id: 0,
        }];
      }
      return prev;
    });
  }, [t.chat.initialMessage]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      id: ++messageIdRef.current,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          projectsContext: null, // Aquí puedes pasar contexto de proyectos si lo necesitas
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const newId = ++messageIdRef.current;
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
          id: newId,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setLatestAssistantId(newId);
      } else {
        throw new Error("No reply received");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const newErrId = ++messageIdRef.current;
      const errorMessage: Message = {
        role: "assistant",
        content: "Lo siento, hubo un error. Inténtalo de nuevo más tarde.",
        timestamp: new Date(),
        id: newErrId,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setLatestAssistantId(newErrId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget-container">
      {/* Botón flotante */}
      <motion.div
        className="chat-widget-button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </motion.div>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget-window"
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 100% round 28px)", opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 4px)", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 100% round 28px)", opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.2 } : { clipPath: { type: "spring", stiffness: 300, damping: 28 }, opacity: { duration: 0.15 } }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <svg
                    viewBox="0 0 24 24"
                    height={20}
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="chat-title">{t.chat.title}</h3>
                  <p className="chat-status">
                    <span className="status-dot"></span>
                    {t.chat.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  className={`message ${msg.role}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : msg.role === "user"
                        ? { opacity: 0, x: 40, scale: 0.95 }
                        : { opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : msg.role === "user"
                        ? { opacity: 1, x: 0, scale: 1 }
                        : { opacity: 1 }
                  }
                  transition={
                    msg.role === "user" && !shouldReduceMotion
                      ? { type: "spring", stiffness: 400, damping: 22 }
                      : { duration: 0.12 }
                  }
                >
                  <div className="message-content">
                    {msg.role === "assistant"
                      ? <TypewriterText text={msg.content} isNew={msg.id === latestAssistantId} />
                      : <div className="whitespace-pre-line">{msg.content}</div>
                    }
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="message assistant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-content">
                    <ChatLoader />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder={t.chat.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="chat-send-button"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
