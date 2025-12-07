import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Watch, BookOpen, 
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy, 
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane, 
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone, 
  Activity, Baby, Box
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Watch, BookOpen,
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy,
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane,
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone,
  Activity, Baby, Box
};

const emojiToIcon: Record<string, string> = {
  "💊": "Pill",
  "💄": "Sparkles",
  "⚡": "Zap",
  "👔": "Shirt",
  "🏠": "Home",
  "🏋️": "Dumbbell",
  "🎮": "Gamepad2",
  "🧸": "Baby",
  "🐾": "PawPrint",
  "📚": "BookOpen",
  "🍔": "ChefHat",
  "🚗": "Car",
};

const gradients = [
  "from-green-600 to-teal-500",
  "from-pink-600 to-rose-500",
  "from-blue-600 to-cyan-500",
  "from-pink-600 to-rose-500",
  "from-amber-600 to-orange-500",
  "from-red-600 to-pink-500",
  "from-violet-600 to-purple-500",
  "from-pink-400 to-rose-400",
  "from-orange-600 to-pink-500",
  "from-blue-600 to-indigo-500",
  "from-orange-600 to-red-500",
  "from-gray-600 to-slate-500",
];

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export function HomeCategories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const mainCategories = categories.filter((cat: Category) => !cat.slug.includes("-sub-"));
  const duplicatedCategories = [...mainCategories, ...mainCategories];

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/10 border-b border-white/5 overflow-hidden">
        <div className="container mx-auto max-w-7xl mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Shop by Category
          </h2>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/10 border-b border-white/5 overflow-hidden">
      <div className="container mx-auto max-w-7xl mb-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
          Shop by Category
        </h2>
      </div>
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedCategories.map((category, idx) => {
            const iconName = emojiToIcon[category.icon || ""] || "Sparkles";
            const IconComponent = iconMap[iconName] || Sparkles;
            const gradient = gradients[idx % gradients.length];

            return (
              <motion.a
                key={`${category.slug}-${idx}`}
                href={`/products?category=${category.slug}`}
                whileHover={{ scale: 1.08, y: -5 }}
                className="group flex-shrink-0 w-24 md:w-28 flex flex-col items-center justify-center gap-2 relative"
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg`} />

                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br ${gradient} shadow-lg shadow-black/30 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 border border-white/20`}>
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                </div>

                <p className="text-xs md:text-sm font-semibold text-white/90 group-hover:text-white text-center line-clamp-2 transition-colors relative z-10 max-w-[90px]">
                  {category.name}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
