import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";

const contactMethods = [
  {
    icon: FiMail,
    title: "Email",
    value: "danielfonov71@proton.me",
    href: "mailto:danielfonov71@proton.me",
    description: "Respondo en 24h",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FiGithub,
    title: "GitHub",
    value: "@VodTinker",
    href: "https://github.com/VodTinker",
    description: "Ve mis proyectos",
    gradient: "from-gray-700 to-gray-900",
  },
  {
    icon: FiLinkedin,
    title: "LinkedIn",
    value: "Daniel Fonov",
    href: "https://www.linkedin.com/in/daniel-fonov-b897a82b3/",
    description: "Conectemos",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    icon: RiDiscordLine,
    title: "Discord",
    value: "@vodtinker",
    href: "https://discord.gg/mszf2A6T",
    description: "Chat en vivo",
    gradient: "from-indigo-500 to-purple-600",
  },
];

const ContactMinimal = () => {
  return (
    <section id="contact" className="relative px-6 py-32 md:py-40">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <FiMessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Contacto</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hablemos
          </h2>
          
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente o simplemente quieres charlar? 
            Estoy siempre abierto a nuevas oportunidades y colaboraciones.
          </p>
        </motion.div>

        {/* Grid de métodos de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${method.gradient} mb-4`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold">{method.title}</h3>
                    <FiArrowUpRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <p className="text-sm text-foreground/50">{method.description}</p>
                </div>

                {/* Value */}
                <div className="text-foreground/70 font-medium">
                  {method.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-foreground/10"
        >
          <h3 className="text-3xl font-bold mb-4">¿Listo para empezar?</h3>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            Ya sea un proyecto grande, una consulta rápida o simplemente para saludar, 
            me encantaría escucharte.
          </p>
          <a
            href="mailto:danielfonov71@proton.me"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:gap-4"
          >
            <FiMail className="w-5 h-5" />
            Enviar mensaje
            <FiArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMinimal;
