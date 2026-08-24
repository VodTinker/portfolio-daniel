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
      en: "Modern mail and DNS infrastructure powered by Stalwart Mail Server (Rust). Features JMAP/IMAP/SMTP protocols, encrypted DNS (DoH/DoQ), and automated backups. Currently undergoing VPS migration.",
      es: "Infraestructura moderna de correo y DNS impulsada por Stalwart Mail Server (Rust). Incluye protocolos JMAP/IMAP/SMTP, DNS cifrado (DoH/DoQ) y backups automatizados. En proceso de migración de VPS.",
    },
    image: "/mail_dns_architecture.webp",
    tags: [
      "Stalwart Mail",
      "Rust",
      "JMAP",
      "DNS over HTTPS",
      "Tailscale",
      "Caddy",
      "Migration",
    ],
    liveLink: "https://github.com/VodTinker",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "maintenance",
    featured: true,
  },
  {
    id: 3,
    title: {
      en: "Netbird WireGuard Mesh VPN",
      es: "VPN Mesh Netbird WireGuard",
    },
    description: {
      en: "Self-hosted Netbird WireGuard mesh VPN connecting homelab, cloud VMs, and remote devices with zero relay hops. Under maintenance during VPS relocation.",
      es: "VPN mesh Netbird basada en WireGuard que conecta homelab, VMs cloud y dispositivos remotos sin relay. En mantenimiento durante el traslado de VPS.",
    },
    image: "/netbird.webp",
    tags: ["Netbird", "WireGuard", "Linux", "Docker", "Migration"],
    liveLink: "https://github.com/VodTinker",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "maintenance",
  },
  {
    id: 4,
    title: {
      en: "OpenXixón Open Data API",
      es: "API de Datos Abiertos OpenXixón",
    },
    description: {
      en: "REST API exposing verified Gijón municipal datasets (air quality, public contracts, traffic fines, demographics). In maintenance while migrating data pipelines.",
      es: "API REST con datasets municipales de Gijón verificados (calidad del aire, contratos públicos, multas, demografía). En mantenimiento por migración de pipelines.",
    },
    image: "/openxixon.webp",
    tags: ["REST API", "Open Data", "TypeScript", "Cloudflare", "Migration"],
    liveLink: "https://github.com/VodTinker",
    githubLink: "https://github.com/VodTinker",
    category: "infrastructure",
    status: "maintenance",
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
