import { db } from "./db";
import { categories, products, users, coupons, settings, vendors, affiliates } from "@shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { 
    name: "Health & Wellness", 
    slug: "health-wellness",
    icon: "💊", 
    description: "Vitamins, supplements and health products",
    subcategories: ["Vitamins", "Supplements", "First Aid", "Personal Care", "Weight Management"],
    products: [
      { name: "Nature's Bounty Vitamin D3 5000 IU", price: 12.99, originalPrice: 18.99, description: "High-potency vitamin D3 supplement for bone health and immune support. 250 softgels per bottle.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
      { name: "Centrum Silver Adults 50+ Multivitamin", price: 24.99, originalPrice: 32.99, description: "Complete multivitamin specially formulated for adults 50 and older with essential nutrients.", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400" },
      { name: "Nordic Naturals Ultimate Omega Fish Oil", price: 29.99, originalPrice: 39.99, description: "Concentrated omega-3 fish oil with EPA and DHA for heart, brain and joint health.", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400" },
      { name: "Garden of Life Organic Protein Powder", price: 34.99, originalPrice: 44.99, description: "USDA organic plant-based protein with 22g protein per serving. Vanilla flavor.", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
      { name: "NOW Foods Magnesium Citrate 400mg", price: 14.99, originalPrice: 19.99, description: "High absorption magnesium citrate for muscle and nerve function. 180 capsules.", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400" },
      { name: "Vital Proteins Collagen Peptides", price: 27.99, originalPrice: 36.99, description: "Grass-fed collagen peptides for skin, hair, nails and joint support. Unflavored powder.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
      { name: "Nature Made Melatonin 5mg", price: 8.99, originalPrice: 12.99, description: "Drug-free sleep aid supplement for occasional sleeplessness. 90 tablets.", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400" },
      { name: "Optimum Nutrition Probiotic Complex", price: 19.99, originalPrice: 26.99, description: "50 billion CFU probiotic blend for digestive health and immune support.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400" },
      { name: "Sports Research Biotin 10000mcg", price: 16.99, originalPrice: 22.99, description: "High-potency biotin with coconut oil for healthy hair, skin and nails.", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
      { name: "Jarrow Formulas Curcumin 95", price: 22.99, originalPrice: 29.99, description: "Turmeric curcumin extract with 95% curcuminoids for joint and antioxidant support.", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400" },
    ]
  },
  { 
    name: "Beauty & Skincare", 
    slug: "beauty-skincare",
    icon: "💄", 
    description: "Premium cosmetics and skincare products",
    subcategories: ["Face Care", "Body Care", "Makeup", "Sunscreen", "Anti-Aging"],
    products: [
      { name: "CeraVe Hydrating Facial Cleanser", price: 15.99, originalPrice: 19.99, description: "Gentle daily face wash with hyaluronic acid and ceramides for normal to dry skin. 16 oz.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
      { name: "The Ordinary Niacinamide 10% + Zinc 1%", price: 6.99, originalPrice: 9.99, description: "High-strength vitamin and mineral blemish formula targeting pore congestion.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
      { name: "Neutrogena Hydro Boost Gel Cream", price: 19.99, originalPrice: 26.99, description: "Oil-free water gel moisturizer with hyaluronic acid for 48-hour hydration.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400" },
      { name: "La Roche-Posay Anthelios SPF 60", price: 29.99, originalPrice: 38.99, description: "Ultra-light fluid sunscreen with Cell-Ox Shield technology. Water resistant.", image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400" },
      { name: "Paula's Choice 2% BHA Liquid Exfoliant", price: 32.99, originalPrice: 42.99, description: "Gentle leave-on exfoliant unclogs pores and smooths wrinkles. 4 oz.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400" },
      { name: "Tatcha The Dewy Skin Cream", price: 68.99, originalPrice: 89.99, description: "Rich cream with Japanese purple rice for deep hydration and dewy glow.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400" },
      { name: "Drunk Elephant C-Firma Fresh Serum", price: 78.99, originalPrice: 99.99, description: "Potent vitamin C day serum packed with antioxidants for brighter skin.", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400" },
      { name: "Olay Regenerist Retinol 24 Night Cream", price: 38.99, originalPrice: 49.99, description: "Fragrance-free retinol moisturizer for 24-hour hydration and smooth skin.", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400" },
      { name: "SK-II Facial Treatment Essence", price: 185.99, originalPrice: 235.99, description: "Cult-favorite essence with over 90% PITERA for crystal clear skin.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
      { name: "Mario Badescu Drying Lotion", price: 17.99, originalPrice: 22.99, description: "Cult-favorite spot treatment for blemishes. Apply overnight for clear skin.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
    ]
  },
  { 
    name: "Electronics", 
    slug: "electronics",
    icon: "⚡", 
    description: "Latest gadgets and electronic devices",
    subcategories: ["Smartphones", "Audio", "Wearables", "Accessories", "Smart Home"],
    products: [
      { name: "Apple AirPods Pro 2nd Generation", price: 249.99, originalPrice: 299.99, description: "Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio with dynamic head tracking.", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400" },
      { name: "Samsung Galaxy Buds2 Pro", price: 179.99, originalPrice: 229.99, description: "Hi-Fi sound with intelligent ANC and 360 Audio. IPX7 water resistant.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
      { name: "Sony WH-1000XM5 Headphones", price: 348.99, originalPrice: 399.99, description: "Industry-leading noise cancellation with Auto NC Optimizer and 30-hour battery.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
      { name: "Apple Watch Series 9 GPS 45mm", price: 429.99, originalPrice: 499.99, description: "S9 SiP chip, Always-On Retina display, blood oxygen and ECG apps.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
      { name: "JBL Flip 6 Portable Speaker", price: 99.99, originalPrice: 129.99, description: "Powerful JBL Original Pro Sound with IP67 waterproof rating. 12-hour playtime.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
      { name: "Anker PowerCore 26800 Power Bank", price: 65.99, originalPrice: 79.99, description: "Massive 26800mAh capacity with PowerIQ technology and dual USB ports.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" },
      { name: "Logitech MX Master 3S Mouse", price: 99.99, originalPrice: 119.99, description: "Wireless performance mouse with MagSpeed electromagnetic scrolling.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
      { name: "Bose QuietComfort Earbuds II", price: 279.99, originalPrice: 329.99, description: "CustomTune technology for personalized noise cancellation and sound.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400" },
      { name: "Amazon Echo Dot 5th Gen", price: 49.99, originalPrice: 59.99, description: "Smart speaker with Alexa, improved audio performance and eero mesh wifi.", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400" },
      { name: "Belkin 3-in-1 Wireless Charger", price: 129.99, originalPrice: 149.99, description: "Fast wireless charging for iPhone, Apple Watch and AirPods simultaneously.", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400" },
    ]
  },
  { 
    name: "Fashion & Clothing", 
    slug: "fashion-clothing",
    icon: "👔", 
    description: "Trendy apparel and fashion accessories",
    subcategories: ["Men's Wear", "Women's Wear", "Shoes", "Bags", "Accessories"],
    products: [
      { name: "Levi's 501 Original Fit Jeans", price: 69.99, originalPrice: 89.99, description: "Iconic straight leg jeans with button fly. 100% cotton denim. Classic fit.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400" },
      { name: "Nike Air Force 1 '07 White", price: 109.99, originalPrice: 129.99, description: "Legendary basketball sneaker with Air-Sole unit and perforated toe box.", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400" },
      { name: "Herschel Little America Backpack", price: 99.99, originalPrice: 119.99, description: "Classic mountaineering style with laptop sleeve. 25L capacity.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
      { name: "Ray-Ban Aviator Classic Sunglasses", price: 161.99, originalPrice: 199.99, description: "Iconic pilot sunglasses with gold frame and G-15 green lenses.", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
      { name: "Carhartt WIP Chase Hoodie", price: 89.99, originalPrice: 109.99, description: "Heavyweight hooded sweatshirt with embroidered logo. Brushed fleece.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
      { name: "Adidas Ultraboost 22 Running Shoes", price: 189.99, originalPrice: 229.99, description: "Responsive Boost midsole with Primeknit+ upper for ultimate comfort.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
      { name: "Fjällräven Kånken Classic Backpack", price: 79.99, originalPrice: 99.99, description: "Swedish classic with Vinylon F fabric. Water resistant. 16L capacity.", image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400" },
      { name: "Tommy Hilfiger Essential Down Jacket", price: 179.99, originalPrice: 229.99, description: "Lightweight packable down jacket with signature flag logo.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
      { name: "Calvin Klein Modern Cotton Bralette", price: 32.99, originalPrice: 42.99, description: "Iconic unlined bralette with signature logo elastic band.", image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400" },
      { name: "Timberland 6-Inch Premium Boots", price: 198.99, originalPrice: 249.99, description: "Waterproof leather boots with padded collar. Rust-proof hardware.", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400" },
    ]
  },
  { 
    name: "Home & Kitchen", 
    slug: "home-kitchen",
    icon: "🏠", 
    description: "Home essentials and kitchen appliances",
    subcategories: ["Cookware", "Appliances", "Storage", "Bedding", "Decor"],
    products: [
      { name: "Instant Pot Duo 7-in-1 Pressure Cooker", price: 89.99, originalPrice: 119.99, description: "Electric pressure cooker with 7 functions. 6 quart capacity. Stainless steel.", image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400" },
      { name: "Ninja Professional Blender 1000W", price: 79.99, originalPrice: 99.99, description: "Professional power blender with Total Crushing Technology. 72 oz pitcher.", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400" },
      { name: "Cuisinart 14-Cup Coffee Maker", price: 99.99, originalPrice: 129.99, description: "Programmable coffee maker with brew strength control and thermal carafe.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" },
      { name: "Lodge Cast Iron Skillet 12 Inch", price: 39.99, originalPrice: 54.99, description: "Pre-seasoned cast iron skillet. Oven safe to 500°F. Made in USA.", image: "https://images.unsplash.com/photo-1585442231449-d33a71f68285?w=400" },
      { name: "Dyson V15 Detect Cordless Vacuum", price: 699.99, originalPrice: 849.99, description: "Laser reveals microscopic dust. Piezo sensor counts particles. 60 min runtime.", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400" },
      { name: "KitchenAid Artisan Stand Mixer", price: 379.99, originalPrice: 449.99, description: "Iconic tilt-head stand mixer with 5-quart bowl. 10 speeds. Empire Red.", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400" },
      { name: "Philips Sonicare DiamondClean", price: 179.99, originalPrice: 229.99, description: "Electric toothbrush with 5 modes and smart sensor technology.", image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400" },
      { name: "Tempur-Pedic Cloud Pillow", price: 89.99, originalPrice: 119.99, description: "Premium memory foam pillow with cooling gel layer. Standard size.", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400" },
      { name: "Nespresso Vertuo Plus Coffee Machine", price: 159.99, originalPrice: 199.99, description: "Centrifusion technology brews coffee and espresso. Includes Aeroccino.", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
      { name: "Brooklinen Luxe Core Sheet Set", price: 149.99, originalPrice: 189.99, description: "480 thread count long-staple cotton sheets. Buttery smooth. Queen size.", image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400" },
    ]
  },
  { 
    name: "Sports & Fitness", 
    slug: "sports-fitness",
    icon: "🏋️", 
    description: "Sports equipment and fitness gear",
    subcategories: ["Exercise Equipment", "Yoga", "Running", "Team Sports", "Outdoor"],
    products: [
      { name: "Bowflex SelectTech 552 Dumbbells", price: 429.99, originalPrice: 549.99, description: "Adjustable dumbbells replace 15 sets of weights. 5-52.5 lbs each.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" },
      { name: "Manduka PRO Yoga Mat 6mm", price: 128.99, originalPrice: 159.99, description: "Ultra-dense cushioning with closed-cell surface. Lifetime guarantee.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
      { name: "Theragun Prime Percussive Therapy", price: 299.99, originalPrice: 349.99, description: "Smart percussive therapy device with 5 built-in speeds. Bluetooth app.", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400" },
      { name: "Hydro Flask 32oz Wide Mouth", price: 44.99, originalPrice: 54.99, description: "Vacuum insulated stainless steel bottle. Hot 12 hours, cold 24 hours.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
      { name: "Garmin Forerunner 265 GPS Watch", price: 449.99, originalPrice: 549.99, description: "AMOLED display GPS running watch with training readiness and race predictor.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400" },
      { name: "TRX All-in-One Suspension Trainer", price: 179.99, originalPrice: 219.99, description: "Full body workout system. Includes indoor/outdoor anchors and workouts.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
      { name: "Peloton Bike Mat", price: 59.99, originalPrice: 79.99, description: "Heavy-duty exercise equipment mat. Protects floors. 48\" x 36\".", image: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?w=400" },
      { name: "Nike Metcon 8 Training Shoes", price: 129.99, originalPrice: 159.99, description: "CrossFit and HIIT training shoe with React foam and wide flat heel.", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400" },
      { name: "Whoop 4.0 Fitness Tracker", price: 239.99, originalPrice: 299.99, description: "24/7 health monitoring with strain, recovery and sleep analysis.", image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400" },
      { name: "Trigger Point Foam Roller Grid", price: 39.99, originalPrice: 49.99, description: "Multi-density foam roller for deep tissue massage and recovery.", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" },
    ]
  },
  { 
    name: "Gaming", 
    slug: "gaming",
    icon: "🎮", 
    description: "Gaming consoles, accessories and gear",
    subcategories: ["Consoles", "Controllers", "Headsets", "Chairs", "Accessories"],
    products: [
      { name: "PlayStation DualSense Controller", price: 69.99, originalPrice: 79.99, description: "Wireless controller with haptic feedback and adaptive triggers.", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" },
      { name: "Razer BlackWidow V4 Pro Keyboard", price: 229.99, originalPrice: 279.99, description: "Mechanical gaming keyboard with Green switches and Chroma RGB.", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400" },
      { name: "SteelSeries Arctis Nova Pro Headset", price: 349.99, originalPrice: 399.99, description: "Premium gaming headset with active noise cancellation and hot-swap battery.", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400" },
      { name: "Secretlab Titan Evo Gaming Chair", price: 499.99, originalPrice: 599.99, description: "Ergonomic gaming chair with 4-way lumbar support. Neo Hybrid Leatherette.", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400" },
      { name: "Xbox Elite Controller Series 2", price: 179.99, originalPrice: 199.99, description: "Pro controller with adjustable tension thumbsticks and up to 40hr battery.", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400" },
      { name: "Logitech G Pro X Superlight Mouse", price: 149.99, originalPrice: 179.99, description: "Ultra-lightweight wireless gaming mouse at under 63 grams.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" },
      { name: "ASUS ROG Swift 27\" Gaming Monitor", price: 799.99, originalPrice: 949.99, description: "1440p 165Hz IPS gaming monitor with G-Sync and HDR10.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
      { name: "Elgato Stream Deck MK.2", price: 149.99, originalPrice: 179.99, description: "15 customizable LCD keys for streaming. Detachable USB-C cable.", image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=400" },
      { name: "HyperX Cloud Alpha Wireless", price: 199.99, originalPrice: 229.99, description: "300-hour battery life gaming headset with DTS Headphone:X.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400" },
      { name: "Corsair K100 RGB Gaming Keyboard", price: 229.99, originalPrice: 269.99, description: "OPX optical-mechanical switches with iCUE control wheel.", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400" },
    ]
  },
  { 
    name: "Baby & Kids", 
    slug: "baby-kids",
    icon: "🧸", 
    description: "Products for babies and children",
    subcategories: ["Baby Care", "Toys", "Clothing", "Feeding", "Nursery"],
    products: [
      { name: "LEGO Classic Creative Bricks 790pc", price: 34.99, originalPrice: 44.99, description: "Classic LEGO brick set with 790 pieces in 33 different colors.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400" },
      { name: "Fisher-Price Laugh & Learn Walker", price: 24.99, originalPrice: 34.99, description: "Sit-to-stand learning walker with 75+ songs and phrases.", image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400" },
      { name: "Pampers Swaddlers Size 3 (168ct)", price: 42.99, originalPrice: 54.99, description: "Soft absorbent diapers with wetness indicator. Size 3 (16-28 lbs).", image: "https://images.unsplash.com/photo-1584839402744-c29c3a09ea26?w=400" },
      { name: "Graco Pack 'n Play Playard", price: 89.99, originalPrice: 119.99, description: "Portable playard with bassinet and changing station. Easy fold.", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400" },
      { name: "Baby Bjorn Bouncer Balance Soft", price: 199.99, originalPrice: 249.99, description: "Ergonomic baby bouncer with natural rocking. 0-2 years.", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400" },
      { name: "Melissa & Doug Wooden Puzzle Set", price: 19.99, originalPrice: 27.99, description: "4-pack wooden puzzles with vehicles, animals, shapes and food.", image: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=400" },
      { name: "Comotomo Baby Bottle 8oz (2-Pack)", price: 24.99, originalPrice: 32.99, description: "Naturally shaped silicone bottle. Anti-colic vents.", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400" },
      { name: "Baby Trend Expedition Jogger Stroller", price: 129.99, originalPrice: 169.99, description: "All-terrain jogger stroller with bicycle tires. Locking front wheel.", image: "https://images.unsplash.com/photo-1591261731300-0dadef4d5473?w=400" },
      { name: "VTech KidiZoom Creator Cam", price: 59.99, originalPrice: 79.99, description: "HD video camera for kids with green screen and selfie mode.", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400" },
      { name: "Hatch Rest Baby Sound Machine", price: 69.99, originalPrice: 89.99, description: "Smart sound machine and night light. App controlled. White noise.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
    ]
  },
  { 
    name: "Pet Supplies", 
    slug: "pet-supplies",
    icon: "🐾", 
    description: "Everything for your furry friends",
    subcategories: ["Dog Supplies", "Cat Supplies", "Pet Food", "Toys", "Health"],
    products: [
      { name: "Blue Buffalo Life Protection Dog Food 30lb", price: 54.99, originalPrice: 69.99, description: "Natural dry dog food with real chicken and brown rice. No artificial flavors.", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400" },
      { name: "KONG Classic Dog Toy Large", price: 14.99, originalPrice: 18.99, description: "Ultra-durable natural rubber toy for aggressive chewers. Stuffable.", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400" },
      { name: "Furminator Deshedding Tool Large", price: 32.99, originalPrice: 42.99, description: "Professional deshedding tool reduces loose hair up to 90%.", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" },
      { name: "PetSafe ScoopFree Self-Cleaning Litter Box", price: 169.99, originalPrice: 219.99, description: "Automatic rake system with crystal litter. Weeks without scooping.", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400" },
      { name: "Seresto Flea & Tick Collar Dogs", price: 59.99, originalPrice: 74.99, description: "8-month protection against fleas and ticks. Water resistant.", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400" },
      { name: "Outward Hound Fun Feeder Slow Bowl", price: 12.99, originalPrice: 17.99, description: "Slow feeder maze bowl extends mealtime 10x. Dishwasher safe.", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400" },
      { name: "Temptations Classic Cat Treats", price: 8.99, originalPrice: 11.99, description: "Crunchy outside, soft inside. Seafood Medley flavor. 16oz.", image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400" },
      { name: "Whistle GPS Pet Tracker", price: 99.99, originalPrice: 129.99, description: "GPS location tracking with health and fitness monitoring.", image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400" },
      { name: "Kurgo Tru-Fit Dog Car Harness", price: 39.99, originalPrice: 54.99, description: "Crash-tested car harness doubles as walking harness. All sizes.", image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400" },
      { name: "Litter Genie Plus Disposal System", price: 19.99, originalPrice: 27.99, description: "Pail disposal system seals in odor. Easy one-handed operation.", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400" },
    ]
  },
  { 
    name: "Books & Stationery", 
    slug: "books-stationery",
    icon: "📚", 
    description: "Books, office supplies and stationery",
    subcategories: ["Fiction", "Non-Fiction", "Notebooks", "Pens", "Office"],
    products: [
      { name: "Moleskine Classic Notebook Large", price: 22.99, originalPrice: 28.99, description: "Iconic hardcover notebook. 240 ruled pages. Black cover.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400" },
      { name: "Pilot G2 Gel Pens Black 12-Pack", price: 14.99, originalPrice: 19.99, description: "Smooth writing gel ink pens with contoured rubber grip. Fine 0.7mm.", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400" },
      { name: "Leuchtturm1917 Bullet Journal A5", price: 24.99, originalPrice: 32.99, description: "Dotted notebook perfect for bullet journaling. 249 pages.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" },
      { name: "Atomic Habits by James Clear", price: 18.99, originalPrice: 24.99, description: "Best-selling book on building good habits and breaking bad ones.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
      { name: "Post-it Super Sticky Notes 24-Pack", price: 24.99, originalPrice: 32.99, description: "Stickies that stick and re-stick. 3x3 inches. Assorted colors.", image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400" },
      { name: "Staedtler Triplus Fineliner 20-Pack", price: 17.99, originalPrice: 24.99, description: "Superfine metal-clad tip. Ergonomic triangular shape.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400" },
      { name: "Kindle Paperwhite 8GB", price: 139.99, originalPrice: 169.99, description: "6.8\" display with adjustable warm light. Weeks of battery life.", image: "https://images.unsplash.com/photo-1594377157609-5c996118ac7f?w=400" },
      { name: "The Psychology of Money", price: 16.99, originalPrice: 22.99, description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.", image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400" },
      { name: "Sharpie Permanent Markers 24-Pack", price: 18.99, originalPrice: 25.99, description: "Fine point permanent markers in assorted colors. Quick-drying.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400" },
      { name: "Rocketbook Everlast Smart Notebook", price: 32.99, originalPrice: 42.99, description: "Reusable smart notebook. Cloud connected. Letter size.", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400" },
    ]
  },
  { 
    name: "Food & Beverages", 
    slug: "food-beverages",
    icon: "☕", 
    description: "Quality food, snacks and drinks",
    subcategories: ["Coffee & Tea", "Snacks", "Organic", "Beverages", "Pantry"],
    products: [
      { name: "Starbucks French Roast Ground Coffee 28oz", price: 16.99, originalPrice: 21.99, description: "Bold smoky-sweet dark roast. 100% Arabica beans.", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
      { name: "Twinings Earl Grey Tea 100 Count", price: 9.99, originalPrice: 13.99, description: "Classic black tea with bergamot flavor. Individually wrapped.", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
      { name: "KIND Bars Variety Pack 12ct", price: 16.99, originalPrice: 22.99, description: "Gluten-free snack bars with nuts and fruit. Low sugar.", image: "https://images.unsplash.com/photo-1622484211148-3c255be28cfc?w=400" },
      { name: "Organic Valley Grass-Fed Butter 16oz", price: 8.99, originalPrice: 11.99, description: "Pasture-raised organic butter. No antibiotics or synthetic hormones.", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400" },
      { name: "Ghirardelli Intense Dark Chocolate 4.1oz", price: 4.99, originalPrice: 6.99, description: "Premium 72% cacao dark chocolate squares. Smooth and rich.", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400" },
      { name: "Lavazza Super Crema Espresso Beans 2.2lb", price: 21.99, originalPrice: 28.99, description: "Italian medium espresso roast. Velvety crema. Whole beans.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" },
      { name: "RXBar Protein Bars Variety 14ct", price: 29.99, originalPrice: 38.99, description: "Clean protein bars made with real ingredients. 12g protein.", image: "https://images.unsplash.com/photo-1622484211148-3c255be28cfc?w=400" },
      { name: "Nutella Hazelnut Spread 26.5oz", price: 9.99, originalPrice: 12.99, description: "Creamy hazelnut spread with cocoa. No artificial colors.", image: "https://images.unsplash.com/photo-1604394319950-c08b5e5598b4?w=400" },
      { name: "San Pellegrino Sparkling Water 24-Pack", price: 18.99, originalPrice: 24.99, description: "Italian sparkling mineral water. 16.9 fl oz bottles.", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400" },
      { name: "Trader Joe's Everything Bagel Seasoning", price: 4.99, originalPrice: 7.99, description: "Sesame, poppy seeds, garlic, onion and salt blend.", image: "https://images.unsplash.com/photo-1599690925058-90e1a0b56154?w=400" },
    ]
  },
  { 
    name: "Automotive", 
    slug: "automotive",
    icon: "🚗", 
    description: "Car accessories and maintenance products",
    subcategories: ["Interior", "Exterior", "Maintenance", "Electronics", "Tools"],
    products: [
      { name: "Chemical Guys Complete Car Wash Kit", price: 69.99, originalPrice: 89.99, description: "16-piece car wash kit with shampoo, wax, brushes and microfiber towels.", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400" },
      { name: "Armor All Interior Wipes 50ct", price: 8.99, originalPrice: 12.99, description: "All-in-one interior wipes clean and protect. UV protection.", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400" },
      { name: "Michelin Tire Pressure Gauge", price: 14.99, originalPrice: 19.99, description: "Digital tire pressure gauge with backlit LCD. 0-99 PSI.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
      { name: "NOCO Boost Plus Jump Starter", price: 99.99, originalPrice: 129.99, description: "1000 Amp portable lithium jump starter. Built-in flashlight.", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400" },
      { name: "Garmin Dash Cam 57 1440p", price: 199.99, originalPrice: 249.99, description: "Compact dash cam with 1440p video. Voice control. GPS.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
      { name: "Meguiar's Gold Class Car Wax 16oz", price: 19.99, originalPrice: 27.99, description: "Premium carnauba wax for brilliant shine. Easy on, easy off.", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400" },
      { name: "WeatherTech Floor Mats Universal", price: 49.99, originalPrice: 69.99, description: "All-weather floor mats. Raised lip contains fluid. 3-piece set.", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400" },
      { name: "Anker Roav SmartCharge Car Charger", price: 14.99, originalPrice: 21.99, description: "Dual USB car charger with voltage monitoring. 24W output.", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400" },
      { name: "Rain-X Latitude Wiper Blades 24\"", price: 24.99, originalPrice: 32.99, description: "All-season beam wiper blades with water repellency. Pair.", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400" },
      { name: "FRiEQ Car Air Freshener Vent Clips 6pk", price: 12.99, originalPrice: 17.99, description: "Essential oil diffuser vent clips. 6 scents included.", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400" },
    ]
  },
];

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
}

async function seed() {
  console.log("🌱 Starting database seed with real products...");

  try {
    console.log("🗑️ Clearing existing data...");
    await db.execute(sql`TRUNCATE TABLE affiliate_transactions, affiliate_campaigns, order_items, orders, reviews, wishlist_items, cart_items, products, categories, affiliates, vendors, users, coupons, settings CASCADE`);
    
    console.log("📁 Creating categories and products...");
    const createdCategories: { id: string; name: string; slug: string }[] = [];
    let categoryIndex = 0;
    let totalProducts = 0;
    const usedSlugs = new Set<string>();
    
    for (const cat of categoryData) {
      const [mainCategory] = await db.insert(categories).values({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        sortOrder: categoryIndex++,
      }).returning();
      
      createdCategories.push(mainCategory);
      
      for (const subName of cat.subcategories) {
        const subSlug = generateSlug(`${cat.name}-${subName}`);
        const [subCategory] = await db.insert(categories).values({
          name: subName,
          slug: subSlug,
          description: `${subName} in ${cat.name}`,
          icon: cat.icon,
          parentId: mainCategory.id,
          sortOrder: categoryIndex++,
        }).returning();
        createdCategories.push(subCategory);
      }
      
      const productBatch = [];
      for (let i = 0; i < cat.products.length; i++) {
        const p = cat.products[i];
        let slug = generateSlug(p.name);
        let slugCounter = 1;
        while (usedSlugs.has(slug)) {
          slug = `${generateSlug(p.name)}-${slugCounter}`;
          slugCounter++;
        }
        usedSlugs.add(slug);
        
        productBatch.push({
          name: p.name,
          slug,
          description: p.description,
          shortDescription: p.description.substring(0, 100),
          price: p.price.toString(),
          originalPrice: p.originalPrice.toString(),
          categoryId: mainCategory.id,
          images: [p.image, p.image],
          colors: [
            { name: "Default", value: "#D3C1E7" },
          ],
          sizes: [],
          stock: Math.floor(Math.random() * 200) + 20,
          sku: `SKU-${String(totalProducts + i + 1).padStart(6, '0')}`,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviewCount: Math.floor(Math.random() * 1000) + 50,
          isNew: i < 3,
          isBestseller: i >= 2 && i < 6,
          isFeatured: i < 5,
          isActive: true,
          tags: ["premium", "quality", "trending"],
        });
      }
      
      if (productBatch.length > 0) {
        await db.insert(products).values(productBatch as any);
        totalProducts += productBatch.length;
        console.log(`   Created ${cat.products.length} products for ${cat.name}`);
      }

      const additionalProducts = [];
      const variations = [
        "Pro", "Plus", "Max", "Ultra", "Elite", "Premium", "Deluxe", "Lite", "Mini", "XL",
        "2024 Edition", "Limited Edition", "Special Edition", "Eco-Friendly", "Travel Size",
        "Family Pack", "Value Pack", "Gift Set", "Starter Kit", "Professional Grade"
      ];
      
      for (let v = 0; v < variations.length; v++) {
        for (let p = 0; p < Math.min(5, cat.products.length); p++) {
          const baseProduct = cat.products[p];
          const varName = `${baseProduct.name} ${variations[v]}`;
          
          let slug = generateSlug(varName);
          let slugCounter = 1;
          while (usedSlugs.has(slug)) {
            slug = `${generateSlug(varName)}-${slugCounter}`;
            slugCounter++;
          }
          usedSlugs.add(slug);
          
          const priceMultiplier = 0.7 + Math.random() * 0.6;
          const newPrice = Math.round(baseProduct.price * priceMultiplier * 100) / 100;
          const newOriginal = Math.round(newPrice * (1.1 + Math.random() * 0.3) * 100) / 100;
          
          additionalProducts.push({
            name: varName,
            slug,
            description: `${variations[v]} version. ${baseProduct.description}`,
            shortDescription: `${variations[v]} - ${baseProduct.description.substring(0, 80)}`,
            price: newPrice.toString(),
            originalPrice: newOriginal.toString(),
            categoryId: mainCategory.id,
            images: [baseProduct.image, baseProduct.image],
            colors: [{ name: "Default", value: "#D3C1E7" }],
            sizes: [],
            stock: Math.floor(Math.random() * 150) + 10,
            sku: `SKU-${String(totalProducts + additionalProducts.length + 1).padStart(6, '0')}`,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviewCount: Math.floor(Math.random() * 500) + 20,
            isNew: Math.random() > 0.7,
            isBestseller: Math.random() > 0.8,
            isFeatured: Math.random() > 0.6,
            isActive: true,
            tags: ["premium", "quality", variations[v].toLowerCase()],
          });
        }
      }
      
      if (additionalProducts.length > 0) {
        const batchSize = 50;
        for (let i = 0; i < additionalProducts.length; i += batchSize) {
          const batch = additionalProducts.slice(i, i + batchSize);
          await db.insert(products).values(batch as any);
        }
        totalProducts += additionalProducts.length;
        console.log(`   Created ${additionalProducts.length} product variations for ${cat.name}`);
      }
    }
    
    console.log(`✅ Created ${createdCategories.length} categories`);
    console.log(`✅ Created ${totalProducts} unique products`);

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

    console.log("👥 Creating vendors...");
    const vendorData = [
      { name: "TechZone Electronics", email: "tech@example.com" },
      { name: "Beauty Essentials", email: "beauty@example.com" },
      { name: "FitLife Sports", email: "sports@example.com" },
      { name: "Home & Living Co", email: "home@example.com" },
      { name: "Fashion Forward", email: "fashion@example.com" },
    ];
    
    for (const v of vendorData) {
      const vendorUser = await db.insert(users).values({
        username: generateSlug(v.name),
        email: v.email,
        password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        role: "vendor",
        fullName: v.name,
        isVerified: true,
      }).returning();
      
      await db.insert(vendors).values({
        userId: vendorUser[0].id,
        storeName: v.name,
        storeSlug: generateSlug(v.name),
        description: `${v.name} - Quality products at great prices`,
        contactEmail: v.email,
        isVerified: true,
        isActive: true,
        rating: (Math.random() * 1 + 4).toFixed(1),
        totalSales: Math.floor(Math.random() * 1000) + 100,
      });
    }
    console.log(`✅ Created ${vendorData.length} vendors`);

    console.log("🔗 Creating affiliates...");
    for (let i = 0; i < 5; i++) {
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
        totalEarnings: (Math.random() * 5000).toFixed(2),
        pendingEarnings: (Math.random() * 500).toFixed(2),
        totalClicks: Math.floor(Math.random() * 3000) + 100,
        totalConversions: Math.floor(Math.random() * 100) + 10,
        isActive: true,
      });
    }
    console.log("✅ Created 5 affiliates");

    console.log("🎫 Creating coupons...");
    await db.insert(coupons).values([
      { code: "WELCOME15", type: "percentage", value: "15", isActive: true },
      { code: "SAVE20", type: "percentage", value: "20", minPurchase: "100", maxDiscount: "50", isActive: true },
      { code: "FLASH30", type: "percentage", value: "30", minPurchase: "200", maxDiscount: "100", isActive: true },
      { code: "FLAT25", type: "fixed", value: "25", minPurchase: "100", isActive: true },
      { code: "FREESHIP", type: "fixed", value: "10", minPurchase: "50", isActive: true },
    ]);
    console.log("✅ Created 5 coupons");

    console.log("⚙️ Creating settings...");
    await db.insert(settings).values([
      { key: "site_name", value: JSON.stringify("NexCommerce"), category: "general" },
      { key: "site_description", value: JSON.stringify("The Future of Shopping Starts Here"), category: "general" },
      { key: "currency", value: JSON.stringify("USD"), category: "general" },
      { key: "currency_symbol", value: JSON.stringify("$"), category: "general" },
      { key: "shipping_free_threshold", value: JSON.stringify(50), category: "shipping" },
      { key: "shipping_standard_rate", value: JSON.stringify(5.99), category: "shipping" },
      { key: "shipping_express_rate", value: JSON.stringify(12.99), category: "shipping" },
      { key: "tax_rate", value: JSON.stringify(8), category: "tax" },
      { key: "affiliate_commission_rate", value: JSON.stringify(5), category: "affiliate" },
      { key: "vendor_commission_rate", value: JSON.stringify(10), category: "vendor" },
    ]);
    console.log("✅ Created settings");

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Summary: ${createdCategories.length} categories, ${totalProducts} unique products`);
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
