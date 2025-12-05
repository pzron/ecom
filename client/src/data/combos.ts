import { products } from "./products";

export interface ComboProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
}

export interface Combo {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: ComboProduct[];
  comboPrice: number;
  originalPrice: number;
  savings: number;
  savingsPercent: number;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  category: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  isLimited?: boolean;
  stock: number;
}

const comboCategories = [
  "Health & Wellness",
  "Beauty Essentials",
  "Daily Care",
  "Kitchen & Home",
  "Premium Collection",
  "Family Pack",
  "Starter Kit",
  "Gift Set",
];

const comboNames = [
  "Essential Care Bundle",
  "Premium Wellness Pack",
  "Daily Routine Set",
  "Complete Care Collection",
  "Starter Essentials",
  "Family Value Pack",
  "Luxury Gift Set",
  "Health Boost Bundle",
  "Beauty Basics Kit",
  "Home Essentials Pack",
  "Ultimate Combo Pack",
  "Mega Savings Bundle",
  "Professional Care Set",
  "Natural Living Pack",
  "Wellness Starter Kit",
  "Premium Gift Box",
  "Value Saver Pack",
  "Super Combo Deal",
  "Economy Bundle",
  "Deluxe Collection",
];

const badgeOptions = [
  { text: "Best Seller", color: "from-purple-500 to-pink-500" },
  { text: "Top Rated", color: "from-amber-500 to-orange-500" },
  { text: "Most Popular", color: "from-blue-500 to-cyan-500" },
  { text: "Limited Offer", color: "from-red-500 to-rose-500" },
  { text: "New Arrival", color: "from-green-500 to-emerald-500" },
  { text: "Hot Deal", color: "from-orange-500 to-red-500" },
  { text: "Value Pack", color: "from-indigo-500 to-purple-500" },
  { text: "Flash Sale", color: "from-pink-500 to-rose-500" },
];

function getRandomProducts(count: number): ComboProduct[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    originalPrice: p.price,
  }));
}

function generateCombos(): Combo[] {
  const combos: Combo[] = [];
  
  for (let i = 1; i <= 55; i++) {
    const productCount = Math.floor(Math.random() * 4) + 3;
    const comboProducts = getRandomProducts(productCount);
    const originalPrice = comboProducts.reduce((sum, p) => sum + p.originalPrice, 0);
    const discountPercent = Math.floor(Math.random() * 25) + 10;
    const comboPrice = Math.round(originalPrice * (1 - discountPercent / 100));
    const savings = originalPrice - comboPrice;
    const badge = badgeOptions[Math.floor(Math.random() * badgeOptions.length)];
    const category = comboCategories[Math.floor(Math.random() * comboCategories.length)];
    const comboName = comboNames[(i - 1) % comboNames.length];
    
    combos.push({
      id: `combo-${i}`,
      name: `${comboName} #${i}`,
      slug: `${comboName.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      description: `Get this amazing ${category.toLowerCase()} combo pack with ${productCount} premium products at an unbeatable price!`,
      products: comboProducts,
      comboPrice,
      originalPrice,
      savings,
      savingsPercent: discountPercent,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 500) + 50,
      badge: Math.random() > 0.4 ? badge.text : undefined,
      badgeColor: badge.color,
      category,
      isPopular: Math.random() > 0.7,
      isBestValue: Math.random() > 0.8,
      isLimited: Math.random() > 0.85,
      stock: Math.floor(Math.random() * 50) + 5,
    });
  }
  
  return combos;
}

export const combos: Combo[] = generateCombos();

export function getComboById(id: string): Combo | undefined {
  return combos.find(c => c.id === id);
}

export function getCombosByCategory(category: string): Combo[] {
  if (category === "all") return combos;
  return combos.filter(c => c.category === category);
}

export const comboFilterCategories = ["all", ...comboCategories];
