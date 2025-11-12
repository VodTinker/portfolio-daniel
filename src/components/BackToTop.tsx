import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  // Mostrar el botón cuando el usuario ha bajado 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="back-to-top-button"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>

          <style>{`
            .back-to-top-button {
              position: fixed;
              bottom: 24px;
              left: 50%;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: rgb(20, 20, 20);
              border: none;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
              cursor: pointer;
              transition: all 0.3s ease;
              overflow: hidden;
              z-index: 9998;
              transform: translateX(-50%);
            }

            .svgIcon {
              width: 12px;
              transition: transform 0.3s ease;
            }

            .svgIcon path {
              fill: white;
            }

            .back-to-top-button:hover {
              width: 140px;
              border-radius: 50px;
              background-color: rgb(181, 160, 255);
              align-items: center;
            }

            .back-to-top-button:hover .svgIcon {
              transform: translateY(-200%);
            }

            .back-to-top-button::before {
              position: absolute;
              bottom: -20px;
              content: "${language === 'es' ? 'Volver Arriba' : 'Back to Top'}";
              color: white;
              font-size: 0px;
              white-space: nowrap;
              transition: all 0.3s ease;
            }

            .back-to-top-button:hover::before {
              font-size: 13px;
              opacity: 1;
              bottom: unset;
            }

            @media (max-width: 640px) {
              .back-to-top-button {
                bottom: 20px;
                width: 45px;
                height: 45px;
              }

              .back-to-top-button:hover {
                width: 130px;
              }

              .back-to-top-button:hover::before {
                font-size: 12px;
              }
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
