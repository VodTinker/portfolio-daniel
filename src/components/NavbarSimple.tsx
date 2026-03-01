import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function NavbarSimple() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage, t }      = useLanguage();
  const { theme, toggleTheme }            = useTheme();

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
          ? "bg-[hsl(var(--bg))]/90 backdrop-blur-md border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="font-serif text-lg text-ink hover:opacity-70 transition-opacity"
        >
          Daniel Fonov<span className="font-mono text-xs text-muted ml-1.5 opacity-70">df</span>
        </a>

        {/* Desktop links — centrados */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const label = t.nav[link.key as keyof typeof t.nav];
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`text-sm transition-colors duration-200 ${
                  isActive ? "text-ink font-medium" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Right: lang toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="hidden md:flex items-center justify-center w-8 h-8 text-muted hover:text-ink transition-colors"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <div className="hidden md:flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "en" ? "text-ink font-medium" : "text-muted hover:text-ink"
              }`}
            >
              EN
            </button>
            <span className="text-faint">·</span>
            <button
              onClick={() => setLanguage("es")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "es" ? "text-ink font-medium" : "text-muted hover:text-ink"
              }`}
            >
              ES
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-[hsl(var(--bg))] text-sm font-medium rounded-lg hover:opacity-85 transition-opacity"
          >
            {t.nav.contact} →
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-ink transition-transform origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-transform origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
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
            className="md:hidden bg-[hsl(var(--bg))] border-t border-[hsl(var(--border))] px-6 py-4 space-y-3"
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
            <div className="flex gap-3 pt-2 border-t border-[hsl(var(--border))]">
              <button onClick={() => setLanguage("en")} className={`text-xs font-mono ${language === "en" ? "text-ink font-medium" : "text-muted"}`}>EN</button>
              <button onClick={() => setLanguage("es")} className={`text-xs font-mono ${language === "es" ? "text-ink font-medium" : "text-muted"}`}>ES</button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="text-muted hover:text-ink transition-colors ml-auto"
              >
                {theme === "dark" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
