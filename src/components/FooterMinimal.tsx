import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import { SiGithubcopilot, SiTypescript, SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

const FooterMinimal = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: FiGithub,
      href: "https://github.com/VodTinker",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/daniel-fonov-b897a82b3/",
    },
    {
      name: "Discord",
      icon: RiDiscordLine,
      href: "https://discord.gg/mszf2A6T",
    },
    {
      name: "Email",
      icon: FiMail,
      href: "mailto:danielfonov71@proton.me",
    },
  ];

  const quickLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative px-6 py-20 border-t border-foreground/10">
      <div className="container mx-auto max-w-7xl">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t.footer.brand.title}</h3>
            <p className="text-foreground/60">
              {t.footer.brand.role}
            </p>
            <p className="text-sm text-foreground/40">
              {t.footer.brand.description}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {t.footer.social}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/40">
            {/* Copyright */}
            <p>
              {t.footer.copyright}
            </p>

            {/* Made with tech stack */}
            <div className="flex items-center text-sm text-foreground/60">
              <span className="flex items-center gap-1 flex-wrap justify-center">
                Hecho con
                <span className="ml-1">Github Copilot</span>
                <SiGithubcopilot />
                <span className="ml-1">+</span>
                <span className="ml-1">React</span>
                <FaReact className="mx-1 text-cyan-400" size={16} title="React" />
                <span className="ml-1">+</span>
                <span className="ml-1">TypeScript</span>
                <SiTypescript className="mx-1 text-blue-600" size={16} title="TypeScript" />
                <span className="ml-1">+</span>
                <span className="ml-1">TailwindCSS</span>
                <SiTailwindcss className="mx-1 text-sky-400" size={16} title="TailwindCSS" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
