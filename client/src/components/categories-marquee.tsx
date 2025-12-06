import { motion } from "framer-motion";
import { Link } from "wouter";
import { categories } from "@/data/products";

export function CategoriesMarquee() {
  const displayCategories = [...categories, ...categories];

  return (
    <section className="py-6 overflow-hidden bg-gradient-to-r from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] border-y border-white/5">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {displayCategories.map((category, index) => (
            <Link
              key={`${category.slug}-${index}`}
              href={`/products?category=${category.slug}`}
              className="flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-medium text-white/80 group-hover:text-white whitespace-nowrap">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
