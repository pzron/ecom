import { 
  users, products, categories, vendors, affiliates, cartItems, orders, orderItems,
  wishlistItems, reviews, coupons, settings, affiliateCampaigns, affiliateTransactions,
  type User, type InsertUser, type Product, type InsertProduct, type Category, type InsertCategory,
  type Vendor, type InsertVendor, type Affiliate, type InsertAffiliate, type CartItem, type InsertCartItem,
  type Order, type InsertOrder, type OrderItem, type Review, type InsertReview, type Coupon, type InsertCoupon,
  type WishlistItem, type AffiliateCampaign, type AffiliateTransaction, type Setting
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, ilike, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;

  getProducts(options?: { categoryId?: string; limit?: number; offset?: number; search?: string }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;

  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  getCartItems(userId?: string, sessionId?: string): Promise<(CartItem & { product: Product | null })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId?: string, sessionId?: string): Promise<boolean>;

  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<(Order & { items: OrderItem[] }) | undefined>;
  createOrder(order: InsertOrder, items: Omit<OrderItem, 'id'>[]): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product | null })[]>;
  addToWishlist(userId: string, productId: string): Promise<WishlistItem>;
  removeFromWishlist(id: string): Promise<boolean>;

  getReviews(productId: string): Promise<(Review & { user: User | null })[]>;
  createReview(review: InsertReview): Promise<Review>;

  getVendors(): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;

  getAffiliates(): Promise<Affiliate[]>;
  getAffiliate(id: string): Promise<Affiliate | undefined>;
  getAffiliateByCode(code: string): Promise<Affiliate | undefined>;
  createAffiliate(affiliate: InsertAffiliate): Promise<Affiliate>;

  getCoupon(code: string): Promise<Coupon | undefined>;
  validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message?: string }>;

  getSetting(key: string): Promise<Setting | undefined>;
  getSettings(category?: string): Promise<Setting[]>;

  getDashboardStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
    recentOrders: Order[];
    topProducts: Product[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  async getProducts(options?: { categoryId?: string; limit?: number; offset?: number; search?: string }): Promise<Product[]> {
    const conditions = [eq(products.isActive, true)];
    
    if (options?.categoryId) {
      conditions.push(eq(products.categoryId, options.categoryId));
    }
    
    if (options?.search) {
      conditions.push(ilike(products.name, `%${options.search}%`));
    }
    
    const result = await db.select().from(products)
      .where(and(...conditions))
      .orderBy(desc(products.createdAt))
      .limit(options?.limit || 50)
      .offset(options?.offset || 0);
    
    return result;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product as any).returning();
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db.update(products).set(data as any).where(eq(products.id, id)).returning();
    return product || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.update(products).set({ isActive: false }).where(eq(products.id, id));
    return true;
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return db.select().from(products)
      .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
      .orderBy(desc(products.createdAt))
      .limit(limit);
  }

  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(asc(categories.sortOrder));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getCartItems(userId?: string, sessionId?: string): Promise<(CartItem & { product: Product | null })[]> {
    const condition = userId ? eq(cartItems.userId, userId) : eq(cartItems.sessionId, sessionId || '');
    
    const items = await db.select().from(cartItems).where(condition);
    
    const itemsWithProducts = await Promise.all(items.map(async (item) => {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId));
      return { ...item, product: product || null };
    }));
    
    return itemsWithProducts;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const condition = item.userId 
      ? and(eq(cartItems.userId, item.userId), eq(cartItems.productId, item.productId))
      : and(eq(cartItems.sessionId, item.sessionId || ''), eq(cartItems.productId, item.productId));
    
    const [existing] = await db.select().from(cartItems).where(condition);
    
    if (existing) {
      const [updated] = await db.update(cartItems)
        .set({ quantity: existing.quantity + (item.quantity || 1) })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return updated;
    }
    
    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
    return item || undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return true;
  }

  async clearCart(userId?: string, sessionId?: string): Promise<boolean> {
    const condition = userId ? eq(cartItems.userId, userId) : eq(cartItems.sessionId, sessionId || '');
    await db.delete(cartItems).where(condition);
    return true;
  }

  async getOrders(userId?: string): Promise<Order[]> {
    if (userId) {
      return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
    }
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<(Order & { items: OrderItem[] }) | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return undefined;
    
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { ...order, items };
  }

  async createOrder(order: InsertOrder, items: Omit<OrderItem, 'id'>[]): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    
    for (const item of items) {
      await db.insert(orderItems).values({ ...item, orderId: newOrder.id } as any);
    }
    
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order || undefined;
  }

  async getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product | null })[]> {
    const items = await db.select().from(wishlistItems).where(eq(wishlistItems.userId, userId));
    
    const itemsWithProducts = await Promise.all(items.map(async (item) => {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId));
      return { ...item, product: product || null };
    }));
    
    return itemsWithProducts;
  }

  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    const [existing] = await db.select().from(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));
    
    if (existing) return existing;
    
    const [item] = await db.insert(wishlistItems).values({ userId, productId }).returning();
    return item;
  }

  async removeFromWishlist(id: string): Promise<boolean> {
    await db.delete(wishlistItems).where(eq(wishlistItems.id, id));
    return true;
  }

  async getReviews(productId: string): Promise<(Review & { user: User | null })[]> {
    const reviewList = await db.select().from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
    
    const reviewsWithUsers = await Promise.all(reviewList.map(async (review) => {
      const [user] = await db.select().from(users).where(eq(users.id, review.userId));
      return { ...review, user: user || null };
    }));
    
    return reviewsWithUsers;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    
    const allReviews = await db.select().from(reviews).where(eq(reviews.productId, review.productId));
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    
    await db.update(products).set({ 
      rating: avgRating.toFixed(1),
      reviewCount: allReviews.length 
    }).where(eq(products.id, review.productId));
    
    return newReview;
  }

  async getVendors(): Promise<Vendor[]> {
    return db.select().from(vendors).where(eq(vendors.isActive, true));
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor || undefined;
  }

  async createVendor(vendor: InsertVendor): Promise<Vendor> {
    const [newVendor] = await db.insert(vendors).values(vendor).returning();
    return newVendor;
  }

  async getAffiliates(): Promise<Affiliate[]> {
    return db.select().from(affiliates).where(eq(affiliates.isActive, true));
  }

  async getAffiliate(id: string): Promise<Affiliate | undefined> {
    const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.id, id));
    return affiliate || undefined;
  }

  async getAffiliateByCode(code: string): Promise<Affiliate | undefined> {
    const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.affiliateCode, code));
    return affiliate || undefined;
  }

  async createAffiliate(affiliate: InsertAffiliate): Promise<Affiliate> {
    const [newAffiliate] = await db.insert(affiliates).values(affiliate).returning();
    return newAffiliate;
  }

  async getCoupon(code: string): Promise<Coupon | undefined> {
    const [coupon] = await db.select().from(coupons).where(eq(coupons.code, code.toUpperCase()));
    return coupon || undefined;
  }

  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message?: string }> {
    const coupon = await this.getCoupon(code);
    
    if (!coupon) return { valid: false, discount: 0, message: "Invalid coupon code" };
    if (!coupon.isActive) return { valid: false, discount: 0, message: "Coupon is no longer active" };
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return { valid: false, discount: 0, message: "Coupon has expired" };
    }
    if (coupon.usageLimit && coupon.usedCount && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, discount: 0, message: "Coupon usage limit reached" };
    }
    if (coupon.minPurchase && subtotal < parseFloat(coupon.minPurchase)) {
      return { valid: false, discount: 0, message: `Minimum purchase of $${coupon.minPurchase} required` };
    }
    
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = subtotal * (parseFloat(coupon.value) / 100);
      if (coupon.maxDiscount) {
        discount = Math.min(discount, parseFloat(coupon.maxDiscount));
      }
    } else {
      discount = parseFloat(coupon.value);
    }
    
    return { valid: true, discount };
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting || undefined;
  }

  async getSettings(category?: string): Promise<Setting[]> {
    if (category) {
      return db.select().from(settings).where(eq(settings.category, category));
    }
    return db.select().from(settings);
  }

  async getDashboardStats(): Promise<any> {
    try {
      const [productCount] = await db.select({ count: sql<number>`count(*)` }).from(products).where(eq(products.isActive, true));
      const [orderCount] = await db.select({ count: sql<number>`count(*)` }).from(orders);
      const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
      const [revenue] = await db.select({ sum: sql<number>`COALESCE(SUM(CAST(total AS NUMERIC)), 0)` }).from(orders).where(eq(orders.paymentStatus, 'paid'));
      
      const [pending] = await db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, 'pending'));
      const [processing] = await db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, 'processing'));
      const [delivered] = await db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, 'delivered'));
      const [cancelled] = await db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, 'cancelled'));
      const [lowStock] = await db.select({ count: sql<number>`count(*)` }).from(products).where(sql`stock < 10`);
      
      const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(10);
      const topProducts = await db.select().from(products)
        .where(eq(products.isActive, true))
        .orderBy(desc(products.rating))
        .limit(8);
      
      const revenueTrend = await db.select({
        date: sql`CAST(${orders.createdAt} AS DATE)`,
        revenue: sql<number>`COALESCE(SUM(CAST(${orders.total} AS NUMERIC)), 0)`,
        count: sql<number>`COUNT(*)`
      }).from(orders).groupBy(sql`CAST(${orders.createdAt} AS DATE)`).orderBy(desc(sql`CAST(${orders.createdAt} AS DATE)`)).limit(30);
      
      const cartCount = await db.select({ count: sql<number>`count(DISTINCT session_id)` }).from(cartItems);
      const conversionRate = (Number(orderCount?.count || 0) / (Number(cartCount[0]?.count || 1))) * 100;
      
      return {
        totalProducts: Number(productCount?.count || 0),
        totalOrders: Number(orderCount?.count || 0),
        totalUsers: Number(userCount?.count || 0),
        totalRevenue: Number(revenue?.sum || 0),
        pendingOrders: Number(pending?.count || 0),
        processingOrders: Number(processing?.count || 0),
        deliveredOrders: Number(delivered?.count || 0),
        cancelledOrders: Number(cancelled?.count || 0),
        lowStockProducts: Number(lowStock?.count || 0),
        cartVisitors: Number(cartCount[0]?.count || 0),
        conversionRate: conversionRate.toFixed(2),
        recentOrders,
        topProducts,
        revenueTrend: revenueTrend.map(r => ({
          date: r.date,
          revenue: Number(r.revenue || 0),
          orders: Number(r.count || 0)
        }))
      };
    } catch (error) {
      console.error("Dashboard stats error:", error);
      return {
        totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0,
        pendingOrders: 0, processingOrders: 0, deliveredOrders: 0, cancelledOrders: 0,
        lowStockProducts: 0, cartVisitors: 0, conversionRate: 0,
        recentOrders: [], topProducts: [], revenueTrend: []
      };
    }
  }
}

export const storage = new DatabaseStorage();
