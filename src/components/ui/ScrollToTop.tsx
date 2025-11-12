import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 rounded-full bg-primary p-3 text-white shadow-lg transition-all hover:bg-primary/80 dark:bg-[#a78bfa] dark:text-black"
      style={{ boxShadow: "0 4px 16px rgba(59,130,246,0.15)" }}
    >
      <FiArrowUp size={22} />
    </button>
  ) : null;
};

export default ScrollToTop;
