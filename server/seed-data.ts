export const mainCategories = [
  { name: "Electronics", slug: "electronics", icon: "⚡", description: "Latest gadgets and electronic devices" },
  { name: "Fashion", slug: "fashion", icon: "👔", description: "Clothing, shoes, and accessories" },
  { name: "Home & Garden", slug: "home-garden", icon: "🏠", description: "Home essentials and garden products" },
  { name: "Health & Beauty", slug: "health-beauty", icon: "💄", description: "Health, wellness, and beauty products" },
  { name: "Sports & Outdoors", slug: "sports-outdoors", icon: "🏋️", description: "Sports equipment and outdoor gear" },
  { name: "Toys & Games", slug: "toys-games", icon: "🎮", description: "Toys, games, and entertainment" },
  { name: "Automotive", slug: "automotive", icon: "🚗", description: "Car parts and accessories" },
  { name: "Books & Media", slug: "books-media", icon: "📚", description: "Books, music, and movies" },
  { name: "Office & School", slug: "office-school", icon: "📎", description: "Office and school supplies" },
  { name: "Food & Grocery", slug: "food-grocery", icon: "🛒", description: "Food, beverages, and grocery items" },
  { name: "Baby & Kids", slug: "baby-kids", icon: "🧸", description: "Products for babies and children" },
  { name: "Pet Supplies", slug: "pet-supplies", icon: "🐾", description: "Everything for your pets" },
  { name: "Jewelry & Watches", slug: "jewelry-watches", icon: "💎", description: "Fine jewelry and timepieces" },
  { name: "Art & Crafts", slug: "art-crafts", icon: "🎨", description: "Art supplies and craft materials" },
  { name: "Musical Instruments", slug: "musical-instruments", icon: "🎸", description: "Instruments and music gear" },
  { name: "Industrial & Scientific", slug: "industrial-scientific", icon: "🔬", description: "Industrial equipment and lab supplies" },
  { name: "Collectibles", slug: "collectibles", icon: "🏆", description: "Collectible items and memorabilia" },
  { name: "Travel & Luggage", slug: "travel-luggage", icon: "🧳", description: "Travel gear and luggage" },
  { name: "Garden & Patio", slug: "garden-patio", icon: "🌻", description: "Outdoor living and gardening" },
  { name: "Appliances", slug: "appliances", icon: "🍳", description: "Home and kitchen appliances" },
];

