import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { Terminal, Code, Zap, MessageSquare, X } from "lucide-react";
import { useEffect } from "react";

interface BotCommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BotCommandsModal = ({ isOpen, onClose }: BotCommandsModalProps) => {
  const { language } = useLanguage();
  const t = translations[language].botCommands;

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const commands = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      command: "!chat",
      description: t.commands.chat,
      example: language === 'es' ? "!chat Hola, ¿cómo estás?" : "!chat Hello, how are you?",
    },
    {
      icon: <Code className="w-5 h-5" />,
      command: "!wallet",
      description: t.commands.wallet,
      example: language === 'es' ? "!wallet" : "!wallet",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      command: "!image",
      description: t.commands.image,
      example: language === 'es' ? "!image Un gato astronauta en el espacio" : "!image An astronaut cat in space",
    },
    {
      icon: <Terminal className="w-5 h-5" />,
      command: "!help",
      description: t.commands.help,
      example: "!help",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-8 max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      {t.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {t.subtitle}
                    </p>
                  </div>

                  {/* Video Demo - Full Width on Top */}
                  <div className="mb-8">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-1 max-w-4xl mx-auto">
                      <video
                        src="/recording_20251026_14-13-19.mp4"
                        controls
                        className="w-full rounded-lg"
                        poster="/VODGPT.png"
                      >
                        {t.videoNotSupported}
                      </video>
                    </div>
                  </div>

                  {/* Commands List - Below Video */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      {t.commandsTitle}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {commands.map((cmd, index) => (
                        <motion.div
                          key={cmd.command}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="group relative"
                        >
                          <div className="relative bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                            {/* Icon and Command */}
                            <div className="flex items-start gap-3 mb-2">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                {cmd.icon}
                              </div>
                              <div className="flex-1">
                                <code className="text-base font-mono font-semibold text-primary">
                                  {cmd.command}
                                </code>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {cmd.description}
                                </p>
                              </div>
                            </div>

                            {/* Example */}
                            <div className="mt-2 p-2 bg-muted/50 rounded border border-border/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                {t.example}
                              </p>
                              <code className="text-xs font-mono text-foreground">
                                {cmd.example}
                              </code>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <a
                        href="https://discord.com/oauth2/authorize?client_id=780039002198638592&permissions=8&integration_type=0&scope=bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl hover:shadow-primary/20 w-full md:w-auto justify-center"
                      >
                        <MessageSquare className="w-5 h-5" />
                        {t.addBot}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BotCommandsModal;
