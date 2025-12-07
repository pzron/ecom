import { db } from "./db";
import { categories, products, users, coupons, settings, vendors, affiliates } from "@shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { name: "Health Items", slug: "health-items", icon: "💊", description: "Health and wellness products" },
  { name: "Cosmetics Items", slug: "cosmetics-items", icon: "💄", description: "Beauty and cosmetic products" },
  { name: "Tea & Coffee", slug: "tea-coffee", icon: "☕", description: "Premium tea and coffee" },
  { name: "Hair Oil & Gel", slug: "hair-oil-gel", icon: "💆", description: "Hair care products" },
  { name: "Consumer Items", slug: "consumer-items", icon: "🛒", description: "Daily consumer products" },
  { name: "Salon & Parlour", slug: "salon-parlour", icon: "✨", description: "Salon and beauty parlour supplies" },
  { name: "Electronics", slug: "electronics", icon: "⚡", description: "Electronic devices and gadgets" },
  { name: "Fashion", slug: "fashion", icon: "👔", description: "Clothing and fashion accessories" },
  { name: "Home & Living", slug: "home-living", icon: "🏠", description: "Home decor and living essentials" },
  { name: "Sports & Fitness", slug: "sports-fitness", icon: "🏋️", description: "Sports and fitness equipment" },
  { name: "Gaming", slug: "gaming", icon: "🎮", description: "Gaming consoles and accessories" },
  { name: "Jewelry & Watches", slug: "jewelry-watches", icon: "💎", description: "Jewelry and watches" },
  { name: "Books & Media", slug: "books-media", icon: "📚", description: "Books, music, and media" },
  { name: "Kids & Toys", slug: "kids-toys", icon: "🧸", description: "Children's toys and products" },
  { name: "Food & Grocery", slug: "food-grocery", icon: "🍔", description: "Food and grocery items" },
];

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055uj8e155d?w=400",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
];

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length > 0) {
      console.log("📦 Database already seeded, skipping...");
      return;
    }

    console.log("📁 Creating categories...");
    const createdCategories = await db.insert(categories).values(
      categoryData.map((cat, index) => ({
        ...cat,
        sortOrder: index,
      }))
    ).returning();
    console.log(`✅ Created ${createdCategories.length} categories`);

    console.log("🛍️ Creating products...");
    const productData = [];
    const productNames = [
      { name: "Bcare Chamomile Premium Face Cream", price: 450, originalPrice: 599 },
      { name: "Milk Apricot Moisturizing Lotion", price: 380, originalPrice: 499 },
      { name: "Bcare Whitening Face Wash", price: 320, originalPrice: 420 },
      { name: "Green Tea Extract Serum", price: 890, originalPrice: 1200 },
      { name: "Vitamin C Brightening Cream", price: 650, originalPrice: 850 },
      { name: "Aloe Vera Soothing Gel", price: 280, originalPrice: 350 },
      { name: "Hyaluronic Acid Hydrating Serum", price: 1200, originalPrice: 1500 },
      { name: "Retinol Anti-Aging Night Cream", price: 1450, originalPrice: 1800 },
      { name: "Niacinamide Pore Minimizer", price: 780, originalPrice: 950 },
      { name: "Sunscreen SPF 50+ Protection", price: 520, originalPrice: 680 },
      { name: "Rose Water Facial Toner", price: 250, originalPrice: 320 },
      { name: "Coconut Oil Hair Treatment", price: 340, originalPrice: 450 },
      { name: "Argan Oil Repair Shampoo", price: 420, originalPrice: 550 },
      { name: "Keratin Protein Conditioner", price: 380, originalPrice: 499 },
      { name: "Tea Tree Scalp Treatment", price: 560, originalPrice: 720 },
      { name: "Premium Darjeeling Tea 250g", price: 890, originalPrice: 1100 },
      { name: "Arabica Coffee Beans 500g", price: 650, originalPrice: 850 },
      { name: "Green Tea Matcha Powder", price: 780, originalPrice: 950 },
      { name: "Organic Herbal Tea Collection", price: 450, originalPrice: 580 },
      { name: "Espresso Blend Ground Coffee", price: 520, originalPrice: 680 },
      { name: "Wireless Bluetooth Earbuds", price: 2500, originalPrice: 3500 },
      { name: "Smart Watch Pro Series", price: 4500, originalPrice: 5999 },
      { name: "Portable Power Bank 20000mAh", price: 1200, originalPrice: 1600 },
      { name: "USB-C Fast Charger 65W", price: 850, originalPrice: 1100 },
      { name: "Noise Cancelling Headphones", price: 5500, originalPrice: 7000 },
      { name: "4K Action Camera Waterproof", price: 8500, originalPrice: 11000 },
      { name: "LED Ring Light Professional", price: 1800, originalPrice: 2400 },
      { name: "Mechanical Gaming Keyboard", price: 3200, originalPrice: 4200 },
      { name: "Ergonomic Gaming Mouse", price: 1500, originalPrice: 2000 },
      { name: "27-inch Gaming Monitor 144Hz", price: 25000, originalPrice: 32000 },
      { name: "Cotton Premium T-Shirt", price: 850, originalPrice: 1100 },
      { name: "Slim Fit Denim Jeans", price: 1500, originalPrice: 2000 },
      { name: "Casual Sneakers White", price: 2200, originalPrice: 2800 },
      { name: "Leather Belt Premium", price: 650, originalPrice: 850 },
      { name: "Polarized Sunglasses", price: 1200, originalPrice: 1600 },
      { name: "Sports Running Shoes", price: 3500, originalPrice: 4500 },
      { name: "Yoga Mat Premium 6mm", price: 1200, originalPrice: 1600 },
      { name: "Resistance Bands Set", price: 650, originalPrice: 850 },
      { name: "Adjustable Dumbbells 20kg", price: 4500, originalPrice: 5800 },
      { name: "Jump Rope Speed Training", price: 350, originalPrice: 480 },
    ];

    for (let i = 0; i < productNames.length; i++) {
      const product = productNames[i];
      const categoryIndex = i % createdCategories.length;
      const imageIndex = i % productImages.length;
      
      productData.push({
        name: product.name,
        slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
        description: `High-quality ${product.name}. Premium product with excellent reviews and customer satisfaction.`,
        shortDescription: `Premium ${product.name} for everyday use`,
        price: product.price.toString(),
        originalPrice: product.originalPrice.toString(),
        categoryId: createdCategories[categoryIndex].id,
        images: [productImages[imageIndex], productImages[(imageIndex + 1) % productImages.length]],
        colors: [
          { name: "Default", value: "#D3C1E7" },
          { name: "Dark", value: "#1A1222" },
          { name: "Blue", value: "#3b82f6" }
        ],
        sizes: i < 30 ? ["S", "M", "L", "XL"] : [],
        stock: Math.floor(Math.random() * 100) + 10,
        sku: `SKU-${String(i + 1).padStart(5, '0')}`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 500) + 10,
        isNew: i < 10,
        isBestseller: i >= 5 && i < 15,
        isFeatured: i < 20,
        isActive: true,
        tags: ["premium", "quality", "trending"],
      });
    }

    const createdProducts = await db.insert(products).values(productData as any).returning();
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log("👤 Creating admin user...");
    const adminUser = await db.insert(users).values({
      username: "admin",
      email: "admin@nexcommerce.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      role: "admin",
      fullName: "System Administrator",
      isVerified: true,
    }).returning();
    console.log(`✅ Created admin user: ${adminUser[0].email}`);

    console.log("👥 Creating sample vendor...");
    const vendorUser = await db.insert(users).values({
      username: "vendor1",
      email: "vendor@example.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      role: "vendor",
      fullName: "Sample Vendor",
      isVerified: true,
    }).returning();
    
    await db.insert(vendors).values({
      userId: vendorUser[0].id,
      storeName: "Premium Store",
      storeSlug: "premium-store",
      description: "Quality products at great prices",
      contactEmail: "vendor@example.com",
      isVerified: true,
      isActive: true,
      rating: "4.5",
      totalSales: 150,
    });
    console.log("✅ Created sample vendor");

    console.log("🔗 Creating sample affiliate...");
    const affiliateUser = await db.insert(users).values({
      username: "affiliate1",
      email: "affiliate@example.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      role: "affiliate",
      fullName: "Sample Affiliate",
      isVerified: true,
    }).returning();
    
    await db.insert(affiliates).values({
      userId: affiliateUser[0].id,
      affiliateCode: "AFF2024",
      commissionRate: "5.00",
      tier: "silver",
      totalEarnings: "2500.00",
      pendingEarnings: "350.00",
      totalClicks: 1250,
      totalConversions: 45,
      isActive: true,
    });
    console.log("✅ Created sample affiliate");

    console.log("🎫 Creating coupons...");
    await db.insert(coupons).values([
      { code: "SAVE10", type: "percentage", value: "10", minPurchase: "500", isActive: true },
      { code: "SAVE20", type: "percentage", value: "20", minPurchase: "1000", maxDiscount: "500", isActive: true },
      { code: "FLAT100", type: "fixed", value: "100", minPurchase: "500", isActive: true },
      { code: "NEWUSER", type: "percentage", value: "15", isActive: true },
      { code: "FREESHIP", type: "fixed", value: "50", minPurchase: "300", isActive: true },
    ]);
    console.log("✅ Created coupons");

    console.log("⚙️ Creating settings...");
    await db.insert(settings).values([
      { key: "site_name", value: JSON.stringify("NexCommerce"), category: "general" },
      { key: "site_description", value: JSON.stringify("The Future of Shopping Starts Here"), category: "general" },
      { key: "currency", value: JSON.stringify("BDT"), category: "general" },
      { key: "currency_symbol", value: JSON.stringify("৳"), category: "general" },
      { key: "shipping_free_threshold", value: JSON.stringify(1000), category: "shipping" },
      { key: "shipping_standard_rate", value: JSON.stringify(60), category: "shipping" },
      { key: "shipping_express_rate", value: JSON.stringify(120), category: "shipping" },
      { key: "tax_rate", value: JSON.stringify(5), category: "tax" },
      { key: "affiliate_commission_rate", value: JSON.stringify(5), category: "affiliate" },
      { key: "vendor_commission_rate", value: JSON.stringify(10), category: "vendor" },
    ]);
    console.log("✅ Created settings");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seed error:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
