// Security middleware for authentication, rate limiting, and input validation
import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// ===== AUTHENTICATION & AUTHORIZATION MIDDLEWARE =====

export async function ensureAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.session?.userId;
    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const user = await storage.getUser(userId);
    if (!user) {
      req.session?.destroy(() => {});
      res.status(401).json({ message: "Session invalid" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Authentication error" });
  }
}

export async function ensureAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.session?.userId;
    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const user = await storage.getUser(userId);
    if (!user) {
      req.session?.destroy(() => {});
      res.status(401).json({ message: "Session invalid" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ message: "Authorization error" });
  }
}

export function ensureRole(...allowedRoles: string[]) {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.session?.userId;
      if (!userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      const user = await storage.getUser(userId);
      if (!user) {
        req.session?.destroy(() => {});
        res.status(401).json({ message: "Session invalid" });
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ 
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}` 
        });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Role middleware error:", error);
      res.status(500).json({ message: "Authorization error" });
    }
  };
}

// Rate limiting store (in production, use Redis)
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {};

/**
 * Rate limiter middleware
 * Limit requests per IP address
 */
export function rateLimiter(
  windowMs: number = 60000, // 1 minute
  maxRequests: number = 100
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || "unknown";
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = { count: 1, resetTime: now + windowMs };
      return next();
    }

    const record = rateLimitStore[ip];

    // Reset if time window has passed
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }

    // Increment counter
    record.count++;

    if (record.count > maxRequests) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      });
    }

    next();
  };
}

/**
 * CORS middleware
 */
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}

/**
 * Input validation and sanitization
 */
export function validateInput(data: any, schema: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // Check required fields
  for (const field in schema) {
    if (schema[field].required && !data[field]) {
      errors.push(`${field} is required`);
    }

    // Type validation
    if (data[field] && schema[field].type) {
      if (typeof data[field] !== schema[field].type) {
        errors.push(
          `${field} must be of type ${schema[field].type}`
        );
      }
    }

    // Range validation
    if (schema[field].min !== undefined && data[field] < schema[field].min) {
      errors.push(`${field} must be at least ${schema[field].min}`);
    }

    if (schema[field].max !== undefined && data[field] > schema[field].max) {
      errors.push(`${field} must be at most ${schema[field].max}`);
    }

    // Pattern validation
    if (schema[field].pattern && data[field]) {
      const regex = new RegExp(schema[field].pattern);
      if (!regex.test(data[field])) {
        errors.push(`${field} format is invalid`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * XSS protection - sanitize string inputs
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/"/g, "&quot;") // Escape quotes
    .trim();
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d+\-\s()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

/**
 * Validate coupon code
 */
export function isValidCouponCode(code: string): boolean {
  return /^[A-Z0-9]{3,15}$/.test(code);
}
