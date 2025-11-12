import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { animationProps, commonStyles } from "../../utils/styleUtils";

/**
 * Componente para títulos de sección con formato consistente
 */
export const SectionTitle = ({
  children,
  subtitle,
  badge,
  className = "",
}: {
  children: ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
}) => {
  return (
    <motion.div
      {...animationProps.fadeInUp()}
      className={`mb-16 text-center ${className}`}
    >
      {badge && (
        <span className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary">
          {badge}
        </span>
      )}
      <h2 className={commonStyles.gradientHeading}>
        {children}
      </h2>
      <div className={commonStyles.headingDivider}></div>
      {subtitle && (
        <p className={commonStyles.sectionSubtitle}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

/**
 * Componente para efectos decorativos de fondo
 */
export const DecorativeEffects = ({ positions }: { positions: { top?: string; bottom?: string; left?: string; right?: string }[] }) => {
  return (
    <div className={commonStyles.blurEffectsContainer}>
      {positions.map((pos, index) => (
        <div
          key={`blur-effect-${index}`}
          className={index % 2 === 0 ? commonStyles.primaryBlurEffect : commonStyles.accentBlurEffect}
          style={{
            position: "absolute",
            width: "24rem", // w-96
            height: "24rem", // h-96
            ...pos
          }}
        />
      ))}
    </div>
  );
};

/**
 * Componente para tarjetas de contenido
 */
export const ContentCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {  return (
    <div className={`${commonStyles.cardContainer} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0" />
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-transparent to-primary/20 rounded-tl-3xl transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
};

/**
 * Componente para botones de filtro
 */
export const FilterButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${commonStyles.filterButtonBase} ${
        isActive 
          ? commonStyles.activeFilterButton
          : commonStyles.inactiveFilterButton
      }`}
    >
      {children}
    </button>
  );
};
