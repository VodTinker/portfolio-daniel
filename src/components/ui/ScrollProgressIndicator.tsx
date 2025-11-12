import { useEffect, useRef, useState } from "react";

const ScrollProgressIndicator = () => {
  const [scroll, setScroll] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const animateScroll = () => {
      // Interpolación suave (lerp)
      lastScroll.current += (scroll - lastScroll.current) * 0.18;
      setBarWidth(lastScroll.current);
      animationRef.current = requestAnimationFrame(animateScroll);
    };
    let setBarWidth = (val: number) => {};
    setBarWidth = (val) => setInternalWidth(val);
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, [scroll]);

  const [internalWidth, setInternalWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScroll(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const lightGradient = "linear-gradient(90deg, #3b82f6 0%, #a5b4fc 100%)";
  const darkGradient = "linear-gradient(90deg, #a78bfa 0%, #6366f1 100%)";

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: `${internalWidth}%`,
      height: "4px",
      background: isDark ? darkGradient : lightGradient,
      zIndex: 100,
      transition: "background 0.3s",
      borderRadius: "2px",
      pointerEvents: "none"
    }} />
  );
};

export default ScrollProgressIndicator;
