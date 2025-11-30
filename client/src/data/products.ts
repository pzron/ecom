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

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Beauty", slug: "beauty" },
  { name: "Home & Living", slug: "home" },
  { name: "Sports & Fitness", slug: "sports" },
  { name: "Gaming", slug: "gaming" },
  { name: "Jewelry & Watches", slug: "jewelry" },
  { name: "Books & Media", slug: "books" },
  { name: "Kids & Toys", slug: "kids" },
  { name: "Automotive", slug: "automotive" },
];

const productNames = [
  // Electronics
  "Wireless Earbuds Pro", "USB-C Hub 7-in-1", "Portable SSD 1TB", "Smart Watch Series",
  "Bluetooth Speaker", "4K Webcam", "Mechanical Keyboard", "Gaming Mouse",
  "Phone Stand Adjustable", "Laptop Cooler", "USB Hub 3.0", "Monitor Lamp",
  "Wireless Charger", "Power Bank 20000mAh", "HDMI Cable 2M", "Phone Mount",
  "Desk Organizer", "Cable Manager", "Screen Protector", "Phone Case Armor",
  
  // Fashion
  "Casual Cotton T-Shirt", "Slim Fit Jeans", "Crew Neck Sweater", "Polo Shirt",
  "Denim Jacket", "Chino Pants", "Hoodie Sweatshirt", "V-Neck Cardigan",
  "Oxford Button Down", "Cargo Pants", "Henley Shirt", "Fleece Jacket",
  "Graphic Tee", "Linen Shirt", "Thermal Base Layer", "Mock Neck Top",
  "Bomber Jacket", "Sweatpants", "Sports Shorts", "Beach Shirt",
  
  // Beauty
  "Facial Cleanser", "Moisturizer Cream", "Serum Essence", "Face Mask Sheet",
  "Lip Balm", "Sunscreen SPF50", "Night Cream", "Eye Patches",
  "Toner Solution", "Makeup Primer", "Setting Spray", "Foundation",
  "Concealer Palette", "Blush Powder", "Eyeshadow", "Mascara",
  "Eyeliner Pen", "Lipstick", "Lip Gloss", "Makeup Brush Set",
  
  // Home & Living
  "LED Desk Lamp", "Table Clock", "Picture Frame", "Wall Clock",
  "Throw Pillow", "Floor Mat", "Area Rug", "Bed Sheet Set",
  "Comforter", "Pillow", "Duvet Cover", "Curtains",
  "Blinds", "Door Mat", "Wall Decoration", "Shelf",
  "Storage Box", "Organizer Rack", "Mirror", "Vase",
  
  // Sports & Fitness
  "Yoga Mat Non-Slip", "Resistance Bands", "Dumbbell Set", "Kettlebell",
  "Pull-up Bar", "Ab Wheel", "Foam Roller", "Jump Rope",
  "Hand Grips", "Wrist Wraps", "Gym Gloves", "Sweatband",
  "Sports Water Bottle", "Towel Microfiber", "Gym Bag", "Shin Guards",
  "Boxing Gloves", "Speed Bag", "Medicine Ball", "Balance Ball",
  
  // Gaming
  "Gaming Headset", "Controller Pad", "Gaming Chair", "Desk Mount",
  "Mousepad Large", "Game Console", "Graphics Card", "SSD NVMe",
  "Cooling Fan", "RGB Light Strip", "Cable Clips", "Controller Charger",
  "Gaming Desk", "Monitor Arm", "Keyboard Wrist Rest", "Mic Stand",
  "Pop Filter", "XLR Cable", "Boom Arm", "Stream Deck",
  
  // Jewelry & Watches
  "Gold Chain Necklace", "Silver Bracelet", "Diamond Ring", "Pearl Earrings",
  "Analog Watch", "Smart Watch", "Leather Strap", "Beaded Bracelet",
  "Pendant Necklace", "Cuff Bracelet", "Hoop Earrings", "Stud Earrings",
  "Anklet Chain", "Body Chain", "Ring Set", "Locket Pendant",
  "Tennis Bracelet", "Charm Bracelet", "Signet Ring", "Cross Necklace",
  
  // Books & Media
  "Fiction Novel", "Self-Help Book", "Biography", "Science Book",
  "Comic Book Series", "Travel Guide", "Cookbook", "Art Book",
  "History Book", "Mystery Novel", "Romance Novel", "Fantasy Novel",
  "Thriller", "Children's Book", "Educational Book", "Poetry Collection",
  "Business Book", "Philosophy", "Psychology", "True Crime",
  
  // Kids & Toys
  "Action Figure", "LEGO Set", "Puzzle Game", "Board Game",
  "Plush Toy", "Building Blocks", "Toy Car", "Doll",
  "Toy Robot", "Kite", "Ball Set", "Skateboard",
  "Scooter", "Bicycle", "Roller Skates", "Helmet",
  "Toy Gun", "Water Gun", "Bubble Maker", "Toy Train",
  
  // Automotive
  "Car Phone Mount", "Dash Cam", "Car Charger", "USB Adapter",
  "Car Air Freshener", "Floor Mats", "Seat Covers", "Steering Cover",
  "Dashboard Cover", "Window Shade", "License Plate", "Bumper Guard",
  "Door Protector", "Paint Protector", "Car Vacuum", "Air Compressor",
  "Jump Starter", "Tool Kit", "Oil Drain", "Tire Gauge",
];

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
];

function generateProducts(): Product[] {
  const generatedProducts: Product[] = [];
  let productId = 0;

  for (const category of categories) {
    for (let i = 0; i < 35; i++) {
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
