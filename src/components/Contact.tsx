import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiMessageCircle } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import classNames from 'classnames';
import { socialLinks, contactInfo } from "../utils/navigationConfig";
import { projects } from "../utils/projectsData";
import { animationProps } from "../utils/styleUtils";

type Message = { sender: "user" | "bot"; text: string };


const Contact = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, projectsContext: projects }),
      });

      const data = await res.json();
      const botMessage: Message = {
        sender: "bot",
        text: data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error while fetching the chat response:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section id="contact" className="relative px-4 py-32 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -top-20 right-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Título */}
        <motion.div
          {...animationProps.springIn(0)}
          className="mb-16 text-center"
        >
          <h2 className="relative z-30 mx-auto max-w-[616px] bg-gradient-to-br from-[#1e3a8a] from-30% via-[#3b82f6] via-80% to-[#a5b4fc] bg-clip-text font-title text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-transparent dark:from-[#d4dcf6] dark:via-[#5b4d91] dark:to-[#d9b8f7]">
            Contáctame
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary/50"></div>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            ¿Tienes un proyecto en mente o quieres charlar? ¡Envíame un mensaje y conversemos sobre ello!
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Información de contacto */}
          <motion.div
            {...animationProps.fadeInLeft(0.2)}
          >
            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 dark:border-purple-900/30 p-8 shadow-lg dark:shadow-purple-900/10 hover:shadow-xl transition-all duration-500">
              {/* Gradient effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-xl bg-primary/15 p-4 text-primary shadow-inner transition-all duration-500">
                    <FiMessageCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Información de Contacto
                  </h3>
                </div>

                <div className="space-y-8 mt-8">
                  <div className="flex items-start gap-4 group/item transition-all duration-300 hover:translate-x-2">
                    <div className="group relative rounded-full bg-primary/10 p-4 text-primary dark:text-[#a78bfa] shadow-sm group-hover/item:shadow-md group-hover/item:bg-primary/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-full"></div>
                      <span className="relative z-10"><FiMail size={20} /></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-card-foreground">Email</h4>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-muted-foreground transition-colors hover:text-primary dark:hover:text-white flex items-center gap-2 group/link"
                      >
                        {contactInfo.email}
                        <BiLinkExternal size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item transition-all duration-300 hover:translate-x-2">
                    <div className="group relative rounded-full bg-primary/10 p-4 text-primary dark:text-[#a78bfa] shadow-sm group-hover/item:shadow-md group-hover/item:bg-primary/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-full"></div>
                      <span className="relative z-10"><RiDiscordLine size={20} /></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-card-foreground">Discord</h4>
                      <a
                        href={socialLinks.discord}
                        className="text-muted-foreground transition-colors hover:text-primary dark:hover:text-white flex items-center gap-2 group/link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contactInfo.discordHandle}
                        <BiLinkExternal size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group/item transition-all duration-300 hover:translate-x-2">
                    <div className="group relative rounded-full bg-primary/10 p-4 text-primary dark:text-[#a78bfa] shadow-sm group-hover/item:shadow-md group-hover/item:bg-primary/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-full"></div>
                      <span className="relative z-10"><FiMapPin size={20} /></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-card-foreground">Ubicación</h4>
                      <p className="text-muted-foreground">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border/30">
                  <h4 className="mb-6 font-semibold text-lg text-card-foreground">
                    Conéctate conmigo
                  </h4>
                  <motion.div 
                    {...animationProps.staggerContainer(0.1, 0.2)}
                    className="flex space-x-5"
                  >
                    <motion.a
                      {...(animationProps.staggerItem() as any)}
                      href="https://github.com/VodTinker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social relative rounded-full bg-card/50 backdrop-blur-sm p-4 text-muted-foreground ring-1 ring-border/10 transition-all duration-300 hover:-translate-y-2 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:bg-white/5 dark:text-[#a78bfa] dark:hover:text-white overflow-hidden"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover/social:opacity-50 transition-opacity duration-500 z-0 rounded-full"></span>
                      <FiGithub size={20} className="relative transition-transform duration-300 group-hover/social:scale-110" />
                    </motion.a>
                    <motion.a
                      {...(animationProps.staggerItem() as any)}
                      href="https://www.linkedin.com/in/daniel-fonov-b897a82b3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social relative rounded-full bg-card/50 backdrop-blur-sm p-4 text-muted-foreground ring-1 ring-border/10 transition-all duration-300 hover:-translate-y-2 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:bg-white/5 dark:text-[#a78bfa] dark:hover:text-white overflow-hidden"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover/social:opacity-50 transition-opacity duration-500 z-0 rounded-full"></span>
                      <FiLinkedin size={20} className="relative transition-transform duration-300 group-hover/social:scale-110" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat personalizado */}
          <motion.div
            {...animationProps.fadeInRight(0.4)}
          >
            <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 dark:border-purple-900/30 p-0 shadow-lg dark:shadow-purple-900/10 hover:shadow-xl transition-all duration-500">
              {/* Header del chat con animación */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <FiMessageCircle size={22} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-card"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground">
                        Chat Bot Personal
                      </h3>
                      <p className="text-xs text-muted-foreground">Powered by GPT-4.1-mini</p>
                    </div>
                  </div>
                  <button 
                    className="p-2 rounded-full hover:bg-card/50 transition-colors"
                    onClick={() => setIsChatMinimized(!isChatMinimized)}
                    aria-label={isChatMinimized ? "Expandir chat" : "Minimizar chat"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transition-transform" style={{ transform: isChatMinimized ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 16 16">
                      <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <motion.div 
                className="flex flex-col"
                animate={{ height: isChatMinimized ? 0 : 'auto', opacity: isChatMinimized ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: isChatMinimized ? 'hidden' : 'visible' }}
              >
                {/* Contenido del chat */}
                <div className="p-6">
                  <div className="flex-1 mb-4 space-y-3 overflow-y-auto max-h-[350px] p-3 border border-border/60 rounded-xl bg-background/80">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-28 text-center p-6">
                        <FiMessageCircle size={28} className="text-muted-foreground/50 mb-3" />
                        <p className="text-sm text-muted-foreground">Envíame un mensaje para comenzar la conversación</p>
                      </div>
                    ) : (
                      messages.map(({ sender, text }, idx) => (
                        <motion.div
                          key={idx}
                          className={classNames(
                            "p-3 rounded-2xl max-w-[85%] shadow-sm",
                            sender === "user"
                              ? "bg-primary/90 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-auto rounded-tr-sm"
                              : "bg-card text-card-foreground rounded-tl-sm border border-border/50"
                          )}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {text}
                        </motion.div>
                      ))
                    )}
                    {loading && (
                      <motion.div
                      className="flex items-center space-x-2 p-3 rounded-2xl max-w-[60%] bg-card text-muted-foreground rounded-tl-sm border border-border/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex space-x-1">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.8,
                            delay: 0
                          }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary/80"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.8,
                            delay: 0.2
                          }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary/60"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.8,
                            delay: 0.4
                          }}
                        />
                      </div>
                    </motion.div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex-1 relative">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full rounded-xl border border-border/80 bg-background/80 backdrop-blur-sm px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Escribe tu mensaje..."
                        disabled={loading}
                      />
                      {loading && (
                        <div className="absolute right-3 top-3 text-muted-foreground/50 text-xs">
                          Pensando...
                        </div>
                      )}
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className={classNames(
                        "rounded-xl p-3 text-white shadow-lg transition-all duration-300",
                        (!input.trim() || loading) 
                          ? "bg-primary/50 cursor-not-allowed" 
                          : "bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:scale-105"
                      )}
                    >
                      <FiSend />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
