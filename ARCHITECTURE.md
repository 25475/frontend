# Arquitectura Limpia - Componentes Separados

Este documento describe la nueva arquitectura limpia implementada en el proyecto, donde cada página del usuario final ha sido separada en componentes específicos siguiendo el patrón establecido en `vizion`.

## Estructura de Componentes

### 🏠 Home Page (`/src/components/home/`)
- **Hero.tsx** - Sección principal con carousel de imágenes y llamadas a la acción
- **Services.tsx** - Grid de servicios disponibles (antes HelpSection)
- **Plans.tsx** - Muestra de planes destacados

### 📡 Planes Page (`/src/components/planes/`)
- **Hero.tsx** - Banner principal con imagen de fondo y CTA
- **CategoryTabs.tsx** - Pestañas de categorías (Hogar, Gamer, Empresarial)
- **PlansSection.tsx** - Grid de planes por categoría
- **CTA.tsx** - Llamada a la acción final

### 💻 Novatek Page (`/src/components/novatek/`)
- **Hero.tsx** - Banner principal con gradiente naranja y logo
- **CategoryList.tsx** - Lista de categorías (existente, reutilizado)
- **CategoryTabs.tsx** - Pestañas horizontales de categorías
- **ProductGrid.tsx** - Grid de productos (existente, reutilizado)

### ℹ️ Nosotros Page (`/src/components/nosotros/`)
- **Hero.tsx** - Sección principal con estadísticas e imagen
- **MissionVisionValues.tsx** - Tarjetas de misión, visión y valores
- **InternetFeatures.tsx** - Características del internet ultra rápido

### 🛒 Cart & Checkout (`/src/components/cart/` y `/src/components/checkout/`)
- **CartItems.tsx** - Lista de productos en el carrito
- **CartSummary.tsx** - Resumen y botones de acción del carrito
- **OrderSummary.tsx** - Resumen de la orden en checkout
- **CheckoutForm.tsx** - Formulario de datos del cliente
- **CheckoutSuccess.tsx** - Página de confirmación de compra

### 🔍 Vizion Page (`/src/components/vizion/`) - Ya existía
- **Hero.tsx** - Banner principal
- **Features.tsx** - Características del servicio
- **CategoryList.tsx** - Lista de categorías
- **ProductGrid.tsx** - Grid de productos
- **CTA.tsx** - Llamada a la acción

## Beneficios de la Nueva Arquitectura

### 1. **Separación de Responsabilidades**
Cada componente tiene una responsabilidad específica y clara, siguiendo el principio de responsabilidad única.

### 2. **Reutilización**
Los componentes pueden ser reutilizados en diferentes contextos y páginas según sea necesario.

### 3. **Mantenibilidad**
Es más fácil encontrar, modificar y mantener el código cuando está organizado por funcionalidad.

### 4. **Escalabilidad**
Nuevas funcionalidades pueden agregarse fácilmente creando nuevos componentes en las carpetas correspondientes.

### 5. **Consistencia**
Todas las páginas siguen el mismo patrón de organización que `vizion`.

## Estructura de Carpetas

```
src/
├── components/
│   ├── home/          # Componentes de la página principal
│   ├── planes/        # Componentes de la página de planes
│   ├── novatek/       # Componentes de la página de productos Novatek
│   ├── nosotros/      # Componentes de la página Sobre Nosotros
│   ├── cart/          # Componentes del carrito de compras
│   ├── checkout/      # Componentes del proceso de checkout
│   ├── vizion/        # Componentes de la página Vision (ya existía)
│   └── [shared]/      # Componentes compartidos (PlanCard, ProductCard, etc.)
├── pages/             # Páginas principales que importan los componentes
└── sections/          # Secciones legacy (en proceso de migración)
```

## Patrón de Importación

Cada página principal (`/pages/*`) ahora importa y usa los componentes específicos:

```typescript
// Ejemplo: pages/Home.tsx
import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Plans from '../components/home/Plans'

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Plans />
    </div>
  )
}
```

## Componentes Compartidos

Los componentes que se usan en múltiples páginas permanecen en el nivel raíz de `/components`:
- `PlanCard.tsx` - Usado en Home y Planes
- `ProductCard.tsx` - Usado en Novatek y Vision
- `CheckoutModal.tsx` - Usado en Cart
- `Header.tsx`, `Footer.tsx`, `Nav.tsx` - Componentes de layout

Esta arquitectura proporciona una base sólida para el crecimiento futuro del proyecto manteniendo el código organizado y fácil de mantener.