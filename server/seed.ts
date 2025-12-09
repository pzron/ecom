import { db } from "./db";
import { categories, products, users, coupons, settings, vendors, affiliates } from "@shared/schema";
import { sql } from "drizzle-orm";
import { generateAllCategories, generateProducts } from "./seed-data";

export async function seedDatabase() {
  console.log("Starting database seeding...");
  
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(products);
    await db.delete(categories);
    
    // Generate and insert all categories (1000+)
    console.log("Generating categories...");
    const allCategoryData = generateAllCategories();
    console.log(`Generated ${allCategoryData.length} categories`);
    
    // Insert main categories first
    const mainCats = allCategoryData.filter(c => !c.parentId);
    const subCats = allCategoryData.filter(c => c.parentId);
    
    console.log("Inserting main categories...");
    const insertedMainCats: { id: string; slug: string; name: string }[] = [];
    
    for (const cat of mainCats) {
      const [inserted] = await db.insert(categories).values({
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        sortOrder: mainCats.indexOf(cat),
      }).returning();
      insertedMainCats.push({ id: inserted.id, slug: inserted.slug, name: inserted.name });
    }
    
    console.log(`Inserted ${insertedMainCats.length} main categories`);
    
    // Insert subcategories with parent references
    console.log("Inserting subcategories...");
    const insertedSubCats: { id: string; slug: string; name: string }[] = [];
    
    // Process in batches
    const batchSize = 50;
    for (let i = 0; i < subCats.length; i += batchSize) {
      const batch = subCats.slice(i, i + batchSize);
      
      for (const cat of batch) {
        const parent = insertedMainCats.find(m => m.slug === cat.parentId);
        const [inserted] = await db.insert(categories).values({
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon,
          description: cat.description,
          parentId: parent?.id || null,
          sortOrder: i + batch.indexOf(cat),
        }).returning();
        insertedSubCats.push({ id: inserted.id, slug: inserted.slug, name: inserted.name });
      }
      
      if (i % 200 === 0) {
        console.log(`Inserted ${i + batch.length}/${subCats.length} subcategories...`);
      }
    }
    
    console.log(`Inserted ${insertedSubCats.length} subcategories`);
    
    const allInsertedCategories = [...insertedMainCats, ...insertedSubCats];
    console.log(`Total categories: ${allInsertedCategories.length}`);
    
    // Generate products for all categories
    console.log("Generating products...");
    const allProducts = generateProducts(allInsertedCategories);
    console.log(`Generated ${allProducts.length} products`);
    
    // Insert products in batches
    console.log("Inserting products...");
    const productBatchSize = 100;
    let insertedCount = 0;
    
    for (let i = 0; i < allProducts.length; i += productBatchSize) {
      const batch = allProducts.slice(i, i + productBatchSize);
      
      for (const product of batch) {
        try {
          await db.insert(products).values(product);
          insertedCount++;
        } catch (err: any) {
          // Skip duplicate slugs
          if (!err.message?.includes('duplicate')) {
            console.error(`Error inserting product: ${product.name}`, err.message);
          }
        }
      }
      
      if (i % 500 === 0) {
        console.log(`Inserted ${insertedCount} products...`);
      }
    }
    
    console.log(`Total products inserted: ${insertedCount}`);
    
    // Add some sample coupons
    console.log("Adding coupons...");
    await db.delete(coupons);
    await db.insert(coupons).values([
      { code: "WELCOME10", type: "percentage", value: "10", minPurchase: "50", usageLimit: 1000, usedCount: 0, isActive: true },
      { code: "SAVE20", type: "percentage", value: "20", minPurchase: "100", usageLimit: 500, usedCount: 0, isActive: true },
      { code: "FLAT50", type: "fixed", value: "50", minPurchase: "200", usageLimit: 200, usedCount: 0, isActive: true },
      { code: "SUMMER25", type: "percentage", value: "25", minPurchase: "75", usageLimit: 300, usedCount: 0, isActive: true },
      { code: "FREESHIP", type: "fixed", value: "15", minPurchase: "30", usageLimit: 1000, usedCount: 0, isActive: true },
    ]);
    
    console.log("Database seeding completed successfully!");
    console.log(`Summary: ${allInsertedCategories.length} categories, ${insertedCount} products`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
