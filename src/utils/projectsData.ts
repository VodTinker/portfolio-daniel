
export interface Project {
  id: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  image: string;
  tags: string[];
  liveLink?: string;
  githubLink: string;
  category: string;
}

export interface ProjectCategory {
  id: string;
  name: { en: string; es: string };
}

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: "Discord Bot with OpenAI",
      es: "Discord Bot con OpenAI"
    },
    description: {
      en: "A Discord bot that uses the OpenAI API to provide interactive responses and maintain conversations with users.",
      es: "Un bot de Discord que utiliza la API de OpenAI para proporcionar respuestas interactivas y mantener conversaciones con los usuarios."
    },
    image: "/VODGPT.png", 
    tags: ["Node.js", "OpenAI API", "Discord.js"],
    liveLink: "https://discord.com/oauth2/authorize?client_id=780039002198638592&permissions=8&integration_type=0&scope=bot", 
    githubLink: "https://github.com/VodTinker",
    category: "ai",
  },
  {
    id: 2,
    title: {
      en: "Web Scraping with Selenium",
      es: "Web Scraping con Selenium"
    },
    description: {
      en: "Automated web scraping scripts using Selenium to collect data from various websites.",
      es: "Scripts automatizados de web scraping utilizando Selenium para recopilar datos de diversos sitios web."
    },
    image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Febvsckbzby4jzb5du8og.png", 
    tags: ["Python", "Selenium", "Web Scraping"],
    liveLink: "https://www.selenium.dev/", 
    githubLink: "https://github.com/VodTinker",
    category: "automation",
  },
  {
    id: 3,
    title: {
      en: "Virtual Classroom Notification Automation",
      es: "Automatización de notificaciones de aulas virtuales"
    },
    description: {
      en: "Automated system with n8n that monitors virtual classrooms for new notifications and sends instant alerts to Discord when updates are detected.",
      es: "Sistema automatizado con n8n que monitorea las aulas virtuales en busca de nuevas notificaciones y envía alertas instantáneas a Discord cuando se detectan actualizaciones."
    },
    image: "/n8n.png", 
    tags: ["n8n", "Discord", "JavaScript", "Automation"],
    githubLink: "https://github.com/VodTinker",
    category: "automation",
  },
];

export const projectCategories: ProjectCategory[] = [
  { id: "all", name: { en: "All", es: "Todos" } },
  { id: "ai", name: { en: "Artificial Intelligence", es: "Inteligencia Artificial" } },
  { id: "automation", name: { en: "Automation", es: "Automatización" } },
];
