import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const { t } = useLanguage();

  return (
    <motion.button
      onClick={onClick}
      className="chat-space-button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <strong className="chat-button-label">
        {!isOpen ? (
          <>
            <svg
              viewBox="0 0 24 24"
              height={20}
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                fill="currentColor"
              />
            </svg>
            AI ASSISTANT
          </>
        ) : (
          "CLOSE"
        )}
      </strong>
      
      <div id="container-stars">
        <div id="stars" />
      </div>
      
      <div id="glow">
        <div className="circle" />
        <div className="circle" />
      </div>
      
      <style>{`
        .chat-space-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 13rem;
          overflow: hidden;
          height: 3rem;
          background-size: 300% 300%;
          cursor: pointer;
          backdrop-filter: blur(1rem);
          border-radius: 5rem;
          transition: 0.5s;
          animation: gradient_301 5s ease infinite;
          border: double 4px transparent;
          background-image: linear-gradient(#212121, #212121),
            linear-gradient(
              137.48deg,
              #ffdb3b 10%,
              #fe53bb 45%,
              #8f51ea 67%,
              #0044ff 87%
            );
          background-origin: border-box;
          background-clip: content-box, border-box;
          position: relative;
        }

        #container-stars {
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: 0.5s;
          backdrop-filter: blur(1rem);
          border-radius: 5rem;
        }

        .chat-button-label {
          z-index: 2;
          font-size: 12px;
          letter-spacing: 5px;
          color: #ffffff;
          text-shadow: 0 0 4px white;
          display: flex;
          align-items: center;
          font-weight: 600;
        }

        #glow {
          position: absolute;
          display: flex;
          width: 12rem;
        }

        .circle {
          width: 100%;
          height: 30px;
          filter: blur(2rem);
          animation: pulse_3011 4s infinite;
          z-index: -1;
        }

        .circle:nth-of-type(1) {
          background: rgba(254, 83, 186, 0.636);
        }

        .circle:nth-of-type(2) {
          background: rgba(142, 81, 234, 0.704);
        }

        .chat-space-button:hover #container-stars {
          z-index: 1;
          background-color: #212121;
        }

        .chat-space-button:hover {
          transform: scale(1.1);
        }

        .chat-space-button:active {
          border: double 4px #fe53bb;
          background-origin: border-box;
          background-clip: content-box, border-box;
          animation: none;
        }

        .chat-space-button:active .circle {
          background: #fe53bb;
        }

        #stars {
          position: relative;
          background: transparent;
          width: 200rem;
          height: 200rem;
        }

        #stars::after {
          content: "";
          position: absolute;
          top: -10rem;
          left: -100rem;
          width: 100%;
          height: 100%;
          animation: animStarRotate 90s linear infinite;
        }

        #stars::after {
          background-image: radial-gradient(#ffffff 1px, transparent 1%);
          background-size: 50px 50px;
        }

        #stars::before {
          content: "";
          position: absolute;
          top: 0;
          left: -50%;
          width: 170%;
          height: 500%;
          animation: animStar 60s linear infinite;
        }

        #stars::before {
          background-image: radial-gradient(#ffffff 1px, transparent 1%);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        @keyframes animStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-135rem);
          }
        }

        @keyframes animStarRotate {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0);
          }
        }

        @keyframes gradient_301 {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse_3011 {
          0% {
            transform: scale(0.75);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
          }
          100% {
            transform: scale(0.75);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .chat-space-button {
            width: 11rem;
            height: 2.75rem;
          }
          
          .chat-button-label {
            font-size: 10px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </motion.button>
  );
}