export const subCategories: Record<string, string[]> = {
  "electronics": [
    "Smartphones", "Tablets", "Laptops", "Desktop Computers", "Monitors", "Computer Components", "Computer Peripherals",
    "Networking Equipment", "Storage Devices", "Printers", "Scanners", "Projectors", "Smart Home Devices",
    "Home Audio", "Portable Audio", "Headphones", "Earbuds", "Speakers", "Soundbars", "Home Theater Systems",
    "Televisions", "Streaming Devices", "DVD Blu-ray Players", "Cameras", "Camcorders", "Drones", "Action Cameras",
    "Camera Lenses", "Camera Accessories", "Photo Printers", "Smartwatches", "Fitness Trackers", "GPS Devices",
    "E-Readers", "Gaming Consoles", "Gaming Accessories", "Gaming Chairs", "VR Headsets", "Power Banks",
    "Cables Adapters", "Chargers", "Phone Cases", "Screen Protectors", "Memory Cards", "USB Drives",
    "External Hard Drives", "SSDs", "RAM", "Graphics Cards", "Processors", "Motherboards", "Power Supplies",
    "Computer Cases", "Cooling Fans", "Keyboards", "Gaming Keyboards", "Mice", "Gaming Mice", "Webcams",
    "Microphones", "Streaming Equipment", "Video Capture Cards", "Routers", "Modems", "WiFi Extenders",
    "Network Switches", "Ethernet Cables", "Smart Plugs", "Smart Bulbs", "Smart Thermostats", "Video Doorbells",
    "Security Cameras", "Smart Locks", "Robot Vacuums", "Air Purifiers", "Humidifiers", "Dehumidifiers",
    "Portable Fans", "Space Heaters", "Electric Blankets", "Surge Protectors", "UPS Battery Backups",
    "Calculators", "Label Makers", "Electronic Dictionaries", "Digital Voice Recorders", "Two Way Radios",
    "CB Radios", "Ham Radios", "Marine Electronics", "Fish Finders", "Car Electronics", "Car Audio",
    "Car Video", "Car GPS", "Dash Cameras", "Radar Detectors", "Car Amplifiers", "Car Subwoofers",
    "Satellite Radio", "Digital Photo Frames", "Weather Stations", "Metal Detectors", "Binoculars", "Telescopes",
    "Microscopes", "Night Vision", "Thermal Imaging", "3D Printers", "3D Printer Accessories", "Soldering Equipment"
  ],
  "fashion": [
    "Men's T-Shirts", "Men's Dress Shirts", "Men's Casual Shirts", "Men's Polo Shirts", "Men's Sweaters",
    "Men's Hoodies", "Men's Jackets", "Men's Coats", "Men's Blazers", "Men's Suits", "Men's Jeans",
    "Men's Dress Pants", "Men's Casual Pants", "Men's Shorts", "Men's Activewear", "Men's Swimwear",
    "Men's Underwear", "Men's Socks", "Men's Pajamas", "Men's Robes", "Women's T-Shirts", "Women's Blouses",
    "Women's Sweaters", "Women's Cardigans", "Women's Hoodies", "Women's Jackets", "Women's Coats",
    "Women's Blazers", "Women's Dresses", "Women's Skirts", "Women's Jeans", "Women's Dress Pants",
    "Women's Casual Pants", "Women's Leggings", "Women's Shorts", "Women's Activewear", "Women's Swimwear",
    "Women's Lingerie", "Women's Bras", "Women's Panties", "Women's Sleepwear", "Women's Robes",
    "Girls' Clothing", "Boys' Clothing", "Infant Clothing", "Toddler Clothing", "Teen Fashion",
    "Men's Sneakers", "Men's Dress Shoes", "Men's Casual Shoes", "Men's Boots", "Men's Sandals",
    "Men's Athletic Shoes", "Women's Sneakers", "Women's Heels", "Women's Flats", "Women's Boots",
    "Women's Sandals", "Women's Athletic Shoes", "Women's Wedges", "Women's Loafers", "Women's Mules",
    "Kids' Sneakers", "Kids' Boots", "Kids' Sandals", "Kids' Athletic Shoes", "Men's Wallets",
    "Men's Belts", "Men's Ties", "Men's Bow Ties", "Men's Cufflinks", "Men's Suspenders", "Men's Hats",
    "Men's Scarves", "Men's Gloves", "Women's Handbags", "Women's Tote Bags", "Women's Crossbody Bags",
    "Women's Clutches", "Women's Wallets", "Women's Belts", "Women's Scarves", "Women's Hats",
    "Women's Gloves", "Backpacks", "Messenger Bags", "Laptop Bags", "Duffel Bags", "Weekender Bags",
    "Men's Sunglasses", "Women's Sunglasses", "Prescription Glasses", "Reading Glasses", "Sports Eyewear",
    "Vintage Clothing", "Plus Size Fashion", "Maternity Clothing", "Athleisure", "Streetwear",
    "Designer Fashion", "Sustainable Fashion", "Workwear", "Uniforms", "Costumes", "Formal Wear",
    "Wedding Attire", "Traditional Clothing", "Cultural Apparel", "Rain Gear", "Winter Accessories"
  ],
  "home-garden": [
    "Living Room Furniture", "Bedroom Furniture", "Dining Room Furniture", "Office Furniture", "Kids Furniture",
    "Outdoor Furniture", "Patio Furniture", "Sofas", "Sectionals", "Recliners", "Accent Chairs", "Ottomans",
    "Coffee Tables", "End Tables", "Console Tables", "TV Stands", "Bookcases", "Desks", "Office Chairs",
    "Filing Cabinets", "Beds", "Mattresses", "Bed Frames", "Headboards", "Nightstands", "Dressers",
    "Wardrobes", "Vanities", "Dining Tables", "Dining Chairs", "Bar Stools", "Buffets", "China Cabinets",
    "Bedding Sets", "Sheets", "Pillows", "Mattress Toppers", "Blankets", "Comforters", "Quilts", "Duvet Covers",
    "Pillow Cases", "Mattress Protectors", "Bath Towels", "Hand Towels", "Washcloths", "Bath Mats",
    "Shower Curtains", "Bathroom Accessories", "Area Rugs", "Runner Rugs", "Outdoor Rugs", "Doormats",
    "Curtains", "Drapes", "Blinds", "Shades", "Curtain Rods", "Window Film", "Ceiling Lights", "Chandeliers",
    "Pendant Lights", "Floor Lamps", "Table Lamps", "Desk Lamps", "Wall Sconces", "Outdoor Lighting",
    "LED Bulbs", "Smart Bulbs", "Night Lights", "String Lights", "Candles", "Candle Holders", "Vases",
    "Wall Art", "Paintings", "Prints", "Posters", "Mirrors", "Wall Clocks", "Photo Frames", "Wall Shelves",
    "Wall Decals", "Sculptures", "Decorative Objects", "Artificial Plants", "Live Plants", "Planters",
    "Hanging Planters", "Garden Pots", "Plant Stands", "Garden Tools", "Lawn Mowers", "Trimmers",
    "Leaf Blowers", "Chainsaws", "Hedge Trimmers", "Garden Hoses", "Sprinklers", "Watering Cans",
    "Fertilizers", "Pesticides", "Seeds", "Bulbs", "Soil", "Mulch", "Composters", "Raised Garden Beds",
    "Greenhouses", "Garden Sheds", "Patio Heaters", "Fire Pits", "Outdoor Grills", "BBQ Accessories",
    "Outdoor Umbrellas", "Gazebos", "Pergolas", "Hammocks", "Outdoor Cushions", "Bird Feeders",
    "Bird Houses", "Garden Statues", "Fountains", "Pond Supplies", "Fencing", "Gates", "Mailboxes"
  ],
  "health-beauty": [
    "Facial Cleansers", "Face Moisturizers", "Face Serums", "Face Oils", "Face Masks", "Toners", "Exfoliators",
    "Eye Creams", "Lip Balms", "Lip Treatments", "Acne Treatments", "Anti-Aging Products", "Sunscreens",
    "Self Tanners", "Face Primers", "Setting Sprays", "Foundations", "Concealers", "Face Powders", "Blushes",
    "Bronzers", "Highlighters", "Contour Kits", "Eyeshadows", "Eyeliners", "Mascaras", "Eyebrow Products",
    "Lipsticks", "Lip Glosses", "Lip Liners", "Lip Stains", "Nail Polishes", "Nail Care", "Nail Art",
    "Makeup Brushes", "Makeup Sponges", "Makeup Bags", "Makeup Removers", "Shampoos", "Conditioners",
    "Hair Masks", "Hair Oils", "Hair Serums", "Leave-in Conditioners", "Hair Sprays", "Hair Gels",
    "Hair Mousses", "Hair Waxes", "Dry Shampoos", "Hair Dyes", "Hair Bleach", "Hair Extensions",
    "Wigs", "Hair Accessories", "Hair Brushes", "Hair Combs", "Hair Dryers", "Flat Irons", "Curling Irons",
    "Hot Rollers", "Trimmers", "Clippers", "Electric Shavers", "Manual Razors", "Razor Blades", "Shaving Creams",
    "Aftershaves", "Beard Oils", "Beard Balms", "Body Washes", "Bar Soaps", "Body Scrubs", "Body Lotions",
    "Body Oils", "Body Butters", "Hand Creams", "Foot Creams", "Deodorants", "Antiperspirants", "Perfumes",
    "Colognes", "Body Mists", "Essential Oils", "Aromatherapy", "Bath Bombs", "Bath Salts", "Bubble Bath",
    "Vitamins", "Minerals", "Supplements", "Protein Powders", "Pre-Workouts", "Post-Workouts", "Amino Acids",
    "Omega Fatty Acids", "Probiotics", "Digestive Enzymes", "Herbal Supplements", "Weight Loss Supplements",
    "Energy Supplements", "Sleep Aids", "Stress Relief", "Joint Support", "Bone Health", "Heart Health",
    "Brain Health", "Eye Health", "Immune Support", "Multivitamins", "Women's Health", "Men's Health",
    "Kids Vitamins", "Prenatal Vitamins", "Senior Vitamins", "First Aid Supplies", "Bandages", "Antiseptics",
    "Pain Relievers", "Cold Flu Medicine", "Allergy Medicine", "Digestive Health", "Dental Care",
    "Oral Hygiene", "Electric Toothbrushes", "Toothpastes", "Mouthwashes", "Dental Floss", "Teeth Whitening"
  ],
  "sports-outdoors": [
    "Running Shoes", "Running Apparel", "Running Accessories", "Fitness Trackers", "Heart Rate Monitors",
    "GPS Watches", "Yoga Mats", "Yoga Blocks", "Yoga Straps", "Yoga Apparel", "Pilates Equipment",
    "Resistance Bands", "Exercise Balls", "Foam Rollers", "Dumbbells", "Kettlebells", "Barbells",
    "Weight Plates", "Weight Benches", "Power Racks", "Pull Up Bars", "Ab Rollers", "Jump Ropes",
    "Treadmills", "Ellipticals", "Exercise Bikes", "Rowing Machines", "Stair Climbers", "Home Gyms",
    "Boxing Gloves", "Punching Bags", "MMA Gear", "Wrestling Gear", "Martial Arts Equipment",
    "Basketball Shoes", "Basketballs", "Basketball Hoops", "Basketball Apparel", "Soccer Cleats",
    "Soccer Balls", "Soccer Goals", "Soccer Apparel", "Football Gear", "Football Helmets", "Footballs",
    "Baseball Gloves", "Baseball Bats", "Baseballs", "Softballs", "Softball Equipment", "Tennis Rackets",
    "Tennis Balls", "Tennis Apparel", "Golf Clubs", "Golf Bags", "Golf Balls", "Golf Apparel", "Golf Carts",
    "Hockey Equipment", "Hockey Sticks", "Hockey Pucks", "Ice Skates", "Roller Blades", "Skateboards",
    "Longboards", "Scooters", "BMX Bikes", "Mountain Bikes", "Road Bikes", "Electric Bikes", "Bike Helmets",
    "Bike Lights", "Bike Locks", "Bike Racks", "Bike Accessories", "Camping Tents", "Sleeping Bags",
    "Camping Mattresses", "Camping Cookware", "Camping Stoves", "Coolers", "Camp Chairs", "Camping Lanterns",
    "Headlamps", "Flashlights", "Multi-tools", "Pocket Knives", "Survival Gear", "First Aid Kits",
    "Hiking Boots", "Hiking Backpacks", "Trekking Poles", "Hiking Apparel", "Trail Running Shoes",
    "Climbing Gear", "Climbing Ropes", "Carabiners", "Harnesses", "Climbing Shoes", "Fishing Rods",
    "Fishing Reels", "Fishing Lures", "Fishing Lines", "Tackle Boxes", "Fishing Apparel", "Kayaks",
    "Canoes", "Paddle Boards", "Surfboards", "Wetsuits", "Snorkeling Gear", "Scuba Gear", "Life Jackets",
    "Water Skis", "Wakeboards", "Jet Ski Accessories", "Hunting Apparel", "Hunting Boots", "Hunting Gear",
    "Trail Cameras", "Binoculars", "Rangefinders", "Skiing Equipment", "Snowboards", "Ski Boots",
    "Ski Goggles", "Ski Helmets", "Snow Apparel", "Sleds", "Snowshoes", "Cross Country Skis"
  ],
  "toys-games": [
    "Action Figures", "Dolls", "Doll Accessories", "Dollhouses", "Stuffed Animals", "Plush Toys",
    "Building Blocks", "LEGO Sets", "Magnetic Tiles", "Construction Toys", "Model Kits", "Die Cast Vehicles",
    "Remote Control Cars", "RC Drones", "RC Helicopters", "RC Boats", "RC Trucks", "Slot Cars",
    "Train Sets", "Play Vehicles", "Ride On Toys", "Tricycles", "Balance Bikes", "Scooters",
    "Electric Ride Ons", "Outdoor Playsets", "Swing Sets", "Trampolines", "Bounce Houses", "Sandboxes",
    "Water Tables", "Kiddie Pools", "Water Toys", "Beach Toys", "Bubbles", "Kites", "Yo-Yos",
    "Board Games", "Card Games", "Strategy Games", "Family Games", "Party Games", "Educational Games",
    "Memory Games", "Puzzle Games", "Trivia Games", "Role Playing Games", "Dungeons Dragons", "Miniature Games",
    "Puzzles", "Jigsaw Puzzles", "3D Puzzles", "Floor Puzzles", "Brain Teasers", "Rubiks Cubes",
    "STEM Toys", "Science Kits", "Chemistry Sets", "Physics Toys", "Robotics Kits", "Coding Toys",
    "Electronics Kits", "Microscopes", "Telescopes", "Educational Tablets", "Learning Toys", "Alphabet Toys",
    "Number Toys", "Musical Toys", "Toy Instruments", "Art Toys", "Craft Kits", "Coloring Sets",
    "Play Doh", "Slime", "Kinetic Sand", "Crayons", "Markers", "Paint Sets", "Drawing Tablets",
    "Pretend Play", "Play Kitchens", "Play Food", "Tool Sets", "Doctor Kits", "Dress Up Costumes",
    "Superhero Costumes", "Princess Costumes", "Puppets", "Magic Kits", "Baby Toys", "Rattles",
    "Teethers", "Soft Books", "Activity Gyms", "Baby Blocks", "Stacking Toys", "Shape Sorters",
    "Push Pull Toys", "Bath Toys", "Video Game Consoles", "Video Games", "Gaming Accessories",
    "Gaming Chairs", "VR Games", "Mobile Games", "Trading Cards", "Collectible Cards", "Sports Cards"
  ],
  "automotive": [
    "Motor Oil", "Transmission Fluid", "Brake Fluid", "Power Steering Fluid", "Coolant", "Antifreeze",
    "Windshield Washer Fluid", "Oil Filters", "Air Filters", "Cabin Air Filters", "Fuel Filters",
    "Spark Plugs", "Ignition Coils", "Batteries", "Battery Chargers", "Jump Starters", "Alternators",
    "Starters", "Brake Pads", "Brake Rotors", "Brake Calipers", "Brake Lines", "Shocks", "Struts",
    "Suspension Parts", "Steering Parts", "Wheel Bearings", "CV Joints", "Drive Shafts", "Axles",
    "Exhaust Systems", "Mufflers", "Catalytic Converters", "Headers", "Exhaust Tips", "Engine Parts",
    "Gaskets", "Seals", "Timing Belts", "Serpentine Belts", "Hoses", "Clamps", "Radiators", "Thermostats",
    "Water Pumps", "Fuel Pumps", "Fuel Injectors", "Carburetors", "Intake Manifolds", "Throttle Bodies",
    "Mass Air Flow Sensors", "Oxygen Sensors", "Camshaft Sensors", "Crankshaft Sensors", "ECU Modules",
    "Headlights", "Tail Lights", "Fog Lights", "Turn Signals", "LED Bulbs", "HID Bulbs", "Light Bars",
    "Wiper Blades", "Wiper Motors", "Mirrors", "Door Handles", "Window Regulators", "Door Locks",
    "Car Covers", "Floor Mats", "Seat Covers", "Steering Wheel Covers", "Dash Covers", "Sun Shades",
    "Organizers", "Trash Cans", "Phone Mounts", "Cup Holders", "Air Fresheners", "Car Vacuum Cleaners",
    "Car Wash Soap", "Car Wax", "Polish", "Detailing Kits", "Clay Bars", "Microfiber Towels",
    "Tire Shine", "Leather Conditioner", "Glass Cleaner", "Bug Remover", "Tar Remover", "Tires",
    "Wheels", "Rims", "Hubcaps", "Lug Nuts", "Tire Pressure Monitors", "Tire Inflators", "Jack Stands",
    "Floor Jacks", "Tool Kits", "Wrenches", "Socket Sets", "Screwdrivers", "Pliers", "OBD Scanners",
    "Code Readers", "Multimeters", "Test Lights", "Funnels", "Oil Drain Pans", "Creepers", "Shop Lights",
    "Car Stereos", "Car Speakers", "Subwoofers", "Amplifiers", "GPS Navigation", "Dash Cameras",
    "Backup Cameras", "Parking Sensors", "Radar Detectors", "CB Radios", "Roof Racks", "Cargo Carriers",
    "Bike Racks", "Kayak Racks", "Hitch Accessories", "Towing Equipment", "Trailer Parts", "RV Parts"
  ],
  "books-media": [
    "Fiction Books", "Mystery Books", "Thriller Books", "Romance Books", "Science Fiction", "Fantasy Books",
    "Horror Books", "Literary Fiction", "Historical Fiction", "Contemporary Fiction", "Classics",
    "Young Adult Fiction", "Children's Fiction", "Graphic Novels", "Comics", "Manga", "Non-Fiction Books",
    "Biographies", "Autobiographies", "Memoirs", "History Books", "Science Books", "Nature Books",
    "Travel Books", "Philosophy Books", "Psychology Books", "Self-Help Books", "Business Books",
    "Finance Books", "Marketing Books", "Leadership Books", "Entrepreneurship Books", "Career Books",
    "Health Books", "Diet Books", "Fitness Books", "Cooking Books", "Baking Books", "Recipe Books",
    "Craft Books", "DIY Books", "Home Improvement Books", "Gardening Books", "Parenting Books",
    "Pregnancy Books", "Baby Books", "Education Books", "Test Prep Books", "Study Guides", "Textbooks",
    "Reference Books", "Dictionaries", "Encyclopedias", "Atlases", "Almanacs", "Religious Books",
    "Spirituality Books", "New Age Books", "Poetry Books", "Drama Books", "Essay Collections",
    "Anthologies", "Short Story Collections", "Art Books", "Photography Books", "Music Books",
    "Film Books", "Theater Books", "Dance Books", "Sports Books", "Outdoor Books", "Pet Books",
    "True Crime Books", "Political Books", "Current Events", "Social Science Books", "Law Books",
    "Medical Books", "Computer Books", "Technology Books", "Engineering Books", "Math Books",
    "Audio Books", "E-Books", "Kindle Books", "CD Audio Books", "MP3 Audio Books", "Vinyl Records",
    "CDs", "Music CDs", "Classical Music", "Jazz Music", "Rock Music", "Pop Music", "Hip Hop Music",
    "Country Music", "R&B Music", "Electronic Music", "World Music", "Soundtracks", "DVDs", "Blu-rays",
    "4K Movies", "TV Series", "Documentaries", "Kids Movies", "Anime DVDs", "Box Sets", "Criterion Collection",
    "Digital Movies", "Digital TV Shows", "Streaming Subscriptions", "Magazine Subscriptions",
    "Newspaper Subscriptions", "Digital Magazines", "Calendars", "Planners", "Journals", "Notebooks"
  ],
  "office-school": [
    "Pens", "Pencils", "Mechanical Pencils", "Colored Pencils", "Markers", "Highlighters", "Crayons",
    "Erasers", "Sharpeners", "Correction Tape", "White Out", "Notebooks", "Composition Books",
    "Spiral Notebooks", "Legal Pads", "Graph Paper", "Loose Leaf Paper", "Printer Paper", "Copy Paper",
    "Cardstock", "Construction Paper", "Binders", "Folders", "File Folders", "Hanging Folders",
    "Filing Cabinets", "File Boxes", "Storage Boxes", "Desk Organizers", "Pencil Cups", "Letter Trays",
    "Staplers", "Staples", "Staple Removers", "Paper Clips", "Binder Clips", "Rubber Bands",
    "Tape", "Tape Dispensers", "Glue Sticks", "Glue Bottles", "Scissors", "Paper Cutters", "Hole Punches",
    "Rulers", "Protractors", "Compasses", "Calculators", "Scientific Calculators", "Graphing Calculators",
    "Label Makers", "Labels", "Sticky Notes", "Post-its", "Index Cards", "Flashcards", "Envelopes",
    "Mailing Supplies", "Bubble Mailers", "Shipping Boxes", "Packing Tape", "Shipping Labels",
    "Stamps", "Ink Pads", "Letterhead", "Business Cards", "Name Badges", "Lanyards", "ID Holders",
    "Whiteboards", "Dry Erase Markers", "Whiteboard Erasers", "Bulletin Boards", "Push Pins", "Thumbtacks",
    "Cork Boards", "Easels", "Presentation Supplies", "Poster Boards", "Foam Boards", "Display Boards",
    "Office Desks", "Office Chairs", "Standing Desks", "Desk Accessories", "Monitor Stands", "Keyboard Trays",
    "Footrests", "Chair Mats", "Desk Lamps", "Task Lights", "Printers", "Ink Cartridges", "Toner Cartridges",
    "Printer Paper", "Photo Paper", "Label Printers", "Scanners", "Fax Machines", "Shredders",
    "Laminators", "Laminating Pouches", "Binding Machines", "Binding Supplies", "Backpacks", "Lunch Boxes",
    "Lunch Bags", "Water Bottles", "Pencil Cases", "Pencil Pouches", "Locker Accessories", "School Supplies Sets",
    "Art Supplies", "Craft Supplies", "Science Supplies", "Math Supplies", "Teaching Supplies", "Classroom Decorations"
  ],
  "food-grocery": [
    "Fresh Produce", "Fruits", "Vegetables", "Organic Produce", "Salad Kits", "Fresh Herbs",
    "Meat", "Beef", "Chicken", "Pork", "Turkey", "Lamb", "Veal", "Ground Meat", "Steaks", "Roasts",
    "Seafood", "Fish", "Shrimp", "Crab", "Lobster", "Oysters", "Scallops", "Salmon", "Tuna", "Cod",
    "Dairy", "Milk", "Cheese", "Butter", "Cream", "Sour Cream", "Cream Cheese", "Yogurt", "Cottage Cheese",
    "Eggs", "Egg Substitutes", "Plant-Based Milk", "Almond Milk", "Oat Milk", "Soy Milk", "Coconut Milk",
    "Bread", "Bagels", "Rolls", "Tortillas", "Pita", "English Muffins", "Croissants", "Baguettes",
    "Bakery Items", "Cakes", "Pies", "Cookies", "Muffins", "Donuts", "Pastries", "Desserts",
    "Breakfast Cereals", "Oatmeal", "Granola", "Breakfast Bars", "Pancake Mix", "Waffle Mix", "Syrup",
    "Pasta", "Spaghetti", "Penne", "Fettuccine", "Lasagna", "Rice", "White Rice", "Brown Rice", "Wild Rice",
    "Quinoa", "Couscous", "Barley", "Beans", "Lentils", "Chickpeas", "Canned Vegetables", "Canned Fruits",
    "Canned Soups", "Canned Meats", "Tomato Sauce", "Pasta Sauce", "Salsa", "Ketchup", "Mustard",
    "Mayonnaise", "BBQ Sauce", "Hot Sauce", "Soy Sauce", "Teriyaki Sauce", "Salad Dressing",
    "Cooking Oil", "Olive Oil", "Vegetable Oil", "Coconut Oil", "Vinegar", "Balsamic Vinegar",
    "Flour", "Sugar", "Brown Sugar", "Powdered Sugar", "Baking Soda", "Baking Powder", "Yeast",
    "Salt", "Pepper", "Spices", "Herbs", "Seasoning Blends", "Bouillon", "Broths", "Stocks",
    "Snacks", "Chips", "Crackers", "Pretzels", "Popcorn", "Nuts", "Trail Mix", "Dried Fruit",
    "Granola Bars", "Protein Bars", "Candy", "Chocolate", "Gummies", "Hard Candy", "Chewing Gum",
    "Beverages", "Water", "Sparkling Water", "Soda", "Juice", "Tea", "Coffee", "Hot Chocolate",
    "Energy Drinks", "Sports Drinks", "Wine", "Beer", "Spirits", "Mixers", "Frozen Foods",
    "Frozen Vegetables", "Frozen Fruits", "Frozen Meals", "Frozen Pizza", "Frozen Appetizers",
    "Ice Cream", "Frozen Desserts", "Pet Food", "Dog Food", "Cat Food", "Bird Food", "Fish Food"
  ],
  "baby-kids": [
    "Diapers", "Newborn Diapers", "Size 1 Diapers", "Size 2 Diapers", "Size 3 Diapers", "Pull-Ups",
    "Swim Diapers", "Cloth Diapers", "Diaper Pails", "Diaper Bags", "Wipes", "Baby Wipes", "Changing Pads",
    "Changing Tables", "Baby Formula", "Infant Formula", "Toddler Formula", "Specialty Formula",
    "Baby Food", "Baby Purees", "Baby Snacks", "Teething Biscuits", "Sippy Cups", "Baby Bottles",
    "Bottle Nipples", "Bottle Brushes", "Bottle Warmers", "Bottle Sterilizers", "Breast Pumps",
    "Nursing Pads", "Nursing Covers", "Nursing Pillows", "Pacifiers", "Teethers", "Baby Utensils",
    "Baby Bowls", "Baby Plates", "High Chairs", "Booster Seats", "Baby Bibs", "Baby Monitors",
    "Video Monitors", "Audio Monitors", "Movement Monitors", "Baby Gates", "Outlet Covers",
    "Cabinet Locks", "Corner Protectors", "Baby Proofing", "Cribs", "Bassinets", "Cradles",
    "Crib Mattresses", "Crib Bedding", "Crib Sheets", "Baby Blankets", "Swaddles", "Sleep Sacks",
    "Night Lights", "White Noise Machines", "Mobiles", "Nursery Decor", "Nursery Furniture",
    "Gliders", "Rockers", "Nursery Storage", "Car Seats", "Infant Car Seats", "Convertible Car Seats",
    "Booster Car Seats", "Car Seat Bases", "Car Seat Accessories", "Strollers", "Travel Strollers",
    "Jogging Strollers", "Double Strollers", "Stroller Accessories", "Baby Carriers", "Baby Wraps",
    "Baby Slings", "Backpack Carriers", "Play Yards", "Play Pens", "Activity Centers", "Jumpers",
    "Bouncers", "Baby Swings", "Play Mats", "Activity Gyms", "Tummy Time Mats", "Baby Walkers",
    "Push Toys", "Baby Toys", "Infant Toys", "Developmental Toys", "Musical Toys", "Soft Toys",
    "Baby Bath Tubs", "Bath Seats", "Bath Toys", "Hooded Towels", "Baby Washcloths", "Baby Shampoo",
    "Baby Soap", "Baby Lotion", "Baby Oil", "Diaper Cream", "Baby Powder", "Baby Sunscreen",
    "Baby Clothing", "Onesies", "Baby Sleepers", "Baby Outfits", "Baby Shoes", "Baby Socks",
    "Baby Hats", "Baby Mittens", "Baby Jackets", "Toddler Clothing", "Kids Clothing", "Kids Shoes"
  ],
  "pet-supplies": [
    "Dog Food", "Dry Dog Food", "Wet Dog Food", "Puppy Food", "Senior Dog Food", "Grain Free Dog Food",
    "Dog Treats", "Dog Biscuits", "Dog Chews", "Dental Chews", "Training Treats", "Freeze Dried Treats",
    "Dog Bowls", "Elevated Dog Bowls", "Slow Feeder Bowls", "Automatic Feeders", "Water Fountains",
    "Dog Beds", "Orthopedic Dog Beds", "Heated Dog Beds", "Dog Crates", "Dog Kennels", "Dog Houses",
    "Dog Crate Pads", "Dog Blankets", "Dog Collars", "Dog Leashes", "Retractable Leashes", "Dog Harnesses",
    "Dog Tags", "Dog Muzzles", "Dog Training Collars", "Bark Collars", "GPS Dog Trackers", "Dog Doors",
    "Dog Gates", "Dog Playpens", "Dog Toys", "Plush Dog Toys", "Rope Dog Toys", "Ball Dog Toys",
    "Interactive Dog Toys", "Puzzle Dog Toys", "Fetch Toys", "Tug Toys", "Squeaky Toys", "Dog Apparel",
    "Dog Sweaters", "Dog Coats", "Dog Raincoats", "Dog Boots", "Dog Bandanas", "Dog Costumes",
    "Dog Grooming", "Dog Shampoo", "Dog Conditioner", "Dog Brushes", "Dog Combs", "Dog Nail Clippers",
    "Dog Ear Cleaner", "Dog Dental Care", "Dog Flea Treatment", "Dog Tick Treatment", "Dog Wormers",
    "Dog Vitamins", "Dog Supplements", "Dog Joint Support", "Dog Anxiety Relief", "Poop Bags",
    "Pooper Scoopers", "Dog Stain Removers", "Dog Odor Removers", "Dog Carrier", "Dog Travel Crate",
    "Dog Car Seat", "Dog Seat Belt", "Dog Ramp", "Dog Stairs", "Cat Food", "Dry Cat Food", "Wet Cat Food",
    "Kitten Food", "Senior Cat Food", "Indoor Cat Food", "Cat Treats", "Cat Bowls", "Cat Fountains",
    "Cat Beds", "Cat Trees", "Cat Scratching Posts", "Cat Condos", "Cat Litter", "Clumping Litter",
    "Crystal Litter", "Natural Litter", "Litter Boxes", "Automatic Litter Boxes", "Litter Scoops",
    "Cat Collars", "Cat Harnesses", "Cat Leashes", "Cat Toys", "Interactive Cat Toys", "Laser Toys",
    "Feather Toys", "Catnip Toys", "Cat Tunnels", "Cat Carriers", "Cat Grooming", "Cat Shampoo",
    "Cat Brushes", "Cat Nail Clippers", "Cat Flea Treatment", "Cat Vitamins", "Bird Cages", "Bird Food",
    "Bird Treats", "Bird Toys", "Bird Perches", "Fish Tanks", "Aquarium Filters", "Aquarium Heaters",
    "Aquarium Lights", "Aquarium Decorations", "Fish Food", "Small Animal Cages", "Hamster Supplies",
    "Guinea Pig Supplies", "Rabbit Supplies", "Reptile Supplies", "Reptile Terrariums", "Reptile Lights"
  ],
  "jewelry-watches": [
    "Diamond Rings", "Engagement Rings", "Wedding Bands", "Promise Rings", "Eternity Rings", "Cocktail Rings",
    "Fashion Rings", "Stackable Rings", "Gold Rings", "Silver Rings", "Platinum Rings", "Rose Gold Rings",
    "Diamond Necklaces", "Pendant Necklaces", "Chain Necklaces", "Choker Necklaces", "Statement Necklaces",
    "Pearl Necklaces", "Gold Necklaces", "Silver Necklaces", "Tennis Necklaces", "Layered Necklaces",
    "Diamond Earrings", "Stud Earrings", "Hoop Earrings", "Drop Earrings", "Dangle Earrings", "Chandelier Earrings",
    "Pearl Earrings", "Gold Earrings", "Silver Earrings", "Huggie Earrings", "Climber Earrings",
    "Diamond Bracelets", "Tennis Bracelets", "Bangle Bracelets", "Charm Bracelets", "Cuff Bracelets",
    "Beaded Bracelets", "Gold Bracelets", "Silver Bracelets", "Leather Bracelets", "Link Bracelets",
    "Anklets", "Toe Rings", "Body Jewelry", "Nose Rings", "Belly Rings", "Ear Cuffs", "Cartilage Earrings",
    "Brooches", "Pins", "Jewelry Sets", "Bridal Jewelry", "Gemstone Jewelry", "Birthstone Jewelry",
    "Pearl Jewelry", "Turquoise Jewelry", "Opal Jewelry", "Sapphire Jewelry", "Ruby Jewelry", "Emerald Jewelry",
    "Men's Rings", "Men's Necklaces", "Men's Bracelets", "Cufflinks", "Tie Clips", "Tie Bars",
    "Luxury Watches", "Swiss Watches", "Automatic Watches", "Mechanical Watches", "Quartz Watches",
    "Chronograph Watches", "Dive Watches", "Dress Watches", "Sports Watches", "Pilot Watches",
    "Field Watches", "Digital Watches", "Smart Watches", "Fitness Watches", "GPS Watches",
    "Men's Watches", "Women's Watches", "Kids Watches", "Gold Watches", "Silver Watches", "Stainless Steel Watches",
    "Leather Strap Watches", "Metal Bracelet Watches", "Silicone Watches", "NATO Strap Watches",
    "Watch Bands", "Watch Straps", "Watch Winders", "Watch Cases", "Watch Boxes", "Jewelry Boxes",
    "Jewelry Organizers", "Ring Holders", "Necklace Stands", "Earring Holders", "Jewelry Cleaning",
    "Jewelry Polish", "Jewelry Cleaner", "Ultrasonic Cleaners", "Jewelry Tools", "Jewelry Making Supplies"
  ],
  "art-crafts": [
    "Acrylic Paints", "Oil Paints", "Watercolor Paints", "Gouache Paints", "Tempera Paints", "Spray Paints",
    "Paint Sets", "Paint Brushes", "Paint Palettes", "Paint Easels", "Canvas Boards", "Stretched Canvas",
    "Canvas Panels", "Canvas Pads", "Painting Paper", "Watercolor Paper", "Drawing Paper", "Sketch Pads",
    "Mixed Media Paper", "Pastel Paper", "Graphite Pencils", "Colored Pencils", "Charcoal Pencils",
    "Pastel Pencils", "Watercolor Pencils", "Ink Pens", "Markers", "Brush Pens", "Calligraphy Pens",
    "Fountain Pens", "Sketching Pencils", "Drawing Pencils", "Artist Pens", "Technical Pens",
    "Soft Pastels", "Oil Pastels", "Chalk Pastels", "Charcoal", "Vine Charcoal", "Compressed Charcoal",
    "Conté Crayons", "Fixatives", "Varnishes", "Art Mediums", "Gesso", "Modeling Paste", "Gel Medium",
    "Sculpting Clay", "Air Dry Clay", "Polymer Clay", "Modeling Clay", "Sculpting Tools", "Pottery Tools",
    "Pottery Wheels", "Kiln Supplies", "Ceramic Glazes", "Jewelry Making", "Beads", "Jewelry Wire",
    "Jewelry Findings", "Jewelry Pliers", "Stringing Materials", "Resin", "Resin Molds", "Resin Dyes",
    "Sewing Machines", "Sewing Notions", "Sewing Thread", "Sewing Needles", "Pins", "Pincushions",
    "Fabric", "Cotton Fabric", "Linen Fabric", "Silk Fabric", "Fleece Fabric", "Knit Fabric",
    "Quilting Fabric", "Quilting Supplies", "Batting", "Rotary Cutters", "Cutting Mats", "Fabric Scissors",
    "Pinking Shears", "Embroidery", "Embroidery Floss", "Embroidery Hoops", "Cross Stitch Kits",
    "Needlepoint", "Knitting Needles", "Knitting Yarn", "Crochet Hooks", "Crochet Yarn", "Weaving Looms",
    "Macrame Supplies", "Felting Supplies", "Leather Craft", "Leather Tools", "Leather Dye",
    "Paper Crafts", "Scrapbooking", "Scrapbook Paper", "Scrapbook Albums", "Paper Punches", "Die Cuts",
    "Stamps", "Ink Pads", "Embossing", "Card Making", "Stickers", "Washi Tape", "Glitter",
    "Adhesives", "Craft Glue", "Hot Glue Guns", "Mod Podge", "Decoupage", "Wood Crafts", "Wood Burning",
    "Carving Tools", "Model Building", "Model Paints", "Airbrush Kits", "Screen Printing", "Tie Dye"
  ],
  "musical-instruments": [
    "Acoustic Guitars", "Electric Guitars", "Classical Guitars", "Bass Guitars", "12-String Guitars",
    "Guitar Amplifiers", "Guitar Pedals", "Guitar Strings", "Guitar Picks", "Guitar Straps", "Guitar Cases",
    "Guitar Stands", "Guitar Capos", "Guitar Tuners", "Ukuleles", "Banjos", "Mandolins", "Violins",
    "Violas", "Cellos", "Double Basses", "Violin Bows", "Violin Strings", "Rosin", "Violin Cases",
    "Electric Violins", "Acoustic Pianos", "Digital Pianos", "Keyboards", "Synthesizers", "MIDI Controllers",
    "Piano Benches", "Keyboard Stands", "Sustain Pedals", "Piano Books", "Organs", "Accordions",
    "Harmonicas", "Melodicas", "Acoustic Drums", "Electronic Drums", "Drum Kits", "Snare Drums",
    "Bass Drums", "Tom Drums", "Cymbals", "Hi-Hats", "Drum Sticks", "Drum Heads", "Drum Hardware",
    "Drum Thrones", "Practice Pads", "Percussion", "Congas", "Bongos", "Djembes", "Tambourines",
    "Maracas", "Shakers", "Triangles", "Xylophones", "Marimbas", "Vibraphones", "Glockenspiels",
    "Flutes", "Piccolos", "Clarinets", "Oboes", "Bassoons", "Saxophones", "Alto Saxophones",
    "Tenor Saxophones", "Soprano Saxophones", "Baritone Saxophones", "Reeds", "Mouthpieces",
    "Trumpets", "Trombones", "French Horns", "Tubas", "Euphoniums", "Cornets", "Flugelhorns",
    "Brass Mutes", "Valve Oil", "Microphones", "Condenser Microphones", "Dynamic Microphones",
    "Ribbon Microphones", "USB Microphones", "Microphone Stands", "Pop Filters", "Shock Mounts",
    "Audio Interfaces", "Mixers", "Preamps", "Headphones", "Studio Monitors", "PA Systems",
    "Powered Speakers", "Passive Speakers", "Subwoofers", "DJ Equipment", "Turntables", "DJ Controllers",
    "DJ Mixers", "DJ Headphones", "Lighting Effects", "Fog Machines", "Recording Equipment",
    "DAW Software", "Plugins", "Sample Libraries", "Sheet Music", "Music Books", "Music Stands"
  ],
  "industrial-scientific": [
    "Lab Equipment", "Beakers", "Flasks", "Test Tubes", "Petri Dishes", "Pipettes", "Burettes",
    "Graduated Cylinders", "Volumetric Flasks", "Bunsen Burners", "Hot Plates", "Stirrers",
    "Centrifuges", "Microscopes", "Lab Microscopes", "Stereo Microscopes", "Digital Microscopes",
    "Microscope Slides", "Cover Slips", "Lab Balances", "Analytical Balances", "Lab Scales",
    "pH Meters", "Conductivity Meters", "Thermometers", "Digital Thermometers", "Lab Timers",
    "Lab Safety", "Safety Goggles", "Lab Coats", "Lab Gloves", "Face Shields", "Chemical Storage",
    "Fume Hoods", "Eyewash Stations", "Safety Showers", "First Aid Kits", "Spill Kits",
    "Industrial Tools", "Power Drills", "Impact Drivers", "Circular Saws", "Jigsaws", "Reciprocating Saws",
    "Band Saws", "Table Saws", "Miter Saws", "Sanders", "Grinders", "Angle Grinders", "Bench Grinders",
    "Routers", "Planers", "Jointers", "Lathes", "Mill Machines", "CNC Machines", "3D Printers",
    "Welding Equipment", "MIG Welders", "TIG Welders", "Stick Welders", "Plasma Cutters",
    "Welding Helmets", "Welding Gloves", "Welding Wire", "Welding Rods", "Air Compressors",
    "Pneumatic Tools", "Air Nailers", "Air Staplers", "Air Hammers", "Impact Wrenches",
    "Hand Tools", "Wrenches", "Socket Sets", "Screwdrivers", "Pliers", "Hammers", "Levels",
    "Measuring Tapes", "Calipers", "Micrometers", "Laser Levels", "Stud Finders", "Voltage Testers",
    "Multimeters", "Clamp Meters", "Oscilloscopes", "Power Supplies", "Soldering Irons",
    "Soldering Stations", "Heat Guns", "Wire Strippers", "Crimping Tools", "Cable Testers",
    "Industrial Adhesives", "Epoxies", "Sealants", "Lubricants", "Penetrating Oils", "Cutting Fluids",
    "Cleaners", "Degreasers", "Rust Removers", "Abrasives", "Sandpaper", "Grinding Wheels",
    "Cutting Discs", "Flap Discs", "Wire Brushes", "Industrial Fasteners", "Bolts", "Nuts",
    "Washers", "Screws", "Rivets", "Anchors", "Material Handling", "Hand Trucks", "Dollies",
    "Pallet Jacks", "Forklifts", "Hoists", "Cranes", "Lifting Slings", "Strapping", "Packaging"
  ],
  "collectibles": [
    "Sports Cards", "Baseball Cards", "Football Cards", "Basketball Cards", "Hockey Cards",
    "Soccer Cards", "Trading Cards", "Pokemon Cards", "Magic The Gathering", "Yu-Gi-Oh Cards",
    "Sports Memorabilia", "Signed Jerseys", "Signed Baseballs", "Signed Footballs", "Signed Basketballs",
    "Signed Photos", "Game Used Items", "Championship Rings", "Trophies", "Medals", "Bobbleheads",
    "Action Figures", "Vintage Action Figures", "Star Wars Figures", "Marvel Figures", "DC Figures",
    "Transformers", "G.I. Joe", "Hot Wheels", "Matchbox Cars", "Die Cast Cars", "Model Cars",
    "Model Trains", "Model Airplanes", "Model Ships", "Model Rockets", "Vintage Toys", "Antique Toys",
    "Dolls", "Barbie Dolls", "Vintage Dolls", "Porcelain Dolls", "Artist Dolls", "Teddy Bears",
    "Vintage Teddy Bears", "Plush Collectibles", "Funko Pop", "Vinyl Figures", "Designer Toys",
    "Coins", "Gold Coins", "Silver Coins", "Rare Coins", "Ancient Coins", "Commemorative Coins",
    "Coin Sets", "Proof Sets", "Mint Sets", "Currency", "Paper Money", "Foreign Currency",
    "Stamps", "Stamp Collections", "First Day Covers", "Postage Stamps", "Vintage Stamps",
    "Antiques", "Antique Furniture", "Antique Jewelry", "Antique Clocks", "Antique China",
    "Antique Glass", "Antique Silver", "Antique Books", "Antique Maps", "Antique Prints",
    "Vintage Clothing", "Vintage Jewelry", "Vintage Watches", "Vintage Accessories", "Vintage Handbags",
    "Movie Memorabilia", "Movie Props", "Movie Posters", "Autographs", "Celebrity Autographs",
    "Historical Autographs", "Music Memorabilia", "Concert Posters", "Vinyl Records", "Signed Albums",
    "Band Merchandise", "Comic Books", "Vintage Comics", "Golden Age Comics", "Silver Age Comics",
    "Modern Comics", "Graphic Novels", "Manga", "Art Prints", "Limited Edition Prints", "Lithographs",
    "Posters", "Vintage Posters", "Advertising Memorabilia", "Coca Cola Collectibles", "Beer Signs",
    "Neon Signs", "Vintage Signs", "Political Memorabilia", "Military Collectibles", "War Memorabilia"
  ],
  "travel-luggage": [
    "Carry On Luggage", "Checked Luggage", "Spinner Luggage", "Hardside Luggage", "Softside Luggage",
    "Luggage Sets", "Garment Bags", "Duffel Bags", "Weekender Bags", "Travel Backpacks",
    "Laptop Backpacks", "Rolling Backpacks", "Messenger Bags", "Briefcases", "Tote Bags",
    "Packing Cubes", "Compression Bags", "Toiletry Bags", "Cosmetic Cases", "Hanging Toiletry Bags",
    "Travel Bottles", "Travel Containers", "Travel Pouches", "Passport Holders", "Passport Covers",
    "Travel Wallets", "RFID Wallets", "Money Belts", "Neck Pouches", "Luggage Tags", "Luggage Locks",
    "TSA Locks", "Cable Locks", "Luggage Scales", "Travel Pillows", "Neck Pillows", "Inflatable Pillows",
    "Memory Foam Pillows", "Travel Blankets", "Eye Masks", "Sleep Masks", "Ear Plugs", "Noise Canceling Headphones",
    "Travel Adapters", "Universal Adapters", "Voltage Converters", "Portable Chargers", "Power Banks",
    "USB Chargers", "Car Chargers", "Travel Irons", "Travel Steamers", "Travel Hair Dryers",
    "Travel Curling Irons", "Travel Flat Irons", "Portable Fans", "Travel Umbrellas", "Compact Umbrellas",
    "Rain Ponchos", "Travel Raincoats", "Travel Jackets", "Packable Jackets", "Travel Shoes",
    "Foldable Shoes", "Travel Slippers", "Compression Socks", "Travel First Aid Kits", "Motion Sickness Remedies",
    "Travel Health Kits", "Hand Sanitizers", "Disinfecting Wipes", "Face Masks", "Neck Gaiters",
    "Travel Document Organizers", "Travel Journals", "Travel Guidebooks", "Travel Maps", "Language Guides",
    "Travel Games", "Travel Entertainment", "Kindle Cases", "Tablet Cases", "Headphone Cases",
    "Camera Bags", "Camera Cases", "GoPro Accessories", "Selfie Sticks", "Tripods", "Travel Tripods",
    "Binoculars", "Travel Binoculars", "Travel Telescopes", "Hiking Gear", "Day Packs", "Hydration Packs",
    "Trekking Poles", "Hiking Boots", "Trail Shoes", "Camping Gear", "Sleeping Bags", "Camping Tents",
    "Camping Hammocks", "Portable Chairs", "Coolers", "Insulated Bags", "Water Bottles", "Travel Mugs"
  ],
  "garden-patio": [
    "Patio Furniture Sets", "Outdoor Dining Sets", "Patio Chairs", "Patio Tables", "Outdoor Sofas",
    "Outdoor Sectionals", "Outdoor Loveseats", "Adirondack Chairs", "Rocking Chairs", "Hammocks",
    "Hammock Stands", "Porch Swings", "Outdoor Benches", "Garden Benches", "Picnic Tables",
    "Outdoor Bar Sets", "Bar Stools", "Chaise Lounges", "Sun Loungers", "Outdoor Daybeds",
    "Patio Umbrellas", "Cantilever Umbrellas", "Market Umbrellas", "Umbrella Stands", "Umbrella Bases",
    "Gazebos", "Pergolas", "Arbors", "Canopies", "Shade Sails", "Outdoor Curtains", "Patio Covers",
    "Outdoor Cushions", "Patio Pillows", "Outdoor Rugs", "Patio Mats", "Furniture Covers",
    "BBQ Grills", "Gas Grills", "Charcoal Grills", "Pellet Grills", "Smokers", "Portable Grills",
    "Grill Accessories", "Grill Covers", "Grill Tools", "Grill Brushes", "Meat Thermometers",
    "Fire Pits", "Fire Pit Tables", "Chimineas", "Outdoor Fireplaces", "Fire Pit Covers",
    "Patio Heaters", "Propane Heaters", "Electric Heaters", "Infrared Heaters", "Outdoor Lighting",
    "String Lights", "Solar Lights", "Pathway Lights", "Spotlights", "Landscape Lighting",
    "Deck Lights", "Step Lights", "Wall Lights", "Post Lights", "Lanterns", "Tiki Torches",
    "Outdoor Fountains", "Garden Fountains", "Wall Fountains", "Bird Baths", "Bird Feeders",
    "Bird Houses", "Butterfly Houses", "Bat Houses", "Planters", "Flower Pots", "Raised Beds",
    "Window Boxes", "Hanging Baskets", "Plant Stands", "Trellises", "Garden Arches", "Obelisks",
    "Garden Statues", "Garden Sculptures", "Gnomes", "Wind Chimes", "Weather Vanes", "Sundials",
    "Garden Stakes", "Garden Flags", "Outdoor Clocks", "Address Signs", "House Numbers",
    "Garden Tools", "Shovels", "Rakes", "Hoes", "Trowels", "Pruners", "Loppers", "Hedge Shears",
    "Lawn Mowers", "Riding Mowers", "Push Mowers", "Robotic Mowers", "Lawn Edgers", "String Trimmers",
    "Leaf Blowers", "Chainsaws", "Wood Chippers", "Garden Hoses", "Hose Reels", "Sprinklers",
    "Drip Irrigation", "Watering Cans", "Fertilizers", "Mulch", "Soil", "Compost", "Seeds"
  ],
  "appliances": [
    "Refrigerators", "French Door Refrigerators", "Side by Side Refrigerators", "Top Freezer Refrigerators",
    "Bottom Freezer Refrigerators", "Mini Fridges", "Beverage Coolers", "Wine Coolers", "Freezers",
    "Chest Freezers", "Upright Freezers", "Ranges", "Gas Ranges", "Electric Ranges", "Dual Fuel Ranges",
    "Induction Ranges", "Ovens", "Wall Ovens", "Double Ovens", "Convection Ovens", "Microwaves",
    "Over The Range Microwaves", "Countertop Microwaves", "Built In Microwaves", "Cooktops",
    "Gas Cooktops", "Electric Cooktops", "Induction Cooktops", "Range Hoods", "Downdraft Vents",
    "Dishwashers", "Built In Dishwashers", "Portable Dishwashers", "Countertop Dishwashers",
    "Washers", "Front Load Washers", "Top Load Washers", "Washer Dryer Combos", "Compact Washers",
    "Dryers", "Gas Dryers", "Electric Dryers", "Compact Dryers", "Washer Dryer Sets", "Laundry Centers",
    "Coffee Makers", "Drip Coffee Makers", "Single Serve Coffee Makers", "Espresso Machines",
    "French Presses", "Pour Over Coffee Makers", "Cold Brew Coffee Makers", "Coffee Grinders",
    "Toasters", "2 Slice Toasters", "4 Slice Toasters", "Toaster Ovens", "Convection Toaster Ovens",
    "Blenders", "Countertop Blenders", "Immersion Blenders", "Personal Blenders", "High Performance Blenders",
    "Food Processors", "Mini Food Processors", "Food Choppers", "Mixers", "Stand Mixers", "Hand Mixers",
    "Juicers", "Centrifugal Juicers", "Masticating Juicers", "Citrus Juicers", "Air Fryers",
    "Convection Air Fryers", "Air Fryer Ovens", "Deep Fryers", "Slow Cookers", "Pressure Cookers",
    "Electric Pressure Cookers", "Instant Pots", "Rice Cookers", "Multi Cookers", "Sous Vide",
    "Electric Grills", "Indoor Grills", "Contact Grills", "Panini Presses", "Waffle Makers",
    "Electric Griddles", "Crepe Makers", "Hot Plates", "Electric Skillets", "Electric Kettles",
    "Hot Water Dispensers", "Ice Makers", "Portable Ice Makers", "Countertop Ice Makers",
    "Vacuum Sealers", "Food Dehydrators", "Bread Machines", "Pasta Makers", "Ice Cream Makers",
    "Popcorn Makers", "Cotton Candy Machines", "Soda Makers", "Meat Grinders", "Electric Can Openers",
    "Vacuum Cleaners", "Upright Vacuums", "Canister Vacuums", "Stick Vacuums", "Handheld Vacuums",
    "Robot Vacuums", "Wet Dry Vacuums", "Air Purifiers", "HEPA Air Purifiers", "Humidifiers",
    "Dehumidifiers", "Fans", "Tower Fans", "Pedestal Fans", "Box Fans", "Window Fans",
    "Space Heaters", "Ceramic Heaters", "Oil Filled Heaters", "Infrared Heaters", "Irons",
    "Steam Irons", "Garment Steamers", "Sewing Machines", "Sergers", "Embroidery Machines"
  ]
};

