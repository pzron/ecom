export const COMBO_CONFIG = {
  MIN_COMBO_PRICE: 2000,
  MIN_PRODUCTS: 3,
  MAX_PRODUCTS: 8,
  ALLOWED_CATEGORIES: [
    "Electronics",
    "Fashion",
    "Beauty",
    "Home & Kitchen",
    "Health & Wellness",
    "Sports & Outdoors",
    "Books & Stationery",
    "Food & Beverages",
    "Baby & Kids",
    "Accessories"
  ],
  DISCOUNT_TIERS: [
    { minProducts: 3, discount: 0.10 },
    { minProducts: 5, discount: 0.15 },
    { minProducts: 7, discount: 0.20 },
  ],
  FREE_SHIPPING_THRESHOLD: 5000,
};

export function calculateComboDiscount(totalPrice: number, productCount: number): number {
  const tier = COMBO_CONFIG.DISCOUNT_TIERS
    .slice()
    .reverse()
    .find(t => productCount >= t.minProducts);
  
  return tier ? totalPrice * tier.discount : 0;
}

export function getComboSavingsPercentage(productCount: number): number {
  const tier = COMBO_CONFIG.DISCOUNT_TIERS
    .slice()
    .reverse()
    .find(t => productCount >= t.minProducts);
  
  return tier ? tier.discount * 100 : 0;
}

export function isValidCombo(totalPrice: number, productCount: number, categories: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (totalPrice < COMBO_CONFIG.MIN_COMBO_PRICE) {
    errors.push(`Minimum combo value is ৳${COMBO_CONFIG.MIN_COMBO_PRICE}`);
  }
  
  if (productCount < COMBO_CONFIG.MIN_PRODUCTS) {
    errors.push(`Add at least ${COMBO_CONFIG.MIN_PRODUCTS} products`);
  }
  
  if (productCount > COMBO_CONFIG.MAX_PRODUCTS) {
    errors.push(`Maximum ${COMBO_CONFIG.MAX_PRODUCTS} products allowed`);
  }
  
  const invalidCategories = categories.filter(cat => !COMBO_CONFIG.ALLOWED_CATEGORIES.includes(cat));
  if (invalidCategories.length > 0) {
    errors.push(`Some categories not allowed: ${invalidCategories.join(", ")}`);
  }
  
  return { valid: errors.length === 0, errors };
}
