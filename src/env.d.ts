/// <reference path="../.astro/types.d.ts" />

declare module "@fontsource/*";

/** Fecha ISO del build, inyectada por Vite (astro.config.mjs → vite.define) */
declare const __BUILD_TIME__: string;
