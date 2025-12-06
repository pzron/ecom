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

const baseCategories: { name: string; icon: string; iconName: string; gradient: string }[] = [
  { name: "Health Items", icon: "💊", iconName: "Pill", gradient: "from-green-600 to-teal-500" },
  { name: "Cosmetics Items", icon: "💄", iconName: "Sparkles", gradient: "from-pink-600 to-rose-500" },
  { name: "Tea & Coffee", icon: "☕", iconName: "Coffee", gradient: "from-amber-700 to-orange-600" },
  { name: "Hair Oil & Gel", icon: "💆", iconName: "Wind", gradient: "from-yellow-600 to-amber-500" },
  { name: "Consumer Items", icon: "🛒", iconName: "ShoppingCart", gradient: "from-blue-600 to-indigo-500" },
  { name: "Salon & Parlour", icon: "✨", iconName: "Sparkles", gradient: "from-purple-600 to-pink-500" },
  { name: "Electronics", icon: "⚡", iconName: "Zap", gradient: "from-blue-600 to-cyan-500" },
  { name: "Fashion", icon: "👔", iconName: "Shirt", gradient: "from-pink-600 to-rose-500" },
  { name: "Home & Living", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-500" },
  { name: "Sports & Fitness", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-pink-500" },
  { name: "Gaming", icon: "🎮", iconName: "Gamepad2", gradient: "from-violet-600 to-purple-500" },
  { name: "Jewelry & Watches", icon: "💎", iconName: "Watch", gradient: "from-yellow-600 to-amber-500" },
  { name: "Books & Media", icon: "📚", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-500" },
  { name: "Kids & Toys", icon: "🧸", iconName: "Puzzle", gradient: "from-green-500 to-emerald-400" },
  { name: "Automotive", icon: "🚗", iconName: "Car", gradient: "from-gray-600 to-slate-500" },
  { name: "Food & Grocery", icon: "🍔", iconName: "ChefHat", gradient: "from-orange-600 to-red-500" },
  { name: "Appliances", icon: "🔌", iconName: "Zap", gradient: "from-cyan-600 to-blue-500" },
  { name: "Furniture", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-700 to-orange-600" },
  { name: "Outdoor & Garden", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-500" },
  { name: "Pet Supplies", icon: "🐾", iconName: "PawPrint", gradient: "from-orange-600 to-pink-500" },
  { name: "Sports Equipment", icon: "⚽", iconName: "Trophy", gradient: "from-yellow-600 to-orange-500" },
  { name: "Musical Instruments", icon: "🎸", iconName: "Music", gradient: "from-purple-600 to-pink-500" },
  { name: "Art & Craft", icon: "🎨", iconName: "Palette", gradient: "from-rose-600 to-pink-500" },
  { name: "Tools & Hardware", icon: "🔨", iconName: "Wrench", gradient: "from-gray-700 to-slate-600" },
  { name: "Office Supplies", icon: "📎", iconName: "Paperclip", gradient: "from-blue-600 to-indigo-500" },
  { name: "School Supplies", icon: "✏️", iconName: "PencilRuler", gradient: "from-yellow-600 to-amber-500" },
  { name: "Party & Events", icon: "🎉", iconName: "Sparkles", gradient: "from-pink-600 to-purple-500" },
  { name: "Camping & Hiking", icon: "⛺", iconName: "Tent", gradient: "from-green-700 to-emerald-600" },
  { name: "Travel & Luggage", icon: "✈️", iconName: "Plane", gradient: "from-blue-600 to-cyan-500" },
  { name: "Shoes & Footwear", icon: "👟", iconName: "Footprints", gradient: "from-red-600 to-pink-500" },
  { name: "Baby Products", icon: "👶", iconName: "Baby", gradient: "from-pink-400 to-rose-400" },
  { name: "Bags & Wallets", icon: "👜", iconName: "Briefcase", gradient: "from-amber-600 to-yellow-500" },
  { name: "Watches", icon: "⌚", iconName: "Watch", gradient: "from-gray-600 to-zinc-500" },
  { name: "Sunglasses", icon: "🕶️", iconName: "Sun", gradient: "from-amber-500 to-orange-500" },
  { name: "Perfumes", icon: "🌸", iconName: "Flower", gradient: "from-purple-500 to-pink-400" },
  { name: "Skincare", icon: "🧴", iconName: "Droplet", gradient: "from-cyan-400 to-blue-400" },
  { name: "Makeup", icon: "💋", iconName: "Heart", gradient: "from-red-500 to-pink-500" },
  { name: "Haircare", icon: "💇", iconName: "Scissors", gradient: "from-violet-500 to-purple-500" },
  { name: "Oral Care", icon: "🦷", iconName: "Smile", gradient: "from-cyan-500 to-teal-500" },
  { name: "Men's Grooming", icon: "🧔", iconName: "User", gradient: "from-slate-600 to-gray-600" },
  { name: "Women's Fashion", icon: "👗", iconName: "Shirt", gradient: "from-pink-500 to-rose-500" },
  { name: "Men's Fashion", icon: "🤵", iconName: "Shirt", gradient: "from-blue-600 to-indigo-600" },
  { name: "Kids Fashion", icon: "👧", iconName: "Heart", gradient: "from-yellow-400 to-orange-400" },
  { name: "Activewear", icon: "🏃", iconName: "Activity", gradient: "from-green-500 to-teal-500" },
  { name: "Sleepwear", icon: "😴", iconName: "Moon", gradient: "from-indigo-400 to-purple-400" },
  { name: "Swimwear", icon: "🏊", iconName: "Waves", gradient: "from-cyan-500 to-blue-500" },
  { name: "Ethnic Wear", icon: "🪷", iconName: "Sparkles", gradient: "from-orange-500 to-red-500" },
  { name: "Western Wear", icon: "🤠", iconName: "Star", gradient: "from-amber-600 to-yellow-600" },
  { name: "Formal Wear", icon: "👔", iconName: "Briefcase", gradient: "from-gray-700 to-slate-700" },
  { name: "Casual Wear", icon: "👕", iconName: "Shirt", gradient: "from-blue-400 to-cyan-400" },
  { name: "Winter Wear", icon: "🧥", iconName: "Cloud", gradient: "from-slate-500 to-gray-500" },
  { name: "Summer Wear", icon: "☀️", iconName: "Sun", gradient: "from-yellow-500 to-orange-500" },
  { name: "Innerwear", icon: "🩲", iconName: "Heart", gradient: "from-pink-400 to-rose-400" },
  { name: "Socks", icon: "🧦", iconName: "Footprints", gradient: "from-blue-500 to-indigo-500" },
  { name: "Belts", icon: "🎀", iconName: "Circle", gradient: "from-amber-700 to-orange-700" },
  { name: "Ties", icon: "👔", iconName: "Tag", gradient: "from-red-600 to-rose-600" },
  { name: "Scarves", icon: "🧣", iconName: "Wind", gradient: "from-purple-400 to-pink-400" },
  { name: "Hats & Caps", icon: "🧢", iconName: "Crown", gradient: "from-blue-500 to-cyan-500" },
  { name: "Gloves", icon: "🧤", iconName: "Hand", gradient: "from-gray-500 to-slate-500" },
  { name: "Laptops", icon: "💻", iconName: "Laptop", gradient: "from-gray-600 to-zinc-600" },
  { name: "Smartphones", icon: "📱", iconName: "Smartphone", gradient: "from-blue-600 to-indigo-600" },
  { name: "Tablets", icon: "📲", iconName: "Tablet", gradient: "from-purple-500 to-violet-500" },
  { name: "Cameras", icon: "📷", iconName: "Camera", gradient: "from-gray-700 to-slate-700" },
  { name: "Audio", icon: "🎧", iconName: "Headphones", gradient: "from-red-500 to-pink-500" },
  { name: "Wearables", icon: "⌚", iconName: "Watch", gradient: "from-green-500 to-teal-500" },
  { name: "Smart Home", icon: "🏠", iconName: "Home", gradient: "from-blue-500 to-cyan-500" },
  { name: "Computer Accessories", icon: "🖱️", iconName: "Mouse", gradient: "from-gray-500 to-zinc-500" },
  { name: "Mobile Accessories", icon: "🔋", iconName: "Battery", gradient: "from-green-600 to-emerald-600" },
  { name: "Storage Devices", icon: "💾", iconName: "HardDrive", gradient: "from-blue-600 to-indigo-600" },
  { name: "Networking", icon: "📡", iconName: "Wifi", gradient: "from-cyan-600 to-blue-600" },
  { name: "Printers", icon: "🖨️", iconName: "Printer", gradient: "from-gray-600 to-slate-600" },
  { name: "Projectors", icon: "📽️", iconName: "Monitor", gradient: "from-purple-600 to-violet-600" },
  { name: "TV & Video", icon: "📺", iconName: "Tv", gradient: "from-gray-700 to-zinc-700" },
  { name: "Living Room", icon: "🛋️", iconName: "Sofa", gradient: "from-amber-600 to-orange-600" },
  { name: "Bedroom", icon: "🛏️", iconName: "Bed", gradient: "from-indigo-500 to-purple-500" },
  { name: "Kitchen", icon: "🍳", iconName: "ChefHat", gradient: "from-orange-500 to-red-500" },
  { name: "Bathroom", icon: "🛁", iconName: "Droplet", gradient: "from-cyan-500 to-blue-500" },
  { name: "Dining", icon: "🍽️", iconName: "Utensils", gradient: "from-amber-500 to-yellow-500" },
  { name: "Lighting", icon: "💡", iconName: "Lightbulb", gradient: "from-yellow-500 to-orange-500" },
  { name: "Decor", icon: "🖼️", iconName: "Frame", gradient: "from-pink-500 to-rose-500" },
  { name: "Storage", icon: "📦", iconName: "Package", gradient: "from-amber-700 to-orange-700" },
  { name: "Cleaning", icon: "🧹", iconName: "Sparkles", gradient: "from-cyan-500 to-teal-500" },
  { name: "Laundry", icon: "🧺", iconName: "Shirt", gradient: "from-blue-500 to-indigo-500" },
  { name: "Cookware", icon: "🍲", iconName: "Flame", gradient: "from-orange-600 to-red-600" },
  { name: "Bakeware", icon: "🧁", iconName: "Cake", gradient: "from-pink-400 to-rose-400" },
  { name: "Tableware", icon: "🍴", iconName: "Utensils", gradient: "from-gray-500 to-slate-500" },
  { name: "Drinkware", icon: "🥤", iconName: "Cup", gradient: "from-cyan-400 to-blue-400" },
  { name: "Food Storage", icon: "🥡", iconName: "Box", gradient: "from-green-500 to-teal-500" },
  { name: "Small Appliances", icon: "🔌", iconName: "Plug", gradient: "from-gray-600 to-zinc-600" },
  { name: "Large Appliances", icon: "🧊", iconName: "Refrigerator", gradient: "from-blue-600 to-indigo-600" },
  { name: "Yoga & Pilates", icon: "🧘", iconName: "Heart", gradient: "from-purple-500 to-pink-500" },
  { name: "Gym Equipment", icon: "💪", iconName: "Dumbbell", gradient: "from-red-600 to-orange-600" },
  { name: "Running", icon: "🏃", iconName: "Activity", gradient: "from-green-500 to-teal-500" },
  { name: "Cycling", icon: "🚴", iconName: "Bike", gradient: "from-blue-500 to-cyan-500" },
  { name: "Swimming", icon: "🏊", iconName: "Waves", gradient: "from-cyan-500 to-blue-500" },
  { name: "Team Sports", icon: "⚽", iconName: "Trophy", gradient: "from-green-600 to-emerald-600" },
  { name: "Racket Sports", icon: "🎾", iconName: "Target", gradient: "from-yellow-500 to-orange-500" },
  { name: "Golf", icon: "⛳", iconName: "Flag", gradient: "from-green-500 to-teal-500" },
  { name: "Fishing", icon: "🎣", iconName: "Fish", gradient: "from-blue-600 to-indigo-600" },
  { name: "Hunting", icon: "🎯", iconName: "Target", gradient: "from-amber-700 to-orange-700" },
  { name: "Winter Sports", icon: "⛷️", iconName: "Snowflake", gradient: "from-cyan-400 to-blue-400" },
  { name: "Water Sports", icon: "🏄", iconName: "Waves", gradient: "from-blue-500 to-cyan-500" },
  { name: "Martial Arts", icon: "🥋", iconName: "Shield", gradient: "from-red-600 to-rose-600" },
  { name: "Dog Supplies", icon: "🐕", iconName: "Heart", gradient: "from-amber-500 to-orange-500" },
  { name: "Cat Supplies", icon: "🐱", iconName: "Heart", gradient: "from-purple-400 to-pink-400" },
  { name: "Bird Supplies", icon: "🐦", iconName: "Bird", gradient: "from-yellow-500 to-amber-500" },
  { name: "Fish Supplies", icon: "🐟", iconName: "Fish", gradient: "from-cyan-500 to-blue-500" },
  { name: "Small Pet Supplies", icon: "🐹", iconName: "Heart", gradient: "from-pink-400 to-rose-400" },
  { name: "Reptile Supplies", icon: "🦎", iconName: "Leaf", gradient: "from-green-600 to-emerald-600" },
  { name: "Fiction Books", icon: "📖", iconName: "Book", gradient: "from-purple-500 to-violet-500" },
  { name: "Non-Fiction Books", icon: "📕", iconName: "BookOpen", gradient: "from-blue-600 to-indigo-600" },
  { name: "Children Books", icon: "📚", iconName: "Book", gradient: "from-yellow-400 to-orange-400" },
  { name: "Comics & Manga", icon: "📓", iconName: "Book", gradient: "from-red-500 to-pink-500" },
  { name: "Educational", icon: "🎓", iconName: "GraduationCap", gradient: "from-blue-500 to-cyan-500" },
  { name: "Stationery", icon: "✏️", iconName: "Pencil", gradient: "from-yellow-500 to-amber-500" },
  { name: "Movies & Shows", icon: "🎬", iconName: "Film", gradient: "from-red-600 to-rose-600" },
  { name: "Music Albums", icon: "🎵", iconName: "Music", gradient: "from-purple-600 to-pink-600" },
  { name: "Video Games", icon: "🎮", iconName: "Gamepad", gradient: "from-violet-600 to-purple-600" },
  { name: "Board Games", icon: "🎲", iconName: "Dice", gradient: "from-green-500 to-teal-500" },
  { name: "Puzzles", icon: "🧩", iconName: "Puzzle", gradient: "from-blue-500 to-indigo-500" },
  { name: "Snacks", icon: "🍿", iconName: "Cookie", gradient: "from-yellow-500 to-orange-500" },
  { name: "Beverages", icon: "🥤", iconName: "Cup", gradient: "from-cyan-500 to-blue-500" },
  { name: "Breakfast", icon: "🥞", iconName: "Coffee", gradient: "from-amber-500 to-yellow-500" },
  { name: "Dairy", icon: "🥛", iconName: "Milk", gradient: "from-blue-300 to-cyan-300" },
  { name: "Bakery", icon: "🍞", iconName: "Croissant", gradient: "from-amber-600 to-orange-600" },
  { name: "Frozen Foods", icon: "🧊", iconName: "Snowflake", gradient: "from-cyan-500 to-blue-500" },
  { name: "Canned Foods", icon: "🥫", iconName: "Package", gradient: "from-red-500 to-orange-500" },
  { name: "Condiments", icon: "🧂", iconName: "Droplet", gradient: "from-amber-500 to-yellow-500" },
  { name: "Organic Foods", icon: "🥬", iconName: "Leaf", gradient: "from-green-500 to-emerald-500" },
  { name: "International Foods", icon: "🌍", iconName: "Globe", gradient: "from-blue-500 to-indigo-500" },
  { name: "Car Care", icon: "🚘", iconName: "Car", gradient: "from-blue-600 to-indigo-600" },
  { name: "Car Electronics", icon: "📻", iconName: "Radio", gradient: "from-gray-600 to-zinc-600" },
  { name: "Car Interior", icon: "🪑", iconName: "Armchair", gradient: "from-amber-600 to-orange-600" },
  { name: "Car Exterior", icon: "🚗", iconName: "Car", gradient: "from-red-600 to-rose-600" },
  { name: "Motorcycle", icon: "🏍️", iconName: "Bike", gradient: "from-gray-700 to-slate-700" },
  { name: "Bicycle", icon: "🚲", iconName: "Bike", gradient: "from-green-500 to-teal-500" },
  { name: "Tires & Wheels", icon: "🛞", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Car Parts", icon: "⚙️", iconName: "Settings", gradient: "from-slate-600 to-gray-600" },
  { name: "Tents", icon: "⛺", iconName: "Tent", gradient: "from-green-600 to-emerald-600" },
  { name: "Sleeping Gear", icon: "🛏️", iconName: "Moon", gradient: "from-indigo-500 to-purple-500" },
  { name: "Backpacks", icon: "🎒", iconName: "Backpack", gradient: "from-orange-500 to-red-500" },
  { name: "Outdoor Cooking", icon: "🔥", iconName: "Flame", gradient: "from-red-600 to-orange-600" },
  { name: "Navigation", icon: "🧭", iconName: "Compass", gradient: "from-blue-500 to-cyan-500" },
  { name: "Outdoor Lighting", icon: "🔦", iconName: "Flashlight", gradient: "from-yellow-500 to-amber-500" },
  { name: "Climbing Gear", icon: "🧗", iconName: "Mountain", gradient: "from-gray-600 to-slate-600" },
  { name: "Painting", icon: "🖌️", iconName: "Brush", gradient: "from-blue-500 to-indigo-500" },
  { name: "Drawing", icon: "✏️", iconName: "Pencil", gradient: "from-gray-500 to-slate-500" },
  { name: "Sculpting", icon: "🗿", iconName: "Box", gradient: "from-amber-600 to-orange-600" },
  { name: "Sewing & Knitting", icon: "🧵", iconName: "Scissors", gradient: "from-pink-500 to-rose-500" },
  { name: "Jewelry Making", icon: "💍", iconName: "Diamond", gradient: "from-purple-500 to-violet-500" },
  { name: "Scrapbooking", icon: "📔", iconName: "Book", gradient: "from-pink-400 to-rose-400" },
  { name: "Candle Making", icon: "🕯️", iconName: "Flame", gradient: "from-amber-500 to-yellow-500" },
  { name: "Pottery", icon: "🏺", iconName: "Container", gradient: "from-amber-700 to-orange-700" },
  { name: "Woodworking", icon: "🪵", iconName: "Tree", gradient: "from-amber-800 to-orange-800" },
  { name: "Power Tools", icon: "🔌", iconName: "Plug", gradient: "from-red-600 to-orange-600" },
  { name: "Hand Tools", icon: "🔧", iconName: "Wrench", gradient: "from-gray-600 to-zinc-600" },
  { name: "Measuring Tools", icon: "📏", iconName: "Ruler", gradient: "from-blue-500 to-indigo-500" },
  { name: "Safety Equipment", icon: "🦺", iconName: "Shield", gradient: "from-yellow-500 to-orange-500" },
  { name: "Plumbing", icon: "🚰", iconName: "Droplet", gradient: "from-blue-600 to-cyan-600" },
  { name: "Electrical", icon: "⚡", iconName: "Zap", gradient: "from-yellow-500 to-amber-500" },
  { name: "Paint & Supplies", icon: "🎨", iconName: "Palette", gradient: "from-purple-500 to-pink-500" },
  { name: "Fasteners", icon: "🔩", iconName: "Wrench", gradient: "from-gray-500 to-slate-500" },
  { name: "Garden Plants", icon: "🌱", iconName: "Sprout", gradient: "from-green-500 to-emerald-500" },
  { name: "Seeds & Bulbs", icon: "🌰", iconName: "Leaf", gradient: "from-amber-600 to-orange-600" },
  { name: "Soil & Fertilizers", icon: "🪴", iconName: "Flower", gradient: "from-amber-700 to-orange-700" },
  { name: "Garden Decor", icon: "🏡", iconName: "Home", gradient: "from-green-600 to-teal-600" },
  { name: "Patio Furniture", icon: "🪑", iconName: "Armchair", gradient: "from-amber-600 to-yellow-600" },
  { name: "Grills & Outdoor Cooking", icon: "🍖", iconName: "Flame", gradient: "from-red-600 to-orange-600" },
  { name: "Pool & Spa", icon: "🏊", iconName: "Waves", gradient: "from-cyan-500 to-blue-500" },
  { name: "Pest Control", icon: "🐜", iconName: "Bug", gradient: "from-red-500 to-rose-500" },
  { name: "Watering", icon: "💧", iconName: "Droplet", gradient: "from-blue-500 to-cyan-500" },
  { name: "Birthday Party", icon: "🎂", iconName: "Cake", gradient: "from-pink-500 to-rose-500" },
  { name: "Wedding", icon: "💒", iconName: "Heart", gradient: "from-pink-400 to-rose-400" },
  { name: "Holiday Decorations", icon: "🎄", iconName: "Star", gradient: "from-green-600 to-red-500" },
  { name: "Gift Wrapping", icon: "🎁", iconName: "Gift", gradient: "from-red-500 to-pink-500" },
  { name: "Balloons", icon: "🎈", iconName: "Circle", gradient: "from-red-400 to-pink-400" },
  { name: "Costumes", icon: "🎭", iconName: "Mask", gradient: "from-purple-500 to-violet-500" },
  { name: "Medical Supplies", icon: "🏥", iconName: "Cross", gradient: "from-red-500 to-rose-500" },
  { name: "First Aid", icon: "🩹", iconName: "Plus", gradient: "from-red-500 to-orange-500" },
  { name: "Mobility Aids", icon: "🦽", iconName: "Accessibility", gradient: "from-blue-500 to-indigo-500" },
  { name: "Vitamins & Supplements", icon: "💊", iconName: "Pill", gradient: "from-green-500 to-teal-500" },
  { name: "Herbal Products", icon: "🌿", iconName: "Leaf", gradient: "from-green-600 to-emerald-600" },
  { name: "Aromatherapy", icon: "🕯️", iconName: "Flame", gradient: "from-purple-400 to-pink-400" },
  { name: "Massage & Relaxation", icon: "💆", iconName: "Heart", gradient: "from-cyan-500 to-teal-500" },
  { name: "Fitness Trackers", icon: "📊", iconName: "Activity", gradient: "from-green-500 to-teal-500" },
  { name: "Nursery", icon: "👶", iconName: "Baby", gradient: "from-pink-400 to-rose-400" },
  { name: "Baby Feeding", icon: "🍼", iconName: "Cup", gradient: "from-blue-400 to-cyan-400" },
  { name: "Baby Care", icon: "🧴", iconName: "Droplet", gradient: "from-pink-300 to-rose-300" },
  { name: "Baby Safety", icon: "🔒", iconName: "Lock", gradient: "from-green-500 to-teal-500" },
  { name: "Baby Clothing", icon: "👕", iconName: "Shirt", gradient: "from-yellow-400 to-orange-400" },
  { name: "Strollers & Carriers", icon: "🚼", iconName: "Baby", gradient: "from-gray-500 to-slate-500" },
  { name: "Diapering", icon: "🧷", iconName: "Pin", gradient: "from-blue-400 to-indigo-400" },
  { name: "Baby Toys", icon: "🧸", iconName: "Heart", gradient: "from-pink-400 to-rose-400" },
  { name: "Maternity", icon: "🤰", iconName: "Heart", gradient: "from-pink-500 to-rose-500" },
  { name: "Suitcases", icon: "🧳", iconName: "Briefcase", gradient: "from-gray-600 to-slate-600" },
  { name: "Travel Accessories", icon: "🎫", iconName: "Ticket", gradient: "from-blue-500 to-indigo-500" },
  { name: "Travel Electronics", icon: "🔌", iconName: "Plug", gradient: "from-gray-600 to-zinc-600" },
  { name: "Travel Comfort", icon: "😴", iconName: "Moon", gradient: "from-indigo-400 to-purple-400" },
  { name: "Travel Security", icon: "🔐", iconName: "Lock", gradient: "from-red-500 to-rose-500" },
  { name: "Gift Cards", icon: "💳", iconName: "CreditCard", gradient: "from-purple-500 to-pink-500" },
  { name: "Seasonal", icon: "🌸", iconName: "Flower", gradient: "from-pink-400 to-rose-400" },
  { name: "Clearance", icon: "🏷️", iconName: "Tag", gradient: "from-red-600 to-rose-600" },
  { name: "New Arrivals", icon: "✨", iconName: "Sparkles", gradient: "from-yellow-500 to-orange-500" },
  { name: "Best Sellers", icon: "🏆", iconName: "Trophy", gradient: "from-yellow-600 to-amber-600" },
  { name: "Trending", icon: "📈", iconName: "TrendingUp", gradient: "from-green-500 to-teal-500" },
  { name: "Eco Friendly", icon: "♻️", iconName: "Recycle", gradient: "from-green-600 to-emerald-600" },
  { name: "Handmade", icon: "✋", iconName: "Hand", gradient: "from-amber-500 to-orange-500" },
  { name: "Luxury", icon: "💎", iconName: "Diamond", gradient: "from-purple-600 to-violet-600" },
  { name: "Budget Friendly", icon: "💰", iconName: "DollarSign", gradient: "from-green-500 to-teal-500" },
  { name: "Premium", icon: "⭐", iconName: "Star", gradient: "from-yellow-500 to-amber-500" },
  { name: "Limited Edition", icon: "🎖️", iconName: "Award", gradient: "from-purple-500 to-pink-500" },
  { name: "Subscription Boxes", icon: "📦", iconName: "Package", gradient: "from-pink-500 to-rose-500" },
  { name: "Digital Products", icon: "💿", iconName: "Disc", gradient: "from-blue-500 to-indigo-500" },
  { name: "Services", icon: "🛠️", iconName: "Wrench", gradient: "from-gray-600 to-slate-600" },
  { name: "Rental", icon: "🔄", iconName: "RefreshCw", gradient: "from-cyan-500 to-blue-500" },
  { name: "Refurbished", icon: "🔧", iconName: "Wrench", gradient: "from-green-600 to-teal-600" },
  { name: "Vintage", icon: "🕰️", iconName: "Clock", gradient: "from-amber-700 to-orange-700" },
  { name: "Antiques", icon: "🏛️", iconName: "Building", gradient: "from-amber-800 to-orange-800" },
  { name: "Collectibles", icon: "🎯", iconName: "Target", gradient: "from-red-500 to-rose-500" },
  { name: "Memorabilia", icon: "🏅", iconName: "Medal", gradient: "from-yellow-600 to-amber-600" },
  { name: "Coins & Stamps", icon: "🪙", iconName: "Circle", gradient: "from-yellow-500 to-amber-500" },
  { name: "Sports Cards", icon: "🃏", iconName: "Square", gradient: "from-blue-500 to-indigo-500" },
  { name: "Action Figures", icon: "🦸", iconName: "User", gradient: "from-red-500 to-orange-500" },
  { name: "Model Kits", icon: "🛩️", iconName: "Plane", gradient: "from-gray-600 to-slate-600" },
  { name: "Drones", icon: "🚁", iconName: "Send", gradient: "from-blue-600 to-cyan-600" },
  { name: "RC Vehicles", icon: "🚙", iconName: "Car", gradient: "from-red-500 to-orange-500" },
  { name: "Telescopes", icon: "🔭", iconName: "Eye", gradient: "from-indigo-600 to-purple-600" },
  { name: "Microscopes", icon: "🔬", iconName: "Search", gradient: "from-cyan-600 to-blue-600" },
  { name: "Science Kits", icon: "⚗️", iconName: "Flask", gradient: "from-purple-500 to-pink-500" },
  { name: "Robotics", icon: "🤖", iconName: "Bot", gradient: "from-gray-600 to-zinc-600" },
  { name: "3D Printing", icon: "🖨️", iconName: "Printer", gradient: "from-blue-500 to-indigo-500" },
  { name: "VR & AR", icon: "🥽", iconName: "Glasses", gradient: "from-purple-600 to-violet-600" },
  { name: "Smart Watches", icon: "⌚", iconName: "Watch", gradient: "from-gray-600 to-slate-600" },
  { name: "Fitness Equipment", icon: "🏋️", iconName: "Dumbbell", gradient: "from-red-600 to-orange-600" },
  { name: "Recovery & Therapy", icon: "🩺", iconName: "Heart", gradient: "from-cyan-500 to-teal-500" },
  { name: "Nutrition", icon: "🥗", iconName: "Salad", gradient: "from-green-500 to-emerald-500" },
  { name: "Weight Management", icon: "⚖️", iconName: "Scale", gradient: "from-blue-500 to-cyan-500" },
  { name: "Sports Nutrition", icon: "🥤", iconName: "Cup", gradient: "from-orange-500 to-red-500" },
  { name: "Personal Care Appliances", icon: "💇", iconName: "Scissors", gradient: "from-pink-500 to-rose-500" },
  { name: "Bath & Body", icon: "🛁", iconName: "Droplet", gradient: "from-cyan-400 to-blue-400" },
  { name: "Fragrances", icon: "🌺", iconName: "Flower", gradient: "from-purple-400 to-pink-400" },
  { name: "Nail Care", icon: "💅", iconName: "Heart", gradient: "from-pink-500 to-rose-500" },
  { name: "Dental Care", icon: "🦷", iconName: "Smile", gradient: "from-cyan-500 to-teal-500" },
  { name: "Eye Care", icon: "👁️", iconName: "Eye", gradient: "from-blue-500 to-indigo-500" },
  { name: "Sun Care", icon: "☀️", iconName: "Sun", gradient: "from-yellow-500 to-orange-500" },
  { name: "Deodorants", icon: "🧴", iconName: "Droplet", gradient: "from-cyan-500 to-blue-500" },
  { name: "Shaving", icon: "🪒", iconName: "Scissors", gradient: "from-gray-600 to-slate-600" },
  { name: "Hair Styling", icon: "💇", iconName: "Scissors", gradient: "from-purple-500 to-pink-500" },
  { name: "Hair Color", icon: "🎨", iconName: "Palette", gradient: "from-pink-500 to-rose-500" },
  { name: "Hair Removal", icon: "✨", iconName: "Sparkles", gradient: "from-pink-400 to-rose-400" },
  { name: "Meditation", icon: "🧘", iconName: "Heart", gradient: "from-purple-500 to-violet-500" },
  { name: "Mindfulness", icon: "🕊️", iconName: "Bird", gradient: "from-cyan-400 to-blue-400" },
  { name: "Sleep Aids", icon: "😴", iconName: "Moon", gradient: "from-indigo-500 to-purple-500" },
  { name: "Stress Relief", icon: "🧘", iconName: "Heart", gradient: "from-green-500 to-teal-500" },
  { name: "Energy & Focus", icon: "⚡", iconName: "Zap", gradient: "from-yellow-500 to-orange-500" },
  { name: "Immunity", icon: "🛡️", iconName: "Shield", gradient: "from-green-600 to-emerald-600" },
  { name: "Digestive Health", icon: "🫃", iconName: "Heart", gradient: "from-green-500 to-teal-500" },
  { name: "Joint Health", icon: "🦴", iconName: "Bone", gradient: "from-amber-600 to-orange-600" },
  { name: "Heart Health", icon: "❤️", iconName: "Heart", gradient: "from-red-500 to-rose-500" },
  { name: "Brain Health", icon: "🧠", iconName: "Brain", gradient: "from-purple-500 to-pink-500" },
  { name: "Women's Health", icon: "👩", iconName: "User", gradient: "from-pink-500 to-rose-500" },
  { name: "Men's Health", icon: "👨", iconName: "User", gradient: "from-blue-600 to-indigo-600" },
  { name: "Senior Health", icon: "👴", iconName: "User", gradient: "from-gray-500 to-slate-500" },
  { name: "Kids Health", icon: "👧", iconName: "Heart", gradient: "from-yellow-400 to-orange-400" },
];

function generateCategories(): Category[] {
  const generatedCategories: Category[] = [];
  const usedSlugs = new Set<string>();
  
  for (const base of baseCategories) {
    const slug = base.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    if (!usedSlugs.has(slug)) {
      usedSlugs.add(slug);
      generatedCategories.push({
        name: base.name,
        slug: slug,
        icon: base.icon,
        iconName: base.iconName,
        gradient: base.gradient,
      });
    }
  }
  
  return generatedCategories;
}

export const categories: Category[] = generateCategories();

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

const productAdjectives = [
  "Premium", "Professional", "Advanced", "Ultra", "Pro", "Elite", "Deluxe", "Supreme", "Essential", "Classic",
  "Modern", "Luxury", "Natural", "Organic", "Pure", "Fresh", "Smart", "Compact", "Portable", "Wireless",
  "Digital", "Heavy-Duty", "Lightweight", "Ergonomic", "Adjustable", "Foldable", "Rechargeable", "Waterproof",
  "Stainless", "Durable", "Extra", "Multi-Purpose", "High-Performance", "Quick", "Instant", "Express",
  "Complete", "Full", "Mini", "Mega", "Super", "Extreme", "Ultimate", "Maximum", "Intense", "Gentle",
  "Soft", "Strong", "Powerful", "Quiet", "Silent", "Fast", "Slow", "Long-Lasting", "Extended", "Enhanced"
];

const productNouns: Record<string, string[]> = {
  "health": ["Supplements", "Vitamins", "Capsules", "Tablets", "Powder", "Drops", "Syrup", "Gel", "Cream", "Oil", "Extract", "Formula", "Complex", "Blend", "Mix", "Solution", "Spray", "Balm", "Patch", "Strips"],
  "beauty": ["Cream", "Serum", "Lotion", "Gel", "Mask", "Scrub", "Cleanser", "Toner", "Moisturizer", "Treatment", "Essence", "Mist", "Spray", "Oil", "Balm", "Butter", "Polish", "Primer", "Foundation", "Concealer"],
  "fashion": ["Shirt", "Pants", "Dress", "Skirt", "Jacket", "Coat", "Sweater", "Hoodie", "Top", "Blouse", "Cardigan", "Blazer", "Suit", "Shorts", "Jeans", "Leggings", "Scarf", "Hat", "Belt", "Tie"],
  "electronics": ["Device", "Gadget", "Player", "Speaker", "Headphones", "Charger", "Cable", "Adapter", "Hub", "Stand", "Mount", "Case", "Cover", "Screen", "Display", "Controller", "Keyboard", "Mouse", "Camera", "Lens"],
  "home": ["Set", "Kit", "Pack", "Bundle", "Collection", "Organizer", "Holder", "Rack", "Stand", "Shelf", "Box", "Container", "Basket", "Tray", "Mat", "Cover", "Pad", "Cushion", "Pillow", "Blanket"],
  "sports": ["Equipment", "Gear", "Set", "Kit", "Ball", "Racket", "Bat", "Gloves", "Shoes", "Boots", "Helmet", "Pads", "Guard", "Bag", "Mat", "Bench", "Bar", "Weights", "Band", "Rope"],
  "food": ["Mix", "Blend", "Pack", "Set", "Box", "Jar", "Bottle", "Can", "Bag", "Packet", "Tin", "Container", "Sachet", "Tube", "Pouch", "Bar", "Snack", "Treat", "Spread", "Sauce"],
  "tools": ["Set", "Kit", "Tool", "Machine", "Device", "Equipment", "Drill", "Saw", "Hammer", "Wrench", "Pliers", "Screwdriver", "Level", "Tape", "Clamp", "Vise", "Sander", "Grinder", "Cutter", "Blade"],
  "pets": ["Food", "Treats", "Toy", "Bed", "Bowl", "Collar", "Leash", "Harness", "Carrier", "Crate", "Cage", "Tank", "Brush", "Shampoo", "Medicine", "Supplement", "Feeder", "Fountain", "Litter", "Pad"],
  "baby": ["Set", "Kit", "Pack", "Bottle", "Cup", "Bowl", "Spoon", "Bib", "Blanket", "Clothes", "Diaper", "Wipes", "Cream", "Lotion", "Shampoo", "Toy", "Rattle", "Mobile", "Monitor", "Carrier"],
  "office": ["Set", "Kit", "Pack", "Pen", "Pencil", "Marker", "Highlighter", "Notebook", "Folder", "Binder", "Stapler", "Tape", "Scissors", "Ruler", "Calculator", "Desk", "Chair", "Lamp", "Organizer", "Holder"],
  "outdoor": ["Set", "Kit", "Gear", "Equipment", "Tent", "Bag", "Pack", "Mat", "Chair", "Table", "Grill", "Cooler", "Lantern", "Flashlight", "Knife", "Compass", "Map", "Rope", "Net", "Pole"],
};

const categoryImageUrls = [
  "https://myvertexbd.com/image/thumb/68d6d3bd6bf3a.webp",
  "https://myvertexbd.com/image/thumb/68d6d4cb6df63.webp",
  "https://myvertexbd.com/image/thumb/68d6d4ea36806.webp",
  "https://myvertexbd.com/image/thumb/66c4ade538f4c.webp",
  "https://myvertexbd.com/image/thumb/68d6d56259e99.webp",
  "https://myvertexbd.com/image/thumb/68d6d77169f44.webp",
  "https://myvertexbd.com/image/thumb/68d6d7da83eda.webp",
  "https://myvertexbd.com/image/thumb/68d6d9193c50c.webp",
  "https://myvertexbd.com/image/thumb/690a66b9db934.webp",
  "https://myvertexbd.com/image/thumb/68d6d995e21b6.webp",
  "https://myvertexbd.com/image/thumb/690a6bcdb017f.webp",
  "https://myvertexbd.com/image/thumb/68d6d9cabed35.webp",
  "https://myvertexbd.com/image/thumb/68d6d954ae115.webp",
  "https://myvertexbd.com/image/thumb/68d6d93e99754.webp",
  "https://myvertexbd.com/image/thumb/68d6d841963e8.webp",
  "https://myvertexbd.com/image/thumb/68d6d8e53ad25.webp",
  "https://myvertexbd.com/image/thumb/68d6d90105b42.webp",
  "https://myvertexbd.com/image/thumb/68d6d8caa4e21.webp",
  "https://myvertexbd.com/image/thumb/68d6d8aa48e76.webp",
  "https://myvertexbd.com/image/thumb/68d6da2649a6d.webp",
  "https://myvertexbd.com/image/thumb/68d6da163b1b4.webp",
  "https://myvertexbd.com/image/thumb/68d6d3a5499b7.webp",
  "https://myvertexbd.com/image/thumb/68d6d440c2349.webp",
  "https://myvertexbd.com/image/thumb/68d6d72d5ab24.webp",
  "https://myvertexbd.com/image/thumb/68d6d120d0111.webp",
  "https://myvertexbd.com/image/thumb/68d6d7427478f.webp",
  "https://myvertexbd.com/image/thumb/68d6d4546e0c2.webp",
  "https://myvertexbd.com/image/thumb/68d6d6ef05802.webp",
  "https://myvertexbd.com/image/thumb/690a6bb54dd78.webp",
  "https://myvertexbd.com/image/thumb/6847f76ebdcfc.png",
  "https://myvertexbd.com/image/thumb/68d6d37765824.webp",
  "https://myvertexbd.com/image/thumb/68d6b6216578c.webp",
  "https://myvertexbd.com/image/thumb/68d6d784ad3e7.webp",
  "https://myvertexbd.com/image/thumb/68d6d06953c47.webp",
  "https://myvertexbd.com/image/thumb/68d6d831c7640.webp",
  "https://myvertexbd.com/image/thumb/6879668c391e8.webp",
  "https://myvertexbd.com/image/thumb/680c8b6a2429d.webp",
  "https://myvertexbd.com/image/thumb/6879655a73853.webp",
  "https://myvertexbd.com/image/thumb/68d6d9e35e446.webp",
  "https://myvertexbd.com/image/thumb/68d6d1536d28b.webp",
  "https://myvertexbd.com/image/thumb/66c4ae610bbc3.webp",
  "https://myvertexbd.com/image/thumb/68d6d7c78d66b.webp",
  "https://myvertexbd.com/image/thumb/66c78909d09ad.webp",
  "https://myvertexbd.com/image/thumb/68d6d75e6cf7a.webp",
  "https://myvertexbd.com/image/thumb/68d6d4afe0d42.webp",
  "https://myvertexbd.com/image/thumb/68d6da3d81535.webp",
  "https://myvertexbd.com/image/thumb/68d6d1ff4589d.webp",
  "https://myvertexbd.com/image/thumb/66c780feed14b.webp",
  "https://myvertexbd.com/image/thumb/68d6d80b91038.webp",
  "https://myvertexbd.com/image/thumb/68d6d5a271811.webp",
  "https://myvertexbd.com/image/thumb/68d6d3ff74c7b.webp",
  "https://myvertexbd.com/image/thumb/66c77dc6f2f9d.png",
  "https://myvertexbd.com/image/thumb/66c77b9cbb7b7.png",
  "https://myvertexbd.com/image/thumb/68d6d418eacdf.webp",
  "https://myvertexbd.com/image/thumb/66c779384ef93.webp",
  "https://myvertexbd.com/image/thumb/66c77fb6c71b6.png",
  "https://myvertexbd.com/image/thumb/66c77ebcc7d49.png",
  "https://myvertexbd.com/image/thumb/66c780261a986.png",
  "https://myvertexbd.com/image/thumb/68d6da6b6d0cd.webp",
  "https://myvertexbd.com/image/thumb/68d6d3eb0469c.webp",
  "https://myvertexbd.com/image/thumb/68d6d1899306c.webp",
  "https://myvertexbd.com/image/thumb/68d6d7153aef2.webp",
  "https://myvertexbd.com/image/thumb/66c77f80820be.png",
  "https://myvertexbd.com/image/thumb/66c7798ea804d.webp",
  "https://myvertexbd.com/image/thumb/68d6d6a7567cd.webp",
  "https://myvertexbd.com/image/category/67628dd94b90f.webp",
  "https://myvertexbd.com/image/category/66c78c111bb2b.webp",
  "https://myvertexbd.com/image/category/6331c4662f487.webp",
  "https://myvertexbd.com/image/category/62fb710457c8a.webp",
  "https://myvertexbd.com/image/category/62fb70c13fd09.webp",
  "https://myvertexbd.com/image/category/66c777c88f197.webp",
];

const vendors = [
  "Premium Shop", "Quality Store", "Elite Traders", "Express Market", "Global Mart",
  "Super Store", "Best Buy", "Smart Shop", "Value Store", "Top Quality",
  "Metro Retail", "City Supplies", "Prime Goods", "Urban Market", "Fresh Direct",
  "Wholesale Hub", "Retail Plus", "Discount Center", "Mega Store", "Daily Deals",
  "Online Plus", "Quick Ship", "Flash Store", "Direct Supply", "Market Pro",
  "Shop Central", "Trade Hub", "Retail King", "Supply Chain", "Vendor Direct"
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

function getCategoryType(categorySlug: string): string {
  const slug = categorySlug.toLowerCase();
  if (slug.includes("health") || slug.includes("vitamin") || slug.includes("medical") || slug.includes("supplement")) return "health";
  if (slug.includes("cosmetic") || slug.includes("beauty") || slug.includes("skin") || slug.includes("makeup") || slug.includes("hair") || slug.includes("nail") || slug.includes("fragrance") || slug.includes("perfume")) return "beauty";
  if (slug.includes("fashion") || slug.includes("wear") || slug.includes("clothing") || slug.includes("dress") || slug.includes("shirt") || slug.includes("sock") || slug.includes("belt") || slug.includes("tie") || slug.includes("scarf") || slug.includes("hat") || slug.includes("glove")) return "fashion";
  if (slug.includes("electronic") || slug.includes("laptop") || slug.includes("phone") || slug.includes("tablet") || slug.includes("camera") || slug.includes("audio") || slug.includes("smart") || slug.includes("computer") || slug.includes("mobile") || slug.includes("storage") || slug.includes("network") || slug.includes("printer") || slug.includes("projector") || slug.includes("tv") || slug.includes("drone") || slug.includes("vr") || slug.includes("robot")) return "electronics";
  if (slug.includes("home") || slug.includes("living") || slug.includes("bedroom") || slug.includes("kitchen") || slug.includes("bathroom") || slug.includes("dining") || slug.includes("lighting") || slug.includes("decor") || slug.includes("storage") || slug.includes("cleaning") || slug.includes("laundry") || slug.includes("cookware") || slug.includes("bakeware") || slug.includes("tableware") || slug.includes("drinkware") || slug.includes("appliance") || slug.includes("furniture")) return "home";
  if (slug.includes("sport") || slug.includes("fitness") || slug.includes("gym") || slug.includes("yoga") || slug.includes("running") || slug.includes("cycling") || slug.includes("swimming") || slug.includes("golf") || slug.includes("martial") || slug.includes("water-sport") || slug.includes("winter-sport")) return "sports";
  if (slug.includes("food") || slug.includes("grocery") || slug.includes("snack") || slug.includes("beverage") || slug.includes("breakfast") || slug.includes("dairy") || slug.includes("bakery") || slug.includes("frozen") || slug.includes("canned") || slug.includes("condiment") || slug.includes("organic") || slug.includes("tea") || slug.includes("coffee")) return "food";
  if (slug.includes("tool") || slug.includes("hardware") || slug.includes("power") || slug.includes("hand") || slug.includes("measuring") || slug.includes("safety") || slug.includes("plumbing") || slug.includes("electrical") || slug.includes("paint") || slug.includes("fastener") || slug.includes("woodwork")) return "tools";
  if (slug.includes("pet") || slug.includes("dog") || slug.includes("cat") || slug.includes("bird") || slug.includes("fish") || slug.includes("reptile")) return "pets";
  if (slug.includes("baby") || slug.includes("nursery") || slug.includes("maternity") || slug.includes("diaper") || slug.includes("stroller")) return "baby";
  if (slug.includes("office") || slug.includes("stationery") || slug.includes("school")) return "office";
  if (slug.includes("outdoor") || slug.includes("garden") || slug.includes("camping") || slug.includes("hiking") || slug.includes("tent") || slug.includes("backpack") || slug.includes("climbing") || slug.includes("navigation")) return "outdoor";
  return "home";
}

function generateProducts(count: number = 5000): Product[] {
  const generatedProducts: Product[] = [];
  const random = seededRandom(42);
  const usedNames = new Set<string>();
  const usedIds = new Set<string>();
  let productId = 0;

  const allCategories = [...categories];
  
  while (generatedProducts.length < count) {
    for (const category of allCategories) {
      if (generatedProducts.length >= count) break;
      
      const categoryType = getCategoryType(category.slug);
      const nouns = productNouns[categoryType] || productNouns["home"];
      
      const productsPerCategory = Math.ceil(count / allCategories.length);
      
      for (let i = 0; i < productsPerCategory && generatedProducts.length < count; i++) {
        const adj = productAdjectives[Math.floor(random() * productAdjectives.length)];
        const noun = nouns[Math.floor(random() * nouns.length)];
        const variant = Math.floor(random() * 1000);
        
        const productName = `${adj} ${category.name} ${noun} ${variant}`;
        const uniqueKey = productName.toLowerCase();
        
        if (usedNames.has(uniqueKey)) continue;
        usedNames.add(uniqueKey);
        
        productId++;
        const productIdStr = `p${productId}`;
        
        if (usedIds.has(productIdStr)) continue;
        usedIds.add(productIdStr);
        
        const palette = colorPalettes[productId % colorPalettes.length];
        const basePrice = Math.floor(random() * 9500) + 99;
        const hasDiscount = random() > 0.55;
        
        const imageIndex = productId % categoryImageUrls.length;
        const image = categoryImageUrls[imageIndex];

        generatedProducts.push({
          id: productIdStr,
          name: productName,
          slug: `${productName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${productId}`,
          category: category.name,
          categorySlug: category.slug,
          price: basePrice,
          originalPrice: hasDiscount ? basePrice + Math.floor(random() * 2000) + 100 : undefined,
          rating: Number((random() * 1.8 + 3.2).toFixed(1)),
          reviews: Math.floor(random() * 15000) + 5,
          image: image,
          colors: [
            { name: "Primary", value: palette.accent },
            { name: "Secondary", value: colorPalettes[(productId + 3) % colorPalettes.length].accent },
            { name: "Neutral", value: "#6B7280" },
          ],
          sizes: random() > 0.5 ? ["S", "M", "L", "XL", "XXL"] : ["One Size"],
          shortDescription: `${productName} - Premium quality product with excellent features and value`,
          inStock: random() > 0.05,
          stock: Math.floor(random() * 500) + 1,
          isNew: random() > 0.85,
          isBestseller: random() > 0.92,
          isFeatured: random() > 0.95,
          has3D: random() > 0.7,
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

export const products: Product[] = generateProducts(5000);

export const PRODUCTS = products;

export const homeProducts = products.slice(0, 1000);

export const featuredProducts = products.filter(p => p.isFeatured).slice(0, 48);
export const newArrivals = products.filter(p => p.isNew).slice(0, 48);
export const bestsellers = products.filter(p => p.isBestseller).slice(0, 48);

export const hero3DProducts = products.filter(p => p.has3D).slice(0, 12);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const filtered = products.filter(p => p.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getHomePageProducts(): Product[] {
  return homeProducts;
}

export function getMixedCategoryProducts(limit: number = 100): Product[] {
  const result: Product[] = [];
  const random = seededRandom(Date.now() % 10000);
  
  const shuffledProducts = shuffleWithSeed([...products], random);
  
  for (const product of shuffledProducts) {
    if (result.length >= limit) break;
    
    const categoryCount = result.filter(p => p.categorySlug === product.categorySlug).length;
    const maxPerCategory = Math.ceil(limit / 20);
    
    if (categoryCount < maxPerCategory) {
      result.push(product);
    }
  }
  
  return result;
}

export function getRelatedProducts(productId: string, limit: number = 12): Product[] {
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

export function getCategoryProductCount(categorySlug: string): number {
  return products.filter(p => p.categorySlug === categorySlug).length;
}

export function getAllCategoriesWithCounts(): { category: Category; count: number }[] {
  return categories.map(cat => ({
    category: cat,
    count: getCategoryProductCount(cat.slug)
  }));
}
