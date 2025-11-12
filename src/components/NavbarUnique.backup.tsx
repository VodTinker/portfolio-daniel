// Backup del navbar original
// Este archivo contiene el NavbarUnique original por si necesitas volver atrás
// Para usarlo, simplemente importa NavbarUnique en App.tsx en lugar de NavbarSimple

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";

const NavbarUniqueBackup = () => {
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
      {/* ... rest of the code ... */}
    </motion.nav>
  );
};

export default NavbarUniqueBackup;
