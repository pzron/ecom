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
  animation?: "rotate" | "bounce" | "pulse" | "glow" | "float";
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  iconName: string;
  gradient: string;
  image?: string;
}

export const categories: Category[] = [
  { name: "Health Items", slug: "health-items", icon: "💊", iconName: "Pill", gradient: "from-green-600 to-teal-500", image: "https://myvertexbd.com/image/category/62fb70c13fd09.webp" },
  { name: "Cosmetics Items", slug: "cosmetics-items", icon: "💄", iconName: "Sparkles", gradient: "from-pink-600 to-rose-500", image: "https://myvertexbd.com/image/category/6331c4662f487.webp" },
  { name: "Tea & Coffee", slug: "tea-coffee", icon: "☕", iconName: "Music", gradient: "from-amber-700 to-orange-600", image: "https://myvertexbd.com/image/category/67628dd94b90f.webp" },
  { name: "Hair Oil & Gel", slug: "hair-oil-gel", icon: "💆", iconName: "Wind", gradient: "from-yellow-600 to-amber-500", image: "https://myvertexbd.com/image/category/66c78c111bb2b.webp" },
  { name: "Consumer Items", slug: "consumer-items", icon: "🛒", iconName: "ShoppingCart", gradient: "from-blue-600 to-indigo-500", image: "https://myvertexbd.com/image/category/62fb710457c8a.webp" },
  { name: "Salon & Parlour", slug: "salon-parlour", icon: "✨", iconName: "Sparkles", gradient: "from-purple-600 to-pink-500", image: "https://myvertexbd.com/image/category/66c777c88f197.webp" },
  { name: "Electronics", slug: "electronics", icon: "⚡", iconName: "Zap", gradient: "from-blue-600 to-cyan-500" },
  { name: "Fashion", slug: "fashion", icon: "👔", iconName: "Shirt", gradient: "from-pink-600 to-rose-500" },
  { name: "Home & Living", slug: "home", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-500" },
  { name: "Sports & Fitness", slug: "sports", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-pink-500" },
  { name: "Gaming", slug: "gaming", icon: "🎮", iconName: "Gamepad2", gradient: "from-violet-600 to-purple-500" },
  { name: "Jewelry & Watches", slug: "jewelry", icon: "💎", iconName: "Watch", gradient: "from-yellow-600 to-amber-500" },
  { name: "Books & Media", slug: "books", icon: "📚", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-500" },
  { name: "Kids & Toys", slug: "kids", icon: "🧸", iconName: "Puzzle", gradient: "from-green-500 to-emerald-400" },
  { name: "Automotive", slug: "automotive", icon: "🚗", iconName: "Car", gradient: "from-gray-600 to-slate-500" },
  { name: "Food & Grocery", slug: "food", icon: "🍔", iconName: "ChefHat", gradient: "from-orange-600 to-red-500" },
  { name: "Appliances", slug: "appliances", icon: "🔌", iconName: "Zap", gradient: "from-cyan-600 to-blue-500" },
  { name: "Furniture", slug: "furniture", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-700 to-orange-600" },
  { name: "Outdoor & Garden", slug: "outdoor", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-500" },
  { name: "Pet Supplies", slug: "pets", icon: "🐾", iconName: "PawPrint", gradient: "from-orange-600 to-pink-500" },
  { name: "Sports Equipment", slug: "sports-eq", icon: "⚽", iconName: "Trophy", gradient: "from-yellow-600 to-orange-500" },
  { name: "Musical Instruments", slug: "music", icon: "🎸", iconName: "Music", gradient: "from-purple-600 to-pink-500" },
  { name: "Art & Craft", slug: "art", icon: "🎨", iconName: "Palette", gradient: "from-rose-600 to-pink-500" },
  { name: "Tools & Hardware", slug: "tools", icon: "🔨", iconName: "Wrench", gradient: "from-gray-700 to-slate-600" },
  { name: "Office Supplies", slug: "office", icon: "📎", iconName: "Paperclip", gradient: "from-blue-600 to-indigo-500" },
  { name: "School Supplies", slug: "school", icon: "✏️", iconName: "PencilRuler", gradient: "from-yellow-600 to-amber-500" },
  { name: "Party & Events", slug: "party", icon: "🎉", iconName: "Sparkles", gradient: "from-pink-600 to-purple-500" },
  { name: "Camping & Hiking", slug: "camping", icon: "⛺", iconName: "Tent", gradient: "from-green-700 to-emerald-600" },
  { name: "Travel & Luggage", slug: "travel", icon: "✈️", iconName: "Plane", gradient: "from-blue-600 to-cyan-500" },
  { name: "Shoes & Footwear", slug: "shoes", icon: "👟", iconName: "Footprints", gradient: "from-red-600 to-pink-500" },
];

const colorPalettes = [
  { accent: "#8B5CF6", name: "purple" },
  { accent: "#EC4899", name: "pink" },
  { accent: "#06B6D4", name: "cyan" },
  { accent: "#10B981", name: "emerald" },
  { accent: "#F59E0B", name: "amber" },
  { accent: "#EF4444", name: "red" },
  { accent: "#22C55E", name: "green" },
  { accent: "#EAB308", name: "yellow" },
  { accent: "#3B82F6", name: "blue" },
  { accent: "#A78BFA", name: "violet" },
];

const animations: ("rotate" | "bounce" | "pulse" | "glow" | "float")[] = ["rotate", "bounce", "pulse", "glow", "float"];

const realProductImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1509941943102-1c69b8b9baed?w=400&q=80",
  "https://images.unsplash.com/photo-1500409456520-20f925da0ea7?w=400&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
  "https://images.unsplash.com/photo-1581017316471-1f6ef7ce6fd3?w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
  "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&q=80",
  "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80",
  "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=400&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
  "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=400&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
];

const electronicImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
];

const fashionImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
];

const cosmeticsImages = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80",
];

const homeImages = [
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80",
  "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=400&q=80",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
];

const categoryImages: Record<string, string[]> = {
  "electronics": electronicImages,
  "fashion": fashionImages,
  "cosmetics-items": cosmeticsImages,
  "home": homeImages,
  "shoes": fashionImages,
};

const productNamePrefixes = [
  "Premium", "Deluxe", "Classic", "Elite", "Pro", "Ultra", "Master", "Royal",
  "Luxury", "Essential", "Modern", "Signature", "Advanced", "Professional", "Superior"
];

const productNameSuffixes = [
  "Collection", "Edition", "Series", "Bundle", "Pack", "Set", "Model", "Line",
  "Range", "Selection", "Choice", "Premium", "Exclusive", "Special", "Limited"
];

const vendors = [
  "Premium Shop", "Quality Store", "Elite Traders", "Express Market",
  "Global Mart", "Super Store", "Best Buy", "Smart Shop", "Value Store", "Top Quality"
];

const apiProducts = [
  { id: "p1", name: "Milk FaceWash-120 ml", categorySlug: "cosmetics-items", price: 290, image: "https://myvertexbd.com/image/thumb/68d6d3bd6bf3a.webp" },
  { id: "p2", name: "Soya Protein - 400 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d4cb6df63.webp" },
  { id: "p3", name: "Moringo Plus -100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d4ea36806.webp" },
  { id: "p4", name: "Alovera Plus -120 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/66c4ade538f4c.webp" },
  { id: "p5", name: "Katila Plus -120 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d56259e99.webp" },
  { id: "p6", name: "Multi-Purpose Liquid Detergent -1 Ltr", categorySlug: "consumer-items", price: 350, image: "https://myvertexbd.com/image/thumb/68d6d77169f44.webp" },
  { id: "p7", name: "Orange & Turmeric Soap - 100 gm", categorySlug: "cosmetics-items", price: 250, image: "https://myvertexbd.com/image/thumb/68d6d7da83eda.webp" },
  { id: "p8", name: "Coral Premix Coffee", categorySlug: "tea-coffee", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d9193c50c.webp" },
  { id: "p9", name: "Bcare Toothpaste", categorySlug: "cosmetics-items", price: 210, image: "https://myvertexbd.com/image/thumb/690a66b9db934.webp" },
  { id: "p10", name: "Senega -30 Tab", categorySlug: "health-items", price: 400, image: "https://myvertexbd.com/image/thumb/68d6d995e21b6.webp" },
  { id: "p11", name: "Tulsi Sia Drinks", categorySlug: "health-items", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d9cabed35.webp" },
  { id: "p12", name: "Apple Ginger Drinks -100 gm", categorySlug: "health-items", price: 1350, image: "https://myvertexbd.com/image/thumb/680c8b6a2429d.webp" },
  { id: "p13", name: "Balance Booster Box -100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/6879655a73853.webp" },
  { id: "p14", name: "Herbal Tea-100 gm", categorySlug: "tea-coffee", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d1536d28b.webp" },
  { id: "p15", name: "Alovera Plus Box-100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/6879668c391e8.webp" },
  { id: "p16", name: "Green Moringa-100 gm", categorySlug: "health-items", price: 1050, image: "https://myvertexbd.com/image/thumb/68d6d831c7640.webp" },
  { id: "p17", name: "Zira Drinks-100 gm(20 pack)", categorySlug: "health-items", price: 450, image: "https://myvertexbd.com/image/thumb/68d6d9e35e446.webp" },
  { id: "p18", name: "Natrum Mur-30 tab", categorySlug: "health-items", price: 400, image: "https://myvertexbd.com/image/thumb/690a6bcdb017f.webp" },
  { id: "p19", name: "Acne Cleanser- 10 gm", categorySlug: "cosmetics-items", price: 380, image: "https://myvertexbd.com/image/thumb/68d6d4afe0d42.webp" },
  { id: "p20", name: "Tea Tree Hair wash-100 ml", categorySlug: "cosmetics-items", price: 450, image: "https://myvertexbd.com/image/thumb/690a6bb54dd78.webp" },
  { id: "p21", name: "Vitamin C Serum", categorySlug: "cosmetics-items", price: 890, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80" },
  { id: "p22", name: "Retinol Night Cream", categorySlug: "cosmetics-items", price: 1200, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80" },
  { id: "p23", name: "Wireless Earbuds Pro", categorySlug: "electronics", price: 2999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
  { id: "p24", name: "Smart Fitness Watch", categorySlug: "electronics", price: 4500, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" },
  { id: "p25", name: "Running Shoes Elite", categorySlug: "shoes", price: 3200, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: "p26", name: "Casual Sneakers", categorySlug: "shoes", price: 2100, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80" },
  { id: "p27", name: "Designer Sunglasses", categorySlug: "fashion", price: 1800, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" },
  { id: "p28", name: "Leather Wallet Premium", categorySlug: "fashion", price: 950, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80" },
  { id: "p29", name: "Organic Green Tea", categorySlug: "tea-coffee", price: 380, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80" },
  { id: "p30", name: "Premium Coffee Beans", categorySlug: "tea-coffee", price: 650, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80" },
];

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateExtendedProducts(count: number = 750): Product[] {
  const generatedProducts: Product[] = [];
  const random = seededRandom(42);

  for (const apiProd of apiProducts) {
    const categorySlug = apiProd.categorySlug;
    const category = categories.find(c => c.slug === categorySlug);
    const palette = colorPalettes[generatedProducts.length % colorPalettes.length];
    const basePrice = apiProd.price;
    const hasDiscount = random() > 0.6;

    generatedProducts.push({
      id: apiProd.id,
      name: apiProd.name,
      slug: apiProd.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      category: category?.name || "Products",
      categorySlug: categorySlug,
      price: basePrice,
      originalPrice: hasDiscount ? basePrice + Math.floor(random() * 500) + 100 : undefined,
      rating: Number((random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(random() * 5000) + 50,
      image: apiProd.image,
      colors: [
        { name: "Standard", value: palette.accent },
        { name: "Dark", value: "#1a1a2e" },
        { name: "Light", value: "#e8e8f0" },
      ],
      sizes: ["S", "M", "L", "XL"],
      shortDescription: `${apiProd.name} - Premium Quality`,
      inStock: random() > 0.08,
      stock: Math.floor(random() * 200) + 5,
      isNew: random() > 0.85,
      isBestseller: random() > 0.88,
      isFeatured: random() > 0.92,
      has3D: random() > 0.7,
      model3dType: ["box", "sphere", "torus", "cylinder"][Math.floor(random() * 4)] as any,
      vendorName: vendors[Math.floor(random() * vendors.length)],
      tags: [categorySlug, "trending", "quality", "premium"],
      badgeColor: palette.name,
      animation: animations[Math.floor(random() * animations.length)],
    });
  }

  let productId = apiProducts.length;

  while (generatedProducts.length < count) {
    for (const category of categories) {
      if (generatedProducts.length >= count) break;
      
      productId++;
      const palette = colorPalettes[productId % colorPalettes.length];
      const prefix = productNamePrefixes[Math.floor(random() * productNamePrefixes.length)];
      const suffix = productNameSuffixes[Math.floor(random() * productNameSuffixes.length)];
      const basePrice = Math.floor(random() * 4500) + 150;
      const hasDiscount = random() > 0.55;
      
      const catImages = categoryImages[category.slug] || realProductImages;
      const imageIndex = productId % catImages.length;

      generatedProducts.push({
        id: `p${productId}`,
        name: `${prefix} ${category.name} ${suffix}`,
        slug: `${prefix.toLowerCase()}-${category.slug}-${suffix.toLowerCase()}-${productId}`,
        category: category.name,
        categorySlug: category.slug,
        price: basePrice,
        originalPrice: hasDiscount ? basePrice + Math.floor(random() * 800) + 100 : undefined,
        rating: Number((random() * 1.8 + 3.2).toFixed(1)),
        reviews: Math.floor(random() * 8000) + 10,
        image: catImages[imageIndex],
        colors: [
          { name: "Primary", value: palette.accent },
          { name: "Secondary", value: colorPalettes[(productId + 3) % colorPalettes.length].accent },
          { name: "Neutral", value: "#6B7280" },
        ],
        sizes: random() > 0.5 ? ["S", "M", "L", "XL", "XXL"] : ["One Size"],
        shortDescription: `${prefix} quality ${category.name.toLowerCase()} - ${suffix} edition with premium features`,
        inStock: random() > 0.05,
        stock: Math.floor(random() * 300) + 1,
        isNew: random() > 0.82,
        isBestseller: random() > 0.9,
        isFeatured: random() > 0.93,
        has3D: random() > 0.65,
        model3dType: ["box", "sphere", "torus", "cylinder"][Math.floor(random() * 4)] as any,
        vendorName: vendors[Math.floor(random() * vendors.length)],
        tags: [category.slug, "trending", "quality", prefix.toLowerCase(), suffix.toLowerCase()],
        badgeColor: palette.name,
        animation: animations[Math.floor(random() * animations.length)],
      });
    }
  }

  return generatedProducts;
}

export const products: Product[] = generateExtendedProducts(750);

export const PRODUCTS = products;

export const homeProducts = products.slice(0, 350);

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 24);
export const newArrivals = products.filter(p => p.isNew).slice(0, 24);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 24);

export const hero3DProducts = products.filter(p => p.has3D).slice(0, 8);

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

export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const filtered = products.filter(p => p.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getHomePageProducts(): Product[] {
  return homeProducts;
}
