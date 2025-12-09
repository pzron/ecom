import { db } from "./db";
import { categories, products, users, coupons, settings, vendors, affiliates } from "@shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { name: "Health & Wellness", slug: "health-wellness", icon: "💊", description: "Vitamins, supplements and health products", subcategories: ["Vitamins", "Supplements", "First Aid", "Personal Care", "Weight Management"] },
  { name: "Beauty & Skincare", slug: "beauty-skincare", icon: "💄", description: "Premium cosmetics and skincare products", subcategories: ["Face Care", "Body Care", "Makeup", "Sunscreen", "Anti-Aging"] },
  { name: "Electronics", slug: "electronics", icon: "⚡", description: "Latest gadgets and electronic devices", subcategories: ["Smartphones", "Audio", "Wearables", "Accessories", "Smart Home"] },
  { name: "Fashion & Clothing", slug: "fashion-clothing", icon: "👔", description: "Trendy apparel and fashion accessories", subcategories: ["Men's Wear", "Women's Wear", "Shoes", "Bags", "Accessories"] },
  { name: "Home & Kitchen", slug: "home-kitchen", icon: "🏠", description: "Home essentials and kitchen appliances", subcategories: ["Cookware", "Appliances", "Storage", "Bedding", "Decor"] },
  { name: "Sports & Fitness", slug: "sports-fitness", icon: "🏋️", description: "Sports equipment and fitness gear", subcategories: ["Exercise Equipment", "Yoga", "Running", "Team Sports", "Outdoor"] },
  { name: "Gaming", slug: "gaming", icon: "🎮", description: "Gaming consoles, accessories and gear", subcategories: ["Consoles", "Controllers", "Headsets", "Chairs", "Accessories"] },
  { name: "Baby & Kids", slug: "baby-kids", icon: "🧸", description: "Products for babies and children", subcategories: ["Baby Care", "Toys", "Clothing", "Feeding", "Nursery"] },
  { name: "Pet Supplies", slug: "pet-supplies", icon: "🐾", description: "Everything for your furry friends", subcategories: ["Dog Supplies", "Cat Supplies", "Pet Food", "Toys", "Health"] },
  { name: "Books & Stationery", slug: "books-stationery", icon: "📚", description: "Books, office supplies and stationery", subcategories: ["Fiction", "Non-Fiction", "Notebooks", "Pens", "Office"] },
  { name: "Tea & Coffee", slug: "tea-coffee", icon: "☕", description: "Premium teas and coffee selections", subcategories: ["Green Tea", "Black Tea", "Espresso", "Coffee Beans", "Accessories"] },
  { name: "Hair Oil & Gel", slug: "hair-oil-gel", icon: "💇", description: "Hair care products and styling", subcategories: ["Hair Oil", "Hair Gel", "Shampoo", "Conditioner", "Treatments"] },
  { name: "Consumer Electronics", slug: "consumer-electronics", icon: "📱", description: "Consumer electronics and gadgets", subcategories: ["TVs", "Cameras", "Laptops", "Tablets", "Drones"] },
  { name: "Salon & Parlour", slug: "salon-parlour", icon: "✨", description: "Professional salon equipment", subcategories: ["Hair Dryers", "Trimmers", "Styling Tools", "Chairs", "Mirrors"] },
  { name: "Home & Living", slug: "home-living", icon: "🛋️", description: "Furniture and home decor", subcategories: ["Furniture", "Lighting", "Rugs", "Curtains", "Wall Art"] },
  { name: "Organic Foods", slug: "organic-foods", icon: "🥬", description: "Organic and natural food products", subcategories: ["Fruits", "Vegetables", "Grains", "Dairy", "Snacks"] },
  { name: "Jewelry & Watches", slug: "jewelry-watches", icon: "💎", description: "Fine jewelry and luxury watches", subcategories: ["Necklaces", "Rings", "Earrings", "Watches", "Bracelets"] },
  { name: "Automotive", slug: "automotive", icon: "🚗", description: "Car accessories and parts", subcategories: ["Car Care", "Interior", "Exterior", "Electronics", "Tools"] },
  { name: "Garden & Outdoor", slug: "garden-outdoor", icon: "🌻", description: "Gardening tools and outdoor living", subcategories: ["Plants", "Tools", "Furniture", "Lighting", "Decor"] },
  { name: "Art & Crafts", slug: "art-crafts", icon: "🎨", description: "Art supplies and craft materials", subcategories: ["Painting", "Drawing", "Sculpting", "Knitting", "DIY Kits"] },
  { name: "Musical Instruments", slug: "musical-instruments", icon: "🎸", description: "Instruments and music accessories", subcategories: ["Guitars", "Keyboards", "Drums", "Wind Instruments", "Accessories"] },
  { name: "Pharmacy", slug: "pharmacy", icon: "💉", description: "Medicines and healthcare products", subcategories: ["OTC Medicines", "First Aid", "Medical Devices", "Personal Care", "Baby Care"] },
  { name: "Grocery", slug: "grocery", icon: "🛒", description: "Daily essentials and groceries", subcategories: ["Staples", "Snacks", "Beverages", "Dairy", "Frozen"] },
  { name: "Cleaning Supplies", slug: "cleaning-supplies", icon: "🧹", description: "Household cleaning products", subcategories: ["Floor Cleaners", "Disinfectants", "Laundry", "Kitchen", "Bathroom"] },
  { name: "Office Supplies", slug: "office-supplies", icon: "📎", description: "Office essentials and furniture", subcategories: ["Desks", "Chairs", "Storage", "Stationery", "Electronics"] },
  { name: "Luggage & Travel", slug: "luggage-travel", icon: "🧳", description: "Travel bags and accessories", subcategories: ["Suitcases", "Backpacks", "Travel Accessories", "Organizers", "Duffels"] },
  { name: "Mobile Accessories", slug: "mobile-accessories", icon: "📲", description: "Phone cases and accessories", subcategories: ["Cases", "Chargers", "Screen Protectors", "Cables", "Holders"] },
  { name: "Computer Accessories", slug: "computer-accessories", icon: "💻", description: "Computer peripherals and accessories", subcategories: ["Keyboards", "Mice", "Webcams", "Monitors", "Storage"] },
  { name: "Cameras & Photography", slug: "cameras-photography", icon: "📷", description: "Cameras and photography equipment", subcategories: ["DSLR", "Mirrorless", "Lenses", "Tripods", "Lighting"] },
  { name: "Audio & Headphones", slug: "audio-headphones", icon: "🎧", description: "Audio equipment and headphones", subcategories: ["Headphones", "Earbuds", "Speakers", "Soundbars", "Microphones"] },
  { name: "Smart Home", slug: "smart-home", icon: "🏡", description: "Smart home devices and automation", subcategories: ["Smart Lights", "Security", "Thermostats", "Assistants", "Sensors"] },
  { name: "Fitness Equipment", slug: "fitness-equipment", icon: "🏃", description: "Home gym and fitness equipment", subcategories: ["Treadmills", "Weights", "Yoga Mats", "Resistance Bands", "Cardio"] },
  { name: "Outdoor Sports", slug: "outdoor-sports", icon: "⛺", description: "Camping and outdoor gear", subcategories: ["Camping", "Hiking", "Cycling", "Fishing", "Climbing"] },
  { name: "Water Sports", slug: "water-sports", icon: "🏊", description: "Swimming and water sports gear", subcategories: ["Swimwear", "Snorkeling", "Surfing", "Kayaking", "Safety Gear"] },
  { name: "Winter Sports", slug: "winter-sports", icon: "⛷️", description: "Skiing and winter sports equipment", subcategories: ["Skis", "Snowboards", "Apparel", "Accessories", "Safety"] },
  { name: "Cycling", slug: "cycling", icon: "🚴", description: "Bicycles and cycling accessories", subcategories: ["Bicycles", "Helmets", "Lights", "Locks", "Apparel"] },
  { name: "Running", slug: "running", icon: "👟", description: "Running shoes and gear", subcategories: ["Shoes", "Apparel", "Watches", "Accessories", "Hydration"] },
  { name: "Yoga & Pilates", slug: "yoga-pilates", icon: "🧘", description: "Yoga mats and accessories", subcategories: ["Mats", "Blocks", "Straps", "Apparel", "Accessories"] },
  { name: "Men's Grooming", slug: "mens-grooming", icon: "🧔", description: "Men's grooming and care products", subcategories: ["Shaving", "Skincare", "Hair Care", "Fragrance", "Body Care"] },
  { name: "Women's Care", slug: "womens-care", icon: "👩", description: "Women's personal care products", subcategories: ["Skincare", "Hair Care", "Hygiene", "Fragrance", "Wellness"] },
  { name: "Fragrances", slug: "fragrances", icon: "🌸", description: "Perfumes and fragrances", subcategories: ["Men's Perfume", "Women's Perfume", "Unisex", "Body Mists", "Gift Sets"] },
  { name: "Sunglasses", slug: "sunglasses", icon: "🕶️", description: "Designer sunglasses and eyewear", subcategories: ["Men's", "Women's", "Sports", "Prescription", "Kids"] },
  { name: "Watches", slug: "watches", icon: "⌚", description: "Luxury and smart watches", subcategories: ["Luxury", "Smart Watches", "Sports", "Fashion", "Kids"] },
  { name: "Handbags", slug: "handbags", icon: "👜", description: "Designer bags and purses", subcategories: ["Totes", "Crossbody", "Clutches", "Backpacks", "Wallets"] },
  { name: "Shoes", slug: "shoes", icon: "👞", description: "Footwear for all occasions", subcategories: ["Sneakers", "Formal", "Casual", "Sandals", "Boots"] },
  { name: "Men's Fashion", slug: "mens-fashion", icon: "👔", description: "Men's clothing and accessories", subcategories: ["Shirts", "Pants", "Jackets", "T-Shirts", "Suits"] },
  { name: "Women's Fashion", slug: "womens-fashion", icon: "👗", description: "Women's clothing and accessories", subcategories: ["Dresses", "Tops", "Pants", "Skirts", "Jackets"] },
  { name: "Kids Fashion", slug: "kids-fashion", icon: "👶", description: "Children's clothing and accessories", subcategories: ["Boys", "Girls", "Infants", "Shoes", "Accessories"] },
  { name: "Ethnic Wear", slug: "ethnic-wear", icon: "🥻", description: "Traditional and ethnic clothing", subcategories: ["Sarees", "Kurtas", "Lehengas", "Sherwanis", "Accessories"] },
  { name: "Western Wear", slug: "western-wear", icon: "👖", description: "Western style clothing", subcategories: ["Jeans", "T-Shirts", "Dresses", "Jackets", "Accessories"] },
  { name: "Innerwear", slug: "innerwear", icon: "🩲", description: "Undergarments and innerwear", subcategories: ["Men's", "Women's", "Kids", "Thermal", "Loungewear"] },
  { name: "Sleepwear", slug: "sleepwear", icon: "🛏️", description: "Comfortable sleepwear and nightwear", subcategories: ["Pajamas", "Nightgowns", "Robes", "Loungewear", "Slippers"] },
  { name: "Activewear", slug: "activewear", icon: "🏃‍♀️", description: "Sports and activewear", subcategories: ["Tops", "Bottoms", "Sets", "Sports Bras", "Jackets"] },
  { name: "Swimwear", slug: "swimwear", icon: "👙", description: "Swimsuits and beach wear", subcategories: ["Bikinis", "One-Piece", "Trunks", "Cover-Ups", "Accessories"] },
  { name: "Formal Wear", slug: "formal-wear", icon: "🤵", description: "Formal and business attire", subcategories: ["Suits", "Blazers", "Dress Shirts", "Ties", "Dress Shoes"] },
  { name: "Party Wear", slug: "party-wear", icon: "🎉", description: "Party and occasion wear", subcategories: ["Dresses", "Suits", "Accessories", "Shoes", "Jewelry"] },
  { name: "Wedding Collection", slug: "wedding-collection", icon: "💒", description: "Bridal and wedding attire", subcategories: ["Bridal", "Groom", "Bridesmaids", "Accessories", "Decor"] },
  { name: "Maternity", slug: "maternity", icon: "🤰", description: "Maternity and nursing wear", subcategories: ["Dresses", "Tops", "Bottoms", "Nursing", "Accessories"] },
  { name: "Plus Size", slug: "plus-size", icon: "👚", description: "Plus size fashion", subcategories: ["Tops", "Bottoms", "Dresses", "Activewear", "Innerwear"] },
  { name: "Kitchen Appliances", slug: "kitchen-appliances", icon: "🍳", description: "Kitchen appliances and gadgets", subcategories: ["Blenders", "Mixers", "Toasters", "Coffee Makers", "Air Fryers"] },
  { name: "Cookware", slug: "cookware", icon: "🍲", description: "Pots, pans and cookware", subcategories: ["Pans", "Pots", "Bakeware", "Utensils", "Storage"] },
  { name: "Dinnerware", slug: "dinnerware", icon: "🍽️", description: "Plates, bowls and dinnerware", subcategories: ["Plates", "Bowls", "Glasses", "Cutlery", "Serving"] },
  { name: "Home Decor", slug: "home-decor", icon: "🖼️", description: "Decorative items for home", subcategories: ["Wall Art", "Vases", "Candles", "Clocks", "Mirrors"] },
  { name: "Furniture", slug: "furniture", icon: "🪑", description: "Home and office furniture", subcategories: ["Living Room", "Bedroom", "Dining", "Office", "Outdoor"] },
  { name: "Bedding", slug: "bedding", icon: "🛏️", description: "Bed sheets and bedding", subcategories: ["Sheets", "Pillows", "Blankets", "Mattresses", "Toppers"] },
  { name: "Bath", slug: "bath", icon: "🛁", description: "Bath accessories and towels", subcategories: ["Towels", "Mats", "Accessories", "Storage", "Robes"] },
  { name: "Lighting", slug: "lighting", icon: "💡", description: "Indoor and outdoor lighting", subcategories: ["Ceiling", "Table Lamps", "Floor Lamps", "Outdoor", "Smart Lights"] },
  { name: "Rugs & Carpets", slug: "rugs-carpets", icon: "🧶", description: "Area rugs and carpets", subcategories: ["Area Rugs", "Runners", "Door Mats", "Outdoor", "Kids"] },
  { name: "Curtains & Blinds", slug: "curtains-blinds", icon: "🪟", description: "Window treatments", subcategories: ["Curtains", "Blinds", "Shades", "Rods", "Accessories"] },
  { name: "Storage & Organization", slug: "storage-organization", icon: "📦", description: "Storage solutions", subcategories: ["Closet", "Kitchen", "Bathroom", "Office", "Garage"] },
  { name: "Laundry", slug: "laundry", icon: "🧺", description: "Laundry and cleaning", subcategories: ["Detergents", "Softeners", "Baskets", "Dryers", "Accessories"] },
  { name: "Air Quality", slug: "air-quality", icon: "🌬️", description: "Air purifiers and humidifiers", subcategories: ["Purifiers", "Humidifiers", "Dehumidifiers", "Fans", "Filters"] },
  { name: "Vacuum Cleaners", slug: "vacuum-cleaners", icon: "🤖", description: "Vacuums and cleaning robots", subcategories: ["Upright", "Robot", "Handheld", "Stick", "Accessories"] },
  { name: "Seasonal Decor", slug: "seasonal-decor", icon: "🎄", description: "Holiday and seasonal decor", subcategories: ["Christmas", "Halloween", "Easter", "Summer", "Fall"] },
  { name: "Party Supplies", slug: "party-supplies", icon: "🎈", description: "Party decorations and supplies", subcategories: ["Balloons", "Banners", "Tableware", "Costumes", "Gifts"] },
  { name: "Gift Cards", slug: "gift-cards", icon: "🎁", description: "Gift cards and vouchers", subcategories: ["Shopping", "Dining", "Entertainment", "Travel", "Digital"] },
  { name: "Toys & Games", slug: "toys-games", icon: "🎲", description: "Toys and board games", subcategories: ["Action Figures", "Board Games", "Puzzles", "Dolls", "Educational"] },
  { name: "Video Games", slug: "video-games", icon: "🎮", description: "Video games and consoles", subcategories: ["PlayStation", "Xbox", "Nintendo", "PC Games", "Accessories"] },
  { name: "Board Games", slug: "board-games", icon: "♟️", description: "Strategy and family games", subcategories: ["Strategy", "Family", "Party", "Card Games", "Puzzles"] },
  { name: "Outdoor Toys", slug: "outdoor-toys", icon: "🪁", description: "Outdoor play equipment", subcategories: ["Bikes", "Scooters", "Swings", "Trampolines", "Water Toys"] },
  { name: "Educational Toys", slug: "educational-toys", icon: "🔬", description: "Learning and STEM toys", subcategories: ["STEM", "Art", "Music", "Language", "Math"] },
  { name: "Collectibles", slug: "collectibles", icon: "🏆", description: "Collectible items and memorabilia", subcategories: ["Figurines", "Cards", "Coins", "Stamps", "Sports"] },
  { name: "Antiques", slug: "antiques", icon: "🏺", description: "Antique items and vintage", subcategories: ["Furniture", "Art", "Jewelry", "Pottery", "Books"] },
  { name: "Handmade", slug: "handmade", icon: "🧵", description: "Handcrafted and artisan products", subcategories: ["Jewelry", "Clothing", "Home Decor", "Art", "Accessories"] },
  { name: "Eco-Friendly", slug: "eco-friendly", icon: "♻️", description: "Sustainable and eco products", subcategories: ["Home", "Personal Care", "Fashion", "Food", "Packaging"] },
  { name: "Local Products", slug: "local-products", icon: "🏪", description: "Local artisan products", subcategories: ["Food", "Crafts", "Art", "Clothing", "Home"] },
  { name: "Premium Selection", slug: "premium-selection", icon: "👑", description: "Luxury and premium items", subcategories: ["Fashion", "Beauty", "Home", "Electronics", "Food"] },
  { name: "Budget Deals", slug: "budget-deals", icon: "💰", description: "Affordable everyday items", subcategories: ["Home", "Fashion", "Electronics", "Personal Care", "Food"] },
  { name: "New Arrivals", slug: "new-arrivals", icon: "🆕", description: "Latest product arrivals", subcategories: ["Fashion", "Electronics", "Home", "Beauty", "Sports"] },
  { name: "Best Sellers", slug: "best-sellers", icon: "🌟", description: "Top selling products", subcategories: ["Fashion", "Electronics", "Home", "Beauty", "Sports"] },
  { name: "Flash Deals", slug: "flash-deals", icon: "⚡", description: "Limited time offers", subcategories: ["Electronics", "Fashion", "Home", "Beauty", "Sports"] },
  { name: "Clearance", slug: "clearance", icon: "🏷️", description: "Clearance and discounted items", subcategories: ["Fashion", "Electronics", "Home", "Beauty", "Sports"] },
  { name: "Subscription Boxes", slug: "subscription-boxes", icon: "📬", description: "Monthly subscription boxes", subcategories: ["Beauty", "Food", "Fashion", "Books", "Gaming"] },
  { name: "Digital Products", slug: "digital-products", icon: "📥", description: "Digital downloads and software", subcategories: ["Software", "E-Books", "Music", "Games", "Courses"] },
  { name: "Services", slug: "services", icon: "🔧", description: "Professional services", subcategories: ["Installation", "Repair", "Consultation", "Training", "Design"] },
  { name: "Food & Beverages", slug: "food-beverages", icon: "🍔", description: "Food items and drinks", subcategories: ["Snacks", "Beverages", "Frozen", "Fresh", "Pantry"] },
  { name: "Gourmet Foods", slug: "gourmet-foods", icon: "🍷", description: "Premium gourmet products", subcategories: ["Cheese", "Wine", "Chocolate", "Coffee", "Specialty"] },
  { name: "Health Foods", slug: "health-foods", icon: "🥗", description: "Healthy and organic foods", subcategories: ["Organic", "Vegan", "Gluten-Free", "Low-Carb", "Superfoods"] },
  { name: "Snacks & Sweets", slug: "snacks-sweets", icon: "🍬", description: "Snacks and confectionery", subcategories: ["Chips", "Candy", "Cookies", "Nuts", "Chocolate"] },
  { name: "Beverages", slug: "beverages", icon: "🥤", description: "Drinks and beverages", subcategories: ["Juices", "Sodas", "Water", "Energy Drinks", "Alcohol"] },
  { name: "Dairy & Eggs", slug: "dairy-eggs", icon: "🥛", description: "Dairy products and eggs", subcategories: ["Milk", "Cheese", "Yogurt", "Butter", "Eggs"] },
  { name: "Meat & Seafood", slug: "meat-seafood", icon: "🥩", description: "Fresh meat and seafood", subcategories: ["Chicken", "Beef", "Pork", "Fish", "Shellfish"] },
  { name: "Bakery", slug: "bakery", icon: "🥖", description: "Fresh bakery items", subcategories: ["Bread", "Pastries", "Cakes", "Cookies", "Specialty"] },
  { name: "Frozen Foods", slug: "frozen-foods", icon: "🧊", description: "Frozen meals and items", subcategories: ["Meals", "Pizza", "Ice Cream", "Vegetables", "Meat"] },
  { name: "Pantry Staples", slug: "pantry-staples", icon: "🏺", description: "Kitchen pantry essentials", subcategories: ["Rice", "Pasta", "Oils", "Spices", "Sauces"] },
];

