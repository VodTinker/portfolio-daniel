import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";

export default function NavbarSimple() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage, t }      = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[hsl(var(--surface))] backdrop-blur-sm border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">

        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className={`font-serif text-lg transition-opacity hover:opacity-70 ${
            isScrolled ? "text-ink" : "text-[hsl(var(--bg))]"
          }`}
        >
          Daniel Fonov
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const label = t.nav[link.key as keyof typeof t.nav];
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? (isScrolled ? "text-ink font-medium" : "text-[hsl(var(--bg))] font-medium")
                    : (isScrolled ? "text-muted hover:text-ink" : "text-[hsl(var(--bg))]/60 hover:text-[hsl(var(--bg))]")
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Language toggle + mobile hamburger */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-mono">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "en"
                  ? (isScrolled ? "text-ink font-medium" : "text-[hsl(var(--bg))] font-medium")
                  : (isScrolled ? "text-muted hover:text-ink" : "text-[hsl(var(--bg))]/60 hover:text-[hsl(var(--bg))]")
              }`}
            >
              EN
            </button>
            <span className={isScrolled ? "text-faint" : "text-[hsl(var(--bg))]/40"}>·</span>
            <button
              onClick={() => setLanguage("es")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "es"
                  ? (isScrolled ? "text-ink font-medium" : "text-[hsl(var(--bg))] font-medium")
                  : (isScrolled ? "text-muted hover:text-ink" : "text-[hsl(var(--bg))]/60 hover:text-[hsl(var(--bg))]")
              }`}
            >
              ES
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px transition-transform origin-center ${isScrolled ? "bg-ink" : "bg-[hsl(var(--bg))]"} ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px transition-opacity ${isScrolled ? "bg-ink" : "bg-[hsl(var(--bg))]"} ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px transition-transform origin-center ${isScrolled ? "bg-ink" : "bg-[hsl(var(--bg))]"} ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[hsl(var(--surface))] border-t border-[hsl(var(--border))] px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block text-sm text-muted hover:text-ink transition-colors py-1"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
