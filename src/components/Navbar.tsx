import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { navLinks } from "../utils/navigationConfig";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
      return newIsDark;
    });
  };

  useEffect(() => {
    let isDarkMode = false;
    if (localStorage.theme === "dark") {
      isDarkMode = true;
    } else if (!("theme" in localStorage)) {
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Detect active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        // Usar getBoundingClientRect para compatibilidad con TypeScript
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - 100;
        const sectionHeight = rect.height;
        const sectionId = section.getAttribute('id') || '';
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsMenuOpen(false), 300); // Espera a que termine el scroll
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 bg-none dark:bg-none ${
        isScrolled
          ? "border-b border-border/40 backdrop-blur-xl shadow-sm"
          : "border-transparent py-2"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-30 bg-gradient-to-br from-[#1e3a8a] from-30% via-[#3b82f6] via-80% to-[#a5b4fc] bg-clip-text font-title text-3xl font-semibold tracking-tight text-transparent dark:from-[#d4dcf6] dark:via-[#6b4fa6] dark:to-[#d1c1f1]"
        >
          Daniel´s Web
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex space-x-1">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`relative mx-1 inline-block px-4 py-2 font-medium transition-colors duration: 300 
                    ${activeSection === link.href.substring(1) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
                    }`}
                >
                  {link.key}
                  {activeSection === link.href.substring(1) && (
                    <motion.span 
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={toggleTheme}
            className="group relative rounded-full bg-muted/30 p-2.5 text-muted-foreground overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/20 hover:text-primary dark:bg-muted/10"
            aria-label="Cambiar tema"
          >
            <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform rounded-full duration-300"></span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="group relative rounded-lg p-2 text-muted-foreground overflow-hidden transition-colors hover:text-primary dark:text-gray-300 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform rounded-lg duration-300"></span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "open" : "closed"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
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
            className="absolute left-0 w-full overflow-hidden backdrop-blur-xl border-b border-white/10 bg-white/40 dark:bg-gray-900/60 dark:border-gray-800/40 md:hidden"
          >
            <motion.ul 
              className="flex flex-col space-y-1 p-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.key}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -20, opacity: 0 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`block rounded-lg px-4 py-3 font-medium transition-all duration-200 hover:bg-primary/10 
                      ${activeSection === link.href.substring(1) 
                        ? "text-primary bg-primary/5" 
                        : "text-muted-foreground dark:text-gray-300"
                      }`}
                  >
                    {link.key}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
