import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { 
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Watch, BookOpen, 
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy, 
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane, 
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone, 
  Activity, Baby
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Watch, BookOpen,
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy,
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane,
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone,
  Activity, Baby
};

export function HomeCategories() {
  // Duplicate categories for seamless loop
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/10 border-b border-white/5 overflow-hidden">
      {/* Auto-scrolling horizontal carousel */}
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
            const IconComponent = iconMap[category.iconName] || Sparkles;

            return (
              <motion.a
                key={`${category.slug}-${idx}`}
                href={`/products?category=${category.slug}`}
                whileHover={{ scale: 1.08, y: -5 }}
                className="group flex-shrink-0 w-24 md:w-28 flex flex-col items-center justify-center gap-2 relative"
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg`} />

                {/* Icon container with gradient */}
                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br ${category.gradient} shadow-lg shadow-black/30 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 border border-white/20`}>
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                </div>

                {/* Category name */}
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
