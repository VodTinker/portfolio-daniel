// Wrapper para todos los componentes que necesitan LanguageProvider
import { LanguageProvider } from '../contexts/LanguageContext';
import NavbarSimple from './NavbarSimple';
import HeroUnique from './HeroUnique';
import AboutUnique from './AboutUnique';
import ProjectsUnique from './ProjectsUnique';
import SkillsUnique from './SkillsUnique';
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
        <AboutUnique />
        <ProjectsUnique />
        <SkillsUnique />
        <ContactUnique />
      </main>
      
      <FooterMinimal />
      <ChatWidget />
      <BackToTop />
    </LanguageProvider>
  );
}
