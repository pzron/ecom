import { db } from "./db";
import { categories, products, users, coupons, settings, vendors, affiliates } from "@shared/schema";
import { sql } from "drizzle-orm";

const mainCategories = [
  { name: "Health & Wellness", icon: "💊", description: "Health and wellness products for a better life" },
  { name: "Beauty & Cosmetics", icon: "💄", description: "Premium beauty and cosmetic products" },
  { name: "Food & Beverages", icon: "☕", description: "Quality food and beverage items" },
  { name: "Hair Care", icon: "💆", description: "Professional hair care solutions" },
  { name: "Consumer Goods", icon: "🛒", description: "Daily consumer essentials" },
  { name: "Salon Supplies", icon: "✨", description: "Professional salon and beauty parlour supplies" },
  { name: "Electronics", icon: "⚡", description: "Latest electronic devices and gadgets" },
  { name: "Fashion & Apparel", icon: "👔", description: "Trendy clothing and fashion accessories" },
  { name: "Home & Living", icon: "🏠", description: "Home decor and living essentials" },
  { name: "Sports & Fitness", icon: "🏋️", description: "Sports equipment and fitness gear" },
  { name: "Gaming & Entertainment", icon: "🎮", description: "Gaming consoles and entertainment" },
  { name: "Jewelry & Accessories", icon: "💎", description: "Elegant jewelry and accessories" },
  { name: "Books & Stationery", icon: "📚", description: "Books, stationery and office supplies" },
  { name: "Kids & Baby", icon: "🧸", description: "Products for children and babies" },
  { name: "Pet Supplies", icon: "🐾", description: "Everything for your pets" },
  { name: "Automotive", icon: "🚗", description: "Automotive parts and accessories" },
  { name: "Garden & Outdoor", icon: "🌻", description: "Garden tools and outdoor living" },
  { name: "Tools & Hardware", icon: "🔧", description: "Tools and hardware supplies" },
  { name: "Art & Crafts", icon: "🎨", description: "Art supplies and craft materials" },
  { name: "Musical Instruments", icon: "🎵", description: "Musical instruments and accessories" },
];

