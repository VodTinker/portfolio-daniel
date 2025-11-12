/**
 * @fileoverview Language Context Provider for internationalization
 * @module contexts/LanguageContext
 * 
 * This module provides a React Context for managing language preferences
 * across the application. It supports English and Spanish languages with
 * automatic detection and persistent storage.
 * 
 * @example
 * ```tsx
 * import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
 * 
 * function App() {
 *   return (
 *     <LanguageProvider>
 *       <MyComponent />
 *     </LanguageProvider>
 *   );
 * }
 * 
 * function MyComponent() {
 *   const { language, setLanguage, t } = useLanguage();
 *   return <h1>{t.hero.title}</h1>;
 * }
 * ```
 */

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { translations } from "../utils/translations";

/** Supported language codes */
type Language = "en" | "es";

/**
 * Language context value interface
 * @interface LanguageContextType
 */
interface LanguageContextType {
  /** Current active language */
  language: Language;
  /** Function to change the active language */
  setLanguage: (lang: Language) => void;
  /** Translations object for the current language */
  t: typeof translations.en;
}

/** Language Context */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language Provider Component
 * 
 * Provides language context to all children components. Handles:
 * - Language persistence in localStorage
 * - Browser language detection
 * - HTML lang attribute updates
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return "en";
    
    try {
      // Check localStorage first
      const savedLang = localStorage.getItem("language");
      if (savedLang === "en" || savedLang === "es") {
        return savedLang;
      }
      
      // Check browser language as fallback
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) {
        return "es";
      }
    } catch (error) {
      console.error("Error detecting language:", error);
    }
    
    return "en";
  });

  /**
   * Updates the language and persists to localStorage
   * @param {Language} lang - The language to set
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context
 * 
 * @throws {Error} If used outside of LanguageProvider
 * @returns {LanguageContextType} Language context value
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { language, setLanguage, t } = useLanguage();
 *   return (
 *     <div>
 *       <p>{t.hero.greeting}</p>
 *       <button onClick={() => setLanguage('es')}>
 *         Español
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
