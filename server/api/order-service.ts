// Order service with real-time calculations
import { storage } from "../storage";
import { calculateCartTotals, calculateAffiliateCommission } from "./cart-calculator";

export interface OrderInput {
  userId?: string;
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  couponCode?: string;
  affiliateCode?: string;
  paymentMethod: string;
}

/**
 * Create order with automatic calculations
 */
export async function createOrderWithCalculations(input: OrderInput) {
  try {
    // Fetch products and get prices
    const cartItems = await Promise.all(
      input.items.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: parseFloat(product.price.toString()),
          product,
        };
      })
    );

    // Calculate totals automatically
    const calculation = calculateCartTotals(cartItems);

    // Create order with calculated values
    const order = await storage.createOrder(
      {
        userId: input.userId,
        orderNumber: `NX-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        status: "pending",
        paymentStatus: "pending",
        paymentMethod: input.paymentMethod,
        subtotal: calculation.subtotal.toString(),
        tax: calculation.tax.toString(),
        shipping: calculation.shipping.toString(),
        discount: calculation.discount.toString(),
        total: calculation.total.toString(),
        couponCode: input.couponCode,
        affiliateCode: input.affiliateCode,
        shippingAddress: input.shippingAddress,
      },
      cartItems.map((item) => ({
        productId: item.productId,
        productName: item.product?.name || "",
        productImage: item.product?.images?.[0] || null,
        quantity: item.quantity,
        price: item.price.toString(),
        total: (item.price * item.quantity).toString(),
        selectedColor: null,
        selectedSize: null,
        vendorId: item.product?.vendorId || null,
      } as any))
    );

    // Calculate and create affiliate transaction if applicable
    if (input.affiliateCode) {
      const affiliate = await storage.getAffiliateByCode(input.affiliateCode);
      if (affiliate) {
        const commission = calculateAffiliateCommission(
          calculation.total,
          parseFloat(affiliate.commissionRate?.toString() || "5")
        );

        // Transaction would be created here in a complete implementation
        console.log(
          `Affiliate ${affiliate.affiliateCode} earning: ৳${commission.toFixed(2)}`
        );
      }
    }

    return {
      success: true,
      order,
      calculation,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

/**
 * Get order with calculated stats
 */
export async function getOrderWithStats(orderId: string) {
  const order = await storage.getOrder(orderId);
  if (!order) {
    return null;
  }

  return {
    ...order,
    stats: {
      itemCount: order.items.length,
      profit: parseFloat(order.total.toString()) - parseFloat(order.subtotal.toString()),
      avgItemPrice: parseFloat(order.total.toString()) / order.items.length,
    },
  };
}

/**
 * Calculate dashboard analytics
 */
export async function calculateDashboardAnalytics() {
  const stats = await storage.getDashboardStats();

  return {
    ...stats,
    analytics: {
      avgOrderValue: stats.totalOrders > 0 
        ? stats.totalRevenue / stats.totalOrders 
        : 0,
      avgCustomerValue: stats.totalUsers > 0 
        ? stats.totalRevenue / stats.totalUsers 
        : 0,
      conversionRate: stats.totalUsers > 0 
        ? (stats.totalOrders / stats.totalUsers) * 100 
        : 0,
      topProductsCount: stats.topProducts.length,
      recentOrdersCount: stats.recentOrders.length,
    },
  };
}
