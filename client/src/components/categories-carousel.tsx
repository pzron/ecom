import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { 
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Ring, BookOpen, 
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy, 
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane, 
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone, 
  Activity, Baby
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Shirt, Sparkles, Home, Dumbbell, Gamepad2, Ring, BookOpen,
  Puzzle, Car, ShoppingCart, Pill, Sofa, Leaf, PawPrint, Trophy,
  Music, Palette, Wrench, Paperclip, PencilRuler, Tent, Plane,
  Footprints, Backpack, Frame, Lightbulb, ChefHat, Wind, Smartphone,
  Activity, Baby
};

export function CategoriesCarousel() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/10 border-b border-white/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Shop by Category</h2>
          <p className="text-white/60">Browse 34 categories with exclusive products</p>
        </motion.div>
        
        {/* Categories grid - 6-8 columns with custom logos */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {categories.map((category, idx) => {
            const IconComponent = iconMap[category.iconName] || Sparkles;
            
            return (
              <motion.a
                key={category.slug}
                href={`/products?category=${category.slug}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="group flex flex-col items-center justify-center gap-3 relative"
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg group-hover:blur-xl`} />
                
                {/* Icon container with gradient */}
                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg shadow-black/30 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 border border-white/20`}>
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" strokeWidth={1.5} />
                </div>
                
                {/* Category name */}
                <p className="text-xs md:text-sm font-semibold text-white/90 group-hover:text-white text-center line-clamp-2 transition-colors relative z-10 max-w-[80px]">
                  {category.name}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
