// Wrapper para todos los componentes que necesitan LanguageProvider
import { LanguageProvider } from '../contexts/LanguageContext';
import NavbarSimple from './NavbarSimple';
import HeroUnique from './HeroUnique';
import ProjectsUnique from './ProjectsUnique';
import ThinkingSection from './ThinkingSection';
import ContactUnique from './ContactUnique';
import FooterMinimal from './FooterMinimal';
import ChatWidget from './ChatWidget';
import BackToTop from './BackToTop';

export default function AppContent() {
  return (
    <LanguageProvider>
      <NavbarSimple />

      <main>
        <HeroUnique />
        <ProjectsUnique />
        <ThinkingSection />
        <ContactUnique />
      </main>

      <FooterMinimal />
      <ChatWidget />
      <BackToTop />
    </LanguageProvider>
  );
}
