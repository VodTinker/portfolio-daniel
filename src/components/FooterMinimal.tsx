import { useLanguage } from "../contexts/LanguageContext";
import { navLinks } from "../utils/navigationConfig";

const FooterMinimal = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-[#F5F1E8] px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">

          {/* Wordmark + tagline */}
          <div>
            <p className="font-serif text-xl sm:text-2xl font-light text-[#F5F1E8] mb-3">
              Daniel Fonov
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav columna 1 — secciones portfolio */}
          <div>
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
              {(t.footer as any).colNav ?? "Portfolio"}
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-[#F5F1E8] transition-colors"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </nav>
          </div>

          {/* Nav columna 2 — links externos */}
          <div>
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
              {(t.footer as any).colSocial ?? "Links"}
            </p>
            <nav className="flex flex-col gap-2.5">
              <a href="https://github.com/VodTinker" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[#F5F1E8] transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/daniel-fonov" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[#F5F1E8] transition-colors">LinkedIn</a>
              <a href="https://discord.com/users/vodtinker" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[#F5F1E8] transition-colors">Discord</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs font-mono text-white/30">
            © {year} {t.footer.copyright}
          </p>
          <p className="text-xs font-mono text-white/30">
            {t.footer.built}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
