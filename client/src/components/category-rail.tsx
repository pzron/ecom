import { Link } from "wouter";
import { categories } from "@/data/products";
import * as Icons from "lucide-react";

export function CategoryRail() {
  return (
    <div className="w-full py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-scroll gap-4 md:gap-8 min-w-max px-4">
        {[...categories, ...categories].map((cat, idx) => {
          const Icon = (Icons as any)[cat.icon] || Icons.Box;
          return (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Icon className="w-8 h-8 text-muted-foreground group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-white transition-colors text-center max-w-[100px]">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
