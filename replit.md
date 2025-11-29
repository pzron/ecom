# NexCommerce - AI-Driven E-Commerce Platform

## Overview
NexCommerce is a comprehensive AI-driven e-commerce platform featuring advanced 3D product visualization, cinematic animations, Web3 integration, multi-vendor marketplace, affiliate system, and admin dashboard. Built with a dark futuristic theme featuring holographic effects, glass-morphism, and purple/pink gradients.

## Tech Stack
- **Frontend**: React 19 + Vite, TypeScript, Tailwind CSS, Framer Motion
- **3D Rendering**: Three.js, React Three Fiber, React Three Drei
- **State Management**: Zustand with localStorage persistence
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter

## Project Structure
```
client/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── 3d/           # 3D viewer and WebGL components
│   │   ├── ui/           # Shadcn/ui components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── vendor/       # Vendor portal pages
│   │   └── affiliate/    # Affiliate hub pages
│   ├── data/             # Static data and mock products
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   └── stores/           # Zustand state stores
server/
├── routes.ts             # API routes
├── storage.ts            # Database storage interface
└── index.ts              # Express server setup
shared/
└── schema.ts             # Drizzle ORM schema definitions
```

## Key Features

### 1. Product Visualization
- 3D product viewer with WebGL rendering
- WebGLErrorBoundary with graceful fallbacks for sandboxed environments
- Interactive camera controls and lighting
- Product image gallery with zoom

### 2. Shopping Experience
- Product grid with category filtering
- Advanced search functionality
- Shopping cart with localStorage persistence
- Wishlist management
- Product comparison

### 3. Admin Dashboard
- Command Center with real-time analytics
- Holographic-style KPI cards
- Revenue and visitor charts
- AI-powered insights panel
- User and product management

### 4. Vendor Portal
- Sales overview and analytics
- Product management
- Order tracking
- Inventory health monitoring
- Top products visualization

### 5. Affiliate Hub
- Gamified progression system (XP/Levels)
- Earnings tracking and analytics
- Campaign management
- Leaderboard integration
- Referral tracking

### 6. AI Chat Widget
- Product search integration
- Conversation state management
- Quick action buttons
- Typing indicators

## Design System
- **Theme**: Dark futuristic with holographic effects
- **Font**: Orbitron for headings, system fonts for body
- **Colors**: Purple (#A855F7) and Pink (#EC4899) gradients
- **Effects**: Glass-morphism, glow effects, animated gradients

## Routes
- `/` - Homepage with hero section and featured products
- `/products` - Product catalog with filters
- `/products/:slug` - Product detail page with 3D viewer
- `/cart` - Shopping cart
- `/wishlist` - Saved products
- `/compare` - Product comparison
- `/deals` - Special offers and discounts
- `/admin/dashboard` - Admin command center
- `/vendor/dashboard` - Vendor portal
- `/affiliate/dashboard` - Affiliate hub

## State Management
- `useCartStore` - Shopping cart state with persistence
- `useWishlistStore` - Wishlist state
- `useCompareStore` - Product comparison state

## Running the Project
The project runs with a single workflow command:
```bash
npm run dev
```
This starts both the Vite frontend dev server and the Express backend.

## Recent Changes
- Fixed PRODUCTS export alias in products.ts
- Fixed Framer Motion transition type errors in page-transition.tsx
- Implemented WebGLErrorBoundary for graceful 3D fallbacks
- Enhanced admin/vendor/affiliate dashboards with holographic UI
- Added AI chat widget with product search integration
