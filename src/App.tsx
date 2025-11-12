import { useEffect, lazy, Suspense, memo } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import NavbarSimple from "./components/NavbarSimple";
import HeroUnique from "./components/HeroUnique";
import ScrollProgressIndicator from "./components/ui/ScrollProgressIndicator";
import NebulaEffect from "./components/ui/NebulaEffect";
import Loader from "./components/ui/Loader";
import ChatWidget from "./components/ChatWidget";
import BackToTop from "./components/BackToTop";

// Lazy loading de componentes no críticos (below the fold)
const AboutUnique = lazy(() => import("./components/AboutUnique"));
const ProjectsUnique = lazy(() => import("./components/ProjectsUnique"));
const SkillsUnique = lazy(() => import("./components/SkillsUnique"));
const ContactUnique = lazy(() => import("./components/ContactUnique"));
const FooterMinimal = lazy(() => import("./components/FooterMinimal"));

// Componente de carga memoizado para mejor rendimiento
const SectionLoader = memo(() => (
  <div className="flex items-center justify-center py-20">
    <Loader />
  </div>
));
SectionLoader.displayName = 'SectionLoader';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="relative min-h-screen bg-background text-foreground">
          <NebulaEffect />
          <div className="relative z-10">
            <ScrollProgressIndicator />
            <ErrorBoundary fallback={
              <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                    Error al cargar el menú de navegación
                  </div>
                </div>
              </nav>
            }>
              <NavbarSimple />
            </ErrorBoundary>
            <main>
              <HeroUnique />
              <Suspense fallback={<SectionLoader />}>
                <AboutUnique />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ProjectsUnique />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <SkillsUnique />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ContactUnique />
              </Suspense>
            </main>
            <Suspense fallback={<SectionLoader />}>
              <FooterMinimal />
            </Suspense>
            
            {/* Chat Widget flotante */}
            <ChatWidget />
            
            {/* Botón Back to Top */}
            <BackToTop />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;


