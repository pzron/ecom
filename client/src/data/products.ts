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
  { name: "Protein Powders", icon: "🥛", iconName: "Cup", gradient: "from-amber-500 to-orange-500" },
  { name: "Pre-Workout", icon: "💪", iconName: "Zap", gradient: "from-red-500 to-orange-500" },
  { name: "Post-Workout", icon: "🏆", iconName: "Trophy", gradient: "from-green-500 to-teal-500" },
  { name: "BCAA & Amino Acids", icon: "🧬", iconName: "Dna", gradient: "from-blue-500 to-indigo-500" },
  { name: "Creatine", icon: "💊", iconName: "Pill", gradient: "from-purple-500 to-violet-500" },
  { name: "Fat Burners", icon: "🔥", iconName: "Flame", gradient: "from-orange-500 to-red-500" },
  { name: "Mass Gainers", icon: "📈", iconName: "TrendingUp", gradient: "from-green-600 to-emerald-600" },
  { name: "Energy Bars", icon: "🍫", iconName: "Cookie", gradient: "from-amber-600 to-orange-600" },
  { name: "Electrolytes", icon: "⚡", iconName: "Zap", gradient: "from-cyan-500 to-blue-500" },
  { name: "Multivitamins", icon: "💊", iconName: "Pill", gradient: "from-green-500 to-teal-500" },
  { name: "Omega Fatty Acids", icon: "🐟", iconName: "Fish", gradient: "from-blue-500 to-cyan-500" },
  { name: "Probiotics", icon: "🦠", iconName: "Circle", gradient: "from-green-400 to-emerald-400" },
  { name: "Collagen", icon: "✨", iconName: "Sparkles", gradient: "from-pink-400 to-rose-400" },
  { name: "Biotin", icon: "💇", iconName: "Heart", gradient: "from-purple-400 to-pink-400" },
  { name: "Vitamin D", icon: "☀️", iconName: "Sun", gradient: "from-yellow-500 to-orange-500" },
  { name: "Vitamin C", icon: "🍊", iconName: "Circle", gradient: "from-orange-500 to-amber-500" },
  { name: "Iron Supplements", icon: "💪", iconName: "Dumbbell", gradient: "from-red-600 to-rose-600" },
  { name: "Calcium", icon: "🦴", iconName: "Bone", gradient: "from-gray-400 to-slate-400" },
  { name: "Zinc", icon: "🛡️", iconName: "Shield", gradient: "from-gray-500 to-zinc-500" },
  { name: "Magnesium", icon: "🌙", iconName: "Moon", gradient: "from-indigo-400 to-purple-400" },
  { name: "Turmeric", icon: "🌿", iconName: "Leaf", gradient: "from-yellow-600 to-orange-600" },
  { name: "Ashwagandha", icon: "🌱", iconName: "Sprout", gradient: "from-green-600 to-emerald-600" },
  { name: "Ginseng", icon: "🍃", iconName: "Leaf", gradient: "from-green-500 to-teal-500" },
  { name: "Green Tea Extract", icon: "🍵", iconName: "Cup", gradient: "from-green-400 to-emerald-400" },
  { name: "Apple Cider Vinegar", icon: "🍎", iconName: "Apple", gradient: "from-red-400 to-rose-400" },
  { name: "Spirulina", icon: "🌊", iconName: "Waves", gradient: "from-teal-500 to-cyan-500" },
  { name: "CBD Products", icon: "🌿", iconName: "Leaf", gradient: "from-green-500 to-emerald-500" },
  { name: "Melatonin", icon: "🌙", iconName: "Moon", gradient: "from-indigo-500 to-purple-500" },
  { name: "Caffeine Pills", icon: "☕", iconName: "Coffee", gradient: "from-amber-700 to-orange-700" },
  { name: "Nootropics", icon: "🧠", iconName: "Brain", gradient: "from-purple-600 to-pink-600" },
  { name: "Smart Speakers", icon: "🔊", iconName: "Speaker", gradient: "from-gray-600 to-zinc-600" },
  { name: "Smart Displays", icon: "📱", iconName: "Monitor", gradient: "from-blue-500 to-indigo-500" },
  { name: "Smart Lighting", icon: "💡", iconName: "Lightbulb", gradient: "from-yellow-500 to-amber-500" },
  { name: "Smart Thermostats", icon: "🌡️", iconName: "Thermometer", gradient: "from-cyan-500 to-blue-500" },
  { name: "Smart Locks", icon: "🔐", iconName: "Lock", gradient: "from-gray-700 to-slate-700" },
  { name: "Smart Cameras", icon: "📹", iconName: "Camera", gradient: "from-gray-600 to-zinc-600" },
  { name: "Smart Doorbells", icon: "🔔", iconName: "Bell", gradient: "from-amber-500 to-orange-500" },
  { name: "Smart Plugs", icon: "🔌", iconName: "Plug", gradient: "from-green-500 to-teal-500" },
  { name: "Smart Sensors", icon: "📡", iconName: "Radio", gradient: "from-blue-600 to-cyan-600" },
  { name: "Home Automation Hubs", icon: "🏠", iconName: "Home", gradient: "from-purple-500 to-violet-500" },
  { name: "Robot Vacuums", icon: "🤖", iconName: "Bot", gradient: "from-gray-500 to-slate-500" },
  { name: "Air Purifiers", icon: "🌬️", iconName: "Wind", gradient: "from-cyan-400 to-blue-400" },
  { name: "Humidifiers", icon: "💨", iconName: "Cloud", gradient: "from-blue-400 to-cyan-400" },
  { name: "Dehumidifiers", icon: "💧", iconName: "Droplet", gradient: "from-blue-500 to-indigo-500" },
  { name: "Space Heaters", icon: "🔥", iconName: "Flame", gradient: "from-red-500 to-orange-500" },
  { name: "Fans", icon: "🌀", iconName: "RefreshCw", gradient: "from-cyan-500 to-teal-500" },
  { name: "Air Conditioners", icon: "❄️", iconName: "Snowflake", gradient: "from-blue-500 to-cyan-500" },
  { name: "Water Filters", icon: "💧", iconName: "Droplet", gradient: "from-blue-400 to-cyan-400" },
  { name: "Blenders", icon: "🥤", iconName: "Cup", gradient: "from-green-500 to-emerald-500" },
  { name: "Juicers", icon: "🍊", iconName: "Circle", gradient: "from-orange-500 to-amber-500" },
  { name: "Coffee Makers", icon: "☕", iconName: "Coffee", gradient: "from-amber-700 to-orange-700" },
  { name: "Espresso Machines", icon: "☕", iconName: "Coffee", gradient: "from-gray-700 to-slate-700" },
  { name: "Tea Kettles", icon: "🫖", iconName: "Cup", gradient: "from-amber-500 to-yellow-500" },
  { name: "Toasters", icon: "🍞", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Microwaves", icon: "📻", iconName: "Radio", gradient: "from-gray-600 to-zinc-600" },
  { name: "Air Fryers", icon: "🍟", iconName: "Flame", gradient: "from-orange-500 to-red-500" },
  { name: "Instant Pots", icon: "🍲", iconName: "Flame", gradient: "from-red-500 to-rose-500" },
  { name: "Slow Cookers", icon: "🥘", iconName: "Flame", gradient: "from-amber-600 to-orange-600" },
  { name: "Food Processors", icon: "🔪", iconName: "Scissors", gradient: "from-gray-500 to-slate-500" },
  { name: "Stand Mixers", icon: "🍰", iconName: "Cake", gradient: "from-pink-500 to-rose-500" },
  { name: "Hand Mixers", icon: "🥣", iconName: "Cup", gradient: "from-cyan-400 to-blue-400" },
  { name: "Waffle Makers", icon: "🧇", iconName: "Grid", gradient: "from-amber-500 to-yellow-500" },
  { name: "Sandwich Makers", icon: "🥪", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Electric Grills", icon: "🍖", iconName: "Flame", gradient: "from-red-600 to-orange-600" },
  { name: "Rice Cookers", icon: "🍚", iconName: "Circle", gradient: "from-gray-400 to-slate-400" },
  { name: "Sous Vide", icon: "🍳", iconName: "Thermometer", gradient: "from-amber-500 to-orange-500" },
  { name: "Ice Cream Makers", icon: "🍦", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Bread Machines", icon: "🍞", iconName: "Square", gradient: "from-amber-700 to-orange-700" },
  { name: "Vacuum Sealers", icon: "📦", iconName: "Package", gradient: "from-gray-600 to-zinc-600" },
  { name: "Electric Kettles", icon: "🫖", iconName: "Cup", gradient: "from-blue-500 to-cyan-500" },
  { name: "Wine Coolers", icon: "🍷", iconName: "Wine", gradient: "from-red-700 to-rose-700" },
  { name: "Beer Brewing", icon: "🍺", iconName: "Beer", gradient: "from-amber-600 to-yellow-600" },
  { name: "Knife Sets", icon: "🔪", iconName: "Scissors", gradient: "from-gray-700 to-slate-700" },
  { name: "Cutting Boards", icon: "🪵", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Pot & Pan Sets", icon: "🍳", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Cast Iron", icon: "🥘", iconName: "Circle", gradient: "from-gray-700 to-slate-700" },
  { name: "Non-Stick Cookware", icon: "🍳", iconName: "Circle", gradient: "from-gray-500 to-zinc-500" },
  { name: "Stainless Steel", icon: "🥄", iconName: "Circle", gradient: "from-gray-400 to-slate-400" },
  { name: "Dutch Ovens", icon: "🥘", iconName: "Circle", gradient: "from-red-600 to-rose-600" },
  { name: "Woks", icon: "🥡", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Skillets", icon: "🍳", iconName: "Circle", gradient: "from-gray-700 to-slate-700" },
  { name: "Saucepans", icon: "🍲", iconName: "Circle", gradient: "from-gray-500 to-zinc-500" },
  { name: "Stock Pots", icon: "🥣", iconName: "Circle", gradient: "from-gray-600 to-slate-600" },
  { name: "Baking Sheets", icon: "📋", iconName: "Square", gradient: "from-amber-500 to-orange-500" },
  { name: "Cake Pans", icon: "🎂", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Muffin Pans", icon: "🧁", iconName: "Circle", gradient: "from-pink-500 to-rose-500" },
  { name: "Pie Pans", icon: "🥧", iconName: "Circle", gradient: "from-amber-600 to-orange-600" },
  { name: "Loaf Pans", icon: "🍞", iconName: "Square", gradient: "from-amber-700 to-orange-700" },
  { name: "Roasting Pans", icon: "🍗", iconName: "Square", gradient: "from-gray-600 to-zinc-600" },
  { name: "Mixing Bowls", icon: "🥣", iconName: "Circle", gradient: "from-cyan-400 to-blue-400" },
  { name: "Measuring Cups", icon: "🥛", iconName: "Cup", gradient: "from-gray-400 to-slate-400" },
  { name: "Kitchen Scales", icon: "⚖️", iconName: "Scale", gradient: "from-gray-500 to-zinc-500" },
  { name: "Rolling Pins", icon: "🪵", iconName: "Circle", gradient: "from-amber-600 to-orange-600" },
  { name: "Pastry Brushes", icon: "🖌️", iconName: "Brush", gradient: "from-amber-500 to-yellow-500" },
  { name: "Piping Bags", icon: "🧁", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Cookie Cutters", icon: "🍪", iconName: "Star", gradient: "from-amber-400 to-orange-400" },
  { name: "Dinner Plates", icon: "🍽️", iconName: "Circle", gradient: "from-gray-400 to-slate-400" },
  { name: "Salad Plates", icon: "🥗", iconName: "Circle", gradient: "from-green-400 to-emerald-400" },
  { name: "Soup Bowls", icon: "🥣", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Mugs", icon: "☕", iconName: "Cup", gradient: "from-amber-600 to-orange-600" },
  { name: "Wine Glasses", icon: "🍷", iconName: "Wine", gradient: "from-red-600 to-rose-600" },
  { name: "Beer Glasses", icon: "🍺", iconName: "Beer", gradient: "from-amber-500 to-yellow-500" },
  { name: "Tumblers", icon: "🥤", iconName: "Cup", gradient: "from-cyan-500 to-blue-500" },
  { name: "Water Bottles", icon: "🧴", iconName: "Droplet", gradient: "from-blue-400 to-cyan-400" },
  { name: "Travel Mugs", icon: "☕", iconName: "Cup", gradient: "from-gray-600 to-zinc-600" },
  { name: "Flatware Sets", icon: "🍴", iconName: "Utensils", gradient: "from-gray-500 to-slate-500" },
  { name: "Serving Platters", icon: "🍽️", iconName: "Square", gradient: "from-gray-400 to-zinc-400" },
  { name: "Serving Bowls", icon: "🥗", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Table Linens", icon: "🧵", iconName: "Square", gradient: "from-pink-400 to-rose-400" },
  { name: "Placemats", icon: "📋", iconName: "Square", gradient: "from-amber-500 to-yellow-500" },
  { name: "Napkins", icon: "📋", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Salt & Pepper", icon: "🧂", iconName: "Circle", gradient: "from-gray-500 to-zinc-500" },
  { name: "Candle Holders", icon: "🕯️", iconName: "Flame", gradient: "from-amber-600 to-orange-600" },
  { name: "Vases", icon: "🏺", iconName: "Circle", gradient: "from-purple-400 to-pink-400" },
  { name: "Picture Frames", icon: "🖼️", iconName: "Frame", gradient: "from-amber-600 to-orange-600" },
  { name: "Mirrors", icon: "🪞", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Clocks", icon: "🕐", iconName: "Clock", gradient: "from-gray-600 to-zinc-600" },
  { name: "Wall Art", icon: "🎨", iconName: "Frame", gradient: "from-purple-500 to-pink-500" },
  { name: "Sculptures", icon: "🗿", iconName: "Box", gradient: "from-gray-600 to-slate-600" },
  { name: "Throw Pillows", icon: "🛋️", iconName: "Square", gradient: "from-pink-400 to-rose-400" },
  { name: "Throw Blankets", icon: "🧶", iconName: "Square", gradient: "from-amber-500 to-orange-500" },
  { name: "Area Rugs", icon: "🪴", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Curtains", icon: "🪟", iconName: "Square", gradient: "from-gray-500 to-slate-500" },
  { name: "Blinds", icon: "🪟", iconName: "Square", gradient: "from-gray-600 to-zinc-600" },
  { name: "Bedding Sets", icon: "🛏️", iconName: "Square", gradient: "from-indigo-400 to-purple-400" },
  { name: "Sheets", icon: "🛏️", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Comforters", icon: "🛏️", iconName: "Square", gradient: "from-indigo-500 to-purple-500" },
  { name: "Duvets", icon: "🛏️", iconName: "Square", gradient: "from-gray-500 to-zinc-500" },
  { name: "Pillows", icon: "🛏️", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Mattress Toppers", icon: "🛏️", iconName: "Square", gradient: "from-indigo-400 to-purple-400" },
  { name: "Mattress Protectors", icon: "🛏️", iconName: "Shield", gradient: "from-cyan-400 to-blue-400" },
  { name: "Towels", icon: "🧖", iconName: "Square", gradient: "from-cyan-500 to-teal-500" },
  { name: "Bath Mats", icon: "🛁", iconName: "Square", gradient: "from-cyan-400 to-blue-400" },
  { name: "Shower Curtains", icon: "🚿", iconName: "Square", gradient: "from-blue-400 to-cyan-400" },
  { name: "Soap Dispensers", icon: "🧴", iconName: "Droplet", gradient: "from-cyan-500 to-teal-500" },
  { name: "Toothbrush Holders", icon: "🦷", iconName: "Circle", gradient: "from-cyan-400 to-blue-400" },
  { name: "Bathroom Storage", icon: "📦", iconName: "Box", gradient: "from-gray-500 to-slate-500" },
  { name: "Toilet Accessories", icon: "🚽", iconName: "Circle", gradient: "from-gray-400 to-zinc-400" },
  { name: "Laundry Baskets", icon: "🧺", iconName: "Box", gradient: "from-amber-500 to-orange-500" },
  { name: "Ironing Boards", icon: "📋", iconName: "Square", gradient: "from-gray-500 to-slate-500" },
  { name: "Irons", icon: "🔌", iconName: "Zap", gradient: "from-gray-600 to-zinc-600" },
  { name: "Clothes Hangers", icon: "👔", iconName: "Circle", gradient: "from-amber-600 to-orange-600" },
  { name: "Closet Organizers", icon: "📦", iconName: "Box", gradient: "from-gray-500 to-slate-500" },
  { name: "Shoe Racks", icon: "👟", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Storage Bins", icon: "📦", iconName: "Box", gradient: "from-gray-400 to-zinc-400" },
  { name: "Shelving Units", icon: "📚", iconName: "Square", gradient: "from-amber-700 to-orange-700" },
  { name: "Garage Storage", icon: "🔧", iconName: "Box", gradient: "from-gray-600 to-slate-600" },
  { name: "Trash Cans", icon: "🗑️", iconName: "Trash", gradient: "from-gray-500 to-zinc-500" },
  { name: "Recycling Bins", icon: "♻️", iconName: "Recycle", gradient: "from-green-500 to-emerald-500" },
  { name: "Vacuum Cleaners", icon: "🧹", iconName: "Zap", gradient: "from-red-500 to-rose-500" },
  { name: "Mops", icon: "🧹", iconName: "Circle", gradient: "from-cyan-500 to-blue-500" },
  { name: "Brooms", icon: "🧹", iconName: "Circle", gradient: "from-amber-600 to-orange-600" },
  { name: "Dusters", icon: "🪶", iconName: "Feather", gradient: "from-gray-400 to-slate-400" },
  { name: "Cleaning Supplies", icon: "🧴", iconName: "Droplet", gradient: "from-cyan-500 to-teal-500" },
  { name: "Laundry Detergent", icon: "🧴", iconName: "Droplet", gradient: "from-blue-500 to-indigo-500" },
  { name: "Dishwashing", icon: "🍽️", iconName: "Droplet", gradient: "from-cyan-400 to-blue-400" },
  { name: "All-Purpose Cleaners", icon: "🧹", iconName: "Sparkles", gradient: "from-green-500 to-teal-500" },
  { name: "Glass Cleaners", icon: "🪟", iconName: "Sparkles", gradient: "from-blue-400 to-cyan-400" },
  { name: "Floor Cleaners", icon: "🧹", iconName: "Sparkles", gradient: "from-amber-500 to-orange-500" },
  { name: "Disinfectants", icon: "🧴", iconName: "Shield", gradient: "from-green-600 to-emerald-600" },
  { name: "Air Fresheners", icon: "🌸", iconName: "Flower", gradient: "from-purple-400 to-pink-400" },
  { name: "Drain Cleaners", icon: "🚰", iconName: "Droplet", gradient: "from-blue-600 to-indigo-600" },
  { name: "Stain Removers", icon: "✨", iconName: "Sparkles", gradient: "from-cyan-500 to-teal-500" },
  { name: "Paper Towels", icon: "📋", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Tissues", icon: "📋", iconName: "Square", gradient: "from-cyan-400 to-blue-400" },
  { name: "Toilet Paper", icon: "🧻", iconName: "Circle", gradient: "from-gray-400 to-zinc-400" },
  { name: "Trash Bags", icon: "🗑️", iconName: "Trash", gradient: "from-gray-600 to-slate-600" },
  { name: "Food Wraps", icon: "📋", iconName: "Square", gradient: "from-green-400 to-emerald-400" },
  { name: "Aluminum Foil", icon: "📋", iconName: "Square", gradient: "from-gray-500 to-zinc-500" },
  { name: "Plastic Bags", icon: "📋", iconName: "Square", gradient: "from-gray-400 to-slate-400" },
  { name: "Disposable Plates", icon: "🍽️", iconName: "Circle", gradient: "from-gray-400 to-zinc-400" },
  { name: "Disposable Cups", icon: "🥤", iconName: "Cup", gradient: "from-gray-400 to-slate-400" },
  { name: "Disposable Utensils", icon: "🍴", iconName: "Utensils", gradient: "from-gray-500 to-zinc-500" },
  { name: "Batteries", icon: "🔋", iconName: "Battery", gradient: "from-green-500 to-emerald-500" },
  { name: "Light Bulbs", icon: "💡", iconName: "Lightbulb", gradient: "from-yellow-500 to-amber-500" },
  { name: "Extension Cords", icon: "🔌", iconName: "Cable", gradient: "from-gray-600 to-zinc-600" },
  { name: "Surge Protectors", icon: "⚡", iconName: "Shield", gradient: "from-blue-600 to-indigo-600" },
  { name: "Smoke Detectors", icon: "🔔", iconName: "Bell", gradient: "from-red-500 to-rose-500" },
  { name: "Carbon Monoxide Detectors", icon: "🔔", iconName: "Bell", gradient: "from-gray-600 to-zinc-600" },
  { name: "Fire Extinguishers", icon: "🧯", iconName: "Shield", gradient: "from-red-600 to-rose-600" },
  { name: "Safes", icon: "🔐", iconName: "Lock", gradient: "from-gray-700 to-slate-700" },
  { name: "Door Locks", icon: "🔒", iconName: "Lock", gradient: "from-gray-600 to-zinc-600" },
  { name: "Security Cameras", icon: "📹", iconName: "Camera", gradient: "from-gray-600 to-slate-600" },
  { name: "Motion Sensors", icon: "📡", iconName: "Radio", gradient: "from-blue-500 to-indigo-500" },
  { name: "Alarm Systems", icon: "🔔", iconName: "Bell", gradient: "from-red-500 to-rose-500" },
  { name: "Baby Monitors", icon: "📱", iconName: "Monitor", gradient: "from-pink-400 to-rose-400" },
  { name: "Intercoms", icon: "🔊", iconName: "Speaker", gradient: "from-gray-500 to-zinc-500" },
  { name: "Home Safes", icon: "🔐", iconName: "Lock", gradient: "from-gray-700 to-slate-700" },
  { name: "Key Holders", icon: "🔑", iconName: "Key", gradient: "from-amber-600 to-orange-600" },
  { name: "Mail Boxes", icon: "📬", iconName: "Mail", gradient: "from-blue-500 to-indigo-500" },
  { name: "House Numbers", icon: "🏠", iconName: "Home", gradient: "from-gray-600 to-zinc-600" },
  { name: "Doormats", icon: "🚪", iconName: "Square", gradient: "from-amber-600 to-orange-600" },
  { name: "Outdoor Furniture", icon: "🪑", iconName: "Armchair", gradient: "from-amber-600 to-yellow-600" },
  { name: "Porch Swings", icon: "🪑", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Hammocks", icon: "🛏️", iconName: "Square", gradient: "from-green-500 to-teal-500" },
  { name: "Outdoor Umbrellas", icon: "☂️", iconName: "Circle", gradient: "from-red-500 to-rose-500" },
  { name: "Gazebos", icon: "⛺", iconName: "Tent", gradient: "from-amber-700 to-orange-700" },
  { name: "Pergolas", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-600" },
  { name: "Fire Pits", icon: "🔥", iconName: "Flame", gradient: "from-red-600 to-orange-600" },
  { name: "Outdoor Heaters", icon: "🔥", iconName: "Flame", gradient: "from-orange-600 to-red-600" },
  { name: "Charcoal Grills", icon: "🍖", iconName: "Flame", gradient: "from-gray-700 to-slate-700" },
  { name: "Gas Grills", icon: "🍖", iconName: "Flame", gradient: "from-gray-600 to-zinc-600" },
  { name: "Smokers", icon: "🍖", iconName: "Cloud", gradient: "from-gray-600 to-slate-600" },
  { name: "Grill Accessories", icon: "🍖", iconName: "Wrench", gradient: "from-gray-500 to-zinc-500" },
  { name: "Pool Floats", icon: "🏊", iconName: "Circle", gradient: "from-cyan-400 to-blue-400" },
  { name: "Pool Toys", icon: "🏖️", iconName: "Circle", gradient: "from-yellow-400 to-orange-400" },
  { name: "Pool Chemicals", icon: "🧴", iconName: "Droplet", gradient: "from-cyan-500 to-blue-500" },
  { name: "Pool Cleaners", icon: "🏊", iconName: "Sparkles", gradient: "from-cyan-500 to-teal-500" },
  { name: "Hot Tubs", icon: "🛁", iconName: "Waves", gradient: "from-blue-500 to-cyan-500" },
  { name: "Lawn Mowers", icon: "🌱", iconName: "Leaf", gradient: "from-green-600 to-emerald-600" },
  { name: "Leaf Blowers", icon: "🍂", iconName: "Wind", gradient: "from-amber-600 to-orange-600" },
  { name: "Hedge Trimmers", icon: "🌳", iconName: "Scissors", gradient: "from-green-600 to-emerald-600" },
  { name: "Chain Saws", icon: "🪵", iconName: "Scissors", gradient: "from-gray-700 to-slate-700" },
  { name: "Pressure Washers", icon: "💧", iconName: "Droplet", gradient: "from-blue-600 to-indigo-600" },
  { name: "Garden Hoses", icon: "💧", iconName: "Circle", gradient: "from-green-500 to-teal-500" },
  { name: "Sprinklers", icon: "💧", iconName: "Droplet", gradient: "from-cyan-500 to-blue-500" },
  { name: "Garden Tools", icon: "🌱", iconName: "Wrench", gradient: "from-green-600 to-emerald-600" },
  { name: "Planters", icon: "🪴", iconName: "Flower", gradient: "from-amber-600 to-orange-600" },
  { name: "Raised Beds", icon: "🌱", iconName: "Square", gradient: "from-amber-700 to-orange-700" },
  { name: "Compost Bins", icon: "♻️", iconName: "Recycle", gradient: "from-green-600 to-emerald-600" },
  { name: "Garden Fencing", icon: "🏡", iconName: "Square", gradient: "from-gray-600 to-zinc-600" },
  { name: "Bird Feeders", icon: "🐦", iconName: "Bird", gradient: "from-amber-500 to-orange-500" },
  { name: "Bird Houses", icon: "🏠", iconName: "Home", gradient: "from-amber-600 to-orange-600" },
  { name: "Wind Chimes", icon: "🎐", iconName: "Wind", gradient: "from-cyan-400 to-blue-400" },
  { name: "Garden Statues", icon: "🗿", iconName: "Box", gradient: "from-gray-500 to-slate-500" },
  { name: "Solar Lights", icon: "☀️", iconName: "Sun", gradient: "from-yellow-500 to-orange-500" },
  { name: "Pathway Lights", icon: "💡", iconName: "Lightbulb", gradient: "from-amber-500 to-yellow-500" },
  { name: "String Lights", icon: "💡", iconName: "Lightbulb", gradient: "from-yellow-400 to-orange-400" },
  { name: "Spotlights", icon: "💡", iconName: "Lightbulb", gradient: "from-gray-500 to-zinc-500" },
  { name: "Insect Repellents", icon: "🐜", iconName: "Shield", gradient: "from-green-600 to-teal-600" },
  { name: "Rodent Control", icon: "🐭", iconName: "Shield", gradient: "from-gray-600 to-slate-600" },
  { name: "Weed Killers", icon: "🌿", iconName: "Shield", gradient: "from-red-500 to-rose-500" },
  { name: "Winter Jackets", icon: "🧥", iconName: "Cloud", gradient: "from-slate-600 to-gray-600" },
  { name: "Down Jackets", icon: "🧥", iconName: "Snowflake", gradient: "from-blue-600 to-indigo-600" },
  { name: "Raincoats", icon: "🌧️", iconName: "Cloud", gradient: "from-cyan-500 to-blue-500" },
  { name: "Windbreakers", icon: "🌬️", iconName: "Wind", gradient: "from-gray-500 to-zinc-500" },
  { name: "Fleece Jackets", icon: "🧥", iconName: "Cloud", gradient: "from-green-600 to-teal-600" },
  { name: "Parkas", icon: "🧥", iconName: "Snowflake", gradient: "from-gray-700 to-slate-700" },
  { name: "Overcoats", icon: "🧥", iconName: "Shirt", gradient: "from-gray-600 to-zinc-600" },
  { name: "Trench Coats", icon: "🧥", iconName: "Shirt", gradient: "from-amber-700 to-orange-700" },
  { name: "Leather Jackets", icon: "🧥", iconName: "Shirt", gradient: "from-gray-800 to-slate-800" },
  { name: "Denim Jackets", icon: "🧥", iconName: "Shirt", gradient: "from-blue-500 to-indigo-500" },
  { name: "Bomber Jackets", icon: "🧥", iconName: "Shirt", gradient: "from-green-700 to-emerald-700" },
  { name: "Varsity Jackets", icon: "🧥", iconName: "Shirt", gradient: "from-red-600 to-rose-600" },
  { name: "Motorcycle Jackets", icon: "🏍️", iconName: "Shirt", gradient: "from-gray-700 to-slate-700" },
  { name: "Ski Jackets", icon: "⛷️", iconName: "Snowflake", gradient: "from-blue-600 to-cyan-600" },
  { name: "Snowboard Jackets", icon: "🏂", iconName: "Snowflake", gradient: "from-purple-600 to-pink-600" },
  { name: "Running Shoes", icon: "👟", iconName: "Footprints", gradient: "from-green-500 to-teal-500" },
  { name: "Basketball Shoes", icon: "🏀", iconName: "Circle", gradient: "from-orange-500 to-red-500" },
  { name: "Soccer Cleats", icon: "⚽", iconName: "Circle", gradient: "from-green-600 to-emerald-600" },
  { name: "Tennis Shoes", icon: "🎾", iconName: "Circle", gradient: "from-yellow-500 to-orange-500" },
  { name: "Golf Shoes", icon: "⛳", iconName: "Flag", gradient: "from-gray-500 to-slate-500" },
  { name: "Hiking Boots", icon: "🥾", iconName: "Mountain", gradient: "from-amber-700 to-orange-700" },
  { name: "Work Boots", icon: "🥾", iconName: "Shield", gradient: "from-amber-800 to-orange-800" },
  { name: "Dress Shoes", icon: "👞", iconName: "Circle", gradient: "from-gray-700 to-slate-700" },
  { name: "Loafers", icon: "👞", iconName: "Circle", gradient: "from-amber-600 to-orange-600" },
  { name: "Oxfords", icon: "👞", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Sandals", icon: "🩴", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Flip Flops", icon: "🩴", iconName: "Circle", gradient: "from-cyan-400 to-blue-400" },
  { name: "Slippers", icon: "🧦", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Sneakers", icon: "👟", iconName: "Footprints", gradient: "from-blue-500 to-indigo-500" },
  { name: "High Heels", icon: "👠", iconName: "Circle", gradient: "from-red-500 to-rose-500" },
  { name: "Wedges", icon: "👠", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Flats", icon: "👞", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Boots", icon: "🥾", iconName: "Circle", gradient: "from-gray-700 to-slate-700" },
  { name: "Ankle Boots", icon: "🥾", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Knee High Boots", icon: "🥾", iconName: "Circle", gradient: "from-gray-800 to-slate-800" },
  { name: "Rain Boots", icon: "🌧️", iconName: "Cloud", gradient: "from-yellow-500 to-orange-500" },
  { name: "Snow Boots", icon: "❄️", iconName: "Snowflake", gradient: "from-gray-600 to-zinc-600" },
  { name: "Canvas Shoes", icon: "👟", iconName: "Circle", gradient: "from-red-400 to-rose-400" },
  { name: "Espadrilles", icon: "👟", iconName: "Circle", gradient: "from-amber-500 to-orange-500" },
  { name: "Moccasins", icon: "👞", iconName: "Circle", gradient: "from-amber-700 to-orange-700" },
  { name: "Boat Shoes", icon: "⛵", iconName: "Circle", gradient: "from-blue-500 to-cyan-500" },
  { name: "Platform Shoes", icon: "👠", iconName: "Circle", gradient: "from-pink-500 to-rose-500" },
  { name: "Wrestling Shoes", icon: "🤼", iconName: "Circle", gradient: "from-red-600 to-rose-600" },
  { name: "Boxing Shoes", icon: "🥊", iconName: "Circle", gradient: "from-red-600 to-orange-600" },
  { name: "Weightlifting Shoes", icon: "🏋️", iconName: "Circle", gradient: "from-gray-700 to-slate-700" },
  { name: "Crossfit Shoes", icon: "💪", iconName: "Circle", gradient: "from-green-600 to-teal-600" },
  { name: "Trail Running Shoes", icon: "🏔️", iconName: "Mountain", gradient: "from-amber-600 to-orange-600" },
  { name: "Volleyball Shoes", icon: "🏐", iconName: "Circle", gradient: "from-blue-500 to-indigo-500" },
  { name: "Badminton Shoes", icon: "🏸", iconName: "Circle", gradient: "from-green-500 to-teal-500" },
  { name: "Table Tennis Shoes", icon: "🏓", iconName: "Circle", gradient: "from-red-500 to-orange-500" },
  { name: "Cycling Shoes", icon: "🚴", iconName: "Circle", gradient: "from-blue-600 to-cyan-600" },
  { name: "Skateboarding Shoes", icon: "🛹", iconName: "Circle", gradient: "from-gray-600 to-zinc-600" },
  { name: "Dance Shoes", icon: "💃", iconName: "Circle", gradient: "from-pink-500 to-rose-500" },
  { name: "Ballet Shoes", icon: "🩰", iconName: "Circle", gradient: "from-pink-400 to-rose-400" },
  { name: "Tap Shoes", icon: "👞", iconName: "Circle", gradient: "from-gray-600 to-slate-600" },
  { name: "Jazz Shoes", icon: "👞", iconName: "Circle", gradient: "from-gray-700 to-zinc-700" },
  { name: "Ballroom Shoes", icon: "👠", iconName: "Circle", gradient: "from-gold-500 to-amber-500" },
  { name: "Latin Dance Shoes", icon: "👠", iconName: "Circle", gradient: "from-red-600 to-rose-600" },
  { name: "Diabetic Shoes", icon: "👟", iconName: "Heart", gradient: "from-blue-400 to-cyan-400" },
  { name: "Orthopedic Shoes", icon: "👟", iconName: "Heart", gradient: "from-gray-500 to-slate-500" },
  { name: "Wide Width Shoes", icon: "👟", iconName: "Circle", gradient: "from-gray-500 to-zinc-500" },
  { name: "Narrow Width Shoes", icon: "👟", iconName: "Circle", gradient: "from-gray-400 to-slate-400" },
  { name: "Steel Toe Boots", icon: "🥾", iconName: "Shield", gradient: "from-gray-700 to-slate-700" },
  { name: "Composite Toe Boots", icon: "🥾", iconName: "Shield", gradient: "from-gray-600 to-zinc-600" },
  { name: "Waterproof Boots", icon: "🥾", iconName: "Droplet", gradient: "from-blue-600 to-indigo-600" },
  { name: "Insulated Boots", icon: "🥾", iconName: "Snowflake", gradient: "from-gray-700 to-slate-700" },
  { name: "Slip Resistant Shoes", icon: "👟", iconName: "Shield", gradient: "from-gray-600 to-zinc-600" },
  { name: "Chef Shoes", icon: "👨‍🍳", iconName: "ChefHat", gradient: "from-gray-600 to-slate-600" },
  { name: "Nursing Shoes", icon: "👩‍⚕️", iconName: "Heart", gradient: "from-cyan-500 to-blue-500" },
  { name: "Mechanic Shoes", icon: "🔧", iconName: "Wrench", gradient: "from-gray-700 to-slate-700" },
  { name: "Electrician Shoes", icon: "⚡", iconName: "Zap", gradient: "from-yellow-600 to-amber-600" },
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
  "Soft", "Strong", "Powerful", "Quiet", "Silent", "Fast", "Slow", "Long-Lasting", "Extended", "Enhanced",
  "Sleek", "Stylish", "Vintage", "Retro", "Futuristic", "Innovative", "Revolutionary", "Cutting-Edge", "Next-Gen", "AI-Powered",
  "Eco-Friendly", "Sustainable", "Biodegradable", "Recyclable", "Energy-Efficient", "Solar-Powered", "Battery-Operated", "Cordless",
  "Automatic", "Manual", "Semi-Automatic", "Programmable", "Customizable", "Personalized", "Handcrafted", "Artisan",
  "Industrial", "Commercial", "Residential", "Outdoor", "Indoor", "All-Weather", "All-Season", "Year-Round",
  "Travel-Size", "Family-Size", "Economy", "Value", "Budget", "Affordable", "Exclusive", "Limited-Edition"
];

const productNouns: Record<string, string[]> = {
  "health": ["Supplements", "Vitamins", "Capsules", "Tablets", "Powder", "Drops", "Syrup", "Gel", "Cream", "Oil", "Extract", "Formula", "Complex", "Blend", "Mix", "Solution", "Spray", "Balm", "Patch", "Strips", "Gummies", "Chewables", "Softgels", "Elixir", "Tincture"],
  "beauty": ["Cream", "Serum", "Lotion", "Gel", "Mask", "Scrub", "Cleanser", "Toner", "Moisturizer", "Treatment", "Essence", "Mist", "Spray", "Oil", "Balm", "Butter", "Polish", "Primer", "Foundation", "Concealer", "Palette", "Lipstick", "Mascara", "Eyeliner", "Blush"],
  "fashion": ["Shirt", "Pants", "Dress", "Skirt", "Jacket", "Coat", "Sweater", "Hoodie", "Top", "Blouse", "Cardigan", "Blazer", "Suit", "Shorts", "Jeans", "Leggings", "Scarf", "Hat", "Belt", "Tie", "Vest", "Romper", "Jumpsuit", "Kimono", "Poncho"],
  "electronics": ["Device", "Gadget", "Player", "Speaker", "Headphones", "Charger", "Cable", "Adapter", "Hub", "Stand", "Mount", "Case", "Cover", "Screen", "Display", "Controller", "Keyboard", "Mouse", "Camera", "Lens", "Dock", "Router", "Modem", "Webcam", "Microphone"],
  "home": ["Set", "Kit", "Pack", "Bundle", "Collection", "Organizer", "Holder", "Rack", "Stand", "Shelf", "Box", "Container", "Basket", "Tray", "Mat", "Cover", "Pad", "Cushion", "Pillow", "Blanket", "Curtain", "Rug", "Lamp", "Clock", "Frame"],
  "sports": ["Equipment", "Gear", "Set", "Kit", "Ball", "Racket", "Bat", "Gloves", "Shoes", "Boots", "Helmet", "Pads", "Guard", "Bag", "Mat", "Bench", "Bar", "Weights", "Band", "Rope", "Net", "Goal", "Timer", "Whistle", "Jersey"],
  "food": ["Mix", "Blend", "Pack", "Set", "Box", "Jar", "Bottle", "Can", "Bag", "Packet", "Tin", "Container", "Sachet", "Tube", "Pouch", "Bar", "Snack", "Treat", "Spread", "Sauce", "Seasoning", "Spice", "Powder", "Syrup", "Extract"],
  "tools": ["Set", "Kit", "Tool", "Machine", "Device", "Equipment", "Drill", "Saw", "Hammer", "Wrench", "Pliers", "Screwdriver", "Level", "Tape", "Clamp", "Vise", "Sander", "Grinder", "Cutter", "Blade", "Bit", "Socket", "Ratchet", "Gauge", "Meter"],
  "pets": ["Food", "Treats", "Toy", "Bed", "Bowl", "Collar", "Leash", "Harness", "Carrier", "Crate", "Cage", "Tank", "Brush", "Shampoo", "Medicine", "Supplement", "Feeder", "Fountain", "Litter", "Pad", "Groomer", "Clipper", "Sweater", "Costume", "Tag"],
  "baby": ["Set", "Kit", "Pack", "Bottle", "Cup", "Bowl", "Spoon", "Bib", "Blanket", "Clothes", "Diaper", "Wipes", "Cream", "Lotion", "Shampoo", "Toy", "Rattle", "Mobile", "Monitor", "Carrier", "Stroller", "Car Seat", "High Chair", "Playpen", "Walker"],
  "office": ["Set", "Kit", "Pack", "Pen", "Pencil", "Marker", "Highlighter", "Notebook", "Folder", "Binder", "Stapler", "Tape", "Scissors", "Ruler", "Calculator", "Desk", "Chair", "Lamp", "Organizer", "Holder", "Shredder", "Scanner", "Printer", "Copier", "Whiteboard"],
  "outdoor": ["Set", "Kit", "Gear", "Equipment", "Tent", "Bag", "Pack", "Mat", "Chair", "Table", "Grill", "Cooler", "Lantern", "Flashlight", "Knife", "Compass", "Map", "Rope", "Net", "Pole", "Canopy", "Hammock", "Shelter", "Stove", "Axe"],
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
  "Shop Central", "Trade Hub", "Retail King", "Supply Chain", "Vendor Direct",
  "Digital Mart", "Tech Zone", "Gadget World", "Home Essentials", "Style House",
  "Fashion Forward", "Beauty Bliss", "Health Haven", "Sports Center", "Pet Paradise",
  "Baby Boutique", "Office Pro", "Garden Glory", "Auto Parts Plus", "Food Bazaar"
];

const productDescriptions: Record<string, string[]> = {
  "health": [
    "Experience optimal wellness with our scientifically formulated health product. Made with premium ingredients sourced from trusted suppliers, this product supports your body's natural functions and promotes overall vitality. Each batch is rigorously tested for purity and potency.",
    "Boost your daily health routine with this advanced formula. Designed by nutrition experts, it delivers essential nutrients your body needs. Non-GMO, gluten-free, and suitable for various dietary requirements.",
    "Transform your wellness journey with our breakthrough health solution. Clinically studied ingredients work synergistically to support immune function, energy levels, and mental clarity. Made in ISO-certified facilities.",
    "Discover the power of natural health support. This premium product combines traditional wisdom with modern science. Free from artificial additives, it provides gentle yet effective support for your wellbeing.",
    "Elevate your health with our pharmaceutical-grade formula. Each ingredient is carefully selected for maximum bioavailability. Trusted by healthcare professionals and wellness enthusiasts worldwide."
  ],
  "beauty": [
    "Unveil your natural radiance with this luxurious beauty essential. Formulated with cutting-edge skincare technology and nourishing botanicals, it delivers visible results. Dermatologist tested and suitable for all skin types.",
    "Transform your beauty routine with our award-winning formula. Infused with hyaluronic acid, vitamins, and antioxidants, it hydrates, protects, and rejuvenates your skin. Cruelty-free and vegan-friendly.",
    "Experience salon-quality results at home. This professional-grade beauty product uses advanced delivery systems to ensure deep penetration of active ingredients. See visible improvement in texture and tone.",
    "Indulge in self-care with our premium beauty collection. Made with organic ingredients and essential oils, it pampers your skin while delivering powerful anti-aging benefits. Paraben-free and hypoallergenic.",
    "Achieve your beauty goals with this innovative formula. Backed by clinical studies, it addresses multiple skin concerns simultaneously. Experience the difference of luxury skincare."
  ],
  "fashion": [
    "Make a statement with this meticulously crafted fashion piece. Designed with attention to detail and premium materials, it offers both style and comfort. Versatile enough for any occasion, from casual to formal.",
    "Elevate your wardrobe with our signature collection. Each piece features superior craftsmanship, quality stitching, and timeless design. Made to last and look great wear after wear.",
    "Express your unique style with this trendsetting fashion item. Featuring contemporary design elements and comfortable fit, it's perfect for the modern individual who values both aesthetics and practicality.",
    "Discover fashion that feels as good as it looks. Our premium fabrics ensure breathability and comfort throughout the day. Available in multiple sizes for the perfect fit.",
    "Step out in confidence with our designer-inspired fashion. Combining classic elegance with modern trends, this piece is a must-have for any fashion-forward individual. Easy care and durable construction."
  ],
  "electronics": [
    "Experience cutting-edge technology with this innovative electronic device. Featuring the latest advancements in performance and efficiency, it's designed to enhance your digital life. Built with premium components for reliability.",
    "Upgrade your tech experience with our flagship product. Packed with smart features and intuitive controls, it seamlessly integrates into your lifestyle. Energy-efficient design with long-lasting performance.",
    "Stay ahead with this next-generation electronic. Advanced processors, stunning displays, and seamless connectivity make it the perfect choice for tech enthusiasts. Comprehensive warranty included.",
    "Transform the way you interact with technology. This feature-rich device combines power with portability. User-friendly interface ensures everyone can enjoy its advanced capabilities.",
    "Discover the future of electronics. Engineered for excellence, this product delivers exceptional performance in a sleek design. Eco-friendly manufacturing and responsible sourcing."
  ],
  "home": [
    "Enhance your living space with this beautifully designed home essential. Combining functionality with aesthetics, it adds both style and convenience to any room. Crafted from premium materials for lasting quality.",
    "Create the home of your dreams with our curated collection. Each piece is thoughtfully designed to maximize comfort and organization. Easy to assemble and maintain for busy households.",
    "Transform your house into a home with this versatile product. Its timeless design complements any décor style while providing practical everyday solutions. Durable construction ensures years of use.",
    "Elevate your home environment with our premium collection. Designed with modern living in mind, it offers smart solutions for contemporary spaces. Safe materials suitable for families.",
    "Make every day at home special with this essential item. Carefully crafted to blend form and function, it enhances both the look and livability of your space. Eco-conscious materials and production."
  ],
  "sports": [
    "Achieve peak performance with this professional-grade sports equipment. Engineered for athletes of all levels, it provides the durability and precision you need to excel. Tested by professionals.",
    "Take your training to the next level with our advanced sports gear. Featuring innovative materials and ergonomic design, it enhances your performance while reducing fatigue and injury risk.",
    "Dominate your sport with equipment that matches your ambition. Built to withstand intense use, it delivers consistent performance in any condition. Trusted by coaches and athletes worldwide.",
    "Unlock your athletic potential with our premium sports collection. Designed with biomechanics in mind, each product optimizes your natural movement. Suitable for beginners to professionals.",
    "Push your limits with gear that's built to perform. Advanced technology meets practical design in this essential sports equipment. Lightweight yet durable for maximum versatility."
  ],
  "food": [
    "Savor the finest quality with our premium food product. Sourced from trusted suppliers and processed with care, it delivers authentic taste and superior nutrition. Free from artificial preservatives.",
    "Elevate your culinary experience with this gourmet selection. Carefully prepared using traditional methods and quality ingredients, it brings exceptional flavor to your table. Perfect for everyday meals or special occasions.",
    "Nourish your body with wholesome, delicious food. Made with carefully selected ingredients and minimal processing, it retains maximum nutritional value. Suitable for health-conscious consumers.",
    "Discover authentic taste with our artisan food collection. Crafted in small batches using time-honored recipes, each bite delivers a unique flavor experience. No artificial colors or flavors.",
    "Transform everyday meals into extraordinary experiences. Our premium ingredients and expert preparation ensure consistent quality and taste. Convenient packaging for modern lifestyles."
  ],
  "tools": [
    "Get the job done right with this professional-grade tool. Engineered for precision and durability, it meets the demands of both DIY enthusiasts and professional tradespeople. Ergonomic design reduces fatigue.",
    "Build with confidence using our premium tool collection. Each piece is manufactured to exacting standards, ensuring reliable performance for years. Heat-treated steel and reinforced construction.",
    "Work smarter with tools designed by experts. Featuring innovative designs and quality materials, they make every project easier and more efficient. Comprehensive safety features included.",
    "Equip yourself with the best. Our professional-grade tools deliver exceptional performance and durability. Precision-engineered components and comfortable grips for extended use.",
    "Master any project with reliable, high-quality tools. Designed for maximum efficiency and ease of use, they're the choice of professionals and serious hobbyists alike. Backed by manufacturer warranty."
  ],
  "pets": [
    "Give your furry friend the best with our premium pet product. Specially formulated with veterinary guidance, it supports your pet's health and happiness. Made with safe, quality ingredients.",
    "Show your pet love with products they'll adore. Designed with animal behavior experts, our collection ensures comfort, safety, and enjoyment. Durable construction for active pets.",
    "Keep your companion healthy and happy. Our scientifically developed pet products meet the highest standards of nutrition and safety. Suitable for pets of all ages and breeds.",
    "Treat your pet to premium quality. From nutrition to comfort, our products are designed to enhance your pet's life. Non-toxic materials and rigorous testing ensure safety.",
    "Your pet deserves the best, and that's exactly what we deliver. Our thoughtfully designed products promote health, happiness, and strong bonds between pets and their families."
  ],
  "baby": [
    "Give your little one the gentle care they deserve. Our baby products are specially formulated for sensitive skin and developing bodies. Pediatrician tested and parent approved.",
    "Create precious moments with products designed for babies. Ultra-soft materials and safe construction ensure comfort and peace of mind. Free from harmful chemicals and allergens.",
    "Nurture your baby with premium care products. Developed with child development experts, they support healthy growth while being gentle on delicate skin. Easy to use for busy parents.",
    "Only the best for your bundle of joy. Our baby collection features safe, effective products made with the highest quality standards. Trusted by parents worldwide.",
    "Welcome to parenthood with confidence. Our baby essentials are designed for safety, comfort, and convenience. Rigorously tested to exceed safety standards."
  ],
  "office": [
    "Boost your productivity with our professional office supplies. Designed for the modern workplace, they combine functionality with style. Quality construction ensures reliable daily performance.",
    "Organize your workspace with premium office essentials. Each product is designed to enhance efficiency and create a more productive environment. Ergonomic designs reduce strain.",
    "Take your work to the next level with our curated office collection. From organization to comfort, we've got everything you need for success. Professional quality at accessible prices.",
    "Create your ideal workspace with our comprehensive office range. Quality materials and thoughtful design make work easier and more enjoyable. Suitable for home and corporate offices.",
    "Work smarter with office supplies that deliver results. Our products are tested for durability and performance. Eco-friendly options available for environmentally conscious businesses."
  ],
  "outdoor": [
    "Explore the great outdoors with our adventure-ready gear. Built to withstand the elements, it provides reliability and performance when you need it most. Lightweight and portable for easy transport.",
    "Connect with nature using our premium outdoor collection. Designed by outdoor enthusiasts, each product is tested in real-world conditions. Durable materials and weather-resistant construction.",
    "Adventure awaits with gear you can trust. Our outdoor products combine innovation with proven designs for the best experience. Safety features and quality construction included.",
    "Make the most of outdoor living with our essential products. From camping to gardening, we have everything you need. Easy to use and maintain for all skill levels.",
    "Embrace outdoor adventures with confidence. Our rugged, reliable products are designed to enhance your connection with nature. Sustainable materials and responsible manufacturing."
  ]
};

const productSpecifications: Record<string, Record<string, string[]>> = {
  "health": {
    "Form": ["Capsules", "Tablets", "Powder", "Liquid", "Softgels", "Gummies"],
    "Serving Size": ["1 Capsule", "2 Tablets", "1 Scoop (30g)", "1 Tablespoon", "2 Gummies"],
    "Servings Per Container": ["30", "60", "90", "120", "180"],
    "Certification": ["GMP Certified", "FDA Approved Facility", "USDA Organic", "NSF Certified", "Non-GMO Verified"],
    "Storage": ["Store in cool, dry place", "Refrigerate after opening", "Keep away from sunlight", "Room temperature"],
    "Allergens": ["Gluten-Free", "Dairy-Free", "Soy-Free", "Nut-Free", "Vegan"]
  },
  "beauty": {
    "Skin Type": ["All Skin Types", "Oily Skin", "Dry Skin", "Sensitive Skin", "Combination Skin"],
    "Volume": ["30ml", "50ml", "100ml", "200ml", "250ml"],
    "Key Ingredients": ["Hyaluronic Acid", "Retinol", "Vitamin C", "Niacinamide", "Peptides", "Collagen"],
    "Formulation": ["Water-Based", "Oil-Based", "Gel", "Cream", "Serum", "Mist"],
    "Cruelty-Free": ["Yes - Certified", "Vegan Formula", "Not Tested on Animals"],
    "Usage": ["Daily Use", "Twice Daily", "Weekly Treatment", "As Needed"]
  },
  "fashion": {
    "Material": ["100% Cotton", "Polyester Blend", "Linen", "Silk", "Wool", "Cashmere", "Denim"],
    "Fit": ["Regular Fit", "Slim Fit", "Relaxed Fit", "Oversized", "Tailored"],
    "Care": ["Machine Washable", "Hand Wash Only", "Dry Clean Only", "Tumble Dry Low"],
    "Origin": ["Made in Bangladesh", "Imported", "Handcrafted", "Locally Sourced"],
    "Season": ["All Season", "Spring/Summer", "Fall/Winter", "Year-Round"],
    "Closure": ["Button", "Zipper", "Pull-On", "Hook & Eye", "Snap"]
  },
  "electronics": {
    "Connectivity": ["Bluetooth 5.3", "WiFi 6E", "USB-C", "NFC", "5G Compatible"],
    "Battery Life": ["8 Hours", "12 Hours", "24 Hours", "48 Hours", "Rechargeable Li-Ion"],
    "Display": ["LCD", "OLED", "LED", "AMOLED", "Retina", "4K UHD"],
    "Processor": ["Latest Gen Chip", "Dual Core", "Quad Core", "Octa Core"],
    "Memory": ["4GB RAM", "8GB RAM", "16GB RAM", "32GB Storage", "64GB Storage", "128GB Storage"],
    "Warranty": ["1 Year", "2 Years", "3 Years", "Extended Available", "Lifetime Limited"]
  },
  "home": {
    "Material": ["Stainless Steel", "Wood", "Plastic", "Glass", "Ceramic", "Fabric", "Metal"],
    "Dimensions": ["Compact", "Standard", "Large", "Extra Large", "Adjustable"],
    "Color Options": ["Multiple Colors", "Natural Wood", "White", "Black", "Gray", "Custom"],
    "Assembly": ["Fully Assembled", "Easy Assembly", "Professional Assembly", "No Tools Required"],
    "Weight Capacity": ["Up to 25kg", "Up to 50kg", "Up to 100kg", "Heavy Duty"],
    "Care": ["Wipe Clean", "Dishwasher Safe", "Hand Wash", "Spot Clean Only"]
  },
  "sports": {
    "Material": ["High-Density Foam", "Carbon Fiber", "Aluminum", "Synthetic", "Rubber", "Leather"],
    "Weight": ["Lightweight", "Ultra Light", "Standard", "Heavy Duty"],
    "Skill Level": ["Beginner", "Intermediate", "Advanced", "Professional", "All Levels"],
    "Size": ["Youth", "Adult Small", "Adult Medium", "Adult Large", "Adjustable"],
    "Durability": ["Indoor Use", "Outdoor Use", "All Weather", "Competition Grade"],
    "Certification": ["ISO Certified", "Professional Grade", "Safety Tested", "Tournament Approved"]
  },
  "food": {
    "Net Weight": ["100g", "250g", "500g", "1kg", "2kg"],
    "Shelf Life": ["6 Months", "12 Months", "18 Months", "24 Months", "Best Before Date"],
    "Dietary": ["Organic", "Gluten-Free", "Vegan", "Keto-Friendly", "Low Sodium", "Sugar-Free"],
    "Storage": ["Store in Cool, Dry Place", "Refrigerate", "Freeze", "Room Temperature"],
    "Origin": ["Product of Bangladesh", "Imported", "Local Farm", "Mixed Origin"],
    "Certifications": ["BSTI Approved", "Halal Certified", "Organic Certified", "ISO 22000"]
  },
  "tools": {
    "Material": ["Chrome Vanadium Steel", "Carbon Steel", "Aluminum", "Titanium", "Hardened Steel"],
    "Handle": ["Rubber Grip", "Wooden Handle", "Ergonomic Design", "Non-Slip", "Comfort Grip"],
    "Power": ["Manual", "Cordless", "Electric 110V", "Electric 220V", "Pneumatic"],
    "Weight": ["0.5kg", "1kg", "2kg", "5kg", "Heavy Duty"],
    "Warranty": ["1 Year", "2 Years", "5 Years", "Lifetime", "Limited Warranty"],
    "Certification": ["CE Certified", "ISO 9001", "Safety Tested", "Professional Grade"]
  },
  "pets": {
    "Pet Type": ["Dogs", "Cats", "Birds", "Fish", "Small Animals", "All Pets"],
    "Size/Weight": ["Small Pets (0-10kg)", "Medium Pets (10-25kg)", "Large Pets (25kg+)", "Universal"],
    "Age": ["Puppy/Kitten", "Adult", "Senior", "All Life Stages"],
    "Material": ["Food Grade", "Non-Toxic", "Natural Ingredients", "Hypoallergenic"],
    "Quantity": ["Pack of 1", "Pack of 5", "Pack of 10", "Bulk Pack"],
    "Veterinary": ["Vet Recommended", "Clinically Tested", "Approved Ingredients"]
  },
  "baby": {
    "Age Range": ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years", "2-4 Years"],
    "Material": ["Organic Cotton", "BPA-Free Plastic", "Natural Rubber", "Bamboo Fiber", "Hypoallergenic"],
    "Safety": ["CPSC Certified", "EN71 Tested", "Non-Toxic", "Lead-Free", "Phthalate-Free"],
    "Size": ["Newborn", "Small", "Medium", "Large", "Adjustable"],
    "Care": ["Machine Washable", "Hand Wash", "Wipe Clean", "Sterilizable"],
    "Certification": ["Pediatrician Approved", "Dermatologist Tested", "ASTM Certified"]
  },
  "office": {
    "Material": ["Recycled Paper", "Plastic", "Metal", "Wood", "Leather"],
    "Dimensions": ["A4", "A5", "Letter Size", "Legal Size", "Custom"],
    "Capacity": ["50 Sheets", "100 Sheets", "200 Sheets", "500 Sheets"],
    "Color": ["Black", "Blue", "Red", "Assorted", "Custom Colors"],
    "Compatibility": ["Universal", "Standard", "Specific Model", "Multi-Purpose"],
    "Eco-Friendly": ["Recycled Materials", "FSC Certified", "Biodegradable", "Refillable"]
  },
  "outdoor": {
    "Material": ["Ripstop Nylon", "Polyester", "Aluminum Frame", "Stainless Steel", "Weather-Resistant"],
    "Weight": ["Ultralight", "Lightweight", "Standard", "Heavy Duty"],
    "Capacity": ["1-2 Person", "2-4 Person", "4-6 Person", "6+ Person", "Variable"],
    "Weather Rating": ["3-Season", "4-Season", "All Weather", "Waterproof", "UV Resistant"],
    "Portability": ["Foldable", "Compact", "Carry Bag Included", "Easy Transport"],
    "Warranty": ["1 Year", "2 Years", "5 Years", "Lifetime", "Limited Warranty"]
  }
};

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
  if (slug.includes("health") || slug.includes("vitamin") || slug.includes("medical") || slug.includes("supplement") || slug.includes("protein") || slug.includes("nutrition") || slug.includes("wellness") || slug.includes("therapy") || slug.includes("immunity") || slug.includes("digestive") || slug.includes("joint") || slug.includes("heart") || slug.includes("brain")) return "health";
  if (slug.includes("cosmetic") || slug.includes("beauty") || slug.includes("skin") || slug.includes("makeup") || slug.includes("hair") || slug.includes("nail") || slug.includes("fragrance") || slug.includes("perfume") || slug.includes("bath") || slug.includes("body") || slug.includes("grooming") || slug.includes("shaving") || slug.includes("styling")) return "beauty";
  if (slug.includes("fashion") || slug.includes("wear") || slug.includes("clothing") || slug.includes("dress") || slug.includes("shirt") || slug.includes("sock") || slug.includes("belt") || slug.includes("tie") || slug.includes("scarf") || slug.includes("hat") || slug.includes("glove") || slug.includes("jacket") || slug.includes("coat") || slug.includes("shoes") || slug.includes("boots") || slug.includes("footwear") || slug.includes("sandals") || slug.includes("sneakers") || slug.includes("heels")) return "fashion";
  if (slug.includes("electronic") || slug.includes("laptop") || slug.includes("phone") || slug.includes("tablet") || slug.includes("camera") || slug.includes("audio") || slug.includes("smart") || slug.includes("computer") || slug.includes("mobile") || slug.includes("storage") || slug.includes("network") || slug.includes("printer") || slug.includes("projector") || slug.includes("tv") || slug.includes("drone") || slug.includes("vr") || slug.includes("robot") || slug.includes("speaker") || slug.includes("headphone") || slug.includes("charger")) return "electronics";
  if (slug.includes("home") || slug.includes("living") || slug.includes("bedroom") || slug.includes("kitchen") || slug.includes("bathroom") || slug.includes("dining") || slug.includes("lighting") || slug.includes("decor") || slug.includes("storage") || slug.includes("cleaning") || slug.includes("laundry") || slug.includes("cookware") || slug.includes("bakeware") || slug.includes("tableware") || slug.includes("drinkware") || slug.includes("appliance") || slug.includes("furniture") || slug.includes("bedding") || slug.includes("towel") || slug.includes("curtain") || slug.includes("rug") || slug.includes("mirror") || slug.includes("clock") || slug.includes("frame")) return "home";
  if (slug.includes("sport") || slug.includes("fitness") || slug.includes("gym") || slug.includes("yoga") || slug.includes("running") || slug.includes("cycling") || slug.includes("swimming") || slug.includes("golf") || slug.includes("martial") || slug.includes("water-sport") || slug.includes("winter-sport") || slug.includes("basketball") || slug.includes("soccer") || slug.includes("tennis") || slug.includes("volleyball") || slug.includes("boxing") || slug.includes("wrestling")) return "sports";
  if (slug.includes("food") || slug.includes("grocery") || slug.includes("snack") || slug.includes("beverage") || slug.includes("breakfast") || slug.includes("dairy") || slug.includes("bakery") || slug.includes("frozen") || slug.includes("canned") || slug.includes("condiment") || slug.includes("organic") || slug.includes("tea") || slug.includes("coffee") || slug.includes("wine") || slug.includes("beer") || slug.includes("energy-bar")) return "food";
  if (slug.includes("tool") || slug.includes("hardware") || slug.includes("power") || slug.includes("hand") || slug.includes("measuring") || slug.includes("safety") || slug.includes("plumbing") || slug.includes("electrical") || slug.includes("paint") || slug.includes("fastener") || slug.includes("woodwork") || slug.includes("drill") || slug.includes("saw") || slug.includes("hammer") || slug.includes("wrench")) return "tools";
  if (slug.includes("pet") || slug.includes("dog") || slug.includes("cat") || slug.includes("bird") || slug.includes("fish") || slug.includes("reptile") || slug.includes("hamster") || slug.includes("rabbit")) return "pets";
  if (slug.includes("baby") || slug.includes("nursery") || slug.includes("maternity") || slug.includes("diaper") || slug.includes("stroller") || slug.includes("infant") || slug.includes("toddler")) return "baby";
  if (slug.includes("office") || slug.includes("stationery") || slug.includes("school") || slug.includes("desk") || slug.includes("pen") || slug.includes("notebook") || slug.includes("binder") || slug.includes("calculator")) return "office";
  if (slug.includes("outdoor") || slug.includes("garden") || slug.includes("camping") || slug.includes("hiking") || slug.includes("tent") || slug.includes("backpack") || slug.includes("climbing") || slug.includes("navigation") || slug.includes("grill") || slug.includes("pool") || slug.includes("patio") || slug.includes("lawn") || slug.includes("fence")) return "outdoor";
  return "home";
}

function generateProductSpecifications(categoryType: string, random: () => number): Record<string, string> {
  const specs = productSpecifications[categoryType] || productSpecifications["home"];
  const result: Record<string, string> = {};
  
  for (const [key, values] of Object.entries(specs)) {
    result[key] = values[Math.floor(random() * values.length)];
  }
  
  return result;
}

function generateProductDescription(categoryType: string, productName: string, categoryName: string, random: () => number): string {
  const descriptions = productDescriptions[categoryType] || productDescriptions["home"];
  const baseDescription = descriptions[Math.floor(random() * descriptions.length)];
  return `${baseDescription}\n\nThe ${productName} from our ${categoryName} collection represents the pinnacle of quality and value. Whether you're a first-time buyer or a loyal customer, you'll appreciate the attention to detail and superior craftsmanship that goes into every product we offer.`;
}

function generateMultipleImages(productId: number): string[] {
  const totalImages = categoryImageUrls.length;
  const images: string[] = [];
  
  for (let i = 0; i < 4; i++) {
    const imageIndex = (productId + i * 7) % totalImages;
    images.push(categoryImageUrls[imageIndex]);
  }
  
  return images;
}

function generateProducts(count: number = 10000): Product[] {
  const generatedProducts: Product[] = [];
  const random = seededRandom(42);
  const usedSlugs = new Set<string>();
  const usedIds = new Set<string>();
  let productId = 0;

  const allCategories = [...categories];
  const totalCategories = allCategories.length;
  
  while (generatedProducts.length < count) {
    for (const category of allCategories) {
      if (generatedProducts.length >= count) break;
      
      const categoryType = getCategoryType(category.slug);
      const nouns = productNouns[categoryType] || productNouns["home"];
      
      const productsPerCategory = Math.ceil(count / totalCategories) + 5;
      
      for (let i = 0; i < productsPerCategory && generatedProducts.length < count; i++) {
        const adj1 = productAdjectives[Math.floor(random() * productAdjectives.length)];
        const adj2 = productAdjectives[Math.floor(random() * productAdjectives.length)];
        const noun = nouns[Math.floor(random() * nouns.length)];
        const variant = Math.floor(random() * 10000);
        
        const productName = `${adj1} ${adj2} ${noun}`;
        const productSlug = `${productName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${variant}`;
        
        if (usedSlugs.has(productSlug)) continue;
        usedSlugs.add(productSlug);
        
        productId++;
        const productIdStr = `p${productId}`;
        
        if (usedIds.has(productIdStr)) continue;
        usedIds.add(productIdStr);
        
        const palette = colorPalettes[productId % colorPalettes.length];
        const basePrice = Math.floor(random() * 9500) + 99;
        const hasDiscount = random() > 0.55;
        
        const imageIndex = productId % categoryImageUrls.length;
        const image = categoryImageUrls[imageIndex];
        const images = generateMultipleImages(productId);
        
        const shortDescription = `${productName} - Premium quality ${noun.toLowerCase()} with excellent features designed for ${category.name}. Trusted by thousands of satisfied customers.`;
        const fullDescription = generateProductDescription(categoryType, productName, category.name, random);
        const specifications = generateProductSpecifications(categoryType, random);

        generatedProducts.push({
          id: productIdStr,
          name: `${productName} - ${category.name}`,
          slug: productSlug,
          category: category.name,
          categorySlug: category.slug,
          price: basePrice,
          originalPrice: hasDiscount ? basePrice + Math.floor(random() * 2000) + 100 : undefined,
          rating: Number((random() * 1.8 + 3.2).toFixed(1)),
          reviews: Math.floor(random() * 15000) + 5,
          image: image,
          images: images,
          colors: [
            { name: "Primary", value: palette.accent },
            { name: "Secondary", value: colorPalettes[(productId + 3) % colorPalettes.length].accent },
            { name: "Neutral", value: "#6B7280" },
          ],
          sizes: random() > 0.5 ? ["S", "M", "L", "XL", "XXL"] : ["One Size"],
          description: fullDescription,
          shortDescription: shortDescription,
          specifications: specifications,
          inStock: random() > 0.05,
          stock: Math.floor(random() * 500) + 1,
          isNew: random() > 0.85,
          isBestseller: random() > 0.92,
          isFeatured: random() > 0.95,
          has3D: random() > 0.7,
          model3dType: ["box", "sphere", "torus", "cylinder"][Math.floor(random() * 4)] as "box" | "sphere" | "torus" | "cylinder",
          vendorName: vendors[Math.floor(random() * vendors.length)],
          tags: [category.slug, "trending", "quality", "premium", categoryType],
          badgeColor: palette.name,
          animation: animations[Math.floor(random() * animations.length)],
        });
      }
    }
  }

  return shuffleWithSeed(generatedProducts, seededRandom(123));
}

export const products: Product[] = generateProducts(10000);

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
