import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { Terminal, Code, Zap, MessageSquare } from "lucide-react";

const BotCommands = () => {
  const { language } = useLanguage();
  const t = translations[language].botCommands;

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
      example: "!wallet",
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
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-1">
              <video
                src="/recording_20251026_14-13-19.mp4"
                controls
                className="w-full rounded-xl"
                poster="/VODGPT.png"
              >
                {t.videoNotSupported}
              </video>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Commands List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              {t.commandsTitle}
            </h3>

            {commands.map((cmd, index) => (
              <motion.div
                key={cmd.command}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  {/* Icon and Command */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {cmd.icon}
                    </div>
                    <div className="flex-1">
                      <code className="text-lg font-mono font-semibold text-primary">
                        {cmd.command}
                      </code>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cmd.description}
                      </p>
                    </div>
                  </div>

                  {/* Example */}
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {t.example}
                    </p>
                    <code className="text-sm font-mono text-foreground">
                      {cmd.example}
                    </code>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6"
            >
              <a
                href="https://discord.com/oauth2/authorize?client_id=780039002198638592&permissions=8&integration_type=0&scope=bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl hover:shadow-primary/20"
              >
                <MessageSquare className="w-5 h-5" />
                {t.addBot}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BotCommands;
