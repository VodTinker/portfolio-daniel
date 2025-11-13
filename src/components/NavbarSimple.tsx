import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";
// Usamos el PNG de `public` como logo en la barra. Si falla la carga, hacemos fallback al SVG.

const NavbarSimple = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Safe language context usage
  let language: "en" | "es" = "en";
  let setLanguage: (lang: "en" | "es") => void = () => {};
  let t = { nav: { home: "Home", about: "About", projects: "Projects", skills: "Skills", contact: "Contact", cta: "Let's talk" } };
  
  try {
    const langContext = useLanguage();
    language = langContext.language;
    setLanguage = langContext.setLanguage;
    t = langContext.t;
  } catch (error) {
    console.warn("LanguageContext not available, using defaults");
  }

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (typeof document !== "undefined") {
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
      } catch (e) {
        console.warn("Could not save theme preference");
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Initialize theme
    try {
      const savedTheme = localStorage.getItem("theme");
      let isDarkMode = false;
      
      if (savedTheme === "dark") {
        isDarkMode = true;
      } else if (!savedTheme && window.matchMedia) {
        isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      console.warn("Could not load theme preference");
    }

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - 120;
        const sectionHeight = rect.height;
        const sectionId = section.getAttribute("id") || "";

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsMenuOpen(false), 300);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-xl shadow-blue-500/10 border-b border-slate-200/80 dark:border-neutral-800/50"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavLinkClick(e, "#home")}
            className="group flex items-center gap-3"
          >
            <div className="relative">
              {/* Brillo de fondo sutil para que destaque */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/Vodtinker-removebg-preview.webp"
                alt="VodTinker"
                className="relative h-16 w-16 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                onError={(e) => {
                  // Si la imagen falla, mostrar el SVG del componente Logo como fallback
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = "/logo-option-1.svg";
                  }
                }}
              />
            </div>
            <span className="hidden sm:block font-semibold text-lg text-neutral-900 dark:text-white">
              Daniel Fonov
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className={`flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              isScrolled
                ? "bg-white/95 dark:bg-neutral-800/90 border-slate-200 dark:border-neutral-700/80 shadow-lg shadow-blue-500/10"
                : "bg-slate-50/80 dark:bg-neutral-800/50 border-slate-200/70 dark:border-neutral-700/50 shadow-md"
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="relative"
                >
                  <span
                    className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                      activeSection === link.href.substring(1)
                        ? "text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              isScrolled
                ? "bg-white/90 dark:bg-neutral-800/90 border-neutral-200/80 dark:border-neutral-700/80"
                : "bg-neutral-100/80 dark:bg-neutral-800/80 border-neutral-200/50 dark:border-neutral-700/50"
            }`}>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === "en"
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === "es"
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                ES
              </button>
            </div>
            
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? "bg-white/90 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80"
                  : "bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 mt-4">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarSimple;
