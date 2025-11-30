import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useState } from "react";

interface ProductCard3DProps {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

export function ProductCard3D({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  badge,
  onAddToCart,
  onAddToWishlist,
}: ProductCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 right-2 z-20 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white"
          >
            {badge}
          </motion.div>
        )}

        {/* Product Image */}
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* 3D Floating Elements (animated backgrounds) */}
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent)]"
            />
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </>
        )}

        {/* Action Buttons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsWishlisted(!isWishlisted);
              onAddToWishlist?.();
            }}
            className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border-2 transition-all ${
              isWishlisted
                ? "bg-red-500/20 border-red-500 text-red-400"
                : "bg-white/10 border-white/30 text-white hover:border-white/50"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <motion.div
        className="p-3 bg-gradient-to-b from-slate-900/50 to-slate-950 rounded-b-xl"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Name */}
        <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/20"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-white/60">({reviews})</span>
        </div>

        {/* Price */}
        <motion.div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {price}
          </span>
          <span className="text-xs text-white/40 line-through">৳2,000</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProductCard3D;
