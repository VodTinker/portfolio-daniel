export const translations = {
  en: {
    nav: {
      work: "Work",
      thinking: "Thinking",
      contact: "Contact",
    },

    hero: {
      available: "Available · Gijón, Spain",
      headline1: "Between servers",
      headline2: "and code.",
      description:
        "ASIR student who bridges Linux infrastructure and modern web development. I build systems that work quietly so people can focus on what matters.",
      cta: "See my work",
      ctaAlt: "About me",
      ctaSecondary: "Contact",
    },

    work: {
      label: "002 / WORK",
      title: "Things I've",
      titleAccent: "built.",
      viewDemo: "View demo →",
      github: "GitHub →",
    },

    thinking: {
      label: "003 / THINKING",
      title: "How I think",
      titleAccent: "seriously.",
      prose: [
        "It started in 2022 with a simple question: how do the systems we use every day actually work? That question sent me down two parallel paths — ASIR (network and systems administration) and web development — and I've been walking both ever since.",
        "What I find compelling is the intersection. A web app without reliable infrastructure is fragile. A well-configured server with no useful software running on it is just a warm box. I'm interested in the whole stack: from a Linux kernel parameter that makes Nginx behave differently, to the React component that the user finally sees.",
        "Currently in my second year of ASIR, spending most of my time on automation pipelines, self-hosted services, and anything that involves making systems talk to each other intelligently.",
      ],
      since2022: "Since 2022",
      since2024: "Since 2024",
      clusters: {
        infra: "Infrastructure",
        dev: "Development",
        automation: "Automation",
      },
    },

    contact: {
      label: "004 / CONTACT",
      title: "Let's",
      titleAccent: "talk.",
      subtitle:
        "Open to collaborations, technical conversations, and new opportunities. Usually respond within 24 hours.",
      email: "Send an email",
      github: "GitHub",
      linkedin: "LinkedIn",
      discord: "Discord",
    },

    footer: {
      tagline: "Bridging systems and the web.",
      copyright: "Daniel Fonov.",
      built: "Built with Astro + React",
      colNav: "Portfolio",
      colSocial: "Links",
    },

    chat: {
      buttonOpen: "Ask the AI Assistant",
      buttonClose: "Close",
      title: "Daniel AI",
      status: "Online",
      initialMessage: "Hi! I'm Daniel's AI assistant. How can I help you today?",
      placeholder: "Type your message...",
      typing: "Typing...",
      errorMessage: "Sorry, something went wrong. Please try again.",
      sendLabel: "Send message",
    },

    botCommands: {
      title: "Discord Bot Commands",
      subtitle: "Explore the available commands",
      commandsTitle: "Available Commands",
      example: "Example:",
      addBot: "Add Bot to Discord",
      videoNotSupported: "Your browser does not support the video element.",
      commands: {
        chat: "Chat with the AI assistant",
        wallet: "Check your wallet balance",
        image: "Generate images with DALL-E",
        help: "Show all available commands",
      },
    },
  },

  es: {
    nav: {
      work: "Trabajo",
      thinking: "Pensamiento",
      contact: "Contacto",
    },

    hero: {
      available: "Disponible · Gijón, España",
      headline1: "Entre servidores",
      headline2: "y código.",
      description:
        "Estudiante ASIR que conecta infraestructura Linux con desarrollo web moderno. Construyo sistemas que funcionan en silencio para que las personas se centren en lo que importa.",
      cta: "Ver mi trabajo",
      ctaAlt: "Sobre mí",
      ctaSecondary: "Contactar",
    },

    work: {
      label: "002 / TRABAJO",
      title: "Cosas que he",
      titleAccent: "construido.",
      viewDemo: "Ver demo →",
      github: "GitHub →",
    },

    thinking: {
      label: "003 / PENSAMIENTO",
      title: "Cómo pienso",
      titleAccent: "en serio.",
      prose: [
        "Empezó en 2022 con una pregunta sencilla: ¿cómo funcionan realmente los sistemas que usamos cada día? Esa pregunta me llevó por dos caminos paralelos —ASIR y desarrollo web— y desde entonces camino por los dos.",
        "Lo que me resulta fascinante es la intersección. Una aplicación web sin infraestructura fiable es frágil. Un servidor bien configurado sin software útil ejecutándose es solo una caja caliente. Me interesa el stack completo: desde un parámetro del kernel Linux que hace que Nginx se comporte diferente, hasta el componente React que el usuario finalmente ve.",
        "Actualmente en segundo año de ASIR, dedicando la mayor parte del tiempo a pipelines de automatización, servicios auto-alojados y todo lo que implique hacer que los sistemas se comuniquen inteligentemente.",
      ],
      since2022: "Desde 2022",
      since2024: "Desde 2024",
      clusters: {
        infra: "Infraestructura",
        dev: "Desarrollo",
        automation: "Automatización",
      },
    },

    contact: {
      label: "004 / CONTACTO",
      title: "Hablamos.",
      titleAccent: "hablemos.",
      subtitle:
        "Abierto a colaboraciones, conversaciones técnicas y nuevas oportunidades. Normalmente respondo en 24 horas.",
      email: "Enviar un email",
      github: "GitHub",
      linkedin: "LinkedIn",
      discord: "Discord",
    },

    footer: {
      tagline: "Uniendo sistemas y la web.",
      copyright: "Daniel Fonov.",
      built: "Hecho con Astro + React",
      colNav: "Portfolio",
      colSocial: "Links",
    },

    chat: {
      buttonOpen: "Pregunta al Asistente IA",
      buttonClose: "Cerrar",
      title: "Daniel AI",
      status: "En línea",
      initialMessage: "¡Hola! Soy el asistente IA de Daniel. ¿En qué puedo ayudarte hoy?",
      placeholder: "Escribe tu mensaje...",
      typing: "Escribiendo...",
      errorMessage: "Lo siento, hubo un error. Inténtalo de nuevo.",
      sendLabel: "Enviar mensaje",
    },

    botCommands: {
      title: "Comandos del Bot de Discord",
      subtitle: "Explora los comandos disponibles",
      commandsTitle: "Comandos Disponibles",
      example: "Ejemplo:",
      addBot: "Agregar Bot a Discord",
      videoNotSupported: "Tu navegador no soporta el elemento de video.",
      commands: {
        chat: "Chatea con el asistente IA",
        wallet: "Consulta tu saldo de wallet",
        image: "Genera imágenes con DALL-E",
        help: "Muestra todos los comandos disponibles",
      },
    },
  },
};

export type Language = "en" | "es";
export type TranslationKey = keyof typeof translations.en;