const subCategoriesByMain: Record<string, string[]> = {
  "Health & Wellness": ["Vitamins & Supplements", "First Aid", "Medical Equipment", "Personal Care", "Organic Health", "Weight Management", "Sleep & Relaxation", "Pain Relief", "Digestive Health", "Immunity Boosters"],
  "Beauty & Cosmetics": ["Face Care", "Body Care", "Makeup", "Skincare", "Sun Protection", "Anti-Aging", "Natural Beauty", "Lip Care", "Eye Care", "Nail Care"],
  "Food & Beverages": ["Tea & Coffee", "Snacks", "Organic Food", "Beverages", "Condiments", "Baking", "Dairy Products", "Frozen Foods", "Health Foods", "International Cuisine"],
  "Hair Care": ["Shampoo", "Conditioner", "Hair Oil", "Hair Styling", "Hair Color", "Hair Treatment", "Hair Tools", "Scalp Care", "Hair Accessories", "Men's Hair Care"],
  "Consumer Goods": ["Household Items", "Cleaning Supplies", "Kitchen Essentials", "Bathroom Essentials", "Storage Solutions", "Paper Products", "Laundry Supplies", "Air Fresheners", "Pest Control", "Trash Bags"],
  "Salon Supplies": ["Professional Tools", "Hair Chemicals", "Salon Furniture", "Manicure Sets", "Pedicure Tools", "Waxing Supplies", "Facial Equipment", "Towels & Robes", "Sterilization", "Display Items"],
  "Electronics": ["Mobile Accessories", "Audio Equipment", "Wearable Tech", "Computer Accessories", "Smart Home", "Cameras", "Power Solutions", "Cables & Adapters", "Storage Devices", "Gaming Accessories"],
  "Fashion & Apparel": ["Men's Wear", "Women's Wear", "Footwear", "Bags & Wallets", "Sunglasses", "Watches", "Belts", "Scarves", "Hats & Caps", "Ethnic Wear"],
  "Home & Living": ["Furniture", "Decor", "Lighting", "Bedding", "Kitchen & Dining", "Bath", "Storage", "Rugs & Carpets", "Curtains", "Wall Art"],
  "Sports & Fitness": ["Exercise Equipment", "Yoga & Pilates", "Running Gear", "Team Sports", "Water Sports", "Cycling", "Camping", "Fitness Accessories", "Sports Nutrition", "Outdoor Recreation"],
  "Gaming & Entertainment": ["Video Games", "Consoles", "Gaming Chairs", "VR Equipment", "Board Games", "Card Games", "Puzzles", "Streaming Equipment", "Collectibles", "Party Games"],
  "Jewelry & Accessories": ["Rings", "Necklaces", "Bracelets", "Earrings", "Anklets", "Brooches", "Watch Accessories", "Hair Jewelry", "Body Jewelry", "Men's Jewelry"],
  "Books & Stationery": ["Fiction Books", "Non-Fiction", "Educational", "Notebooks", "Pens & Pencils", "Art Supplies", "Office Supplies", "Desk Accessories", "Calendars", "Gift Wrapping"],
  "Kids & Baby": ["Baby Clothing", "Toys", "Baby Care", "Feeding", "Nursery", "Educational Toys", "Outdoor Play", "Baby Safety", "Kids Fashion", "School Supplies"],
  "Pet Supplies": ["Dog Supplies", "Cat Supplies", "Bird Supplies", "Fish & Aquarium", "Small Pets", "Pet Food", "Pet Toys", "Pet Health", "Pet Grooming", "Pet Beds"],
  "Automotive": ["Car Care", "Interior Accessories", "Exterior Accessories", "Tools & Equipment", "Oils & Fluids", "Batteries", "Electronics", "Safety Equipment", "Motorcycle Parts", "Cleaning Supplies"],
  "Garden & Outdoor": ["Plants & Seeds", "Garden Tools", "Pots & Planters", "Outdoor Furniture", "Lawn Care", "Irrigation", "Outdoor Lighting", "Fencing", "Pest Control", "Composting"],
  "Tools & Hardware": ["Power Tools", "Hand Tools", "Plumbing", "Electrical", "Painting", "Fasteners", "Measuring Tools", "Safety Gear", "Tool Storage", "Building Materials"],
  "Art & Crafts": ["Drawing", "Painting", "Sculpting", "Sewing", "Knitting", "Scrapbooking", "Jewelry Making", "Candle Making", "Pottery", "Origami"],
  "Musical Instruments": ["Guitars", "Keyboards", "Drums", "Wind Instruments", "String Instruments", "DJ Equipment", "Microphones", "Amplifiers", "Accessories", "Sheet Music"],
};

const productPrefixes = [
  "Premium", "Professional", "Elite", "Ultra", "Pro", "Advanced", "Essential", "Classic", "Deluxe", "Signature",
  "Natural", "Organic", "Pure", "Fresh", "Authentic", "Genuine", "Original", "Traditional", "Modern", "Smart",
  "Luxury", "Supreme", "Superior", "High-End", "Top-Quality", "First-Class", "Prime", "Exclusive", "Special", "Limited",
];

const productSuffixes = [
  "Collection", "Series", "Edition", "Line", "Range", "Set", "Kit", "Pack", "Bundle", "Combo",
  "Formula", "Solution", "System", "Treatment", "Care", "Blend", "Mix", "Fusion", "Essence", "Extract",
];

const adjectives = [
  "Brilliant", "Radiant", "Vibrant", "Smooth", "Gentle", "Powerful", "Effective", "Reliable", "Durable", "Lightweight",
  "Compact", "Ergonomic", "Innovative", "Revolutionary", "Eco-Friendly", "Sustainable", "Portable", "Wireless", "Waterproof", "Rechargeable",
];

const materials = [
  "Vitamin C", "Retinol", "Hyaluronic", "Collagen", "Keratin", "Biotin", "Argan", "Coconut", "Aloe", "Green Tea",
  "Charcoal", "Gold", "Silver", "Pearl", "Rose", "Lavender", "Chamomile", "Eucalyptus", "Peppermint", "Ginger",
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
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
  "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=400",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
];

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
}

