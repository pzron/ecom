import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

interface WishlistItem {
  id: string;
  productId: string;
  product: WishlistProduct;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  
  addItem: (product: WishlistProduct) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  syncWithServer: (userId: string) => Promise<void>;
  getItemCount: () => number;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      
      addItem: async (product: WishlistProduct) => {
        const existingItem = get().items.find(item => item.productId === product.id);
        if (existingItem) return;
        
        const newItem: WishlistItem = {
          id: `wishlist_${product.id}_${Date.now()}`,
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        };
        
        set(state => ({
          items: [...state.items, newItem],
        }));
        
        try {
          await fetch('/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product.id }),
          });
        } catch (error) {
          console.error('Failed to sync wishlist with server:', error);
        }
      },
      
      removeItem: async (productId: string) => {
        const item = get().items.find(i => i.productId === productId);
        
        set(state => ({
          items: state.items.filter(item => item.productId !== productId),
        }));
        
        if (item) {
          try {
            await fetch(`/api/wishlist/${item.id}`, {
              method: 'DELETE',
              credentials: 'include',
            });
          } catch (error) {
            console.error('Failed to remove item from server wishlist:', error);
          }
        }
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.productId === productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      syncWithServer: async (userId: string) => {
        if (!userId) return;
        
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/wishlist?userId=${userId}`, {
            credentials: 'include',
          });
          
          if (response.ok) {
            const serverItems = await response.json();
            if (Array.isArray(serverItems) && serverItems.length > 0) {
              const formattedItems: WishlistItem[] = serverItems.map((item: any) => ({
                id: item.id,
                productId: item.productId,
                product: {
                  id: item.product?.id || item.productId,
                  name: item.product?.name || 'Product',
                  price: parseFloat(item.product?.price) || 0,
                  originalPrice: item.product?.originalPrice ? parseFloat(item.product.originalPrice) : undefined,
                  image: item.product?.images?.[0] || item.product?.image || '',
                  category: item.product?.category || '',
                  rating: item.product?.rating || 0,
                  inStock: item.product?.inStock ?? true,
                },
                addedAt: item.createdAt || new Date().toISOString(),
              }));
              set({ items: formattedItems });
            }
          }
        } catch (error) {
          console.error('Failed to sync wishlist:', error);
          set({ error: 'Failed to load wishlist' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'nexcommerce-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
