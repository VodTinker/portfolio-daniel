import React from "react";

const DecorativeGrid = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-full opacity-10 dark:opacity-5"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2">
        <path
          d="M0 0L1920 0L1920 1080L0 1080L0 0Z"
          stroke="url(#grid-gradient)"
          strokeWidth="1.5"
          strokeDasharray="12 12"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`horizontal-${i}`}
            d={`M0 ${90 * (i + 1)} H1920`}
            stroke="url(#grid-gradient)"
            strokeWidth="1"
            strokeDasharray="12 12"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <path
            key={`vertical-${i}`}
            d={`M${80 * (i + 1)} 0 V1080`}
            stroke="url(#grid-gradient)"
            strokeWidth="1"
            strokeDasharray="12 12"
          />
        ))}
      </g>
      <defs>
        <linearGradient
          id="grid-gradient"
          x1="0"
          y1="0"
          x2="1920"
          y2="1080"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DecorativeGrid;
