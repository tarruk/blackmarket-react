# Sistema de Diseño - Black Market

Este directorio contiene el sistema de diseño centralizado de la aplicación.

## 📁 Archivos

- `theme.ts` - Constantes de diseño (colores, tipografía, espaciado, etc.)
- `globals.css` - Variables CSS de Tailwind

## 🎨 Cómo usar

### 1. En componentes React/TypeScript

Importa los valores que necesites:

```typescript
import theme from "@/styles/theme";
import { colors, typography, spacing } from "@/styles/theme";

// Usar en estilos inline (no recomendado, pero posible)
<div style={{ color: colors.primary.DEFAULT }}>

// Usar en lógica de componentes
const getButtonColor = (variant: string) => {
  return variant === "primary" ? colors.primary.DEFAULT : colors.secondary.DEFAULT;
};
```

### 2. Con Tailwind CSS (Recomendado)

Usa las clases de Tailwind que ya están mapeadas a tus colores:

```tsx
// En lugar de:
<button className="bg-black text-white hover:bg-gray-800">

// Puedes seguir usando las clases estándar de Tailwind:
<button className="bg-primary text-white hover:bg-primary-hover">
```

### 3. Clases personalizadas en Tailwind

Las variables CSS están disponibles en `globals.css`:

```tsx
// Usar variables CSS custom
<div className="bg-[var(--color-primary)]">
<div className="rounded-[var(--radius-card)]">
```

## 📦 Estructura del Theme

### Colores

```typescript
colors.primary.DEFAULT      // #000000 - Negro principal
colors.primary.hover        // #1f2937 - Negro hover
colors.secondary.DEFAULT    // #e5e7eb - Gris claro
colors.accent.DEFAULT       // #3b82f6 - Azul
colors.success              // #10b981 - Verde
colors.error                // #ef4444 - Rojo
colors.warning              // #f59e0b - Naranja
```

### Tipografía

```typescript
typography.fontSize.sm      // 0.875rem (14px)
typography.fontSize.base    // 1rem (16px)
typography.fontSize.lg      // 1.125rem (18px)
typography.fontWeight.bold  // 700
```

### Espaciado

```typescript
spacing.xs    // 0.25rem (4px)
spacing.sm    // 0.5rem (8px)
spacing.md    // 1rem (16px)
spacing.lg    // 1.5rem (24px)
spacing.xl    // 2rem (32px)
```

### Border Radius

```typescript
borderRadius.card     // 1rem - Para Cards
borderRadius.button   // 0.5rem - Para Buttons
borderRadius.input    // 0.5rem - Para Inputs
borderRadius.modal    // 1rem - Para Modals
```

### Shadows

```typescript
shadows.sm    // Sombra pequeña
shadows.md    // Sombra media
shadows.lg    // Sombra grande
shadows.xl    // Sombra extra grande
```

## 🎯 Mejores Prácticas

### ✅ Hacer

```typescript
// Usar Tailwind CSS para estilos
<button className="bg-black text-white hover:bg-gray-800">

// Importar theme para lógica
import { colors } from "@/styles/theme";
const isLight = backgroundColor === colors.background.primary;

// Usar CVA para variants de componentes
import { cva } from "class-variance-authority";
const buttonVariants = cva("base-classes", {
  variants: { /* ... */ }
});
```

### ❌ Evitar

```typescript
// NO usar valores hardcodeados
<button style={{ backgroundColor: "#000000" }}>

// NO usar inline styles para estilos que se repiten
<div style={{ padding: "16px", borderRadius: "8px" }}>
```

## 🔄 Actualizar el sistema

Para cambiar colores, fuentes o espaciados en toda la app:

1. Actualiza `styles/theme.ts`
2. Actualiza `app/globals.css` si usas variables CSS
3. Los cambios se reflejarán automáticamente en toda la app

## 📚 Ejemplos de uso

### Componente con theme

```typescript
import { cva } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg shadow-lg p-4",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        dark: "bg-black text-white",
      }
    }
  }
);
```

### Lógica condicional

```typescript
import { colors } from "@/styles/theme";

const getStatusColor = (status: string) => {
  switch(status) {
    case "success": return colors.success;
    case "error": return colors.error;
    case "warning": return colors.warning;
    default: return colors.text.primary;
  }
};
```

## 🎨 Paleta de Colores Visual

```
Primary:    ████ #000000 (Negro)
Secondary:  ████ #e5e7eb (Gris claro)
Accent:     ████ #3b82f6 (Azul)
Success:    ████ #10b981 (Verde)
Error:      ████ #ef4444 (Rojo)
Warning:    ████ #f59e0b (Naranja)
```