export function generateAllCategories() {
  const allCategories: { name: string; slug: string; icon: string; description: string; parentId?: string }[] = [];
  const seenSlugs = new Set<string>();
  
  mainCategories.forEach((main) => {
    if (!seenSlugs.has(main.slug)) {
      seenSlugs.add(main.slug);
      allCategories.push({
        name: main.name,
        slug: main.slug,
        icon: main.icon,
        description: main.description
      });
    }
  });

  const subCategoryIcons: Record<string, string[]> = {
    "electronics": ["📱", "💻", "🖥️", "🎧", "📷", "🎮", "⌚", "🔌", "💾", "📺"],
    "fashion": ["👕", "👗", "👠", "👜", "🧥", "👔", "👟", "🧢", "👓", "💍"],
    "home-garden": ["🛋️", "🪴", "🛏️", "🍽️", "🪑", "🖼️", "💡", "🧹", "🏡", "🌳"],
    "health-beauty": ["💊", "💄", "🧴", "💅", "🪥", "🧼", "💇", "🌿", "💪", "🧘"],
    "sports-outdoors": ["⚽", "🏀", "🎾", "🏊", "🚴", "⛷️", "🏕️", "🎣", "🏋️", "🥾"],
    "toys-games": ["🧸", "🎲", "🎯", "🧩", "🎪", "🎠", "🪀", "🎨", "🤖", "🎭"],
    "automotive": ["🚗", "🔧", "🛞", "⛽", "🔋", "🚘", "🏎️", "🔩", "🪛", "🚙"],
    "books-media": ["📖", "📕", "📗", "📘", "📙", "🎬", "🎵", "📰", "📚", "🎧"],
    "office-school": ["✏️", "📝", "📎", "📐", "📏", "✂️", "📌", "🖊️", "📒", "🎒"],
    "food-grocery": ["🍎", "🥦", "🍞", "🥛", "🧀", "🍗", "🥩", "🍕", "🍪", "☕"],
    "baby-kids": ["🍼", "👶", "🧒", "🎀", "🚼", "🧒", "👧", "👦", "🎈", "🧸"],
    "pet-supplies": ["🐕", "🐈", "🐦", "🐠", "🐹", "🦜", "🐇", "🦎", "🐾", "🦴"],
    "jewelry-watches": ["💎", "⌚", "💍", "📿", "👑", "🏅", "💫", "✨", "🔶", "💠"],
    "art-crafts": ["🎨", "🖌️", "✂️", "🧵", "🪡", "🎭", "🖼️", "🪆", "🧶", "📐"],
    "musical-instruments": ["🎸", "🎹", "🥁", "🎺", "🎷", "🎻", "🪕", "🎤", "🎶", "🎵"],
    "industrial-scientific": ["🔬", "⚗️", "🔩", "⚙️", "🛠️", "🧪", "📊", "🔭", "🧲", "⚡"],
    "collectibles": ["🏆", "🎖️", "🪙", "📮", "🎭", "🃏", "🎴", "🖼️", "📜", "🗿"],
    "travel-luggage": ["🧳", "✈️", "🎒", "🗺️", "🏖️", "⛺", "🚢", "🏔️", "🌍", "🧭"],
    "garden-patio": ["🌻", "🌷", "🪴", "🏡", "⛱️", "🔥", "🪵", "🌿", "🌳", "🦋"],
    "appliances": ["🍳", "☕", "🧊", "🌀", "🧹", "💨", "🔌", "🍞", "🧴", "❄️"]
  };

  mainCategories.forEach((main) => {
    const subs = subCategories[main.slug] || [];
    const icons = subCategoryIcons[main.slug] || ["📦"];
    
    subs.forEach((subName, index) => {
      const slug = `${main.slug}-${subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
      if (!seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        allCategories.push({
          name: subName,
          slug: slug,
          icon: icons[index % icons.length],
          description: `${subName} in ${main.name}`,
          parentId: main.slug
        });
      }
    });
  });

  return allCategories;
}

const productBrands: Record<string, string[]> = {
  "electronics": ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft", "Google", "Bose", "JBL", "Canon", "Nikon", "GoPro", "DJI", "Logitech", "Razer", "Corsair"],
  "fashion": ["Nike", "Adidas", "Levi's", "H&M", "Zara", "Gucci", "Prada", "Ralph Lauren", "Tommy Hilfiger", "Calvin Klein", "Michael Kors", "Coach", "Versace", "Armani", "Burberry", "Chanel", "Louis Vuitton", "Hermès", "Dior", "Balenciaga"],
  "health-beauty": ["L'Oréal", "Maybelline", "Neutrogena", "Olay", "CeraVe", "The Ordinary", "Clinique", "Estée Lauder", "MAC", "Urban Decay", "Fenty Beauty", "NARS", "Benefit", "Too Faced", "Charlotte Tilbury", "Glossier", "Drunk Elephant", "Tatcha", "SK-II", "La Mer"],
  "home-garden": ["IKEA", "Ashley Furniture", "Wayfair", "West Elm", "Pottery Barn", "Crate & Barrel", "Williams Sonoma", "Restoration Hardware", "CB2", "Room & Board", "Article", "Joybird", "Arhaus", "Ethan Allen", "Thomasville", "La-Z-Boy", "Bassett", "Havertys", "Hooker", "Stanley"],
  "sports-outdoors": ["Nike", "Adidas", "Under Armour", "The North Face", "Patagonia", "Columbia", "REI", "Arc'teryx", "Yeti", "Coleman", "Osprey", "Black Diamond", "Salomon", "Merrell", "Altra", "Brooks", "Asics", "New Balance", "Reebok", "Puma"],
  "appliances": ["Samsung", "LG", "Whirlpool", "KitchenAid", "Bosch", "GE", "Frigidaire", "Maytag", "Kenmore", "Cuisinart", "Ninja", "Vitamix", "Breville", "Instant Pot", "Keurig", "Nespresso", "De'Longhi", "Dyson", "iRobot", "Shark"]
};

const imageUrls = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055uj8a55bd?w=400",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
  "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?w=400",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
];

export function generateProducts(categories: { id: string; slug: string; name: string }[]) {
  const products: any[] = [];
  let productIndex = 0;

  const productData: Record<string, { names: string[]; priceRange: [number, number] }> = {
    "smartphones": { names: ["Pro Max Ultra", "Galaxy S24 Ultra", "Pixel 8 Pro", "OnePlus 12", "Xiaomi 14 Pro", "iPhone 15 Pro", "Samsung A54", "Motorola Edge", "Sony Xperia 1", "Oppo Find X6", "Vivo X100", "Honor Magic 6", "Realme GT5", "Nothing Phone 2", "Asus ROG Phone"], priceRange: [299, 1499] },
    "laptops": { names: ["MacBook Pro 16\"", "Dell XPS 15", "ThinkPad X1 Carbon", "HP Spectre x360", "Asus ZenBook Pro", "Surface Laptop 5", "Razer Blade 15", "LG Gram 17", "Acer Swift X", "MSI Creator 16", "Samsung Galaxy Book", "Lenovo Yoga 9i", "HP Envy 16", "Dell Inspiron 16", "Asus VivoBook Pro"], priceRange: [599, 2999] },
    "headphones": { names: ["AirPods Max", "Sony WH-1000XM5", "Bose 700", "Sennheiser Momentum 4", "Bang & Olufsen H95", "Beats Studio Pro", "Jabra Elite 85t", "Audio-Technica M50x", "Shure AONIC 50", "Focal Bathys", "Audeze Maxwell", "Beyerdynamic DT 770", "AKG K371", "Grado SR325x", "HiFiMan Sundara"], priceRange: [99, 599] },
    "televisions": { names: ["LG OLED C3 65\"", "Samsung QN90C 75\"", "Sony A95L 65\"", "TCL 6-Series 65\"", "Hisense U8K 65\"", "Vizio MQX 75\"", "Philips OLED 808", "Panasonic LZ2000", "Sharp AQUOS 70\"", "Toshiba Fire TV 55\"", "Insignia 4K 50\"", "Samsung Frame 55\"", "LG NanoCell 65\"", "Sony X90L 75\"", "TCL Q7 65\""], priceRange: [399, 3499] },
    "cameras": { names: ["Canon EOS R5", "Sony A7 IV", "Nikon Z8", "Fujifilm X-T5", "Panasonic S5 II", "Olympus OM-5", "Leica Q3", "Hasselblad X2D", "Canon R6 Mark II", "Sony A7R V", "Nikon Z6 III", "Fujifilm GFX 100S", "Panasonic GH6", "Sigma fp L", "Pentax K-3 III"], priceRange: [999, 5999] },
    "tablets": { names: ["iPad Pro 12.9\"", "Samsung Galaxy Tab S9", "Microsoft Surface Pro 9", "iPad Air 5", "Lenovo Tab P12 Pro", "OnePlus Pad", "Xiaomi Pad 6 Pro", "Amazon Fire HD 10", "Google Pixel Tablet", "Huawei MatePad Pro", "Asus ROG Flow Z13", "Samsung Tab S8 Ultra", "iPad Mini 6", "Realme Pad X", "Nokia T21"], priceRange: [199, 1599] },
    "smartwatches": { names: ["Apple Watch Ultra 2", "Samsung Galaxy Watch 6", "Garmin Fenix 7", "Fitbit Sense 2", "Google Pixel Watch 2", "Amazfit GTR 4", "Fossil Gen 6", "TicWatch Pro 5", "Suunto 9 Peak", "Polar Vantage V3", "Coros Pace 3", "Withings ScanWatch", "Mobvoi TicWatch E3", "Huawei Watch GT 4", "OnePlus Watch 2"], priceRange: [149, 899] },
    "gaming-consoles": { names: ["PlayStation 5", "Xbox Series X", "Nintendo Switch OLED", "Steam Deck", "Asus ROG Ally", "PlayStation 5 Slim", "Xbox Series S", "Nintendo Switch Lite", "Logitech G Cloud", "Razer Edge", "MSI Claw", "Lenovo Legion Go", "Ayaneo 2S", "GPD Win 4", "Retroid Pocket 4"], priceRange: [199, 599] },
    "men's-sneakers": { names: ["Nike Air Max 90", "Adidas Ultraboost 22", "New Balance 990v5", "Jordan 1 Retro High", "Puma RS-X", "Asics Gel-Lyte III", "Reebok Classic", "Converse Chuck 70", "Vans Old Skool", "Nike Dunk Low", "Adidas Stan Smith", "New Balance 574", "Jordan 4 Retro", "Nike Air Force 1", "Saucony Shadow 6000"], priceRange: [79, 299] },
    "women's-dresses": { names: ["Floral Maxi Dress", "Little Black Dress", "Wrap Midi Dress", "Cocktail Party Dress", "Summer Sundress", "Evening Gown", "Bodycon Mini Dress", "Shirt Dress", "Sweater Dress", "Slip Dress", "A-Line Dress", "Pleated Midi Dress", "Off-Shoulder Dress", "Blazer Dress", "Lace Dress"], priceRange: [39, 299] },
    "face-serums": { names: ["Vitamin C Brightening Serum", "Hyaluronic Acid Hydrating Serum", "Retinol Anti-Aging Serum", "Niacinamide Pore Minimizing Serum", "Peptide Firming Serum", "Salicylic Acid Acne Serum", "Glycolic Acid Exfoliating Serum", "Bakuchiol Natural Retinol Serum", "Azelaic Acid Clarifying Serum", "Snail Mucin Repair Serum", "Ferulic Acid Antioxidant Serum", "Squalane Moisture Serum", "Centella Calming Serum", "Vitamin E Nourishing Serum", "AHA BHA Peel Serum"], priceRange: [12, 185] },
    "vitamins": { names: ["Multivitamin Complete", "Vitamin D3 5000 IU", "Vitamin C 1000mg", "Vitamin B12 Methylcobalamin", "Omega-3 Fish Oil", "Vitamin E 400 IU", "Vitamin K2 MK-7", "Biotin 10000mcg", "Zinc 50mg", "Magnesium Glycinate", "Iron + Vitamin C", "Calcium + D3", "Vitamin A 10000 IU", "Folic Acid 800mcg", "CoQ10 200mg"], priceRange: [8, 45] },
    "yoga-mats": { names: ["Premium Cork Yoga Mat", "Extra Thick Comfort Mat", "Travel Folding Yoga Mat", "Non-Slip TPE Yoga Mat", "Natural Rubber Yoga Mat", "Alignment Yoga Mat", "Hot Yoga Mat", "Kids Yoga Mat", "Eco-Friendly Jute Mat", "Memory Foam Yoga Mat", "Mandala Design Yoga Mat", "Carrying Strap Yoga Mat", "Double-Sided Yoga Mat", "Antimicrobial Yoga Mat", "Studio Pro Yoga Mat"], priceRange: [19, 129] },
    "dumbbells": { names: ["Adjustable Dumbbell Set 50lb", "Rubber Hex Dumbbells", "Neoprene Coated Dumbbells", "Cast Iron Dumbbells", "Chrome Dumbbells", "Vinyl Dumbbells", "Bowflex SelectTech", "Powerblock Elite", "ATIVAFIT Adjustable", "Core Fitness Adjustable", "Cap Barbell Set", "XMark Rubber Coated", "AmazonBasics Dumbbells", "Rogue Rubber Dumbbells", "REP Fitness Rubber Hex"], priceRange: [29, 499] },
    "coffee-makers": { names: ["Breville Barista Express", "Nespresso Vertuo Plus", "Keurig K-Elite", "Cuisinart PerfecTemp", "Ninja Specialty Coffee", "De'Longhi Magnifica", "Technivorm Moccamaster", "Bonavita Connoisseur", "Oxo Brew 9 Cup", "Hamilton Beach FlexBrew", "Mr. Coffee Optimal Brew", "Bunn Speed Brew", "Braun BrewSense", "Black+Decker 12-Cup", "Zojirushi Fresh Brew"], priceRange: [49, 799] },
    "air-fryers": { names: ["Ninja Foodi XL", "Philips Premium XXL", "Cosori Pro II", "Instant Vortex Plus", "Cuisinart TOA-60", "PowerXL Air Fryer Pro", "Chefman TurboFry", "GoWISE USA 7-Quart", "Dash Compact", "NuWave Brio", "Emeril Lagasse 360", "Aria All-in-One", "Ultrean 6-Quart", "Kalorik Maxx", "Dreo Air Fryer Pro"], priceRange: [59, 299] },
    "robot-vacuums": { names: ["iRobot Roomba j7+", "Roborock S8 Pro Ultra", "Ecovacs Deebot X2", "Shark IQ Robot", "Eufy RoboVac X8", "Neato D10", "Samsung Jet Bot AI+", "Dreame L20 Ultra", "Tineco Floor One S5", "Bissell SpinWave", "Lefant M210", "ILIFE V3s Pro", "Coredy R750", "Yeedi Vac Station", "Narwal Freo"], priceRange: [199, 1499] },
    "dog-food": { names: ["Blue Buffalo Life Protection", "Purina Pro Plan", "Royal Canin Adult", "Hill's Science Diet", "Taste of the Wild", "Wellness Complete Health", "Orijen Original", "Acana Heritage", "Merrick Grain Free", "Nutro Ultra", "Canidae All Life Stages", "Diamond Naturals", "Fromm Family Foods", "Nature's Variety Instinct", "Zignature Limited Ingredient"], priceRange: [29, 89] },
    "cat-food": { names: ["Blue Buffalo Wilderness", "Purina ONE Natural", "Royal Canin Indoor", "Hill's Science Diet Indoor", "Wellness CORE Grain-Free", "Orijen Cat & Kitten", "Acana Grasslands", "Merrick Purrfect Bistro", "Nutro Wholesome Essentials", "Natural Balance L.I.D.", "Instinct Original", "Tiki Cat Born Carnivore", "Fancy Feast Gourmet", "Sheba Perfect Portions", "Friskies Farm Favorites"], priceRange: [19, 69] },
    "diamond-rings": { names: ["Solitaire Diamond Ring", "Halo Diamond Ring", "Three Stone Diamond Ring", "Vintage Art Deco Ring", "Princess Cut Diamond Ring", "Oval Diamond Engagement Ring", "Cushion Cut Diamond Ring", "Emerald Cut Diamond Ring", "Pear Shaped Diamond Ring", "Round Brilliant Diamond Ring", "Marquise Diamond Ring", "Radiant Cut Diamond Ring", "Asscher Cut Diamond Ring", "Heart Shaped Diamond Ring", "Split Shank Diamond Ring"], priceRange: [999, 15999] },
    "acoustic-guitars": { names: ["Martin D-28", "Taylor 814ce", "Gibson J-45", "Fender CD-60S", "Yamaha FG830", "Seagull S6 Original", "Takamine GD20", "Epiphone Hummingbird", "Breedlove Discovery", "Alvarez Artist", "Guild D-40", "Blueridge BR-160", "Recording King RD-328", "Orangewood Oliver", "Cordoba C5"], priceRange: [199, 3999] },
    "action-figures": { names: ["Marvel Legends Spider-Man", "Star Wars Black Series", "DC Multiverse Batman", "Transformers Masterpiece", "G.I. Joe Classified", "Power Rangers Lightning", "WWE Elite Collection", "Dragon Ball Super", "My Hero Academia", "Demon Slayer", "One Piece", "Naruto Anime Heroes", "Pokemon Scale World", "Teenage Mutant Ninja Turtles", "He-Man Masters of Universe"], priceRange: [19, 149] },
    "board-games": { names: ["Catan", "Ticket to Ride", "Pandemic", "Azul", "Wingspan", "7 Wonders", "Codenames", "Splendor", "Terraforming Mars", "Scythe", "Gloomhaven", "Spirit Island", "Root", "Everdell", "Brass Birmingham"], priceRange: [24, 149] },
    "camping-tents": { names: ["REI Co-op Half Dome", "Big Agnes Copper Spur", "MSR Hubba Hubba", "Nemo Dagger", "Kelty Late Start", "Coleman Sundome", "Alps Mountaineering Lynx", "Marmot Tungsten", "North Face Stormbreak", "Eureka Copper Canyon", "Ozark Trail Instant", "Core 6 Person", "Wenzel Klondike", "Teton Sports Mesa", "Naturehike Cloud Up"], priceRange: [79, 599] },
    "motor-oil": { names: ["Mobil 1 Extended Performance", "Castrol Edge Advanced", "Pennzoil Platinum", "Valvoline Full Synthetic", "Royal Purple HMX", "Liqui Moly Leichtlauf", "Shell Rotella T6", "Amsoil Signature Series", "Red Line High Performance", "Lucas Oil Synthetic", "Motul 8100 X-cess", "Total Quartz 9000", "Havoline ProDS", "Quaker State Ultimate", "STP Full Synthetic"], priceRange: [24, 69] }
  };

  const defaultProductData = {
    names: ["Premium Model", "Pro Edition", "Classic Version", "Elite Series", "Standard Model", "Deluxe Set", "Essential Kit", "Professional Grade", "Home Edition", "Advanced System", "Basic Set", "Ultimate Package", "Value Bundle", "Starter Kit", "Complete Collection"],
    priceRange: [19, 299] as [number, number]
  };

  categories.forEach((category) => {
    const categoryKey = category.slug.split('-').slice(-2).join('-') || category.slug;
    const data = productData[categoryKey] || productData[category.slug] || defaultProductData;
    const mainCat = category.slug.split('-')[0];
    const brands = productBrands[mainCat] || productBrands["electronics"];
    
    data.names.forEach((productName, idx) => {
      const brand = brands[idx % brands.length];
      const basePrice = data.priceRange[0] + Math.random() * (data.priceRange[1] - data.priceRange[0]);
      const price = Math.round(basePrice * 100) / 100;
      const originalPrice = Math.round(price * (1 + 0.1 + Math.random() * 0.3) * 100) / 100;
      const rating = (3.5 + Math.random() * 1.5).toFixed(1);
      const reviewCount = Math.floor(50 + Math.random() * 4950);
      const stock = Math.floor(10 + Math.random() * 490);
      
      const slug = `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${productIndex}`;
      
      products.push({
        name: `${brand} ${productName}`,
        slug: slug,
        description: `High-quality ${productName} from ${brand}. ${category.name} - Premium product with excellent performance and durability. Perfect for everyday use with advanced features and modern design.`,
        shortDescription: `${brand} ${productName} - Premium ${category.name}`,
        price: price.toString(),
        originalPrice: originalPrice.toString(),
        categoryId: category.id,
        images: [imageUrls[productIndex % imageUrls.length]],
        stock: stock,
        sku: `SKU-${category.slug.substring(0, 3).toUpperCase()}-${productIndex.toString().padStart(5, '0')}`,
        rating: rating,
        reviewCount: reviewCount,
        isNew: Math.random() > 0.8,
        isBestseller: Math.random() > 0.85,
        isFeatured: Math.random() > 0.9,
        isActive: true,
        tags: [category.name, brand, "Popular", "Top Rated"].slice(0, 3),
        specifications: {
          Brand: brand,
          Category: category.name,
          Warranty: "1 Year",
          "Shipping Weight": `${(0.5 + Math.random() * 5).toFixed(1)} lbs`
        }
      });
      
      productIndex++;
    });
  });

  return products;
}
