import { useState, useEffect } from 'react';

export default function NebulaEffect() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const dotColor = isDark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.045)';

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>

      {/* Keyframe animations para los orbes */}
      <style>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(3%, 2%) scale(1.05); }
          66%       { transform: translate(-2%, 3%) scale(0.97); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-4%, -3%) scale(1.06); }
          70%       { transform: translate(2%, -2%) scale(0.96); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(4%, -4%) scale(1.05); }
        }
        @keyframes orb-float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          45%       { transform: translate(-3%, 3%) scale(1.04); }
        }
        .orb-1 { animation: orb-float-1 22s ease-in-out infinite; }
        .orb-2 { animation: orb-float-2 27s ease-in-out infinite; }
        .orb-3 { animation: orb-float-3 19s ease-in-out infinite; }
        .orb-4 { animation: orb-float-4 24s ease-in-out infinite; }
      `}</style>

      {isDark ? (
        <>
          {/* Violeta — arriba izquierda */}
          <div className="orb-1" style={{
            position: 'absolute',
            top: '-15%', left: '-10%',
            width: '60vw', height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
            filter: 'blur(70px)',
          }} />

          {/* Fucsia — arriba derecha */}
          <div className="orb-4" style={{
            position: 'absolute',
            top: '5%', right: '5%',
            width: '38vw', height: '38vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)',
            filter: 'blur(65px)',
          }} />

          {/* Naranja — abajo derecha */}
          <div className="orb-2" style={{
            position: 'absolute',
            bottom: '-20%', right: '-15%',
            width: '58vw', height: '58vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.20) 0%, rgba(251,146,60,0.05) 50%, transparent 70%)',
            filter: 'blur(70px)',
          }} />

          {/* Cian — centro */}
          <div className="orb-3" style={{
            position: 'absolute',
            top: '42%', left: '28%',
            width: '38vw', height: '38vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.11) 0%, transparent 70%)',
            filter: 'blur(65px)',
          }} />
        </>
      ) : (
        <>
          {/* Light mode — mismas posiciones, opacidad reducida */}
          <div className="orb-1" style={{
            position: 'absolute',
            top: '-15%', left: '-10%',
            width: '60vw', height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)',
            filter: 'blur(55px)',
          }} />

          <div className="orb-4" style={{
            position: 'absolute',
            top: '5%', right: '5%',
            width: '38vw', height: '38vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.09) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }} />

          <div className="orb-2" style={{
            position: 'absolute',
            bottom: '-20%', right: '-15%',
            width: '58vw', height: '58vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,0.12) 0%, rgba(251,146,60,0.02) 50%, transparent 70%)',
            filter: 'blur(55px)',
          }} />

          <div className="orb-3" style={{
            position: 'absolute',
            top: '42%', left: '28%',
            width: '38vw', height: '38vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }} />
        </>
      )}

      {/* Dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      {/* Textura de grano para profundidad */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        opacity: isDark ? 0.045 : 0.025,
        mixBlendMode: 'overlay',
      }} />

      {/* Viñeta para profundidad */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark
          ? 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,15,0.80) 100%)'
          : 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(248,248,252,0.70) 100%)',
      }} />
    </div>
  );
}
