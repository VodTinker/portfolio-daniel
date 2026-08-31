export interface Project {
  id: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  image: string;
  tags: string[];
  liveLink?: string;
  githubLink: string;
  category: string;
  status?: "live" | "maintenance";
  featured?: boolean;
}

export interface ProjectCategory {
  id: string;
  name: { en: string; es: string };
}

export const projects: Project[] = [
  {
    id: 0,
    title: {
      en: "Palsfy",
      es: "Palsfy",
    },
    description: {
      en: "Software company (Sweden & Spain) crafting high-efficiency web apps, intelligent automation tools, and AI-enabled productivity platforms.",
      es: "Compañía de software (Suecia y España) que desarrolla aplicaciones web de alta eficiencia, herramientas de automatización y plataformas con IA.",
    },
    image: "/palsfy.webp",
    tags: ["SaaS", "Web Apps", "TypeScript", "AI Tools", "Cloud"],
    liveLink: "https://palsfy.com",
    githubLink: "https://github.com/VodTinker",
    category: "saas",
    status: "live",
    featured: true,
  },
  {
    id: 1,
    title: {
      en: "Palstora",
      es: "Palstora",
    },
    description: {
      en: "Hierarchical home & storage inventory management system with AI-assisted item cataloging, printable QR container labels, recursive spaces, and real-time collaboration.",
      es: "Sistema jerárquico de gestión de inventario y almacenaje con catalogación asistida por visión IA, generación de etiquetas QR para cajas y colaboración en tiempo real.",
    },
    image: "/palstora.webp",
    tags: [
      "SaaS",
      "Bun 1.4",
      "Rust",
      "Next.js 16",
      "AI Vision",
      "PostgreSQL",
      "QR System",
    ],
    liveLink: "https://palstora.com",
    githubLink: "https://github.com/VodTinker",
    category: "saas",
    status: "live",
    featured: true,
  },
  {
    id: 2,
    title: {
      en: "Self-Hosted Mail & DNS Infrastructure",
      es: "Infraestructura Autoalojada de Correo y DNS",
    },
    description: {
      en: "Modern mail and DNS infrastructure powered by Ferrous DNS (Rust) with strict No-Log DoQ/DoH ad-blocking in 1ms, and Docker-Mailserver (SMTP/IMAP/TLS).",
      es: "Infraestructura moderna de correo y DNS impulsada por Ferrous DNS (Rust) con bloqueo de anuncios y rastreadores por DoQ/DoH en 1ms, y Docker-Mailserver (SMTP/IMAP/TLS).",
    },
    image: "/mail_dns_architecture.webp",
    tags: [
      "Docker-Mailserver",
      "Ferrous DNS",
      "Rust",
      "DoQ",
      "DNSSEC",
      "SMTP/IMAP",
      "Caddy",
    ],
    liveLink: "https://dns.vodtinker.dev",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "live",
    featured: true,
  },
  {
    id: 3,
    title: {
      en: "NetBird WireGuard Mesh VPN",
      es: "VPN Mesh NetBird WireGuard",
    },
    description: {
      en: "Self-hosted NetBird WireGuard mesh VPN with Rosenpass Post-Quantum Cryptography and Pocket-ID Passkey SSO, connecting homelab, cloud VPS, and mobile devices.",
      es: "VPN mesh NetBird basada en WireGuard con criptografía post-cuántica Rosenpass y SSO con Passkeys vía Pocket-ID, conectando homelab, VPS cloud y dispositivos móviles.",
    },
    image: "/netbird.webp",
    tags: ["NetBird", "WireGuard", "Rosenpass", "Post-Quantum", "Pocket-ID", "Passkeys", "Docker"],
    liveLink: "https://netbird.vodtinker.dev",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "live",
  },
  {
    id: 4,
    title: {
      en: "OpenXixón Open Data Platform",
      es: "Plataforma de Datos Abiertos OpenXixón",
    },
    description: {
      en: "High-performance open data platform & REST API exposing verified Gijón municipal datasets (air quality, public contracts, parking, demographics) built with Next.js and Temps.",
      es: "Plataforma de datos abiertos y API REST de alto rendimiento con datasets municipales de Gijón (calidad del aire, contratos públicos, parkings, demografía) construida con Next.js y Temps.",
    },
    image: "/openxixon.webp",
    tags: ["REST API", "Open Data", "Next.js", "TypeScript", "Temps", "Cloud"],
    liveLink: "https://openxixon.vodtinker.dev",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "live",
  },
  {
    id: 5,
    title: {
      en: "Discord Bot with OpenAI",
      es: "Discord Bot con OpenAI",
    },
    description: {
      en: "A Discord bot that uses the OpenAI API to provide interactive responses and maintain conversations with users.",
      es: "Un bot de Discord que utiliza la API de OpenAI para proporcionar respuestas interactivas y mantener conversaciones con los usuarios.",
    },
    image: "/VODGPT.webp",
    tags: ["Node.js", "OpenAI API", "Discord.js"],
    liveLink:
      "https://discord.com/oauth2/authorize?client_id=780039002198638592&permissions=8&integration_type=0&scope=bot",
    githubLink: "https://github.com/VodTinker",
    category: "ai",
    status: "live",
  },
  {
    id: 6,
    title: {
      en: "Web Scraping with Selenium",
      es: "Web Scraping con Selenium",
    },
    description: {
      en: "Automated web scraping scripts using Selenium to collect data from various websites.",
      es: "Scripts automatizados de web scraping utilizando Selenium para recopilar datos de diversos sitios web.",
    },
    image: "/Server_Specs.webp",
    tags: ["Python", "Selenium", "Web Scraping"],
    liveLink: "https://www.selenium.dev/",
    githubLink: "https://github.com/VodTinker",
    category: "automation",
    status: "live",
  },
  {
    id: 7,
    title: {
      en: "Virtual Classroom Notification Automation",
      es: "Automatización de notificaciones de aulas virtuales",
    },
    description: {
      en: "Automated system with n8n that monitors virtual classrooms for new notifications and sends instant alerts to Discord when updates are detected.",
      es: "Sistema automatizado con n8n que monitorea las aulas virtuales en busca de nuevas notificaciones y envía alertas instantáneas a Discord cuando se detectan actualizaciones.",
    },
    image: "/n8n.webp",
    tags: ["n8n", "Discord", "JavaScript", "Automation"],
    liveLink: "https://github.com/VodTinker",
    githubLink: "https://github.com/VodTinker",
    category: "automation",
    status: "live",
  },
];

export const projectCategories: ProjectCategory[] = [
  { id: "all", name: { en: "All", es: "Todos" } },
  { id: "saas", name: { en: "SaaS & Web", es: "SaaS y Web" } },
  {
    id: "infrastructure",
    name: { en: "Infrastructure", es: "Infraestructura" },
  },
  {
    id: "ai",
    name: { en: "Artificial Intelligence", es: "Inteligencia Artificial" },
  },
  { id: "automation", name: { en: "Automation", es: "Automatización" } },
];
