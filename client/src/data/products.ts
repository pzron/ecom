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
  badgeColor?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  iconName: string;
  gradient: string;
}

// 34+ Categories with Lucide icons and gradients
export const categories: Category[] = [
  { name: "Electronics", slug: "electronics", icon: "⚡", iconName: "Zap", gradient: "from-blue-600 to-cyan-500" },
  { name: "Fashion", slug: "fashion", icon: "👔", iconName: "Shirt", gradient: "from-pink-600 to-rose-500" },
  { name: "Beauty", slug: "beauty", icon: "💄", iconName: "Sparkles", gradient: "from-purple-600 to-pink-500" },
  { name: "Home & Living", slug: "home", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-500" },
  { name: "Sports & Fitness", slug: "sports", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-pink-500" },
  { name: "Gaming", slug: "gaming", icon: "🎮", iconName: "Gamepad2", gradient: "from-violet-600 to-purple-500" },
  { name: "Jewelry & Watches", slug: "jewelry", icon: "💎", iconName: "Ring", gradient: "from-yellow-600 to-amber-500" },
  { name: "Books & Media", slug: "books", icon: "📚", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-500" },
  { name: "Kids & Toys", slug: "kids", icon: "🧸", iconName: "Puzzle", gradient: "from-green-500 to-emerald-400" },
  { name: "Automotive", slug: "automotive", icon: "🚗", iconName: "Car", gradient: "from-gray-600 to-slate-500" },
  { name: "Food & Grocery", slug: "food", icon: "🛒", iconName: "ShoppingCart", gradient: "from-orange-600 to-red-500" },
  { name: "Health & Wellness", slug: "health", icon: "💊", iconName: "Pill", gradient: "from-green-600 to-teal-500" },
  { name: "Appliances", slug: "appliances", icon: "🔌", iconName: "Zap", gradient: "from-cyan-600 to-blue-500" },
  { name: "Furniture", slug: "furniture", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-700 to-orange-600" },
  { name: "Outdoor & Garden", slug: "outdoor", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-500" },
  { name: "Pet Supplies", slug: "pets", icon: "🐾", iconName: "PawPrint", gradient: "from-orange-600 to-pink-500" },
  { name: "Sports Equipment", slug: "sports_eq", icon: "⚽", iconName: "Trophy", gradient: "from-yellow-600 to-orange-500" },
  { name: "Musical Instruments", slug: "music", icon: "🎸", iconName: "Music", gradient: "from-purple-600 to-pink-500" },
  { name: "Art & Craft", slug: "art", icon: "🎨", iconName: "Palette", gradient: "from-rose-600 to-pink-500" },
  { name: "Tools & Hardware", slug: "tools", icon: "🔨", iconName: "Wrench", gradient: "from-gray-700 to-slate-600" },
  { name: "Office Supplies", slug: "office", icon: "📎", iconName: "Paperclip", gradient: "from-blue-600 to-indigo-500" },
  { name: "School Supplies", slug: "school", icon: "✏️", iconName: "PencilRuler", gradient: "from-yellow-600 to-amber-500" },
  { name: "Party & Events", slug: "party", icon: "🎉", iconName: "Sparkles", gradient: "from-pink-600 to-purple-500" },
  { name: "Camping & Hiking", slug: "camping", icon: "⛺", iconName: "Tent", gradient: "from-green-700 to-emerald-600" },
  { name: "Travel & Luggage", slug: "travel", icon: "✈️", iconName: "Plane", gradient: "from-blue-600 to-cyan-500" },
  { name: "Shoes & Footwear", slug: "shoes", icon: "👟", iconName: "Footprints", gradient: "from-red-600 to-pink-500" },
  { name: "Bags & Accessories", slug: "bags", icon: "👜", iconName: "Backpack", gradient: "from-purple-600 to-indigo-500" },
  { name: "Home Decor", slug: "decor", icon: "🖼️", iconName: "Frame", gradient: "from-pink-600 to-rose-500" },
  { name: "Lighting", slug: "lighting", icon: "💡", iconName: "Lightbulb", gradient: "from-yellow-600 to-amber-500" },
  { name: "Kitchen & Dining", slug: "kitchen", icon: "🍳", iconName: "ChefHat", gradient: "from-orange-600 to-red-500" },
  { name: "Bedding & Bath", slug: "bedding", icon: "🛏️", iconName: "Wind", gradient: "from-blue-600 to-cyan-500" },
  { name: "Smart Home", slug: "smart", icon: "📱", iconName: "Smartphone", gradient: "from-purple-600 to-pink-500" },
  { name: "Fitness Gear", slug: "fitness", icon: "🏃", iconName: "Activity", gradient: "from-red-600 to-pink-500" },
  { name: "Baby Products", slug: "baby", icon: "👶", iconName: "Baby", gradient: "from-pink-500 to-purple-400" },
];

// Color palettes for diverse styling
const colorPalettes = [
  { bg: "from-purple-600 to-indigo-600", accent: "purple", text: "text-purple-300" },
  { bg: "from-pink-600 to-rose-600", accent: "pink", text: "text-pink-300" },
  { bg: "from-cyan-600 to-blue-600", accent: "cyan", text: "text-cyan-300" },
  { bg: "from-emerald-600 to-teal-600", accent: "emerald", text: "text-emerald-300" },
  { bg: "from-amber-600 to-orange-600", accent: "amber", text: "text-amber-300" },
  { bg: "from-red-600 to-pink-600", accent: "red", text: "text-red-300" },
  { bg: "from-green-600 to-emerald-600", accent: "green", text: "text-green-300" },
  { bg: "from-yellow-600 to-amber-600", accent: "yellow", text: "text-yellow-300" },
  { bg: "from-blue-600 to-cyan-600", accent: "blue", text: "text-blue-300" },
  { bg: "from-violet-600 to-purple-600", accent: "violet", text: "text-violet-300" },
];

const productNames = [
  "Wireless Earbuds Pro", "USB-C Hub 7-in-1", "Portable SSD 1TB", "Smart Watch Series",
  "Bluetooth Speaker", "4K Webcam", "Mechanical Keyboard", "Gaming Mouse",
  "Phone Stand Adjustable", "Laptop Cooler", "USB Hub 3.0", "Monitor Lamp",
  "Casual Cotton T-Shirt", "Slim Fit Jeans", "Crew Neck Sweater", "Polo Shirt",
  "Denim Jacket", "Chino Pants", "Hoodie Sweatshirt", "V-Neck Cardigan",
  "Facial Cleanser", "Moisturizer Cream", "Serum Essence", "Face Mask Sheet",
  "Lip Balm", "Sunscreen SPF50", "Night Cream", "Eye Patches",
  "LED Desk Lamp", "Table Clock", "Picture Frame", "Wall Clock",
  "Throw Pillow", "Floor Mat", "Area Rug", "Bed Sheet Set",
  "Yoga Mat Non-Slip", "Resistance Bands", "Dumbbell Set", "Kettlebell",
  "Gaming Headset", "Controller Pad", "Gaming Chair", "Desk Mount",
  "Gold Chain Necklace", "Silver Bracelet", "Diamond Ring", "Pearl Earrings",
  "Fiction Novel", "Self-Help Book", "Biography", "Science Book",
  "Action Figure", "LEGO Set", "Puzzle Game", "Board Game",
  "Car Phone Mount", "Dash Cam", "Car Charger", "USB Adapter",
];

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
];

function generateProducts(): Product[] {
  const generatedProducts: Product[] = [];
  let productId = 0;

  for (const category of categories) {
    for (let i = 0; i < 8; i++) {
      productId++;
      const palette = colorPalettes[(productId - 1) % colorPalettes.length];
      const productName = productNames[(productId - 1) % productNames.length];
      const basePrice = Math.floor(Math.random() * 2900) + 9;
      const hasDiscount = Math.random() > 0.6;
      
      generatedProducts.push({
        id: `p${productId}`,
        name: `${productName} ${i + 1}`,
        slug: `${productName.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
        category: category.name,
        categorySlug: category.slug,
        price: basePrice,
        originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 300) + 50 : undefined,
        rating: Number((Math.random() * 2 + 3.5).toFixed(1)),
        reviews: Math.floor(Math.random() * 5000) + 10,
        image: images[productId % images.length],
        colors: [
          { name: "Standard", value: palette.accent },
          { name: "Dark", value: "#1a1a2e" },
          { name: "Light", value: "#e8e8f0" },
        ],
        sizes: ["S", "M", "L", "XL"],
        shortDescription: `Premium ${productName.toLowerCase()} with modern design`,
        inStock: Math.random() > 0.1,
        stock: Math.floor(Math.random() * 100) + 1,
        isNew: Math.random() > 0.85,
        isBestseller: Math.random() > 0.92,
        isFeatured: Math.random() > 0.95,
        vendorName: ["NexStore", "Premium Shop", "Quality Goods", "Elite Traders"][Math.floor(Math.random() * 4)],
        tags: [category.slug, "trending", "quality"],
        badgeColor: palette.accent,
      });
    }
  }

  return generatedProducts;
}

export const products: Product[] = generateProducts();

export const PRODUCTS = products;

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 12);
export const newArrivals = products.filter(p => p.isNew).slice(0, 12);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 12);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );
}
