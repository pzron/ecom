export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description?: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stock?: number;
  has3D?: boolean;
  model3dType?: "box" | "sphere" | "torus" | "cylinder";
  vendorName?: string;
  tags?: string[];
}

export const products: Product[] = [
  {
    id: "e1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    category: "Electronics",
    categorySlug: "electronics",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 2847,
    image: "https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg",
    images: [
      "https://public.readdy.ai/ai/img_res/3ecb9515515c5565557f3118f811827c.jpg",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    ],
    colors: [
      { name: "Natural Titanium", value: "#C4B5A5" },
      { name: "Blue Titanium", value: "#4A5568" },
      { name: "White Titanium", value: "#E8E8E8" },
      { name: "Black Titanium", value: "#1A1A1A" }
    ],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    shortDescription: "Titanium design. A17 Pro chip. Action button. 48MP camera system.",
    description: "iPhone 15 Pro Max features a strong and lightweight titanium design with a 6.7-inch Super Retina XDR display. Powered by the A17 Pro chip, it delivers unprecedented performance for gaming and creative workflows.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 29 hours video playback",
      "Storage": "128GB - 1TB"
    },
    isNew: true,
    isFeatured: true,
    inStock: true,
    stock: 50,
    has3D: true,
    model3dType: "box",
    vendorName: "Apple Store",
    tags: ["smartphone", "5g", "titanium", "pro camera"]
  },
  {
    id: "e2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    category: "Electronics",
    categorySlug: "electronics",
    price: 1299,
    originalPrice: 1399,
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
    colors: [
      { name: "Titanium Black", value: "#1A1A1A" },
      { name: "Titanium Gray", value: "#6B7280" },
      { name: "Titanium Violet", value: "#8B5CF6" },
      { name: "Titanium Yellow", value: "#F59E0B" }
    ],
    sizes: ["256GB", "512GB", "1TB"],
    shortDescription: "AI-powered productivity with Galaxy AI and S Pen.",
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "box",
    vendorName: "Samsung Electronics"
  },
  {
    id: "e3",
    name: 'MacBook Pro 16" M3 Max',
    slug: "macbook-pro-16-m3-max",
    category: "Electronics",
    categorySlug: "electronics",
    price: 2499,
    originalPrice: 2799,
    rating: 4.9,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    colors: [
      { name: "Space Black", value: "#1A1A1A" },
      { name: "Silver", value: "#C0C0C0" }
    ],
    sizes: ["36GB RAM", "48GB RAM", "128GB RAM"],
    shortDescription: "Unprecedented power with M3 Max chip for creative pros.",
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "box",
    vendorName: "Apple Store"
  },
  {
    id: "e4",
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    category: "Electronics",
    categorySlug: "electronics",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    colors: [
      { name: "Black", value: "#1A1A1A" },
      { name: "Silver", value: "#C0C0C0" },
      { name: "Midnight Blue", value: "#1E3A5F" }
    ],
    shortDescription: "Industry-leading noise cancellation with crystal clear audio.",
    inStock: true,
    has3D: true,
    model3dType: "sphere",
    vendorName: "Sony Electronics"
  },
  {
    id: "e5",
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    category: "Electronics",
    categorySlug: "electronics",
    price: 799,
    originalPrice: 899,
    rating: 4.8,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    colors: [
      { name: "Titanium", value: "#B8B8B8" },
      { name: "Orange Alpine", value: "#F97316" },
      { name: "Blue Ocean", value: "#3B82F6" }
    ],
    sizes: ["49mm"],
    shortDescription: "The most rugged and capable Apple Watch ever.",
    isNew: true,
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "torus",
    vendorName: "Apple Store"
  },
  {
    id: "f1",
    name: "Premium Leather Jacket",
    slug: "premium-leather-jacket",
    category: "Fashion",
    categorySlug: "fashion",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    colors: [
      { name: "Black", value: "#1A1A1A" },
      { name: "Brown", value: "#8B4513" },
      { name: "Cognac", value: "#9A6324" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    shortDescription: "Handcrafted Italian leather with premium finishing.",
    isFeatured: true,
    inStock: true,
    vendorName: "LuxeWear"
  },
  {
    id: "f2",
    name: "Designer Sneakers",
    slug: "designer-sneakers",
    category: "Fashion",
    categorySlug: "fashion",
    price: 189,
    originalPrice: 249,
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#1A1A1A" },
      { name: "Red", value: "#EF4444" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    shortDescription: "Premium comfort meets street style.",
    isNew: true,
    inStock: true,
    has3D: true,
    model3dType: "box",
    vendorName: "StreetStyle Co"
  },
  {
    id: "h1",
    name: "Smart Home Hub Pro",
    slug: "smart-home-hub-pro",
    category: "Home",
    categorySlug: "home",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    colors: [
      { name: "Charcoal", value: "#374151" },
      { name: "Chalk", value: "#F5F5F4" }
    ],
    shortDescription: "Control your entire home with voice and AI assistance.",
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "cylinder",
    vendorName: "SmartLiving"
  },
  {
    id: "h2",
    name: "Artisan Coffee Maker",
    slug: "artisan-coffee-maker",
    category: "Home",
    categorySlug: "home",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    colors: [
      { name: "Brushed Steel", value: "#9CA3AF" },
      { name: "Empire Red", value: "#DC2626" },
      { name: "Matte Black", value: "#1F2937" }
    ],
    shortDescription: "Professional barista quality in your home.",
    isBestseller: true,
    inStock: true,
    has3D: true,
    model3dType: "cylinder",
    vendorName: "BrewMaster"
  },
  {
    id: "s1",
    name: "Pro Fitness Smartwatch",
    slug: "pro-fitness-smartwatch",
    category: "Sports",
    categorySlug: "sports",
    price: 299,
    originalPrice: 349,
    rating: 4.6,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    colors: [
      { name: "Black", value: "#1A1A1A" },
      { name: "Blue", value: "#3B82F6" },
      { name: "Green", value: "#10B981" }
    ],
    shortDescription: "Track every workout with precision GPS and heart rate monitoring.",
    isNew: true,
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "torus",
    vendorName: "FitTech"
  },
  {
    id: "b1",
    name: "Luxury Skincare Set",
    slug: "luxury-skincare-set",
    category: "Beauty",
    categorySlug: "beauty",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400",
    shortDescription: "Complete anti-aging routine with premium ingredients.",
    isBestseller: true,
    inStock: true,
    vendorName: "GlowLab"
  },
  {
    id: "g1",
    name: "PlayStation 5 Pro",
    slug: "playstation-5-pro",
    category: "Gaming",
    categorySlug: "gaming",
    price: 699,
    originalPrice: 799,
    rating: 4.9,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Midnight Black", value: "#1A1A1A" }
    ],
    shortDescription: "Next-gen gaming with 8K support and ray tracing.",
    isNew: true,
    isFeatured: true,
    inStock: true,
    has3D: true,
    model3dType: "box",
    vendorName: "GameZone"
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", slug: "electronics", icon: "Smartphone", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300" },
  { id: "fashion", name: "Fashion", slug: "fashion", icon: "Shirt", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300" },
  { id: "beauty", name: "Beauty", slug: "beauty", icon: "Sparkles", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300" },
  { id: "home", name: "Home & Living", slug: "home", icon: "Home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300" },
  { id: "sports", name: "Sports & Fitness", slug: "sports", icon: "Dumbbell", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300" },
  { id: "gaming", name: "Gaming", slug: "gaming", icon: "Gamepad2", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300" },
  { id: "jewelry", name: "Jewelry & Watches", slug: "jewelry", icon: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
  { id: "books", name: "Books & Media", slug: "books", icon: "Book", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300" },
];

export const featuredProducts = products.filter(p => p.isFeatured);
export const newArrivals = products.filter(p => p.isNew);
export const bestsellers = products.filter(p => p.isBestseller);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export { products as PRODUCTS };
