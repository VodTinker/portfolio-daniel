import { useLanguage } from "../contexts/LanguageContext";
import { navLinks } from "../utils/navigationConfig";

const FooterMinimal = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-[hsl(var(--bg))] px-6 sm:px-10 lg:px-16 py-14">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10 mb-10">
          {/* Wordmark + tagline */}
          <div>
            <p className="font-serif text-2xl font-light mb-2">Daniel Fonov</p>
            <p className="text-sm text-[hsl(var(--muted))] max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:items-end gap-2">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-xs font-mono text-[hsl(var(--muted))] hover:text-[hsl(var(--bg))] transition-colors"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs font-mono text-[hsl(var(--muted))]">
            © {year} {t.footer.copyright}
          </p>
          <p className="text-xs font-mono text-[hsl(var(--muted))]">
            {t.footer.built}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
