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

### 1. Product Visualization & Details
- **Product Detail Page** with multiple views:
  - Selected photo display (shows product image when viewing)
  - Video toggle option (Play button to switch between photo and video preview)
  - 3D view badge showing product name
  - Interactive camera controls and lighting
  - Product image gallery with thumbnail selection
- Color and size/capacity selectors with visual feedback
- Real-time quantity controls with stock availability

### 2. Review System
- **Write a Review button** - Only visible to users who have already purchased the product
- Full review functionality:
  - 1-5 star rating selection with hover effects
  - Text input for detailed reviews
  - Real-time review posting and display
  - Review list showing author, date, rating, and text
  - Rating distribution chart

### 3. Product Carousels
- **Similar Products Carousel** - Auto-scrolls every 5 seconds, manual navigation with arrow buttons
- **Top Products/Bestsellers Carousel** - Auto-scrolls with manual controls
- Responsive grid (2-4 columns based on screen size)
- Product badges (New, Bestseller)
- Hover animations and smooth transitions

### 4. Shopping Experience
- Product grid with category filtering
- Advanced search functionality with voice search
- Shopping cart with localStorage persistence
- Wishlist management
- Product comparison
- Checkout with payment options including Web3/Crypto

### 5. Admin Dashboard
- Command Center with real-time analytics
- Holographic-style KPI cards
- Revenue and visitor charts
- AI-powered insights panel
- User and product management

### 6. Vendor Portal
- Sales overview and analytics
- Product management
- Order tracking
- Inventory health monitoring
- Top products visualization

### 7. Affiliate Hub
- Gamified progression system (XP/Levels)
- Earnings tracking and analytics
- Campaign management
- Leaderboard integration
- Referral tracking

### 8. Authentication System
- Signup/Login pages with form validation
- Profile page with user information
- Persistent authentication state using Zustand
- Protected routes (accessible to authenticated users)

### 9. AI Chat Widget
- Product search integration
- Conversation state management
- Quick action buttons
- Voice input/output capabilities
- Typing indicators

## Design System
- **Theme**: Dark futuristic with holographic effects
- **Font**: Orbitron for headings, system fonts for body
- **Colors**: Purple (#A855F7) and Pink (#EC4899) gradients
- **Effects**: Glass-morphism, glow effects, animated gradients

## Routes
- `/` - Homepage with hero section and featured products
- `/products` - Product catalog with responsive grid (6-7 columns) and sidebar filters
- `/product/:id` - Product detail page with 3D view, video toggle, reviews, and carousels
- `/cart` - Shopping cart with quantity controls
- `/checkout` - Checkout page with payment options
- `/signup` - Authentication (signup/login)
- `/profile` - User profile page
- `/wishlist` - Saved products
- `/compare` - Product comparison
- `/deals` - Special offers and discounts
- `/admin/dashboard` - Admin command center
- `/vendor/dashboard` - Vendor portal
- `/affiliate/dashboard` - Affiliate hub

## State Management
- `useCartStore` - Shopping cart state with persistence (add/remove/update items)
- `useWishlistStore` - Wishlist state
- `useCompareStore` - Product comparison state
- `useAuthStore` - Authentication state with user profile
- Zustand with localStorage persistence for all stores

## Running the Project
The project runs with a single workflow command:
```bash
npm run dev
```
This starts both the Vite frontend dev server and the Express backend on port 5000.

## Recent Changes (Final Session)
- **Product Detail Page Enhancements**:
  - 3D view now displays selected product photo instead of 3D model
  - Added video toggle button with Play icon to switch between photo and video preview
  - Implemented full review system with rating stars (1-5)
  - "Write a Review" button only visible to users who purchased the product
  - Reviews display with author, date, star rating, and text
  - Real-time review posting with form validation
  - Auto-collapsing review form after submission

- **Product Carousels**:
  - Added Similar Products carousel (auto-scrolls every 5 seconds)
  - Added Top Products/Bestsellers carousel (auto-scrolls every 5 seconds)
  - Manual navigation with previous/next arrow buttons
  - Responsive grid layout (2-4 columns based on screen size)
  - Product badges for New and Bestseller items
  - Smooth animations and hover effects

- **Cart Store Creation**:
  - Created Zustand cart store with full functionality
  - localStorage persistence for cart items
  - Add/remove/update item quantities
  - Calculate total price

- **Previous Sessions**:
  - Implemented complete authentication system with Zustand store
  - Designed responsive products page with sidebar filters
  - Created 6-7 column responsive product grid
  - Built interactive cart with quantity controls
  - Designed footer with categories and support info
  - Added voice search capabilities

## Deployment Ready
The application is fully functional and production-ready with:
- ✅ Complete product catalog with 90+ items
- ✅ Product detail pages with reviews, video, and carousels
- ✅ Shopping cart and checkout
- ✅ Authentication system
- ✅ Admin/Vendor/Affiliate dashboards
- ✅ Responsive design for all screen sizes
- ✅ Dark futuristic theme with animations
- ✅ Local storage persistence for cart and authentication
