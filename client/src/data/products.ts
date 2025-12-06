export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description?: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stock?: number;
  has3D?: boolean;
  model3dType?: "box" | "sphere" | "torus" | "cylinder";
  vendorName?: string;
  tags?: string[];
  badgeColor?: string;
  animation?: "rotate" | "bounce" | "pulse" | "glow" | "float";
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  iconName: string;
  gradient: string;
  image?: string;
}

export const categories: Category[] = [
  { name: "Health Items", slug: "health-items", icon: "💊", iconName: "Pill", gradient: "from-green-600 to-teal-500", image: "https://myvertexbd.com/image/category/62fb70c13fd09.webp" },
  { name: "Cosmetics Items", slug: "cosmetics-items", icon: "💄", iconName: "Sparkles", gradient: "from-pink-600 to-rose-500", image: "https://myvertexbd.com/image/category/6331c4662f487.webp" },
  { name: "Tea & Coffee", slug: "tea-coffee", icon: "☕", iconName: "Music", gradient: "from-amber-700 to-orange-600", image: "https://myvertexbd.com/image/category/67628dd94b90f.webp" },
  { name: "Hair Oil & Gel", slug: "hair-oil-gel", icon: "💆", iconName: "Wind", gradient: "from-yellow-600 to-amber-500", image: "https://myvertexbd.com/image/category/66c78c111bb2b.webp" },
  { name: "Consumer Items", slug: "consumer-items", icon: "🛒", iconName: "ShoppingCart", gradient: "from-blue-600 to-indigo-500", image: "https://myvertexbd.com/image/category/62fb710457c8a.webp" },
  { name: "Salon & Parlour", slug: "salon-parlour", icon: "✨", iconName: "Sparkles", gradient: "from-purple-600 to-pink-500", image: "https://myvertexbd.com/image/category/66c777c88f197.webp" },
  { name: "Electronics", slug: "electronics", icon: "⚡", iconName: "Zap", gradient: "from-blue-600 to-cyan-500" },
  { name: "Fashion", slug: "fashion", icon: "👔", iconName: "Shirt", gradient: "from-pink-600 to-rose-500" },
  { name: "Home & Living", slug: "home", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-500" },
  { name: "Sports & Fitness", slug: "sports", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-pink-500" },
  { name: "Gaming", slug: "gaming", icon: "🎮", iconName: "Gamepad2", gradient: "from-violet-600 to-purple-500" },
  { name: "Jewelry & Watches", slug: "jewelry", icon: "💎", iconName: "Watch", gradient: "from-yellow-600 to-amber-500" },
  { name: "Books & Media", slug: "books", icon: "📚", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-500" },
  { name: "Kids & Toys", slug: "kids", icon: "🧸", iconName: "Puzzle", gradient: "from-green-500 to-emerald-400" },
  { name: "Automotive", slug: "automotive", icon: "🚗", iconName: "Car", gradient: "from-gray-600 to-slate-500" },
  { name: "Food & Grocery", slug: "food", icon: "🍔", iconName: "ChefHat", gradient: "from-orange-600 to-red-500" },
  { name: "Appliances", slug: "appliances", icon: "🔌", iconName: "Zap", gradient: "from-cyan-600 to-blue-500" },
  { name: "Furniture", slug: "furniture", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-700 to-orange-600" },
  { name: "Outdoor & Garden", slug: "outdoor", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-500" },
  { name: "Pet Supplies", slug: "pets", icon: "🐾", iconName: "PawPrint", gradient: "from-orange-600 to-pink-500" },
  { name: "Sports Equipment", slug: "sports-eq", icon: "⚽", iconName: "Trophy", gradient: "from-yellow-600 to-orange-500" },
  { name: "Musical Instruments", slug: "music", icon: "🎸", iconName: "Music", gradient: "from-purple-600 to-pink-500" },
  { name: "Art & Craft", slug: "art", icon: "🎨", iconName: "Palette", gradient: "from-rose-600 to-pink-500" },
  { name: "Tools & Hardware", slug: "tools", icon: "🔨", iconName: "Wrench", gradient: "from-gray-700 to-slate-600" },
  { name: "Office Supplies", slug: "office", icon: "📎", iconName: "Paperclip", gradient: "from-blue-600 to-indigo-500" },
  { name: "School Supplies", slug: "school", icon: "✏️", iconName: "PencilRuler", gradient: "from-yellow-600 to-amber-500" },
  { name: "Party & Events", slug: "party", icon: "🎉", iconName: "Sparkles", gradient: "from-pink-600 to-purple-500" },
  { name: "Camping & Hiking", slug: "camping", icon: "⛺", iconName: "Tent", gradient: "from-green-700 to-emerald-600" },
  { name: "Travel & Luggage", slug: "travel", icon: "✈️", iconName: "Plane", gradient: "from-blue-600 to-cyan-500" },
  { name: "Shoes & Footwear", slug: "shoes", icon: "👟", iconName: "Footprints", gradient: "from-red-600 to-pink-500" },
];

const colorPalettes = [
  { accent: "#8B5CF6", name: "purple" },
  { accent: "#EC4899", name: "pink" },
  { accent: "#06B6D4", name: "cyan" },
  { accent: "#10B981", name: "emerald" },
  { accent: "#F59E0B", name: "amber" },
  { accent: "#EF4444", name: "red" },
  { accent: "#22C55E", name: "green" },
  { accent: "#EAB308", name: "yellow" },
  { accent: "#3B82F6", name: "blue" },
  { accent: "#A78BFA", name: "violet" },
];

const animations: ("rotate" | "bounce" | "pulse" | "glow" | "float")[] = ["rotate", "bounce", "pulse", "glow", "float"];

const categoryProductNames: Record<string, string[]> = {
  "health-items": [
    "Vitamin D3 Supplements", "Omega-3 Fish Oil Capsules", "Multivitamin Daily Tablets", "Protein Powder Whey Isolate",
    "Calcium Plus Vitamin K2", "Probiotic Gut Health Formula", "Iron Supplement Complex", "Vitamin C Immune Booster",
    "Collagen Peptides Powder", "Zinc Immunity Tablets", "B12 Energy Vitamins", "Magnesium Glycinate Caps",
    "Turmeric Curcumin Extract", "Ashwagandha Stress Relief", "Green Tea Extract Capsules", "CoQ10 Heart Health",
    "Elderberry Immune Support", "Melatonin Sleep Aid", "Glucosamine Joint Care", "Spirulina Superfood Tabs",
    "Biotin Hair Growth Formula", "Apple Cider Vinegar Gummies", "Fiber Digestive Support", "Herbal Sleep Complex",
    "Energy Boost Tablets", "Detox Cleanse Formula", "Weight Management Caps", "Blood Pressure Support",
    "Memory Focus Blend", "Stress Relief Capsules", "Bone Health Formula", "Liver Support Supplement",
    "Eye Care Vitamins", "Kidney Health Complex", "Respiratory Support Blend", "Soya Protein Plus",
    "Moringa Powder Organic", "Aloe Vera Health Drink", "Katila Herbal Supplement", "Balance Booster Box",
    "Apple Ginger Wellness Drink", "Tulsi Sia Health Elixir", "Senega Tablets Natural", "Natrum Mur Remedy",
    "Ginseng Energy Boost", "Neem Detox Capsules", "Brahmi Memory Support", "Triphala Digestive Aid"
  ],
  "cosmetics-items": [
    "Milk Face Wash Cleanser", "Vitamin C Brightening Serum", "Retinol Night Repair Cream", "Hyaluronic Acid Moisturizer",
    "Niacinamide Pore Minimizer", "Salicylic Acid Acne Treatment", "Rose Hip Face Oil", "Charcoal Peel-Off Mask",
    "Sunscreen SPF 50 Ultra", "BB Cream Natural Finish", "Foundation Liquid Matte", "Concealer Full Coverage",
    "Setting Powder Translucent", "Blush Duo Compact", "Bronzer Sun-Kissed Glow", "Highlighter Shimmer Stick",
    "Eyeshadow Palette Nude", "Eyeliner Waterproof Gel", "Mascara Volume Boost", "Eyebrow Pencil Define",
    "Lipstick Matte Velvet", "Lip Gloss Crystal Shine", "Lip Liner Precision", "Lip Balm Hydrating SPF",
    "Orange Turmeric Soap", "Bcare Toothpaste Premium", "Acne Cleanser Deep Pore", "Tea Tree Shampoo",
    "Keratin Hair Mask", "Leave-In Conditioner Spray", "Hair Serum Frizz Control", "Body Lotion Shea Butter",
    "Hand Cream Intensive", "Foot Cream Repair", "Nail Polish Gel Effect", "Makeup Remover Micellar",
    "Toner Hydrating Rose", "Face Mist Refreshing", "Eye Cream Anti-Wrinkle", "Neck Firming Cream",
    "Clay Mask Detox", "Sheet Mask Hydration Pack", "Exfoliating Scrub Gentle", "AHA BHA Peeling Solution",
    "Peptide Firming Serum", "Bakuchiol Anti-Aging Oil", "Centella Healing Cream", "Snail Mucin Essence"
  ],
  "tea-coffee": [
    "Coral Premix Coffee Blend", "Herbal Tea Organic Mix", "Green Tea Matcha Powder", "Black Tea Assam Premium",
    "Earl Grey Classic Blend", "Chamomile Relaxing Tea", "Peppermint Fresh Brew", "Ginger Lemon Infusion",
    "Jasmine Pearl Tea", "Oolong Traditional Leaves", "White Tea Silver Needle", "Rooibos African Red",
    "Hibiscus Berry Tea", "Lavender Calm Blend", "Chai Masala Spiced Tea", "Darjeeling First Flush",
    "Ceylon Premium Blend", "Pu-erh Aged Tea Cake", "Sencha Japanese Green", "Hojicha Roasted Tea",
    "Arabica Ground Coffee", "Robusta Strong Blend", "Espresso Dark Roast", "Colombian Single Origin",
    "Ethiopian Yirgacheffe", "Brazilian Santos Coffee", "Vietnam Robusta Beans", "Sumatra Mandheling Dark",
    "Kenya AA Premium", "Costa Rica Tarrazu", "Guatemala Antigua", "Honduras Organic Fair Trade",
    "Decaf Swiss Water Process", "Instant Coffee Premium", "Cold Brew Concentrate", "French Press Blend",
    "Turkish Coffee Fine Ground", "Mocha Java Classic", "Breakfast Blend Medium", "House Roast Signature"
  ],
  "hair-oil-gel": [
    "Argan Oil Pure Moroccan", "Coconut Hair Oil Organic", "Castor Oil Cold Pressed", "Olive Oil Extra Virgin",
    "Jojoba Scalp Treatment", "Almond Sweet Oil Hair", "Tea Tree Scalp Therapy", "Rosemary Growth Serum",
    "Onion Hair Oil Blend", "Bhringraj Ayurvedic Oil", "Amla Gooseberry Hair Oil", "Sesame Warm Oil",
    "Neem Dandruff Control", "Fenugreek Hair Tonic", "Brahmi Cooling Hair Oil", "Vitamin E Hair Elixir",
    "Keratin Repair Oil", "Biotin Strengthening Oil", "Anti-Frizz Smoothing Serum", "Heat Protection Spray",
    "Hair Gel Extra Hold", "Styling Gel Wet Look", "Matte Finish Hair Paste", "Pomade Classic Hold",
    "Hair Wax Flexible", "Mousse Volume Boost", "Hair Spray Strong Hold", "Edge Control Gel",
    "Curl Defining Cream", "Anti-Breakage Oil", "Split End Repair Serum", "Color Protection Oil",
    "Scalp Exfoliating Scrub", "Deep Conditioning Mask", "Leave-In Treatment Oil", "Hot Oil Treatment Pack"
  ],
  "consumer-items": [
    "Multi-Purpose Detergent Liquid", "Fabric Softener Lavender", "Dish Wash Lemon Fresh", "Floor Cleaner Pine",
    "Glass Cleaner Streak-Free", "Bathroom Cleaner Powerful", "Kitchen Degreaser Spray", "Toilet Bowl Cleaner",
    "Hand Sanitizer Alcohol-Based", "Hand Wash Moisturizing", "Body Wash Refreshing", "Shampoo Daily Care",
    "Conditioner Silky Smooth", "Toothpaste Whitening", "Mouthwash Fresh Mint", "Deodorant Roll-On",
    "Air Freshener Floral", "Room Spray Ocean Breeze", "Laundry Pods Concentrated", "Stain Remover Powerful",
    "Bleach Liquid Multi-Use", "Disinfectant Spray Surface", "All-Purpose Cleaner", "Oven Cleaner Heavy Duty",
    "Carpet Cleaner Foam", "Leather Cleaner Conditioner", "Shoe Polish Black Mirror", "Furniture Polish Spray",
    "Metal Polish Chrome", "Wood Cleaner Natural", "Marble Floor Cleaner", "Tile Grout Cleaner",
    "Drain Cleaner Powerful", "Garbage Bags Heavy Duty", "Paper Towels Ultra Absorbent", "Toilet Paper Soft",
    "Facial Tissues Gentle", "Wet Wipes Antibacterial", "Cotton Balls Pure", "Cotton Swabs Premium"
  ],
  "salon-parlour": [
    "Professional Hair Dryer", "Ceramic Straightener Pro", "Curling Iron Digital", "Hot Air Brush Styler",
    "Clipper Hair Cordless", "Trimmer Beard Professional", "Shaver Electric Wet Dry", "Epilator Smooth Skin",
    "Wax Heater Salon Pro", "Wax Strips Body Hair", "Hot Wax Beans Painless", "Depilatory Cream Gentle",
    "Facial Steamer Pro", "Microdermabrasion Machine", "LED Light Therapy Device", "Ultrasonic Skin Scrubber",
    "High Frequency Wand", "Galvanic Machine Pro", "Radio Frequency Device", "Vacuum Blackhead Remover",
    "Nail Drill Electric", "UV LED Nail Lamp", "Gel Polish Set Complete", "Acrylic Nail Kit Pro",
    "Manicure Set Premium", "Pedicure Kit Salon", "Foot Spa Bath Massager", "Paraffin Wax Machine",
    "Makeup Chair Professional", "Salon Cart Trolley", "Towel Warmer Cabinet", "Sterilizer UV Box",
    "Barber Cape Premium", "Salon Apron Professional", "Spray Bottle Mist Fine", "Mixing Bowl Set",
    "Hair Color Brush", "Foil Highlighting Kit", "Processing Caps Pack", "Disposable Gloves Box"
  ],
  "electronics": [
    "Wireless Earbuds Pro ANC", "Smart Fitness Watch Ultra", "Bluetooth Speaker Portable", "Power Bank 20000mAh",
    "USB-C Fast Charger 65W", "Wireless Charging Pad", "Smart Phone Stand Adjustable", "Tablet Holder Flexible",
    "Laptop Stand Aluminum", "Mechanical Keyboard RGB", "Gaming Mouse Wireless", "Webcam Full HD 1080p",
    "Ring Light LED Pro", "Microphone USB Condenser", "Headphones Over-Ear Studio", "True Wireless Buds",
    "Smart Home Hub Voice", "WiFi Router Mesh System", "Security Camera Indoor", "Video Doorbell Smart",
    "Smart Plug WiFi Set", "LED Strip Lights RGB", "Smart Bulb Color Changing", "Digital Photo Frame",
    "E-Reader Tablet Light", "Portable SSD 1TB", "USB Flash Drive 128GB", "Memory Card SD 256GB",
    "Cable Organizer Box", "HDMI Cable 4K 6ft", "USB Hub 7-Port Powered", "Car Charger Dual Fast",
    "Dash Cam Full HD", "GPS Tracker Mini", "Action Camera 4K WiFi", "Drone Mini Foldable",
    "VR Headset Standalone", "Streaming Device 4K", "Projector Mini Portable", "Smart Thermostat WiFi"
  ],
  "fashion": [
    "Designer Sunglasses Aviator", "Leather Wallet Premium", "Classic Wristwatch Analog", "Silk Scarf Printed",
    "Cashmere Sweater Crewneck", "Denim Jacket Vintage", "Leather Belt Genuine", "Cotton Polo Shirt",
    "Linen Shirt Summer", "Wool Blazer Tailored", "Chino Pants Slim Fit", "Jogger Pants Athletic",
    "Hoodie Zip-Up Classic", "Cardigan Knit Button", "T-Shirt Graphic Print", "Tank Top Ribbed",
    "Dress Shirt Oxford", "Flannel Shirt Plaid", "Henley Long Sleeve", "Turtleneck Merino Wool",
    "Rain Jacket Waterproof", "Puffer Jacket Warm", "Trench Coat Classic", "Peacoat Wool Blend",
    "Summer Dress Floral", "Maxi Skirt Flowing", "Mini Skirt Denim", "Palazzo Pants Wide Leg",
    "Jumpsuit Casual Chic", "Romper Summer Style", "Blouse Silk Button", "Crop Top Trendy",
    "Cardigan Oversized Cozy", "Leggings High Waist", "Yoga Pants Flex", "Shorts Casual Cotton",
    "Swim Trunks Quick Dry", "Bikini Set Two Piece", "Cover-Up Beach Dress", "Pajama Set Satin"
  ],
  "home": [
    "Memory Foam Pillow", "Weighted Blanket 15lb", "Egyptian Cotton Sheets", "Duvet Cover Set Queen",
    "Mattress Topper Gel", "Throw Blanket Fleece", "Decorative Pillows Set", "Blackout Curtains 84in",
    "Sheer Curtains White", "Area Rug Modern Design", "Bath Towel Set Luxury", "Hand Towels Pack",
    "Bath Mat Memory Foam", "Shower Curtain Fabric", "Soap Dispenser Set", "Toothbrush Holder Ceramic",
    "Trash Can Sensor Touch", "Laundry Basket Foldable", "Storage Bins Fabric", "Closet Organizer System",
    "Hangers Velvet Non-Slip", "Shoe Rack Stackable", "Door Hooks Over", "Wall Hooks Decorative",
    "Picture Frames Set", "Wall Clock Modern", "Table Lamp LED", "Floor Lamp Arc",
    "Candle Holder Set", "Vase Ceramic Modern", "Plant Pot Indoor", "Artificial Plants Set",
    "Wall Mirror Round", "Desk Organizer Wood", "Magazine Rack Metal", "Umbrella Stand Indoor",
    "Welcome Mat Outdoor", "Coat Rack Standing", "Key Holder Wall", "Mail Organizer Wall"
  ],
  "sports": [
    "Yoga Mat Non-Slip 6mm", "Resistance Bands Set", "Dumbbells Adjustable Pair", "Kettlebell Vinyl Coated",
    "Jump Rope Speed Pro", "Pull-Up Bar Doorway", "Ab Roller Wheel Core", "Push-Up Board System",
    "Foam Roller Muscle", "Massage Ball Set", "Exercise Ball Stability", "Ankle Weights Pair",
    "Boxing Gloves Training", "Punching Bag Heavy", "Speed Bag Platform", "Hand Wraps Boxing",
    "Tennis Racket Pro", "Badminton Set Complete", "Table Tennis Paddles", "Volleyball Official Size",
    "Basketball Indoor Outdoor", "Soccer Ball Size 5", "Football Leather Pro", "Baseball Glove Leather",
    "Golf Clubs Set", "Golf Balls Premium", "Golf Bag Cart", "Golf Gloves Leather",
    "Running Belt Hydration", "Arm Band Phone Holder", "Sweatbands Wristbands", "Headband Sports Moisture",
    "Compression Socks Running", "Knee Sleeves Support", "Elbow Brace Guard", "Ankle Support Wrap",
    "Sports Bottle Insulated", "Gym Bag Duffel Large", "Workout Gloves Grip", "Weight Lifting Belt"
  ],
  "gaming": [
    "Gaming Headset 7.1 Surround", "Mechanical Keyboard RGB", "Gaming Mouse Wireless Pro", "Mouse Pad XXL RGB",
    "Gaming Chair Ergonomic", "Monitor Arm Dual", "Controller Wireless Pro", "Gaming Desk RGB LED",
    "Headphone Stand USB Hub", "Webcam 4K Streaming", "Microphone Boom Arm", "Stream Deck Controller",
    "Capture Card 4K60", "Gaming Router WiFi 6", "External SSD Gaming 2TB", "Console Cooling Stand",
    "Controller Charging Dock", "VR Headset Stand", "Racing Wheel Pro", "Flight Stick HOTAS",
    "Arcade Stick Fight", "Gaming Glasses Blue Light", "Cable Management Kit", "Monitor Light Bar",
    "Desk Pad Leather Large", "Wrist Rest Keyboard", "Wrist Rest Mouse", "Audio Mixer Gaming",
    "Green Screen Collapsible", "Ring Light RGB Pro", "Camera Mount Arm", "Acoustic Foam Panels",
    "Gaming Sleeve Arm", "Finger Sleeves Mobile", "Phone Cooling Fan", "Tablet Gaming Trigger"
  ],
  "jewelry": [
    "Diamond Solitaire Ring", "Gold Chain Necklace 18K", "Silver Pendant Heart", "Pearl Earrings Studs",
    "Tennis Bracelet Crystal", "Engagement Ring Princess", "Wedding Band Platinum", "Anniversary Ring Eternity",
    "Hoop Earrings Gold", "Drop Earrings Elegant", "Stud Earrings Diamond", "Huggie Earrings Dainty",
    "Layered Necklace Set", "Choker Necklace Velvet", "Locket Pendant Photo", "Cross Necklace Religious",
    "Charm Bracelet Silver", "Cuff Bracelet Statement", "Bangle Set Stack", "Friendship Bracelets Pack",
    "Signet Ring Men", "Class Ring Custom", "Birthstone Ring Personal", "Mood Ring Color Changing",
    "Smart Watch Luxury", "Analog Watch Classic", "Digital Watch Sport", "Chronograph Watch Men",
    "Dive Watch Automatic", "Dress Watch Slim", "Pilot Watch Aviation", "Field Watch Military",
    "Pocket Watch Vintage", "Watch Band Leather", "Watch Band Steel", "Watch Winder Automatic",
    "Jewelry Box Organizer", "Ring Holder Display", "Necklace Stand Tree", "Earring Organizer Wall"
  ],
  "books": [
    "Bestseller Fiction Novel", "Mystery Thriller Hardcover", "Romance Contemporary Book", "Science Fiction Epic",
    "Fantasy Adventure Series", "Historical Fiction Novel", "Literary Classic Edition", "Horror Suspense Book",
    "Self-Help Motivation Guide", "Business Strategy Handbook", "Leadership Development Book", "Personal Finance Guide",
    "Investing Basics Book", "Entrepreneurship Manual", "Marketing Strategy Guide", "Productivity Tips Book",
    "Biography Inspiring Story", "Memoir Personal Journey", "History World Events", "Science Popular Book",
    "Psychology Understanding Mind", "Philosophy Classic Text", "Art History Survey", "Music Theory Basics",
    "Cookbook International Cuisine", "Baking Desserts Guide", "Healthy Eating Recipes", "Vegetarian Cooking Book",
    "Travel Guide Adventure", "Photography Techniques Book", "Gardening Complete Guide", "DIY Home Projects",
    "Parenting Modern Guide", "Children Picture Book", "Young Adult Novel", "Graphic Novel Collection",
    "Poetry Anthology Classic", "Drama Play Collection", "Comic Book Issue", "Magazine Subscription Annual"
  ],
  "kids": [
    "Building Blocks Set 500pc", "LEGO Compatible Bricks", "Magnetic Tiles Creative", "Wooden Train Set",
    "Play-Doh Color Pack", "Kinetic Sand Kit", "Slime Making Kit", "Science Experiment Set",
    "Telescope Kids Beginner", "Microscope Educational", "Chemistry Lab Kit", "Robot Building Kit",
    "Remote Control Car", "Drone Kids Safe", "Ride-On Car Electric", "Balance Bike Training",
    "Tricycle Kids Outdoor", "Scooter Adjustable Height", "Roller Skates Beginner", "Skateboard Mini Kids",
    "Trampoline Indoor Mini", "Swing Set Outdoor", "Sandbox Play Set", "Water Table Splash",
    "Dollhouse Wooden Large", "Action Figures Set", "Plush Toy Collection", "Stuffed Animal Giant",
    "Board Game Family", "Card Game Kids Fun", "Puzzle 1000 Piece", "Jigsaw Puzzle Kids",
    "Art Supplies Complete", "Coloring Book Set", "Craft Kit Creative", "Jewelry Making Kit",
    "Musical Instrument Set", "Karaoke Machine Kids", "Play Kitchen Set", "Tool Bench Workbench"
  ],
  "automotive": [
    "Car Phone Mount Magnetic", "Dash Cam Full HD", "GPS Navigator Portable", "Car Charger Fast Dual",
    "Bluetooth FM Transmitter", "Seat Cushion Memory Foam", "Steering Wheel Cover", "Car Seat Organizer",
    "Trunk Organizer Foldable", "Floor Mats All Weather", "Sunshade Windshield", "Car Cover Waterproof",
    "Jump Starter Portable", "Tire Inflator Portable", "Air Compressor 12V", "Tire Pressure Gauge",
    "Car Vacuum Cordless", "Car Wash Kit Complete", "Wax Polish Premium", "Microfiber Towels Pack",
    "Clay Bar Kit Detailing", "Leather Cleaner Conditioner", "Dashboard Cleaner Spray", "Glass Cleaner Auto",
    "Headlight Restoration Kit", "Touch Up Paint Pen", "Scratch Remover Kit", "Dent Puller Kit",
    "Oil Filter Premium", "Air Filter Performance", "Cabin Filter Fresh", "Spark Plugs Set",
    "Wiper Blades Premium", "Headlight Bulbs LED", "Brake Pads Ceramic", "Battery Maintainer Charger",
    "Tool Kit Emergency", "First Aid Kit Auto", "Warning Triangle Set", "Jumper Cables Heavy Duty"
  ],
  "food": [
    "Organic Honey Raw Local", "Olive Oil Extra Virgin", "Coconut Oil Organic", "Avocado Oil Cooking",
    "Almond Butter Natural", "Peanut Butter Creamy", "Cashew Butter Organic", "Tahini Sesame Paste",
    "Quinoa Organic Grain", "Brown Rice Long Grain", "Basmati Rice Aged", "Jasmine Rice Fragrant",
    "Oats Steel Cut Organic", "Granola Clusters Honey", "Muesli Mixed Fruits", "Cereal Whole Grain",
    "Pasta Whole Wheat", "Spaghetti Italian Import", "Penne Rigate Bronze Cut", "Lasagna Sheets Fresh",
    "Tomato Sauce Marinara", "Pesto Basil Fresh", "Alfredo Sauce Creamy", "Hot Sauce Artisan",
    "Maple Syrup Pure Grade", "Agave Nectar Organic", "Stevia Natural Sweet", "Monk Fruit Sweetener",
    "Dark Chocolate 70%", "Milk Chocolate Bar", "Chocolate Chips Baking", "Cocoa Powder Dutch",
    "Coffee Beans Whole", "Tea Bags Variety Pack", "Matcha Powder Ceremonial", "Chai Spice Mix",
    "Protein Bars Box", "Energy Bars Trail", "Dried Fruit Mix", "Mixed Nuts Premium"
  ],
  "appliances": [
    "Air Fryer Digital 5.8Qt", "Instant Pot Duo 8Qt", "Blender High Speed Pro", "Food Processor 12-Cup",
    "Stand Mixer Professional", "Hand Mixer 5-Speed", "Toaster 4-Slice Wide", "Toaster Oven Convection",
    "Coffee Maker Drip 12-Cup", "Espresso Machine Pump", "Electric Kettle Gooseneck", "French Press Glass",
    "Juicer Centrifugal Pro", "Slow Juicer Masticating", "Smoothie Maker Personal", "Ice Cream Maker 2Qt",
    "Bread Maker Automatic", "Rice Cooker Fuzzy Logic", "Pressure Cooker Electric", "Slow Cooker 6Qt",
    "Sous Vide Precision", "Dehydrator Food 6-Tray", "Vacuum Sealer Pro", "Electric Grill Indoor",
    "Waffle Maker Belgian", "Sandwich Press Panini", "Crepe Maker Electric", "Egg Cooker Rapid",
    "Popcorn Maker Hot Air", "Cotton Candy Machine", "Ice Shaver Machine", "Meat Grinder Electric",
    "Food Scale Digital", "Thermometer Instant Read", "Timer Kitchen Digital", "Can Opener Electric",
    "Knife Sharpener Electric", "Dish Dryer Rack", "Garbage Disposal Unit", "Water Dispenser Countertop"
  ],
  "furniture": [
    "Sofa Sectional L-Shape", "Loveseat Velvet Modern", "Armchair Accent Fabric", "Recliner Power Lift",
    "Coffee Table Oak Wood", "Side Table Round Metal", "Console Table Entry", "TV Stand Entertainment",
    "Bookshelf 5-Tier Wood", "Display Cabinet Glass", "Bar Cabinet Wine", "Shoe Cabinet Storage",
    "Dining Table Extendable", "Dining Chairs Set of 4", "Bar Stools Counter", "Bench Entryway Storage",
    "Bed Frame Platform Queen", "Headboard Upholstered", "Nightstand 2-Drawer", "Dresser 6-Drawer Wide",
    "Wardrobe Closet Armoire", "Vanity Table Mirror", "Jewelry Armoire Standing", "Blanket Ladder Decorative",
    "Desk Office Modern", "Office Chair Ergonomic", "File Cabinet 3-Drawer", "Bookcase Rolling Cart",
    "Outdoor Sofa Patio", "Patio Dining Set", "Adirondack Chair Wood", "Hammock Stand Set",
    "Bean Bag Chair Giant", "Floor Cushion Meditation", "Pouf Ottoman Round", "Storage Ottoman Tufted",
    "Room Divider Folding", "Accent Cabinet Door", "Ladder Shelf Leaning", "Corner Shelf Unit"
  ],
  "outdoor": [
    "Patio Umbrella 9ft", "Outdoor String Lights", "Solar Garden Lights", "Landscape Spotlights LED",
    "Garden Hose 50ft Flex", "Sprinkler System Automatic", "Watering Can Galvanized", "Plant Watering Globes",
    "Planter Box Raised", "Garden Bed Kit Metal", "Potting Bench Wood", "Greenhouse Mini Pop-Up",
    "Garden Tool Set 5pc", "Pruning Shears Pro", "Hedge Trimmer Cordless", "Lawn Mower Electric",
    "Leaf Blower Cordless", "String Trimmer Gas", "Pressure Washer Electric", "Chainsaw Mini Cordless",
    "Wheelbarrow Steel 6cu", "Garden Cart Wagon", "Kneeling Pad Foam", "Gardening Gloves Set",
    "Compost Bin Tumbler", "Rain Barrel 55 Gallon", "Bird Feeder Hanging", "Bird Bath Pedestal",
    "Outdoor Rug Patio 8x10", "Welcome Mat Coir", "Planter Stand Multi-Tier", "Trellis Garden Arch",
    "Fire Pit Outdoor Wood", "Grill Cover Premium", "Patio Heater Propane", "Mosquito Repeller Electric",
    "Pool Float Lounger", "Pool Noodles Pack", "Inflatable Pool Kids", "Sprinkler Mat Splash"
  ],
  "pets": [
    "Dog Food Premium Dry", "Cat Food Grain-Free", "Dog Treats Training", "Cat Treats Dental",
    "Pet Bowl Stainless Steel", "Automatic Pet Feeder", "Water Fountain Filtered", "Food Storage Container",
    "Dog Bed Orthopedic", "Cat Bed Cave Cozy", "Pet Blanket Fleece", "Crate Pad Washable",
    "Dog Crate Wire Fold", "Cat Carrier Soft-Sided", "Pet Gate Extra Wide", "Playpen Portable Indoor",
    "Leash Retractable 16ft", "Collar Adjustable Padded", "Harness No-Pull Front", "ID Tags Custom Engraved",
    "Dog Toy Chew Durable", "Cat Toy Interactive", "Fetch Ball Launcher", "Plush Toy Squeaky",
    "Scratching Post Tall", "Cat Tree Multi-Level", "Dog Brush Deshedding", "Cat Grooming Glove",
    "Pet Shampoo Oatmeal", "Paw Balm Healing", "Ear Cleaner Solution", "Dental Care Kit",
    "Waste Bags Biodegradable", "Litter Box Covered", "Cat Litter Clumping", "Pee Pad Training",
    "Pet Camera WiFi", "GPS Tracker Collar", "Cooling Mat Summer", "Heated Bed Winter"
  ],
  "sports-eq": [
    "Soccer Goal Portable", "Basketball Hoop Adjustable", "Tennis Net Professional", "Volleyball Net Set",
    "Baseball Bat Aluminum", "Softball Glove Leather", "Football Helmet Youth", "Hockey Stick Composite",
    "Lacrosse Stick Complete", "Cricket Bat Willow", "Rugby Ball Official", "Frisbee Golf Set",
    "Bocce Ball Set", "Croquet Set Complete", "Badminton Racket Pro", "Pickleball Paddle Carbon",
    "Ping Pong Table Foldable", "Pool Cue Stick Pro", "Darts Set Electronic", "Archery Bow Set",
    "Fishing Rod Combo", "Tackle Box Loaded", "Fishing Net Landing", "Fish Finder Portable",
    "Kayak Inflatable 2-Person", "Paddle Board SUP", "Life Jacket Adult", "Snorkel Set Complete",
    "Surfboard Foam Beginner", "Boogie Board Bodyboard", "Water Skis Pair", "Wakeboard Package",
    "Climbing Harness Full", "Climbing Rope Dynamic", "Carabiner Set Locking", "Chalk Bag Climbing",
    "Skateboard Complete Pro", "Longboard Cruiser", "Inline Skates Adult", "Protective Gear Set"
  ],
  "music": [
    "Acoustic Guitar Beginner", "Electric Guitar Starter", "Bass Guitar 4-String", "Classical Guitar Nylon",
    "Ukulele Concert Size", "Banjo 5-String Open", "Mandolin A-Style", "Violin Full Size",
    "Cello Student Model", "Keyboard Piano 88-Key", "Digital Piano Weighted", "Synthesizer Analog",
    "MIDI Controller Pad", "Drum Set 5-Piece", "Electronic Drum Kit", "Cajon Box Drum",
    "Bongo Drums Pair", "Djembe Hand Drum", "Tambourine Headless", "Shaker Egg Set",
    "Harmonica Chromatic", "Recorder Soprano", "Flute Student Model", "Clarinet Bb Student",
    "Saxophone Alto Beginner", "Trumpet Bb Student", "Trombone Tenor Slide", "French Horn Single",
    "Guitar Amplifier Combo", "Bass Amp Practice", "Microphone Dynamic", "Audio Interface USB",
    "Headphones Studio Monitor", "Speaker PA Powered", "Mixer 8-Channel", "Effects Pedal Multi",
    "Guitar Strings Set", "Drum Sticks Hickory", "Music Stand Folding", "Metronome Digital Clip"
  ],
  "art": [
    "Acrylic Paint Set 24", "Oil Paint Artist Grade", "Watercolor Pan Set", "Gouache Paint Tubes",
    "Canvas Stretched 16x20", "Canvas Pad 11x14", "Sketchbook Hardcover", "Drawing Paper Pack",
    "Watercolor Paper Block", "Mixed Media Paper", "Paint Brush Set Pro", "Palette Knife Set",
    "Easel Aluminum Field", "Easel Table Desktop", "Artist Palette Wood", "Mixing Palette Stay-Wet",
    "Colored Pencils 72", "Graphite Pencils Set", "Charcoal Sticks Vine", "Pastel Soft Set 48",
    "Oil Pastels Vibrant", "Markers Alcohol Dual", "Brush Pens Watercolor", "Fineliner Pens Set",
    "Calligraphy Set Complete", "Lettering Pen Set", "Ink Bottles India", "Airbrush Kit Basic",
    "Sculpting Clay Air-Dry", "Polymer Clay Pack", "Sculpting Tools Set", "Pottery Wheel Electric",
    "Resin Art Kit Epoxy", "Mold Making Silicone", "Jewelry Wire Set", "Beading Kit Complete",
    "Embroidery Kit Starter", "Cross Stitch Kit", "Knitting Needles Set", "Crochet Hook Set"
  ],
  "tools": [
    "Drill Cordless 20V Max", "Impact Driver Kit", "Circular Saw 7-1/4in", "Jigsaw Orbital Action",
    "Reciprocating Saw 20V", "Angle Grinder 4-1/2in", "Oscillating Multi-Tool", "Rotary Tool Variable",
    "Sander Orbital Random", "Planer Hand Electric", "Router Wood Trim", "Nail Gun Brad Cordless",
    "Tool Kit Complete 200pc", "Socket Set Mechanic", "Wrench Set Combination", "Screwdriver Set 40pc",
    "Pliers Set 5-Piece", "Hammer Claw Fiberglass", "Tape Measure 25ft", "Level Torpedo Magnetic",
    "Utility Knife Heavy Duty", "Pry Bar Set 3pc", "Clamp Set Quick-Grip", "Workbench Folding",
    "Tool Chest Rolling", "Tool Bag Heavy Duty", "Saw Horses Pair", "Shop Vac Wet Dry",
    "Air Compressor Pancake", "Welder MIG Beginner", "Soldering Iron Station", "Multimeter Digital",
    "Stud Finder Advanced", "Laser Level Self", "Inspection Camera", "Voltage Tester Non-Contact",
    "Safety Glasses Clear", "Work Gloves Leather", "Ear Protection Muffs", "Dust Mask N95"
  ],
  "office": [
    "Desk Organizer Mesh", "Pen Holder Cup Metal", "File Sorter Vertical", "Paper Tray Stackable",
    "Binder Clips Assorted", "Paper Clips Jumbo", "Stapler Desktop Heavy", "Staples Standard Box",
    "Tape Dispenser Weighted", "Scissors Office Sharp", "Ruler Aluminum 12in", "Calculator Desktop",
    "Sticky Notes Variety", "Memo Pad Lined", "Notebook Spiral College", "Legal Pad Yellow",
    "Folders Manila 100pk", "Hanging Folders Letter", "Binders 3-Ring Set", "Sheet Protectors 100pk",
    "Tab Dividers Colored", "Labels Printable White", "Envelope Pack Business", "Shipping Labels Roll",
    "Printer Paper Ream 500", "Cardstock Colored Pack", "Photo Paper Glossy", "Resume Paper Linen",
    "Pens Ballpoint 12pk", "Pens Gel Ink Color", "Highlighters Set 6", "Markers Permanent Set",
    "Pencils Mechanical 0.7", "Eraser Block Large", "Correction Tape Roller", "Whiteout Liquid Bottle",
    "Whiteboard Magnetic Large", "Markers Dry Erase Set", "Eraser Whiteboard", "Cork Board Framed"
  ],
  "school": [
    "Backpack Student Padded", "Lunch Box Insulated", "Water Bottle 32oz", "Pencil Case Zipper",
    "Notebooks Wide Ruled 5pk", "Composition Book Marble", "Loose Leaf Paper 500", "Graph Paper Pad",
    "Folders Plastic Durable", "Binder 1-Inch 3-Ring", "Pencil Box Clear", "Colored Pencils 24",
    "Crayons Box 64", "Markers Washable 10pk", "Glue Sticks 6-Pack", "Glue Bottles School",
    "Scissors Blunt Tip", "Ruler 12-Inch Wooden", "Protractor Math Set", "Compass Geometry",
    "Calculator Scientific", "Index Cards 3x5 100pk", "Flashcards Blank", "Study Guide Planner",
    "Dictionary Paperback", "Thesaurus Student", "Atlas World Map", "Globe Desktop 12in",
    "Pencils No.2 Yellow 24", "Pencil Sharpener Electric", "Eraser Cap Tops 100", "Eraser Large Pink",
    "Pens Blue Black 12pk", "Correction Fluid White", "Highlighters Pastel 4pk", "Dry Erase Markers",
    "Desk Lamp LED Study", "Book Stand Holder", "Locker Shelf Organizer", "Locker Mirror Magnetic"
  ],
  "party": [
    "Balloons Assorted 100pk", "Balloon Pump Electric", "Balloon Arch Kit", "Helium Tank Disposable",
    "Streamers Crepe Roll", "Confetti Metallic Mix", "Banner Happy Birthday", "Garland Party Tissue",
    "Tablecloth Plastic Solid", "Table Runner Satin", "Napkins Luncheon 100pk", "Plates Paper 9in 50pk",
    "Cups Plastic 16oz 50pk", "Cutlery Set Combo", "Straws Paper Striped", "Cupcake Liners 300pk",
    "Cake Topper Custom", "Candles Birthday Number", "Candles Spiral 24pk", "Cake Stand Pedestal",
    "Party Hats Cone 12pk", "Tiaras Glitter 6pk", "Masks Party Face", "Photo Props Stick 30pc",
    "Photo Backdrop Stand", "Backdrop Fabric Glitter", "LED String Lights", "Disco Ball Light",
    "Fog Machine Mini", "Bubble Machine Auto", "Pinata Star Shape", "Pinata Filler Candy",
    "Favor Bags Treat 50", "Gift Boxes Small 12pk", "Ribbon Curling Roll", "Tissue Paper Sheets 100",
    "Gift Tags Assorted", "Goody Bags Pre-Filled", "Party Games Set", "Karaoke Machine Portable"
  ],
  "camping": [
    "Tent 4-Person Dome", "Sleeping Bag 0-Degree", "Sleeping Pad Inflatable", "Camp Pillow Compressible",
    "Camping Cot Folding", "Hammock Double Parachute", "Hammock Straps Heavy", "Tarp Rain Fly",
    "Backpack Hiking 65L", "Daypack Hydration", "Water Reservoir 3L", "Water Filter Portable",
    "Camp Stove Propane", "Cookware Set Camping", "Mess Kit Complete", "Utensil Set Titanium",
    "Cooler Soft-Sided 24can", "Ice Pack Reusable", "Food Container Bear", "Dry Bag Waterproof",
    "Headlamp Rechargeable", "Lantern LED Camping", "Flashlight Tactical", "Fire Starter Kit",
    "Multi-Tool Stainless", "Knife Fixed Blade", "Axe Camping Hatchet", "Shovel Folding Camp",
    "First Aid Kit Outdoor", "Emergency Blanket Mylar", "Whistle Survival", "Compass Navigation",
    "Map Case Waterproof", "Binoculars Compact 10x42", "Trekking Poles Carbon", "Gaiters Waterproof",
    "Camp Chair Folding", "Camp Table Portable", "Camp Kitchen Stand", "Portable Shower Solar"
  ],
  "travel": [
    "Carry-On Luggage 22in", "Checked Bag 28in Spinner", "Duffel Bag Weekender", "Backpack Travel 40L",
    "Packing Cubes Set 6", "Compression Bags Travel", "Toiletry Bag Hanging", "Shoe Bags Travel 4pk",
    "Neck Pillow Memory Foam", "Eye Mask Sleep Silk", "Ear Plugs Foam 10pr", "Blanket Travel Compact",
    "Luggage Scale Digital", "Luggage Lock TSA 2pk", "Luggage Tag Leather", "Passport Holder Wallet",
    "Money Belt Hidden", "RFID Blocking Sleeve", "Travel Wallet Organizer", "Document Holder Travel",
    "Adapter Universal Plug", "Power Strip Travel", "Voltage Converter", "USB Hub Portable",
    "Portable Charger 26800mAh", "Cable Organizer Case", "Headphone Case Hard", "Electronics Organizer",
    "Water Bottle Collapsible", "Snack Container Set", "Utensil Set Portable", "Coffee Mug Travel 16oz",
    "Laundry Bag Dirty Clothes", "Clothesline Portable", "Sink Stopper Universal", "Quick Dry Towel",
    "First Aid Kit Travel", "Medicine Organizer Weekly", "Sunscreen Travel Size", "Hand Sanitizer 3oz"
  ],
  "shoes": [
    "Running Shoes Men Cushion", "Running Shoes Women Light", "Walking Shoes Comfort", "Trail Running Shoes",
    "Cross Training Sneakers", "Basketball Shoes High-Top", "Tennis Shoes Court", "Soccer Cleats Firm",
    "Football Cleats Speed", "Baseball Cleats Metal", "Golf Shoes Waterproof", "Cycling Shoes Clip",
    "Hiking Boots Waterproof", "Work Boots Steel Toe", "Rain Boots Tall", "Snow Boots Insulated",
    "Chelsea Boots Leather", "Combat Boots Lace-Up", "Ankle Boots Heeled", "Knee High Boots",
    "Dress Shoes Oxford Men", "Loafers Penny Classic", "Derby Shoes Leather", "Monk Strap Double",
    "Heels Stiletto Pointed", "Pumps Block Heel", "Wedges Espadrille", "Sandals Strappy Heeled",
    "Flats Ballet Pointed", "Mules Slip-On", "Slides Comfort Foam", "Sandals Sport Adjustable",
    "Flip Flops Beach", "Slippers House Cozy", "Moccasins Indoor", "Clogs Comfort Work",
    "Sneakers Canvas Classic", "Slip-On Shoes Casual", "Boat Shoes Leather", "Skate Shoes Durable"
  ]
};

const categoryImages: Record<string, string[]> = {
  "health-items": [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
    "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80",
    "https://images.unsplash.com/photo-1576073719676-aa95576db207?w=400&q=80",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
    "https://myvertexbd.com/image/thumb/68d6d4cb6df63.webp",
    "https://myvertexbd.com/image/thumb/68d6d4ea36806.webp",
    "https://myvertexbd.com/image/thumb/66c4ade538f4c.webp",
    "https://myvertexbd.com/image/thumb/68d6d56259e99.webp",
    "https://myvertexbd.com/image/thumb/6879655a73853.webp"
  ],
  "cosmetics-items": [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    "https://myvertexbd.com/image/thumb/68d6d3bd6bf3a.webp",
    "https://myvertexbd.com/image/thumb/68d6d7da83eda.webp",
    "https://myvertexbd.com/image/thumb/690a66b9db934.webp"
  ],
  "tea-coffee": [
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    "https://myvertexbd.com/image/thumb/68d6d9193c50c.webp",
    "https://myvertexbd.com/image/thumb/68d6d1536d28b.webp"
  ],
  "hair-oil-gel": [
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    "https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=400&q=80",
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80",
    "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80"
  ],
  "consumer-items": [
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
    "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&q=80",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&q=80",
    "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80",
    "https://myvertexbd.com/image/thumb/68d6d77169f44.webp"
  ],
  "salon-parlour": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&q=80",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80"
  ],
  "electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80"
  ],
  "fashion": [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
  ],
  "home": [
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80",
    "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=400&q=80",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=400&q=80",
    "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
  ],
  "sports": [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80"
  ],
  "gaming": [
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
    "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=400&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80"
  ],
  "jewelry": [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80",
    "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80"
  ],
  "books": [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80"
  ],
  "kids": [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
    "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&q=80",
    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80",
    "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=400&q=80"
  ],
  "automotive": [
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80"
  ],
  "food": [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80",
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80"
  ],
  "appliances": [
    "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80",
    "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=400&q=80"
  ],
  "furniture": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80"
  ],
  "outdoor": [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80"
  ],
  "pets": [
    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80"
  ],
  "sports-eq": [
    "https://images.unsplash.com/photo-1461896836934- voices0072b47?w=400&q=80",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
    "https://images.unsplash.com/photo-1461896836934-fffceb7a0a71?w=400&q=80",
    "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&q=80"
  ],
  "music": [
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    "https://images.unsplash.com/photo-1558098329-a11cff621064?w=400&q=80",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80"
  ],
  "art": [
    "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80",
    "https://images.unsplash.com/photo-1540639104921-88af5cc1ed82?w=400&q=80"
  ],
  "tools": [
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80"
  ],
  "office": [
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&q=80",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  ],
  "school": [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400&q=80",
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80"
  ],
  "party": [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80"
  ],
  "camping": [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80",
    "https://images.unsplash.com/photo-1478131143263-91c20662b6a4?w=400&q=80",
    "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=400&q=80",
    "https://images.unsplash.com/photo-1487730116445-4f9f3e1c1a71?w=400&q=80"
  ],
  "travel": [
    "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=400&q=80",
    "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=400&q=80",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80",
    "https://images.unsplash.com/photo-1527142879-95b035a7f5c4?w=400&q=80"
  ],
  "shoes": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80"
  ]
};

const vendors = [
  "Premium Shop", "Quality Store", "Elite Traders", "Express Market",
  "Global Mart", "Super Store", "Best Buy", "Smart Shop", "Value Store", "Top Quality",
  "Metro Retail", "City Supplies", "Prime Goods", "Urban Market", "Fresh Direct",
  "Wholesale Hub", "Retail Plus", "Discount Center", "Mega Store", "Daily Deals"
];

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function shuffleWithSeed<T>(array: T[], random: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateRealProducts(count: number = 1200): Product[] {
  const generatedProducts: Product[] = [];
  const random = seededRandom(42);
  let productId = 0;

  const categoryOrder = shuffleWithSeed([...categories], random);
  
  while (generatedProducts.length < count) {
    for (const category of categoryOrder) {
      if (generatedProducts.length >= count) break;

      const categoryProductList = categoryProductNames[category.slug] || [];
      if (categoryProductList.length === 0) continue;

      const productsPerCategoryRound = Math.min(
        Math.ceil(categoryProductList.length / 3),
        Math.ceil((count - generatedProducts.length) / categories.length)
      );

      for (let i = 0; i < productsPerCategoryRound && generatedProducts.length < count; i++) {
        productId++;
        const productNameIndex = (productId + i) % categoryProductList.length;
        const productName = categoryProductList[productNameIndex];
        
        const palette = colorPalettes[productId % colorPalettes.length];
        const basePrice = Math.floor(random() * 4500) + 150;
        const hasDiscount = random() > 0.55;
        
        const catImages = categoryImages[category.slug] || [];
        const imageIndex = productId % Math.max(catImages.length, 1);
        const image = catImages.length > 0 
          ? catImages[imageIndex] 
          : `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80`;

        generatedProducts.push({
          id: `p${productId}`,
          name: productName,
          slug: productName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
          category: category.name,
          categorySlug: category.slug,
          price: basePrice,
          originalPrice: hasDiscount ? basePrice + Math.floor(random() * 800) + 100 : undefined,
          rating: Number((random() * 1.8 + 3.2).toFixed(1)),
          reviews: Math.floor(random() * 8000) + 10,
          image: image,
          colors: [
            { name: "Primary", value: palette.accent },
            { name: "Secondary", value: colorPalettes[(productId + 3) % colorPalettes.length].accent },
            { name: "Neutral", value: "#6B7280" },
          ],
          sizes: random() > 0.5 ? ["S", "M", "L", "XL", "XXL"] : ["One Size"],
          shortDescription: `${productName} - Premium quality product with excellent features`,
          inStock: random() > 0.05,
          stock: Math.floor(random() * 300) + 1,
          isNew: random() > 0.82,
          isBestseller: random() > 0.9,
          isFeatured: random() > 0.93,
          has3D: random() > 0.65,
          model3dType: ["box", "sphere", "torus", "cylinder"][Math.floor(random() * 4)] as "box" | "sphere" | "torus" | "cylinder",
          vendorName: vendors[Math.floor(random() * vendors.length)],
          tags: [category.slug, "trending", "quality", "premium"],
          badgeColor: palette.name,
          animation: animations[Math.floor(random() * animations.length)],
        });
      }
    }
  }

  return shuffleWithSeed(generatedProducts, seededRandom(123));
}

export const products: Product[] = generateRealProducts(1150);

export const PRODUCTS = products;

export const homeProducts = products.slice(0, 700);

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 24);
export const newArrivals = products.filter(p => p.isNew).slice(0, 24);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 24);

export const hero3DProducts = products.filter(p => p.has3D).slice(0, 8);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );
}

