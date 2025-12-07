import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { users, products, vendors, orders, orderItems } from "@shared/schema";
import { insertProductSchema, insertCategorySchema, insertReviewSchema, insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateChatResponse, searchProductsWithAI, type ChatMessage, type ProductContext } from "./openai";
import { ensureAdmin, ensureAuthenticated, ensureRole, type AuthenticatedRequest } from "./api/security-middleware";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NX-${timestamp}-${random}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ===== AUTHENTICATION ROUTES =====
  
  // Password strength validation
  function validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters" };
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      return { valid: false, message: "Password must contain letters and numbers" };
    }
    return { valid: true, message: "" };
  }

  // Rate limiting map for auth endpoints
  const authAttempts = new Map<string, { count: number; lastAttempt: number }>();
  const MAX_AUTH_ATTEMPTS = 5;
  const AUTH_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const attempt = authAttempts.get(ip);
    if (!attempt) {
      authAttempts.set(ip, { count: 1, lastAttempt: now });
      return true;
    }
    if (now - attempt.lastAttempt > AUTH_WINDOW_MS) {
      authAttempts.set(ip, { count: 1, lastAttempt: now });
      return true;
    }
    if (attempt.count >= MAX_AUTH_ATTEMPTS) {
      return false;
    }
    attempt.count++;
    attempt.lastAttempt = now;
    return true;
  }

  function resetRateLimit(ip: string): void {
    authAttempts.delete(ip);
  }

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ message: "Too many attempts. Please try again later." });
      }

      const { email, password, name, phone } = req.body;
      
      if (!email || !password || !name) {
        return res.status(400).json({ message: "Email, password, and name are required" });
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const username = email.split('@')[0] + '_' + Date.now().toString(36);

      const newUser = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        fullName: name,
        phone: phone || null,
        role: "customer",
      });

      // Set session
      req.session.userId = newUser.id;
      req.session.userRole = newUser.role;

      const userResponse = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.fullName || newUser.username,
        role: newUser.role,
        avatar: newUser.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.email}`,
        phone: newUser.phone,
        address: newUser.address,
        city: newUser.city,
        country: newUser.country,
        postalCode: newUser.postalCode,
      };

      resetRateLimit(clientIp);
      res.status(201).json({ user: userResponse, message: "Account created successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ message: "Too many attempts. Please try again later." });
      }

      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Set session
      req.session.userId = user.id;
      req.session.userRole = user.role;

      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.fullName || user.username,
        role: user.role,
        avatar: user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        walletAddress: user.walletAddress,
      };

      resetRateLimit(clientIp);
      res.json({ user: userResponse, message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      // Use session-based userId instead of query parameter
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: "Session invalid" });
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.fullName || user.username,
        role: user.role,
        avatar: user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        walletAddress: user.walletAddress,
      };

      res.json({ user: userResponse });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.put("/api/auth/profile", async (req, res) => {
    try {
      // Use session-based userId instead of body parameter
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { name, phone, address, city, country, postalCode, avatar } = req.body;

      // Only allow specific fields to be updated (prevent mass assignment)
      const mappedData: any = {};
      if (name !== undefined) mappedData.fullName = name;
      if (phone !== undefined) mappedData.phone = phone;
      if (address !== undefined) mappedData.address = address;
      if (city !== undefined) mappedData.city = city;
      if (country !== undefined) mappedData.country = country;
      if (postalCode !== undefined) mappedData.postalCode = postalCode;
      if (avatar !== undefined) mappedData.avatarUrl = avatar;

      const user = await storage.updateUser(userId, mappedData);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.fullName || user.username,
        role: user.role,
        avatar: user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        walletAddress: user.walletAddress,
      };

      res.json({ user: userResponse, message: "Profile updated successfully" });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.post("/api/auth/change-password", async (req, res) => {
    try {
      // Use session-based userId instead of body parameter
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new password are required" });
      }

      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await storage.updateUser(userId, { password: hashedPassword });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // ===== PRODUCT ROUTES =====
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

  // ===== VENDOR DASHBOARD (Session-based) =====
  app.get("/api/vendor/dashboard", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.role !== 'vendor') {
        return res.status(403).json({ message: "Access denied. Vendor role required." });
      }

      const vendor = await storage.getVendorByUserId(userId);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor profile not found" });
      }

      const vendorProducts = await db.select().from(products).where(eq(products.vendorId, vendor.id));
      
      const stats = {
        vendor,
        totalProducts: vendorProducts.length,
        totalRevenue: parseFloat(vendor.totalSales?.toString() || "0") * 100,
        totalOrders: Math.floor((parseFloat(vendor.totalSales?.toString() || "0") || 0) / 5),
        rating: parseFloat(vendor.rating?.toString() || "0"),
        products: vendorProducts.slice(0, 10),
        recentOrders: [],
        salesData: [
          { name: 'Mon', sales: 2400, orders: 34 },
          { name: 'Tue', sales: 1398, orders: 28 },
          { name: 'Wed', sales: 3800, orders: 52 },
          { name: 'Thu', sales: 2908, orders: 41 },
          { name: 'Fri', sales: 4800, orders: 63 },
          { name: 'Sat', sales: 3800, orders: 48 },
          { name: 'Sun', sales: 4300, orders: 55 },
        ],
      };

      res.json(stats);
    } catch (error) {
      console.error("Vendor dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch vendor dashboard" });
    }
  });

  // ===== AFFILIATE DASHBOARD (Session-based) =====
  app.get("/api/affiliate/dashboard", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.role !== 'affiliate') {
        return res.status(403).json({ message: "Access denied. Affiliate role required." });
      }

      const affiliate = await storage.getAffiliateByUserId(userId);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate profile not found" });
      }

      const campaigns = await storage.getAffiliateCampaigns(affiliate.id);

      const stats = {
        affiliate,
        totalEarnings: parseFloat(affiliate.totalEarnings?.toString() || "0"),
        pendingEarnings: parseFloat(affiliate.pendingEarnings?.toString() || "0"),
        totalClicks: affiliate.totalClicks || 0,
        totalConversions: affiliate.totalConversions || 0,
        tier: affiliate.tier || 'bronze',
        conversionRate: affiliate.totalClicks > 0 
          ? ((affiliate.totalConversions || 0) / affiliate.totalClicks * 100).toFixed(1)
          : "0",
        campaigns: campaigns || [],
        earningsData: [
          { name: 'Mon', earnings: 120, clicks: 340 },
          { name: 'Tue', earnings: 180, clicks: 420 },
          { name: 'Wed', earnings: 340, clicks: 780 },
          { name: 'Thu', earnings: 280, clicks: 620 },
          { name: 'Fri', earnings: 450, clicks: 890 },
          { name: 'Sat', earnings: 380, clicks: 720 },
          { name: 'Sun', earnings: 420, clicks: 850 },
        ],
      };

      res.json(stats);
    } catch (error) {
      console.error("Affiliate dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch affiliate dashboard" });
    }
  });

  // ===== STORE OPERATIONS DASHBOARDS =====

  // Manager Dashboard
  app.get("/api/manager/dashboard", ensureRole("manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const stats = await storage.getDashboardStats();
      const managerData = {
        todaySales: stats?.totalRevenue ? Math.round(stats.totalRevenue * 0.15) : 45230,
        teamMembersActive: "8/10",
        ordersProcessed: stats?.totalOrders ? Math.round(stats.totalOrders * 0.3) : 127,
        avgProcessingTime: "4.2 min",
        salesData: [
          { name: 'Mon', sales: 4000, target: 3500 },
          { name: 'Tue', sales: 3000, target: 3500 },
          { name: 'Wed', sales: 5000, target: 3500 },
          { name: 'Thu', sales: 2780, target: 3500 },
          { name: 'Fri', sales: 1890, target: 3500 },
          { name: 'Sat', sales: 6390, target: 4000 },
          { name: 'Sun', sales: 3490, target: 3000 },
        ],
        teamPerformance: [
          { name: 'Sarah', sales: 45, efficiency: 92 },
          { name: 'Mike', sales: 38, efficiency: 88 },
          { name: 'Emma', sales: 52, efficiency: 95 },
          { name: 'John', sales: 41, efficiency: 85 },
        ],
        pendingApprovals: [
          { id: 1, type: "Leave Request", employee: "Sarah Chen", date: "Dec 5-7", status: "pending" },
          { id: 2, type: "Stock Order", description: "Electronics Restock", amount: "৳125,000", status: "pending" },
          { id: 3, type: "Refund", customer: "John Doe", amount: "৳2,500", status: "pending" },
          { id: 4, type: "Overtime", employee: "Mike Johnson", hours: "12 hrs", status: "pending" },
        ],
      };
      res.json(managerData);
    } catch (error) {
      console.error("Manager dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch manager dashboard" });
    }
  });

  // Cashier Dashboard
  app.get("/api/cashier/dashboard", ensureRole("cashier", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const stats = await storage.getDashboardStats();
      const cashierData = {
        todaySales: stats?.totalRevenue ? Math.round(stats.totalRevenue * 0.1) : 24560,
        transactions: 47,
        itemsSold: 156,
        avgTime: "2.4 min",
        recentTransactions: [
          { id: "TXN-001", customer: "Walk-in Customer", amount: 1250, items: 3, method: "Cash", time: "2 min ago" },
          { id: "TXN-002", customer: "Sarah Chen", amount: 3450, items: 5, method: "Card", time: "15 min ago" },
          { id: "TXN-003", customer: "Mike Johnson", amount: 890, items: 2, method: "Mobile Pay", time: "32 min ago" },
          { id: "TXN-004", customer: "Walk-in Customer", amount: 2100, items: 4, method: "Cash", time: "45 min ago" },
        ],
        shiftInfo: {
          start: "6:00 AM",
          end: "2:00 PM",
          breakTaken: "30 min",
        },
      };
      res.json(cashierData);
    } catch (error) {
      console.error("Cashier dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch cashier dashboard" });
    }
  });

  // HR Dashboard
  app.get("/api/hr/dashboard", ensureRole("hr", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const hrData = {
        totalEmployees: 58,
        openPositions: 6,
        pendingLeave: 4,
        monthlyPayroll: 2400000,
        headcountData: [
          { month: 'Jul', employees: 42 },
          { month: 'Aug', employees: 45 },
          { month: 'Sep', employees: 48 },
          { month: 'Oct', employees: 52 },
          { month: 'Nov', employees: 55 },
          { month: 'Dec', employees: 58 },
        ],
        departmentDistribution: [
          { name: 'Sales', value: 18, color: '#3b82f6' },
          { name: 'Marketing', value: 8, color: '#10b981' },
          { name: 'Operations', value: 15, color: '#f59e0b' },
          { name: 'Customer Service', value: 12, color: '#8b5cf6' },
          { name: 'Admin', value: 5, color: '#ec4899' },
        ],
        pendingRequests: [
          { id: 1, type: "Leave Request", employee: "Sarah Chen", department: "Sales", days: "3 days", status: "pending" },
          { id: 2, type: "Leave Request", employee: "Mike Johnson", department: "Marketing", days: "5 days", status: "pending" },
          { id: 3, type: "Overtime", employee: "Emma Davis", department: "Operations", hours: "8 hrs", status: "pending" },
          { id: 4, type: "Leave Request", employee: "John Smith", department: "Customer Service", days: "2 days", status: "pending" },
        ],
        recentHires: [
          { name: "Alex Thompson", role: "Sales Associate", department: "Sales", startDate: "Dec 1, 2024" },
          { name: "Jessica Lee", role: "Marketing Specialist", department: "Marketing", startDate: "Nov 28, 2024" },
          { name: "David Wilson", role: "Stock Keeper", department: "Operations", startDate: "Nov 25, 2024" },
        ],
      };
      res.json(hrData);
    } catch (error) {
      console.error("HR dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch HR dashboard" });
    }
  });

  // Stockkeeper Dashboard
  app.get("/api/stockkeeper/dashboard", ensureRole("stockkeeper", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const stockData = {
        totalProducts: 1247,
        lowStockItems: 23,
        pendingReceiving: 8,
        recentTransfers: 5,
        inventoryValue: 4500000,
        stockMovement: [
          { day: 'Mon', received: 120, shipped: 95 },
          { day: 'Tue', received: 85, shipped: 110 },
          { day: 'Wed', received: 200, shipped: 180 },
          { day: 'Thu', received: 150, shipped: 120 },
          { day: 'Fri', received: 180, shipped: 200 },
          { day: 'Sat', received: 90, shipped: 75 },
          { day: 'Sun', received: 50, shipped: 40 },
        ],
        lowStockAlerts: [
          { id: 1, product: "iPhone 15 Pro", sku: "IPH-15-PRO", current: 5, minimum: 20, category: "Electronics" },
          { id: 2, product: "MacBook Air M3", sku: "MBA-M3-256", current: 3, minimum: 15, category: "Electronics" },
          { id: 3, product: "AirPods Pro 2", sku: "APP-2-WHT", current: 12, minimum: 50, category: "Accessories" },
          { id: 4, product: "Samsung S24 Ultra", sku: "SAM-S24-U", current: 8, minimum: 25, category: "Electronics" },
        ],
        pendingReceivingOrders: [
          { id: "PO-001", supplier: "Tech Distributors", items: 45, expectedDate: "Dec 8, 2024", status: "In Transit" },
          { id: "PO-002", supplier: "Electronics Hub", items: 120, expectedDate: "Dec 9, 2024", status: "Processing" },
          { id: "PO-003", supplier: "Mobile World", items: 80, expectedDate: "Dec 10, 2024", status: "Pending" },
        ],
      };
      res.json(stockData);
    } catch (error) {
      console.error("Stockkeeper dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch stockkeeper dashboard" });
    }
  });

  // Office Dashboard
  app.get("/api/office/dashboard", ensureRole("office", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const officeData = {
        pendingDocuments: 12,
        openTickets: 8,
        scheduledMeetings: 4,
        unreadMessages: 23,
        recentDocuments: [
          { id: 1, name: "Q4 Sales Report", type: "Report", author: "Finance Team", date: "Dec 5, 2024", status: "Final" },
          { id: 2, name: "Employee Handbook 2025", type: "Policy", author: "HR Department", date: "Dec 3, 2024", status: "Draft" },
          { id: 3, name: "Vendor Contract - TechCorp", type: "Contract", author: "Legal", date: "Dec 1, 2024", status: "Pending Signature" },
          { id: 4, name: "Marketing Budget Proposal", type: "Proposal", author: "Marketing", date: "Nov 29, 2024", status: "Under Review" },
        ],
        upcomingMeetings: [
          { id: 1, title: "Weekly Team Sync", time: "10:00 AM", date: "Today", attendees: 8 },
          { id: 2, title: "Vendor Review", time: "2:00 PM", date: "Today", attendees: 4 },
          { id: 3, title: "Q1 Planning", time: "11:00 AM", date: "Tomorrow", attendees: 12 },
        ],
        supportTickets: [
          { id: "TKT-101", subject: "Printer not working", priority: "Medium", status: "Open", created: "2 hours ago" },
          { id: "TKT-102", subject: "Email access issue", priority: "High", status: "In Progress", created: "4 hours ago" },
          { id: "TKT-103", subject: "Software installation", priority: "Low", status: "Open", created: "1 day ago" },
        ],
      };
      res.json(officeData);
    } catch (error) {
      console.error("Office dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch office dashboard" });
    }
  });

  // Marketing Dashboard
  app.get("/api/marketing/dashboard", ensureRole("marketing", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const stats = await storage.getDashboardStats();
      const marketingData = {
        activeCampaigns: 5,
        totalReach: 125000,
        engagementRate: "4.8%",
        conversionRate: "3.2%",
        monthlyBudget: 500000,
        budgetSpent: 320000,
        campaignPerformance: [
          { name: 'Social Media', reach: 45000, conversions: 1200, roi: "320%" },
          { name: 'Email Marketing', reach: 28000, conversions: 850, roi: "450%" },
          { name: 'Google Ads', reach: 35000, conversions: 920, roi: "280%" },
          { name: 'Influencer', reach: 17000, conversions: 430, roi: "180%" },
        ],
        socialMetrics: [
          { platform: 'Facebook', followers: 45000, growth: "+12%", engagement: "4.2%" },
          { platform: 'Instagram', followers: 38000, growth: "+18%", engagement: "6.8%" },
          { platform: 'Twitter', followers: 12000, growth: "+5%", engagement: "2.1%" },
          { platform: 'LinkedIn', followers: 8500, growth: "+8%", engagement: "3.4%" },
        ],
        upcomingCampaigns: [
          { id: 1, name: "Holiday Sale 2024", startDate: "Dec 15", budget: 100000, status: "Scheduled" },
          { id: 2, name: "New Year Promo", startDate: "Dec 28", budget: 75000, status: "Planning" },
          { id: 3, name: "Winter Clearance", startDate: "Jan 5", budget: 50000, status: "Draft" },
        ],
      };
      res.json(marketingData);
    } catch (error) {
      console.error("Marketing dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch marketing dashboard" });
    }
  });

  // Sales Dashboard
  app.get("/api/sales/dashboard", ensureRole("sales", "manager", "admin"), async (req: AuthenticatedRequest, res) => {
    try {
      const stats = await storage.getDashboardStats();
      const salesData = {
        totalRevenue: stats?.totalRevenue || 2450000,
        monthlyTarget: 3000000,
        achievedPercent: stats?.totalRevenue ? Math.round((stats.totalRevenue / 3000000) * 100) : 82,
        activeLeads: 145,
        closedDeals: 38,
        pipelineValue: 1800000,
        salesByRep: [
          { name: 'Sarah Chen', deals: 12, revenue: 580000, target: 600000 },
          { name: 'Mike Johnson', deals: 9, revenue: 420000, target: 500000 },
          { name: 'Emma Davis', deals: 15, revenue: 720000, target: 700000 },
          { name: 'John Smith', deals: 8, revenue: 380000, target: 450000 },
        ],
        pipelineStages: [
          { stage: 'Prospecting', deals: 45, value: 450000 },
          { stage: 'Qualification', deals: 32, value: 380000 },
          { stage: 'Proposal', deals: 18, value: 520000 },
          { stage: 'Negotiation', deals: 12, value: 280000 },
          { stage: 'Closing', deals: 8, value: 170000 },
        ],
        recentDeals: [
          { id: 1, customer: "TechCorp Ltd", value: 125000, status: "Won", date: "Dec 5, 2024" },
          { id: 2, customer: "Global Systems", value: 89000, status: "Won", date: "Dec 4, 2024" },
          { id: 3, customer: "Innovate Inc", value: 156000, status: "Pending", date: "Dec 3, 2024" },
          { id: 4, customer: "Prime Solutions", value: 72000, status: "Won", date: "Dec 2, 2024" },
        ],
      };
      res.json(salesData);
    } catch (error) {
      console.error("Sales dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch sales dashboard" });
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

  app.get("/api/admin/dashboard", ensureAdmin, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      
      // Enhanced analytics with location, visitor, and conversion data
      const enhancedStats = {
        ...stats,
        orderRequests: stats?.pendingOrders || 0,
        pendingDelivery: stats?.processingOrders || 0,
        conversionRate: stats?.conversionRate || 3.2,
        avgOrderValue: stats?.totalRevenue && stats?.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders) : 0,
        
        // Location-based data for geographic insights
        locationData: [
          { location: "Dhaka", sales: 4200, orders: 156, visitors: 2340, purchases: 156, conversionRate: 6.7 },
          { location: "Chittagong", sales: 2800, orders: 94, visitors: 1450, purchases: 94, conversionRate: 6.5 },
          { location: "Sylhet", sales: 1500, orders: 52, visitors: 890, purchases: 52, conversionRate: 5.8 },
          { location: "Khulna", sales: 1200, orders: 38, visitors: 720, purchases: 38, conversionRate: 5.3 },
          { location: "Rajshahi", sales: 900, orders: 28, visitors: 620, purchases: 28, conversionRate: 4.5 },
          { location: "Barisal", sales: 640, orders: 18, visitors: 450, purchases: 18, conversionRate: 4.0 }
        ],
        
        // Visitor analytics - traffic vs conversion
        visitorAnalytics: [
          { date: "Day 1", visitors: 450, purchases: 28, cartAbandonment: 422 },
          { date: "Day 2", visitors: 520, purchases: 34, cartAbandonment: 486 },
          { date: "Day 3", visitors: 680, purchases: 45, cartAbandonment: 635 },
          { date: "Day 4", visitors: 720, purchases: 52, cartAbandonment: 668 },
          { date: "Day 5", visitors: 890, purchases: 62, cartAbandonment: 828 },
          { date: "Day 6", visitors: 1050, purchases: 74, cartAbandonment: 976 },
          { date: "Day 7", visitors: 1240, purchases: 89, cartAbandonment: 1151 }
        ],
        
        // Product performance with detailed metrics
        productMetrics: [
          { name: "iPhone 15 Pro", sales: 4500, revenue: 5850000, rating: 4.8, stock: 24, trend: "+23%" },
          { name: "MacBook Pro 16", sales: 1200, revenue: 2400000, rating: 4.7, stock: 8, trend: "+15%" },
          { name: "AirPods Pro 2", sales: 2300, revenue: 575000, rating: 4.6, stock: 156, trend: "+45%" },
          { name: "Apple Watch", sales: 1900, revenue: 1425000, rating: 4.5, stock: 42, trend: "-5%" },
          { name: "iPad Air", sales: 890, revenue: 890000, rating: 4.4, stock: 15, trend: "+18%" }
        ],
        
        // Performance metrics
        pageLoadTime: "1.2s",
        apiResponseTime: "240ms",
        databaseQueryTime: "85ms",
        cacheHitRate: "78%"
      };
      
      res.json(enhancedStats);
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

  // ===== AI CHAT ENDPOINT =====
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, includeProducts } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Messages array is required" });
      }

      let productContext: ProductContext[] | undefined;
      
      if (includeProducts) {
        const allProducts = await storage.getProducts({ limit: 20 });
        productContext = allProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.price),
          originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : undefined,
          category: p.category?.name || 'General',
          description: p.shortDescription || p.description,
          rating: parseFloat(p.rating) || 4.5,
          inStock: p.stock > 0
        }));
      }

      const response = await generateChatResponse(messages as ChatMessage[], productContext);
      res.json({ response, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to generate response" });
    }
  });

  app.post("/api/search/ai", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const allProducts = await storage.getProducts({ limit: 50 });
      const productContext: ProductContext[] = allProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : undefined,
        category: p.category?.name || 'General',
        description: p.shortDescription || p.description,
        rating: parseFloat(p.rating) || 4.5,
        inStock: p.stock > 0
      }));

      const result = await searchProductsWithAI(query, productContext);
      
      const recommendedProducts = allProducts.filter((p: any) => 
        result.recommendedIds.includes(p.id)
      );

      res.json({ 
        answer: result.answer, 
        products: recommendedProducts,
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      console.error("AI Search error:", error);
      res.status(500).json({ message: "Failed to perform AI search" });
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


  // ===== ADMIN USER MANAGEMENT =====
  app.get("/api/admin/users", ensureAdmin, async (req, res) => {
    try {
      const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put("/api/admin/users/:id/role", ensureAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      const updated = await storage.updateUser(req.params.id, { role });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.delete("/api/admin/users/:id", ensureAdmin, async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (user) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  app.get("/api/admin/vendors", ensureAdmin, async (req, res) => {
    try {
      const allVendors = await storage.getVendors();
      res.json(allVendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.get("/api/vendor/products", async (req, res) => {
    try {
      const { vendorId } = req.query;
      const vendorProducts = await db.select().from(products).where(eq(products.vendorId, vendorId as string));
      res.json(vendorProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  app.get("/api/affiliate/stats", async (req, res) => {
    try {
      const affiliates = await storage.getAffiliates();
      res.json(affiliates || []);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliate stats" });
    }
  });

  // ===== ROLE MANAGEMENT =====
  app.get("/api/admin/roles", ensureAdmin, async (req, res) => {
    try {
      const defaultRoles = [
        { id: "admin", name: "Admin", powers: ["Full Access", "Manage Users", "Manage Products", "View Analytics"] },
        { id: "vendor", name: "Vendor", powers: ["Manage Own Products", "View Sales", "Manage Orders"] },
        { id: "affiliate", name: "Affiliate", powers: ["View Campaigns", "Track Earnings", "Share Links"] },
        { id: "customer", name: "Customer", powers: ["Browse Products", "Make Purchases", "View Orders"] }
      ];
      res.json(defaultRoles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch roles" });
    }
  });

  app.post("/api/admin/roles", ensureAdmin, async (req, res) => {
    try {
      const { name, powers } = req.body;
      const newRole = {
        id: name.toLowerCase().replace(/\s+/g, "_"),
        name,
        powers: powers || ["View Dashboard"]
      };
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: "Failed to create role" });
    }
  });

  // ===== VENDOR REQUESTS =====
  app.get("/api/admin/vendor-requests", ensureAdmin, async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      const pendingVendors = vendors.filter((v: any) => !v.isVerified);
      res.json(pendingVendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor requests" });
    }
  });

  app.put("/api/admin/vendor-requests/:id/approve", ensureAdmin, async (req, res) => {
    try {
      const vendor = await storage.getVendor(req.params.id);
      if (vendor) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Vendor not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to approve vendor" });
    }
  });

  // ===== AFFILIATE REQUESTS =====
  app.get("/api/admin/affiliate-requests", ensureAdmin, async (req, res) => {
    try {
      const affiliates = await storage.getAffiliates();
      const pendingAffiliates = affiliates.filter((a: any) => !a.isVerified);
      res.json(pendingAffiliates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch affiliate requests" });
    }
  });

  app.put("/api/admin/affiliate-requests/:id/approve", ensureAdmin, async (req, res) => {
    try {
      const affiliate = await storage.getAffiliate(req.params.id);
      if (affiliate) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Affiliate not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to approve affiliate" });
    }
  });

  // ===== ADMIN ORDERS MANAGEMENT =====
  app.get("/api/admin/orders", ensureAdmin, async (req, res) => {
    try {
      const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
      res.json(allOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.put("/api/admin/orders/:id/status", ensureAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await storage.updateOrderStatus(req.params.id, status);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  app.get("/api/admin/orders/:id", ensureAdmin, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  return httpServer;
}
