import { useEffect, useRef, useState } from "react";
import { SPRITE_COIN, SPRITE_HEART, Sprite } from "./Sprites";

/**
 * Piezas del navbar que dependen del scroll. Viven en componentes propios para
 * que el scroll solo re-renderice este HUD y no todo el árbol de AppContent.
 */

function getScrollPct() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  return total > 0 ? Math.round((window.scrollY / total) * 100) : 0;
}

export function useScrollPct() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPct(getScrollPct());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return pct;
}

/** Barra de progreso: escribe el ancho directamente en el DOM, sin estado. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (ref.current) ref.current.style.width = `${getScrollPct()}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} className="navbar-progress" aria-hidden="true" />;
}

export function NavStats({
  questScore,
  questCoins,
}: {
  questScore: number;
  questCoins: number;
}) {
  const pct = useScrollPct();
  const score = String(Math.floor(pct * 133.7) + questScore).padStart(6, "0");
  const coins = String(Math.floor(pct) + questCoins).padStart(2, "0");
  const lives = 1 + (pct > 33 ? 1 : 0) + (pct > 66 ? 1 : 0);

  return (
    <div className="nav-stats" aria-hidden="true">
      <div className="nav-stat-item score">
        <span className="stat-label">SCORE</span>
        <span className="stat-val">{score}</span>
      </div>
      <div className="nav-stat-item coins">
        <div className="stat-coin">
          <Sprite grid={SPRITE_COIN} scale={2} />
        </div>
        <span className="stat-val">x{coins}</span>
      </div>
      <div className="nav-stat-item lives">
        <span className="stat-label">LIVES</span>
        <div className="stat-hearts">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`stat-heart ${i < lives ? "full" : "empty"}`}
            >
              <Sprite grid={SPRITE_HEART} scale={2} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BackToTop({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  const pct = useScrollPct();
  return (
    <button
      type="button"
      className={`back-to-top-fab${pct > 8 ? " visible" : ""}`}
      onClick={onClick}
      aria-label={label}
      tabIndex={pct > 8 ? 0 : -1}
    >
      ▲
    </button>
  );
}
