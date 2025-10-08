# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for "Autohaus Küppers", a Citroën dealership in Goch, Germany. The project uses modern React with TypeScript, Tailwind CSS v4, and Framer Motion for animations. It's built with the App Router architecture and includes a custom design system based on Citroën's brand colors.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture & Key Patterns

### Component Structure
- **Layout Components**: Located in `src/components/layout/` (e.g., Header.tsx)
- **Section Components**: Located in `src/components/` (HeroSection.tsx, ServicesSection.tsx, TeamSection.tsx)
- **Page Structure**: Single-page application built in `src/app/page.tsx` that imports and assembles all sections

### Design System
The project uses a comprehensive design system defined in `tailwind.config.js`:

**Brand Colors (Citroën)**:
- Primary red: `#DC2626` (citroen-red)
- Primary red hover: `#B91C1C` (citroen-red-hover)
- Primary red light: `#FEF2F2` (citroen-red-light)
- Citroën blue: `#1E40AF`
- Citroën gray: `#6B7280`

**Typography**:
- Sans: Geist Sans (default)
- Mono: Geist Mono
- Display: Poppins (for headlines)

**Custom Animations**:
- `animate-fade-in` - Standard fade in with slide up
- `animate-slide-up` - Slide up animation
- `animate-float` - Floating effect
- `animate-car-drive` - Car driving animation
- `animate-pulse-slow` - Slow pulse effect

### Constants & Content Management
All content, colors, and configuration are centralized in `src/lib/constants.ts`:
- `COLORS` - Brand color definitions
- `CONTENT` - Dealership information (contact details, hours, branding)
- `CAR_IMAGES` - Array of car image paths
- `ANIMATIONS` - Animation class constants

### State Management & Interactivity
- Uses React hooks (useState, useEffect, useRef) for local component state
- Framer Motion for animations and gesture handling
- Client-side components marked with `'use client'` directive

### File Structure Conventions
```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Main homepage
│   └── globals.css     # Global styles and Tailwind imports
├── components/
│   ├── layout/         # Layout-specific components
│   └── [SectionName].tsx # Page section components
└── lib/
    └── constants.ts    # Centralized configuration
```

## Key Technical Details

- **Next.js 15** with App Router
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with PostCSS
- **Framer Motion** for complex animations
- **Radix UI** components for accessibility
- **Lucide React** for icons
- **Absolute imports** configured with `@/*` pointing to `src/*`

## Styling Conventions

- Use Tailwind utility classes primarily
- Custom CSS in `globals.css` for specific fixes (e.g., button layout fixes)
- Inline styles only for dynamic values (e.g., colors from constants)
- Motion components from Framer Motion for animations
- CSS custom properties for theme-aware colors

## Development Notes

- The project uses Turbopack for faster builds and development
- ESLint is configured with Next.js and TypeScript rules
- Images should be placed in `public/images/` directory
- The site is optimized for mobile-first responsive design
- All text content is in German (dealership language)