export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const filtered = products.filter(p => p.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getHomePageProducts(): Product[] {
  return homeProducts;
}

export function getMixedCategoryProducts(limit: number = 60): Product[] {
  const result: Product[] = [];
  const categoriesUsed = new Set<string>();
  const random = seededRandom(Date.now() % 10000);
  
  const shuffledProducts = shuffleWithSeed([...products], random);
  
  for (const product of shuffledProducts) {
    if (result.length >= limit) break;
    
    const categoryCount = result.filter(p => p.categorySlug === product.categorySlug).length;
    const maxPerCategory = Math.ceil(limit / 10);
    
    if (categoryCount < maxPerCategory) {
      result.push(product);
      categoriesUsed.add(product.categorySlug);
    }
  }
  
  return result;
}

export function getRelatedProducts(productId: string, limit: number = 8): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  const sameCategory = products.filter(p => 
    p.categorySlug === product.categorySlug && p.id !== productId
  );
  
  const differentCategory = products.filter(p => 
    p.categorySlug !== product.categorySlug
  );
  
  const sameCategoryCount = Math.ceil(limit * 0.6);
  const differentCategoryCount = limit - sameCategoryCount;
  
  const random = seededRandom(parseInt(productId.replace(/\D/g, '')) || 1);
  
  return [
    ...shuffleWithSeed(sameCategory, random).slice(0, sameCategoryCount),
    ...shuffleWithSeed(differentCategory, random).slice(0, differentCategoryCount)
  ];
}
