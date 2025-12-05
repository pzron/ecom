import { combos, type Combo } from "@/data/combos";

export function getCombosByProductId(productId: string): Combo[] {
  return combos.filter(combo => 
    combo.products.some(product => product.id === productId)
  );
}

export function getRelatedCombos(productId: string, limit: number = 4): Combo[] {
  return getCombosByProductId(productId).slice(0, limit);
}

export function hasAvailableCombos(productId: string): boolean {
  return getCombosByProductId(productId).length > 0;
}
