/**
 * Design System - Black Market
 * Sistema centralizado basado en los estilos REALMENTE usados en la app
 */

export const colors = {
  // Colores principales (basado en tu uso actual)
  primary: {
    DEFAULT: "#000000",      // bg-black
    hover: "#1f2937",        // hover:bg-gray-800
    light: "#374151",        // gray-700
  },
  
  secondary: {
    DEFAULT: "#e5e7eb",      // bg-gray-200
    hover: "#d1d5db",        // hover:bg-gray-300
    light: "#f9fafb",        // gray-50
  },
  
  // Color de acento (links)
  accent: {
    DEFAULT: "#3b82f6",      // blue-500
    hover: "#2563eb",        // blue-600
  },
  
  // Estados
  success: "#10b981",
  error: "#dc2626",          // text-red-600
  warning: "#f59e0b",
  
  // Texto (basado en tu uso)
  text: {
    primary: "#000000",      // text-black
    secondary: "#4b5563",    // gray-600
    muted: "#6b7280",        // text-gray-600
    white: "#ffffff",        // text-white
  },
  
  // Fondos
  background: {
    white: "#ffffff",        // bg-white
    gray50: "#f9fafb",       // bg-gray-50
    gray100: "#f3f4f6",      // bg-gray-100
    gray200: "#e5e7eb",      // bg-gray-200
  },
  
  // Bordes
  border: {
    DEFAULT: "#000000",      // border-black (usado en inputs)
    gray: "#e5e7eb",
  },
  
  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",  // bg-black/50
} as const;

export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  
  // Tamaños usados en tu app
  fontSize: {
    sm: "0.875rem",    // 14px - text-sm
    base: "1rem",      // 16px - text-base (labels, botones)
    lg: "1.125rem",    // 18px - text-lg
  },
  
  fontWeight: {
    normal: "400",
    semibold: "600",   // font-semibold (usado en links)
    bold: "700",       // font-bold (usado en botones)
  },
} as const;

export const spacing = {
  // Espaciados que realmente usas
  3: "0.75rem",   // 12px - px-3
  4: "1rem",      // 16px - p-4, pb-4
  6: "1.5rem",    // 24px - mb-6, py-6
  8: "2rem",      // 32px - p-8, mb-8
  12: "3rem",     // 48px - px-12
} as const;

export const components = {
  // Alturas de componentes
  height: {
    input: "2.5rem",       // 40px - h-10
    buttonSm: "2rem",      // 32px - h-8
    buttonMd: "2.5rem",    // 40px - h-10
    buttonLg: "3rem",      // 48px - h-12
  },
  
  // Anchos de componentes
  width: {
    cardMax: "360px",      // max-w-[360px]
    cardMin: "340px",      // min-w-[340px]
    modalSm: "278px",      // w-[278px]
  },
} as const;

export const borderRadius = {
  sm: "0.375rem",    // 6px - rounded-sm
  md: "0.375rem",    // 6px - rounded-md (inputs)
  lg: "0.5rem",      // 8px - rounded-lg (botones, cards)
  xl: "1rem",        // 16px - rounded-2xl (modals)
  
  // Aliases específicos para componentes
  card: "0.5rem",
  button: "0.5rem",
  input: "0.375rem",
  modal: "1rem",
} as const;

export const shadows = {
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",  // shadow-xl (usado en modals)
} as const;

export const zIndex = {
  card: 10,      // z-10
  modal: 50,     // z-50
} as const;

export const transitions = {
  colors: "colors 200ms",  // transition-colors
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
} as const;

// Exportación por defecto con todo el theme
const theme = {
  colors,
  typography,
  spacing,
  components,
  borderRadius,
  shadows,
  zIndex,
  transitions,
} as const;

export default theme;