function generateUniqueProductName(
  categoryName: string,
  subCategoryName: string,
  index: number,
  usedNames: Set<string>
): string {
  const prefix = productPrefixes[index % productPrefixes.length];
  const adjective = adjectives[Math.floor(index / productPrefixes.length) % adjectives.length];
  const material = materials[Math.floor(index / (productPrefixes.length * adjectives.length)) % materials.length];
  const suffix = productSuffixes[Math.floor(index / (productPrefixes.length * adjectives.length * materials.length)) % productSuffixes.length];
  
  let baseName = `${prefix} ${adjective} ${material} ${subCategoryName} ${suffix}`;
  let name = baseName;
  let counter = 1;
  
  while (usedNames.has(name)) {
    name = `${baseName} ${counter}`;
    counter++;
  }
  
  usedNames.add(name);
  return name;
}

async function seed() {
  console.log("🌱 Starting comprehensive database seed...");

  try {
    console.log("🗑️ Clearing existing data...");
    await db.execute(sql`TRUNCATE TABLE affiliate_transactions, affiliate_campaigns, order_items, orders, reviews, wishlist_items, cart_items, products, categories, affiliates, vendors, users, coupons, settings CASCADE`);
    
    console.log("📁 Creating categories...");
    const createdCategories: { id: string; name: string; slug: string }[] = [];
    let categoryIndex = 0;
    
    for (const mainCat of mainCategories) {
      const mainSlug = generateSlug(mainCat.name);
      const [mainCategory] = await db.insert(categories).values({
        name: mainCat.name,
        slug: mainSlug,
        description: mainCat.description,
        icon: mainCat.icon,
        sortOrder: categoryIndex++,
      }).returning();
      
      createdCategories.push(mainCategory);
      
      const subCats = subCategoriesByMain[mainCat.name] || [];
      for (const subCatName of subCats) {
        const subSlug = generateSlug(`${mainCat.name}-${subCatName}`);
        const [subCategory] = await db.insert(categories).values({
          name: subCatName,
          slug: subSlug,
          description: `${subCatName} products in ${mainCat.name}`,
          icon: mainCat.icon,
          parentId: mainCategory.id,
          sortOrder: categoryIndex++,
        }).returning();
        
        createdCategories.push(subCategory);
      }
    }
    console.log(`✅ Created ${createdCategories.length} categories`);

    console.log("🛍️ Creating products...");
    const usedNames = new Set<string>();
    const usedSlugs = new Set<string>();
    let productCount = 0;
    const batchSize = 100;
    let productBatch: any[] = [];
    
    for (let catIndex = 0; catIndex < createdCategories.length; catIndex++) {
      const category = createdCategories[catIndex];
      const productsPerCategory = Math.floor(Math.random() * 30) + 20;
      
      for (let i = 0; i < productsPerCategory; i++) {
        const productIndex = catIndex * 50 + i;
        const name = generateUniqueProductName(
          category.name,
          category.name,
          productIndex,
          usedNames
        );
        
        let slug = generateSlug(name);
        let slugCounter = 1;
        while (usedSlugs.has(slug)) {
          slug = `${generateSlug(name)}-${slugCounter}`;
          slugCounter++;
        }
        usedSlugs.add(slug);
        
        const basePrice = Math.floor(Math.random() * 9000) + 100;
        const originalPrice = Math.floor(basePrice * (1 + Math.random() * 0.5));
        const discount = Math.round((1 - basePrice / originalPrice) * 100);
        
        const imageIndex = productIndex % productImages.length;
        
        productBatch.push({
          name,
          slug,
          description: `High-quality ${name}. Premium product with excellent reviews and customer satisfaction. Perfect for your ${category.name} needs.`,
          shortDescription: `Premium ${name} for everyday use`,
          price: basePrice.toString(),
          originalPrice: originalPrice.toString(),
          categoryId: category.id,
          images: [productImages[imageIndex], productImages[(imageIndex + 1) % productImages.length]],
          colors: [
            { name: "Default", value: "#D3C1E7" },
            { name: "Dark", value: "#1A1222" },
            { name: "Blue", value: "#3b82f6" },
            { name: "Green", value: "#22c55e" }
          ],
          sizes: productIndex % 3 === 0 ? ["S", "M", "L", "XL"] : [],
          stock: Math.floor(Math.random() * 200) + 10,
          sku: `SKU-${String(productCount + 1).padStart(6, '0')}`,
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviewCount: Math.floor(Math.random() * 500) + 10,
          isNew: productCount < 100,
          isBestseller: productCount >= 50 && productCount < 150,
          isFeatured: productCount < 200,
          isActive: true,
          tags: ["premium", "quality", "trending", discount > 20 ? "sale" : "popular"],
        });
        
        productCount++;
        
        if (productBatch.length >= batchSize) {
          await db.insert(products).values(productBatch as any);
          console.log(`   Inserted ${productCount} products...`);
          productBatch = [];
        }
      }
    }
    
    if (productBatch.length > 0) {
      await db.insert(products).values(productBatch as any);
    }
    console.log(`✅ Created ${productCount} unique products`);

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

    console.log("👥 Creating sample vendors...");
    const vendorNames = ["Premium Store", "Quality Mart", "Elite Shop", "Pro Supplies", "Best Deals"];
    for (let i = 0; i < vendorNames.length; i++) {
      const vendorUser = await db.insert(users).values({
        username: `vendor${i + 1}`,
        email: `vendor${i + 1}@example.com`,
        password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        role: "vendor",
        fullName: vendorNames[i],
        isVerified: true,
      }).returning();
      
      await db.insert(vendors).values({
        userId: vendorUser[0].id,
        storeName: vendorNames[i],
        storeSlug: generateSlug(vendorNames[i]),
        description: `${vendorNames[i]} - Quality products at great prices`,
        contactEmail: `vendor${i + 1}@example.com`,
        isVerified: true,
        isActive: true,
        rating: (Math.random() * 1 + 4).toFixed(1),
        totalSales: Math.floor(Math.random() * 500) + 50,
      });
    }
    console.log(`✅ Created ${vendorNames.length} vendors`);

    console.log("🔗 Creating sample affiliates...");
    for (let i = 0; i < 10; i++) {
      const affiliateUser = await db.insert(users).values({
        username: `affiliate${i + 1}`,
        email: `affiliate${i + 1}@example.com`,
        password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        role: "affiliate",
        fullName: `Affiliate Partner ${i + 1}`,
        isVerified: true,
      }).returning();
      
      await db.insert(affiliates).values({
        userId: affiliateUser[0].id,
        affiliateCode: `AFF${String(i + 1).padStart(4, '0')}`,
        commissionRate: (Math.random() * 5 + 5).toFixed(2),
        tier: ["bronze", "silver", "gold", "platinum"][i % 4],
        totalEarnings: (Math.random() * 10000).toFixed(2),
        pendingEarnings: (Math.random() * 1000).toFixed(2),
        totalClicks: Math.floor(Math.random() * 5000) + 100,
        totalConversions: Math.floor(Math.random() * 200) + 10,
        isActive: true,
      });
    }
    console.log("✅ Created 10 affiliates");

    console.log("🎫 Creating coupons...");
    await db.insert(coupons).values([
      { code: "SAVE10", type: "percentage", value: "10", minPurchase: "500", isActive: true },
      { code: "SAVE20", type: "percentage", value: "20", minPurchase: "1000", maxDiscount: "500", isActive: true },
      { code: "FLAT100", type: "fixed", value: "100", minPurchase: "500", isActive: true },
      { code: "NEWUSER", type: "percentage", value: "15", isActive: true },
      { code: "FREESHIP", type: "fixed", value: "50", minPurchase: "300", isActive: true },
      { code: "MEGA25", type: "percentage", value: "25", minPurchase: "2000", maxDiscount: "1000", isActive: true },
      { code: "FLASH30", type: "percentage", value: "30", minPurchase: "3000", maxDiscount: "1500", isActive: true },
      { code: "WEEKEND15", type: "percentage", value: "15", minPurchase: "800", isActive: true },
      { code: "BULK500", type: "fixed", value: "500", minPurchase: "5000", isActive: true },
      { code: "VIP50", type: "percentage", value: "50", minPurchase: "10000", maxDiscount: "5000", isActive: true },
    ]);
    console.log("✅ Created 10 coupons");

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
    console.log(`📊 Summary: ${createdCategories.length} categories, ${productCount} unique products`);
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
