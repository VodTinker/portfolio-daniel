import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";

const NavbarUnique = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newIsDark;
    });
  };

  useEffect(() => {
    let isDarkMode = false;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      isDarkMode = true;
    } else if (!savedTheme) {
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Scroll detection - both direction and position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;

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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-lg shadow-neutral-900/5 dark:shadow-neutral-900/50 border-b border-neutral-200/50 dark:border-neutral-800/50"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between">
          {/* Logo - Minimal */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavLinkClick(e, "#home")}
            className="group flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-lg"
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.3), 0 10px 10px -5px rgba(99, 102, 241, 0.2)"
              }}
              transition={{ duration: 0.5 }}
            >
              DF
            </motion.div>
            <motion.span 
              className="hidden sm:block font-semibold text-lg text-neutral-900 dark:text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Daniel Fonov
            </motion.span>
          </motion.a>

          {/* Desktop Navigation - Centered */}
          <motion.div 
            className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className={`flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              isScrolled 
                ? "bg-white/90 dark:bg-neutral-800/90 border-neutral-200/80 dark:border-neutral-700/80 shadow-lg"
                : "bg-neutral-100/50 dark:bg-neutral-800/50 border-neutral-200/50 dark:border-neutral-700/50"
            }`}>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                      activeSection === link.href.substring(1)
                        ? "text-white dark:text-neutral-900"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </span>
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full shadow-md"
                      transition={{ 
                        type: "spring", 
                        stiffness: 350,
                        damping: 30
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Language selector */}
            <div className="relative">
              <motion.div 
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                  isScrolled
                    ? "bg-white/90 dark:bg-neutral-800/90 border-neutral-200/80 dark:border-neutral-700/80 shadow-md"
                    : "bg-neutral-100/80 dark:bg-neutral-800/80 border-neutral-200/50 dark:border-neutral-700/50"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "en"
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  whileHover={{ scale: language === "en" ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
                <motion.button
                  onClick={() => setLanguage("es")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "es"
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  whileHover={{ scale: language === "es" ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ES
                </motion.button>
              </motion.div>
            </div>
            
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? "bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/80 shadow-md"
                  : "bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50"
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA Button - Desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavLinkClick(e, "#contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium shadow-md"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 mt-4"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    activeSection === link.href.substring(1)
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavLinkClick(e, "#contact")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-base font-medium"
              >
                {t.nav.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarUnique;
