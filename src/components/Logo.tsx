import React from 'react';

// Componente individual de logo
interface LogoProps {
  className?: string;
}

// ========== LOGOS ABSTRACTOS (SIN LETRAS) ==========

export const LogoAbstract1: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 8 L32 28 L20 24 L8 28 Z" fill="currentColor" opacity="0.3"/>
    <path d="M20 8 L32 28 L20 24 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 8 L8 28 L20 24 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
  </svg>
);

export const LogoAbstract2: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="20" cy="20" r="4" fill="currentColor"/>
    <path d="M12 12 L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const LogoAbstract3: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 6 L30 13 L30 27 L20 34 L10 27 L10 13 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M20 14 L25 17.5 L25 24.5 L20 28 L15 24.5 L15 17.5 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2"/>
    <circle cx="20" cy="20" r="3" fill="currentColor"/>
  </svg>
);

export const LogoAbstract4: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 6 L30 16 L20 26 L10 16 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15"/>
    <path d="M20 14 L30 16 L20 34 L10 16 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    <path d="M20 6 L20 34" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <path d="M10 16 L30 16" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

export const LogoAbstract5: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="4" fill="currentColor"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
    <circle cx="28" cy="12" r="2.5" fill="currentColor"/>
    <circle cx="12" cy="28" r="2.5" fill="currentColor"/>
    <circle cx="28" cy="28" r="2.5" fill="currentColor"/>
    <path d="M20 20 L12 12" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <path d="M20 20 L28 12" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <path d="M20 20 L12 28" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <path d="M20 20 L28 28" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
  </svg>
);

export const LogoAbstract6: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 8 L32 20 L20 32 L8 20 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    <path d="M20 8 L20 32" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 20 L32 20" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 14 L20 20 L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 26 L20 20 L28 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const LogoAbstract7: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 20 L28 20 Q32 20 32 24 Q32 28 28 28 L12 28 Q8 28 8 24 L8 16 Q8 12 12 12 L28 12 Q32 12 32 16 L32 20" 
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
  </svg>
);

export const LogoAbstract8: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M12 20 Q8 16 8 20 Q8 24 12 20 Q16 16 20 20 Q24 24 28 20 Q32 16 32 20 Q32 24 28 20 Q24 16 20 20 Q16 24 12 20" 
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="12" cy="20" r="2" fill="currentColor"/>
    <circle cx="28" cy="20" r="2" fill="currentColor"/>
  </svg>
);

export const LogoAbstract9: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 10 L30 16 L30 26 L20 32 L10 26 L10 16 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    <path d="M20 10 L20 20 M20 20 L30 26 M20 20 L10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 10 L30 16 L30 26 L20 32 L10 26 L10 16 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const LogoAbstract10: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M24 8 L12 22 L18 22 L16 32 L28 18 L22 18 L24 8 Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          fill="currentColor" opacity="0.2"/>
  </svg>
);

// ========== LOGOS CON LETRAS (ORIGINALES) ==========

export const Logo1: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M8 10 L8 30 L15 30 Q20 30 20 25 Q20 20 15 20 L8 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M22 10 L22 30 M22 10 L30 10 M22 18 L28 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

export const Logo2: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M12 8 L6 20 L12 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 8 L34 20 L28 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="20" y="26" fontFamily="monospace" fontSize="14" fontWeight="700" fill="currentColor" textAnchor="middle">DF</text>
  </svg>
);

export const Logo3: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 4 L32 12 L32 28 L20 36 L8 28 L8 12 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 14 L14 26 L18 26 Q20 26 20 22 Q20 18 18 18 L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M23 14 L23 26 M23 14 L27 14 M23 19 L26 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Logo4: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M10 10 L30 10 L30 20 L20 30 L10 20 Z" fill="url(#grad1)" opacity="0.2"/>
    <path d="M10 10 L30 10 L30 20 L20 30 L10 20 Z" stroke="url(#grad1)" strokeWidth="2" fill="none"/>
    <text x="20" y="24" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="currentColor" textAnchor="middle">DF</text>
  </svg>
);

export const Logo5: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M8 8 L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
    <path d="M32 8 L8 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
    <path d="M12 12 L12 28 L18 28 Q22 28 22 20 Q22 12 18 12 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
    <path d="M24 12 L24 28 M24 12 L30 12 M24 19 L28 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Logo6: React.FC<LogoProps> = ({ className = "" }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M8 15 L14 20 L8 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="17" y="18" width="2" height="4" fill="currentColor"/>
    <text x="22" y="24" fontFamily="monospace" fontSize="10" fontWeight="700" fill="currentColor">DF</text>
  </svg>
);

// Logo principal exportado por defecto
const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  // ===== CAMBIA ESTE NÚMERO PARA ELEGIR TU LOGO =====
  // Logos abstractos (sin letras): LogoAbstract1 - LogoAbstract10
  // Logos con letras: Logo1 - Logo6
  return <LogoAbstract9 className={className} />;
};

export default Logo;
