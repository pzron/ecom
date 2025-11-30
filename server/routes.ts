import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCategorySchema, insertReviewSchema, insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NX-${timestamp}-${random}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, limit, offset, search } = req.query;
      const products = await storage.getProducts({
        categoryId: categoryId as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        search: search as string
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 8;
      const products = await storage.getFeaturedProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const category = await storage.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.get("/api/cart", async (req, res) => {
    try {
      const { userId, sessionId } = req.query;
      const items = await storage.getCartItems(userId as string, sessionId as string);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const item = await storage.addToCart(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartItem(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const { userId, sessionId } = req.query;
      await storage.clearCart(userId as string, sessionId as string);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const { userId } = req.query;
      const orders = await storage.getOrders(userId as string);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { items, ...orderData } = req.body;
      const order = await storage.createOrder(
        { ...orderData, orderNumber: generateOrderNumber() },
        items
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  app.get("/api/wishlist", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      const items = await storage.getWishlistItems(userId as string);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const item = await storage.addToWishlist(userId, productId);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      await storage.removeFromWishlist(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:id/reviews", async (req, res) => {
    try {
      const review = await storage.createReview({ ...req.body, productId: req.params.id });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const vendor = await storage.getVendor(req.params.id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  app.get("/api/affiliates", async (req, res) => {
    try {
      const affiliates = await storage.getAffiliates();
      res.json(affiliates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliates" });
    }
  });

  app.get("/api/affiliates/:code", async (req, res) => {
    try {
      const affiliate = await storage.getAffiliateByCode(req.params.code);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }
      res.json(affiliate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliate" });
    }
  });

  app.post("/api/coupons/validate", async (req, res) => {
    try {
      const { code, subtotal } = req.body;
      const result = await storage.validateCoupon(code, subtotal);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to validate coupon" });
    }
  });

  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/settings", async (req, res) => {
    try {
      const { category } = req.query;
      const settings = await storage.getSettings(category as string);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Real-time calculation endpoints
  app.post("/api/cart/calculate", async (req, res) => {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ message: "Items must be an array" });
      }

      const { calculateCartTotals } = await import("./api/cart-calculator");
      const cartItems = await Promise.all(
        items.map(async (item: any) => {
          const product = await storage.getProduct(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product ? parseFloat(product.price.toString()) : 0,
            product,
          };
        })
      );

      const calculation = calculateCartTotals(cartItems);
      res.json(calculation);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate cart" });
    }
  });

  app.post("/api/orders/create-with-calculations", async (req, res) => {
    try {
      const { createOrderWithCalculations } = await import("./api/order-service");
      const result = await createOrderWithCalculations(req.body);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json({ message: result.error });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/dashboard/analytics", async (req, res) => {
    try {
      const { calculateDashboardAnalytics } = await import("./api/order-service");
      const analytics = await calculateDashboardAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/health", async (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      database: "connected",
    });
  });

  return httpServer;
}

  // ===== ADMIN USER MANAGEMENT =====
  app.get("/api/admin/users", async (req, res) => {
    try {
      const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put("/api/admin/users/:id/role", async (req, res) => {
    try {
      const { role } = req.body;
      const [user] = await db.update(users).set({ role }).where(eq(users.id, req.params.id)).returning();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    try {
      await db.delete(users).where(eq(users.id, req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // ===== ADMIN VENDOR MANAGEMENT =====
  app.get("/api/admin/vendors", async (req, res) => {
    try {
      const allVendors = await db.select().from(vendors).orderBy(desc(vendors.createdAt));
      res.json(allVendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.put("/api/admin/vendors/:id/status", async (req, res) => {
    try {
      const { isActive, isVerified } = req.body;
      const [vendor] = await db.update(vendors).set({ isActive, isVerified }).where(eq(vendors.id, req.params.id)).returning();
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to update vendor" });
    }
  });

  // ===== VENDOR PRODUCT MANAGEMENT =====
  app.get("/api/vendor/products", async (req, res) => {
    try {
      const { vendorId } = req.query;
      const vendorProducts = await db.select().from(products).where(eq(products.vendorId, vendorId as string));
      res.json(vendorProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  app.post("/api/vendor/products", async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // ===== AFFILIATE MANAGEMENT =====
  app.get("/api/affiliate/stats", async (req, res) => {
    try {
      const { affiliateId } = req.query;
      const [totalEarnings] = await db.select({ sum: sql<number>`COALESCE(SUM(CAST(amount AS NUMERIC)), 0)` }).from(affiliateTransactions).where(eq(affiliateTransactions.affiliateId, affiliateId as string));
      const [transactionCount] = await db.select({ count: sql<number>`count(*)` }).from(affiliateTransactions).where(eq(affiliateTransactions.affiliateId, affiliateId as string));
      
      res.json({
        totalEarnings: Number(totalEarnings?.sum || 0),
        transactionCount: Number(transactionCount?.count || 0)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliate stats" });
    }
  });

  app.get("/api/affiliate/campaigns/:code", async (req, res) => {
    try {
      const affiliate = await storage.getAffiliateByCode(req.params.code);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }
      res.json(affiliate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliate" });
    }
  });