const productTemplates: Record<string, { name: string; price: number; originalPrice: number; description: string; image: string }[]> = {
  "health-wellness": [
    { name: "Nature's Bounty Vitamin D3 5000 IU", price: 12.99, originalPrice: 18.99, description: "High-potency vitamin D3 supplement for bone health and immune support. 250 softgels per bottle.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
    { name: "Centrum Silver Adults 50+ Multivitamin", price: 24.99, originalPrice: 32.99, description: "Complete multivitamin specially formulated for adults 50 and older.", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400" },
    { name: "Nordic Naturals Ultimate Omega Fish Oil", price: 29.99, originalPrice: 39.99, description: "Concentrated omega-3 fish oil with EPA and DHA for heart, brain and joint health.", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400" },
    { name: "Garden of Life Organic Protein Powder", price: 34.99, originalPrice: 44.99, description: "USDA organic plant-based protein with 22g protein per serving.", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
    { name: "NOW Foods Magnesium Citrate 400mg", price: 14.99, originalPrice: 19.99, description: "High absorption magnesium citrate for muscle and nerve function. 180 capsules.", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400" },
    { name: "Vital Proteins Collagen Peptides", price: 27.99, originalPrice: 36.99, description: "Grass-fed collagen peptides for skin, hair, nails and joint support.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { name: "Nature Made Melatonin 5mg", price: 8.99, originalPrice: 12.99, description: "Drug-free sleep aid supplement for occasional sleeplessness. 90 tablets.", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400" },
    { name: "Optimum Nutrition Probiotic Complex", price: 19.99, originalPrice: 26.99, description: "50 billion CFU probiotic blend for digestive health and immune support.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400" },
    { name: "Sports Research Biotin 10000mcg", price: 16.99, originalPrice: 22.99, description: "High-potency biotin with coconut oil for healthy hair, skin and nails.", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
    { name: "Jarrow Formulas Curcumin 95", price: 22.99, originalPrice: 29.99, description: "Turmeric curcumin extract with 95% curcuminoids for joint and antioxidant support.", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400" },
    { name: "Life Extension Super Omega-3 Plus", price: 32.99, originalPrice: 42.99, description: "EPA/DHA fish oil with sesame lignans and olive extract.", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400" },
    { name: "Solgar Vitamin B12 1000mcg", price: 11.99, originalPrice: 15.99, description: "Sublingual methylcobalamin for energy metabolism and nervous system health.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
    { name: "Pure Encapsulations Zinc 30mg", price: 18.99, originalPrice: 24.99, description: "Hypoallergenic zinc picolinate for immune function and skin health.", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400" },
    { name: "Thorne Research Vitamin C with Flavonoids", price: 21.99, originalPrice: 28.99, description: "Ascorbic acid with citrus bioflavonoids for antioxidant protection.", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400" },
    { name: "Doctor's Best Glucosamine Chondroitin MSM", price: 26.99, originalPrice: 35.99, description: "Joint support formula with OptiMSM for flexibility and comfort.", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
  ],
  "beauty-skincare": [
    { name: "CeraVe Hydrating Facial Cleanser", price: 15.99, originalPrice: 19.99, description: "Gentle daily face wash with hyaluronic acid and ceramides. 16 oz.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { name: "The Ordinary Niacinamide 10% + Zinc 1%", price: 6.99, originalPrice: 9.99, description: "High-strength vitamin and mineral blemish formula.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
    { name: "Neutrogena Hydro Boost Gel Cream", price: 19.99, originalPrice: 26.99, description: "Oil-free water gel moisturizer with hyaluronic acid.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400" },
    { name: "La Roche-Posay Anthelios SPF 60", price: 29.99, originalPrice: 38.99, description: "Ultra-light fluid sunscreen with Cell-Ox Shield technology.", image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400" },
    { name: "Paula's Choice 2% BHA Liquid Exfoliant", price: 32.99, originalPrice: 42.99, description: "Gentle leave-on exfoliant unclogs pores and smooths wrinkles.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400" },
    { name: "Tatcha The Dewy Skin Cream", price: 68.99, originalPrice: 89.99, description: "Rich cream with Japanese purple rice for deep hydration.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400" },
    { name: "Drunk Elephant C-Firma Fresh Serum", price: 78.99, originalPrice: 99.99, description: "Potent vitamin C day serum packed with antioxidants.", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400" },
    { name: "Olay Regenerist Retinol 24 Night Cream", price: 38.99, originalPrice: 49.99, description: "Fragrance-free retinol moisturizer for smooth skin.", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400" },
    { name: "SK-II Facial Treatment Essence", price: 185.99, originalPrice: 235.99, description: "Cult-favorite essence with over 90% PITERA.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
    { name: "Mario Badescu Drying Lotion", price: 17.99, originalPrice: 22.99, description: "Cult-favorite spot treatment for blemishes.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
    { name: "Sunday Riley Good Genes All-in-One Lactic Acid Treatment", price: 85.99, originalPrice: 105.99, description: "Lactic acid exfoliating treatment for radiant skin.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400" },
    { name: "Glow Recipe Watermelon Glow Niacinamide Dew Drops", price: 34.99, originalPrice: 44.99, description: "Highlighting serum with hyaluronic acid and watermelon.", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400" },
    { name: "Youth To The People Superfood Cleanser", price: 36.99, originalPrice: 46.99, description: "Gentle pH-balanced gel cleanser with kale and spinach.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { name: "Kiehl's Ultra Facial Cream", price: 32.99, originalPrice: 42.99, description: "24-hour hydrating face cream for all skin types.", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400" },
    { name: "First Aid Beauty Ultra Repair Cream", price: 38.99, originalPrice: 48.99, description: "Intense hydration for dry, distressed skin. 8 oz.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400" },
  ],
  "electronics": [
    { name: "Apple AirPods Pro 2nd Generation", price: 249.99, originalPrice: 299.99, description: "Active Noise Cancellation, Adaptive Audio.", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400" },
    { name: "Samsung Galaxy Buds2 Pro", price: 179.99, originalPrice: 229.99, description: "Hi-Fi sound with intelligent ANC. IPX7 water resistant.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
    { name: "Sony WH-1000XM5 Headphones", price: 348.99, originalPrice: 399.99, description: "Industry-leading noise cancellation with 30-hour battery.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { name: "Apple Watch Series 9 GPS 45mm", price: 429.99, originalPrice: 499.99, description: "S9 SiP chip, Always-On Retina display.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
    { name: "JBL Flip 6 Portable Speaker", price: 99.99, originalPrice: 129.99, description: "IP67 waterproof rating. 12-hour playtime.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
    { name: "Anker PowerCore 26800 Power Bank", price: 65.99, originalPrice: 79.99, description: "Massive 26800mAh capacity with PowerIQ technology.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
    { name: "Logitech MX Master 3S Mouse", price: 99.99, originalPrice: 119.99, description: "MagSpeed electromagnetic scrolling.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
    { name: "Bose QuietComfort Earbuds II", price: 279.99, originalPrice: 329.99, description: "CustomTune technology for personalized sound.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400" },
    { name: "Amazon Echo Dot 5th Gen", price: 49.99, originalPrice: 59.99, description: "Smart speaker with Alexa and improved audio.", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400" },
    { name: "Belkin 3-in-1 Wireless Charger", price: 129.99, originalPrice: 149.99, description: "Fast wireless charging for iPhone, Watch and AirPods.", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400" },
    { name: "Google Pixel Buds Pro", price: 199.99, originalPrice: 229.99, description: "Active Noise Cancellation with Tensor chip.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
    { name: "Beats Studio Buds +", price: 169.99, originalPrice: 199.99, description: "Enhanced Active Noise Cancelling with spatial audio.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400" },
    { name: "Sony WF-1000XM5 Earbuds", price: 299.99, originalPrice: 349.99, description: "Best-in-class noise cancellation in compact design.", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400" },
    { name: "Apple MagSafe Battery Pack", price: 99.99, originalPrice: 119.99, description: "Portable wireless charger for iPhone.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
    { name: "Samsung Galaxy Watch 6 Classic", price: 399.99, originalPrice: 449.99, description: "Rotating bezel with advanced health monitoring.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
  ],
  "fashion-clothing": [
    { name: "Levi's 501 Original Fit Jeans", price: 69.99, originalPrice: 89.99, description: "Iconic straight leg jeans with button fly. 100% cotton.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400" },
    { name: "Nike Air Force 1 '07 White", price: 109.99, originalPrice: 129.99, description: "Legendary basketball sneaker with Air-Sole unit.", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400" },
    { name: "Herschel Little America Backpack", price: 99.99, originalPrice: 119.99, description: "Classic mountaineering style with laptop sleeve. 25L.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { name: "Ray-Ban Aviator Classic Sunglasses", price: 161.99, originalPrice: 199.99, description: "Iconic pilot sunglasses with gold frame.", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
    { name: "Carhartt WIP Chase Hoodie", price: 89.99, originalPrice: 109.99, description: "Heavyweight hooded sweatshirt with embroidered logo.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { name: "Adidas Ultraboost 22 Running Shoes", price: 189.99, originalPrice: 229.99, description: "Responsive Boost midsole with Primeknit+ upper.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
    { name: "Fjällräven Kånken Classic Backpack", price: 79.99, originalPrice: 99.99, description: "Swedish classic with Vinylon F fabric. 16L.", image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400" },
    { name: "Tommy Hilfiger Essential Down Jacket", price: 179.99, originalPrice: 229.99, description: "Lightweight packable down jacket.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
    { name: "Calvin Klein Modern Cotton Bralette", price: 32.99, originalPrice: 42.99, description: "Iconic unlined bralette with signature logo band.", image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400" },
    { name: "Timberland 6-Inch Premium Boots", price: 198.99, originalPrice: 249.99, description: "Waterproof leather boots with padded collar.", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400" },
    { name: "The North Face Nuptse Jacket", price: 299.99, originalPrice: 349.99, description: "Iconic 700-fill goose down puffer jacket.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
    { name: "New Balance 574 Core Sneakers", price: 89.99, originalPrice: 109.99, description: "Classic retro running shoe with ENCAP midsole.", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400" },
    { name: "Champion Reverse Weave Hoodie", price: 65.99, originalPrice: 85.99, description: "Heavyweight fleece hoodie with ribbed side panels.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { name: "Patagonia Better Sweater Fleece Jacket", price: 139.99, originalPrice: 169.99, description: "Warm recycled polyester fleece jacket.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
    { name: "Vans Old Skool Classic Sneakers", price: 69.99, originalPrice: 89.99, description: "Iconic skate shoe with signature side stripe.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
  ],
  "home-kitchen": [
    { name: "Instant Pot Duo 7-in-1 Pressure Cooker", price: 89.99, originalPrice: 119.99, description: "Electric pressure cooker with 7 functions. 6 quart.", image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400" },
    { name: "Ninja Professional Blender 1000W", price: 79.99, originalPrice: 99.99, description: "Total Crushing Technology. 72 oz pitcher.", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400" },
    { name: "Cuisinart 14-Cup Coffee Maker", price: 99.99, originalPrice: 129.99, description: "Programmable with brew strength control.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" },
    { name: "Lodge Cast Iron Skillet 12 Inch", price: 39.99, originalPrice: 54.99, description: "Pre-seasoned cast iron. Made in USA.", image: "https://images.unsplash.com/photo-1585442231449-d33a71f68285?w=400" },
    { name: "Dyson V15 Detect Cordless Vacuum", price: 699.99, originalPrice: 849.99, description: "Laser reveals microscopic dust. 60 min runtime.", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400" },
    { name: "KitchenAid Artisan Stand Mixer", price: 379.99, originalPrice: 449.99, description: "Iconic tilt-head mixer with 5-quart bowl.", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400" },
    { name: "Philips Sonicare DiamondClean", price: 179.99, originalPrice: 229.99, description: "Electric toothbrush with 5 modes.", image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400" },
    { name: "Tempur-Pedic Cloud Pillow", price: 89.99, originalPrice: 119.99, description: "Premium memory foam pillow with cooling gel.", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400" },
    { name: "Nespresso Vertuo Plus Coffee Machine", price: 159.99, originalPrice: 199.99, description: "Centrifusion technology. Includes Aeroccino.", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
    { name: "Brooklinen Luxe Core Sheet Set", price: 149.99, originalPrice: 189.99, description: "480 thread count long-staple cotton. Queen.", image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400" },
    { name: "Le Creuset Enameled Cast Iron Dutch Oven", price: 369.99, originalPrice: 429.99, description: "5.5 quart signature round dutch oven.", image: "https://images.unsplash.com/photo-1585442231449-d33a71f68285?w=400" },
    { name: "Vitamix E310 Explorian Blender", price: 349.99, originalPrice: 399.99, description: "Variable speed control with pulse feature.", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400" },
    { name: "All-Clad D3 Stainless Steel 10-Piece Set", price: 699.99, originalPrice: 849.99, description: "Professional tri-ply bonded cookware.", image: "https://images.unsplash.com/photo-1585442231449-d33a71f68285?w=400" },
    { name: "Breville Smart Oven Air Fryer Pro", price: 349.99, originalPrice: 399.99, description: "13 cooking functions including air fry.", image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400" },
    { name: "iRobot Roomba j7+ Robot Vacuum", price: 599.99, originalPrice: 749.99, description: "PrecisionVision Navigation avoids obstacles.", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400" },
  ],
  "sports-fitness": [
    { name: "Bowflex SelectTech 552 Dumbbells", price: 429.99, originalPrice: 549.99, description: "Adjustable dumbbells replace 15 sets. 5-52.5 lbs.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" },
    { name: "Manduka PRO Yoga Mat 6mm", price: 128.99, originalPrice: 159.99, description: "Ultra-dense cushioning. Lifetime guarantee.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
    { name: "Theragun Prime Percussive Therapy", price: 299.99, originalPrice: 349.99, description: "Smart percussive therapy with Bluetooth.", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400" },
    { name: "Hydro Flask 32oz Wide Mouth", price: 44.99, originalPrice: 54.99, description: "Vacuum insulated. Hot 12 hours, cold 24 hours.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
    { name: "Garmin Forerunner 265 GPS Watch", price: 449.99, originalPrice: 549.99, description: "AMOLED display with training readiness.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400" },
    { name: "TRX All-in-One Suspension Trainer", price: 179.99, originalPrice: 219.99, description: "Full body workout system with anchors.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
    { name: "Peloton Bike Mat", price: 59.99, originalPrice: 79.99, description: "Heavy-duty exercise equipment mat. 48\" x 36\".", image: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?w=400" },
    { name: "Nike Metcon 8 Training Shoes", price: 129.99, originalPrice: 159.99, description: "CrossFit training shoe with React foam.", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400" },
    { name: "Whoop 4.0 Fitness Tracker", price: 239.99, originalPrice: 299.99, description: "24/7 health monitoring with strain analysis.", image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400" },
    { name: "Trigger Point Foam Roller Grid", price: 39.99, originalPrice: 49.99, description: "Multi-density foam roller for recovery.", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" },
    { name: "Rogue Fitness Olympic Barbell", price: 295.99, originalPrice: 345.99, description: "20kg men's Olympic weightlifting bar.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" },
    { name: "Lululemon Align High-Rise Pant", price: 98.99, originalPrice: 118.99, description: "Buttery soft Nulu fabric yoga pants.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
    { name: "Hyperice Hypervolt 2", price: 299.99, originalPrice: 349.99, description: "Quiet percussion massage device.", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400" },
    { name: "NordicTrack Commercial 1750 Treadmill", price: 1799.99, originalPrice: 2199.99, description: "iFIT enabled with 10\" touchscreen.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
    { name: "Mirror Home Gym", price: 1495.99, originalPrice: 1795.99, description: "Interactive home fitness with live classes.", image: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?w=400" },
  ],
  "gaming": [
    { name: "PlayStation DualSense Controller", price: 69.99, originalPrice: 79.99, description: "Haptic feedback and adaptive triggers.", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" },
    { name: "Razer BlackWidow V4 Pro Keyboard", price: 229.99, originalPrice: 279.99, description: "Green switches with Chroma RGB.", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400" },
    { name: "SteelSeries Arctis Nova Pro Headset", price: 349.99, originalPrice: 399.99, description: "Active noise cancellation with hot-swap battery.", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400" },
    { name: "Secretlab Titan Evo Gaming Chair", price: 499.99, originalPrice: 599.99, description: "Ergonomic chair with 4-way lumbar support.", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400" },
    { name: "Xbox Elite Controller Series 2", price: 179.99, originalPrice: 199.99, description: "Adjustable tension thumbsticks. 40hr battery.", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400" },
    { name: "Logitech G Pro X Superlight Mouse", price: 149.99, originalPrice: 179.99, description: "Ultra-lightweight at under 63 grams.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" },
    { name: "ASUS ROG Swift 27\" Gaming Monitor", price: 799.99, originalPrice: 949.99, description: "1440p 165Hz IPS with G-Sync.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { name: "Elgato Stream Deck MK.2", price: 149.99, originalPrice: 179.99, description: "15 customizable LCD keys for streaming.", image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=400" },
    { name: "HyperX Cloud Alpha Wireless", price: 199.99, originalPrice: 229.99, description: "300-hour battery life gaming headset.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400" },
    { name: "Corsair K100 RGB Gaming Keyboard", price: 229.99, originalPrice: 269.99, description: "OPX optical-mechanical switches.", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400" },
    { name: "NVIDIA GeForce RTX 4070 Super", price: 599.99, originalPrice: 699.99, description: "12GB GDDR6X for 1440p gaming.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { name: "Samsung Odyssey G9 49\" Monitor", price: 1299.99, originalPrice: 1499.99, description: "1000R curved DQHD gaming monitor.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { name: "Blue Yeti USB Microphone", price: 129.99, originalPrice: 149.99, description: "Professional multi-pattern USB mic.", image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=400" },
    { name: "Elgato Key Light", price: 189.99, originalPrice: 219.99, description: "Professional LED panel for streaming.", image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=400" },
    { name: "Nintendo Switch Pro Controller", price: 69.99, originalPrice: 79.99, description: "Premium wireless controller for Switch.", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" },
  ],
};

const defaultProducts = [
  { name: "Premium Quality Product", price: 49.99, originalPrice: 69.99, description: "High-quality product with excellent craftsmanship and durability.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { name: "Essential Daily Item", price: 29.99, originalPrice: 39.99, description: "Perfect for everyday use with modern design and functionality.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { name: "Professional Grade Solution", price: 89.99, originalPrice: 119.99, description: "Professional-grade quality trusted by experts worldwide.", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400" },
  { name: "Luxury Collection Item", price: 149.99, originalPrice: 199.99, description: "Premium luxury product with exceptional quality and finish.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Value Pack Bundle", price: 34.99, originalPrice: 49.99, description: "Great value bundle with everything you need included.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { name: "Eco-Friendly Choice", price: 44.99, originalPrice: 59.99, description: "Sustainable and environmentally friendly product choice.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" },
  { name: "Smart Tech Innovation", price: 129.99, originalPrice: 169.99, description: "Cutting-edge technology with smart features and connectivity.", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400" },
  { name: "Classic Design Favorite", price: 59.99, originalPrice: 79.99, description: "Timeless classic design that never goes out of style.", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
  { name: "Compact Travel Size", price: 24.99, originalPrice: 34.99, description: "Compact and portable, perfect for travel and on-the-go.", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400" },
  { name: "Family Size Package", price: 79.99, originalPrice: 99.99, description: "Large family size package with exceptional value.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
  { name: "Starter Kit Essentials", price: 39.99, originalPrice: 54.99, description: "Complete starter kit with all essential items included.", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400" },
  { name: "Limited Edition Release", price: 199.99, originalPrice: 249.99, description: "Exclusive limited edition with unique design elements.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Budget Friendly Option", price: 19.99, originalPrice: 29.99, description: "Affordable option without compromising on quality.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { name: "Premium Plus Edition", price: 169.99, originalPrice: 219.99, description: "Enhanced premium edition with additional features.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { name: "Bestseller Collection", price: 54.99, originalPrice: 74.99, description: "Our bestselling product loved by thousands of customers.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
];

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getRandomRating(): string {
  return (3.5 + Math.random() * 1.5).toFixed(1);
}

function getRandomReviewCount(): number {
  return Math.floor(50 + Math.random() * 450);
}

function getRandomStock(): number {
  return Math.floor(10 + Math.random() * 200);
}

function generateSku(categorySlug: string, index: number): string {
  const prefix = categorySlug.substring(0, 3).toUpperCase();
  return `${prefix}-${String(index).padStart(6, '0')}`;
}

export async function seedDatabase() {
  console.log("Starting database seed...");
  
  try {
    await db.execute(sql`TRUNCATE TABLE order_items, orders, cart_items, wishlist_items, reviews, products, affiliates, vendors, categories, users, coupons, settings, affiliate_campaigns, affiliate_transactions RESTART IDENTITY CASCADE`);
    console.log("Cleared existing data");
  } catch (error) {
    console.log("Tables may not exist yet, continuing...");
  }

  const createdCategories: Map<string, string> = new Map();
  let productIndex = 1;

  for (const cat of categoryData) {
    const [category] = await db.insert(categories).values({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      description: cat.description,
      imageUrl: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400`,
      sortOrder: categoryData.indexOf(cat),
    }).returning();
    
    createdCategories.set(cat.slug, category.id);
    console.log(`Created category: ${cat.name}`);

    const templateProducts = productTemplates[cat.slug] || defaultProducts;
    
    for (let i = 0; i < 20; i++) {
      const template = templateProducts[i % templateProducts.length];
      const productName = i < templateProducts.length ? template.name : `${cat.name} ${template.name} ${i + 1}`;
      const priceMultiplier = 0.8 + Math.random() * 0.4;
      
      await db.insert(products).values({
        name: productName,
        slug: generateSlug(productName) + `-${productIndex}`,
        description: template.description,
        shortDescription: template.description.substring(0, 100),
        price: (template.price * priceMultiplier).toFixed(2),
        originalPrice: (template.originalPrice * priceMultiplier).toFixed(2),
        categoryId: category.id,
        images: [template.image],
        stock: getRandomStock(),
        sku: generateSku(cat.slug, productIndex),
        rating: getRandomRating(),
        reviewCount: getRandomReviewCount(),
        isNew: Math.random() > 0.7,
        isBestseller: Math.random() > 0.8,
        isFeatured: Math.random() > 0.85,
        isActive: true,
        tags: [cat.name, ...cat.subcategories.slice(0, 2)],
        specifications: {
          "Brand": "NexCommerce",
          "Category": cat.name,
          "Material": "Premium Quality",
          "Warranty": "1 Year",
        },
      });
      productIndex++;
    }
  }

  console.log(`Created ${productIndex - 1} products across ${categoryData.length} categories`);

  const hashedPassword = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4lqQ5iH0QZhPfhZe";

  await db.insert(users).values([
    { username: "admin", email: "admin@nexcommerce.com", password: hashedPassword, role: "admin", fullName: "Admin User" },
    { username: "manager", email: "manager@nexcommerce.com", password: hashedPassword, role: "manager", fullName: "Manager User" },
    { username: "hr", email: "hr@nexcommerce.com", password: hashedPassword, role: "hr", fullName: "HR Manager" },
    { username: "cashier", email: "cashier@nexcommerce.com", password: hashedPassword, role: "cashier", fullName: "Cashier User" },
    { username: "stockkeeper", email: "stock@nexcommerce.com", password: hashedPassword, role: "stockkeeper", fullName: "Stock Keeper" },
    { username: "office", email: "office@nexcommerce.com", password: hashedPassword, role: "office", fullName: "Office Staff" },
    { username: "marketing", email: "marketing@nexcommerce.com", password: hashedPassword, role: "marketing", fullName: "Marketing Team" },
    { username: "sales", email: "sales@nexcommerce.com", password: hashedPassword, role: "sales", fullName: "Sales Team" },
    { username: "vendor1", email: "vendor@nexcommerce.com", password: hashedPassword, role: "vendor", fullName: "Vendor Partner" },
    { username: "affiliate1", email: "affiliate@nexcommerce.com", password: hashedPassword, role: "affiliate", fullName: "Affiliate Partner" },
    { username: "customer", email: "customer@nexcommerce.com", password: hashedPassword, role: "customer", fullName: "Test Customer" },
  ]);
  console.log("Created default users");

  await db.insert(coupons).values([
    { code: "WELCOME10", type: "percentage", value: "10", minPurchase: "50", isActive: true },
    { code: "SAVE20", type: "percentage", value: "20", minPurchase: "100", maxDiscount: "50", isActive: true },
    { code: "FLAT25", type: "fixed", value: "25", minPurchase: "150", isActive: true },
    { code: "SUMMER30", type: "percentage", value: "30", minPurchase: "200", maxDiscount: "100", isActive: true },
    { code: "VIP50", type: "percentage", value: "50", minPurchase: "500", maxDiscount: "250", isActive: true },
  ]);
  console.log("Created coupons");

  await db.insert(settings).values([
    { key: "store_name", value: JSON.stringify("NexCommerce"), category: "general" },
    { key: "store_currency", value: JSON.stringify("USD"), category: "general" },
    { key: "tax_rate", value: JSON.stringify(8.5), category: "tax" },
    { key: "shipping_free_threshold", value: JSON.stringify(100), category: "shipping" },
    { key: "default_shipping_cost", value: JSON.stringify(9.99), category: "shipping" },
  ]);
  console.log("Created settings");

  console.log("Database seeding completed successfully!");
  console.log(`Total categories: ${categoryData.length}`);
  console.log(`Total products: ${productIndex - 1}`);
}
