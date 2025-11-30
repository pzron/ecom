import { AdvancedViewer3D } from "@/components/3d/advanced-3d-viewer";
import { ProductCard3D } from "@/components/product-card-3d";
import { motion } from "framer-motion";

export default function ShowcasePage() {
  const products = [
    { id: "1", name: "Premium Vitamin C Serum", price: "৳1,200", image: "https://via.placeholder.com/300x300?text=Vitamin+C", rating: 4.5, reviews: 120, badge: "Bestseller" },
    { id: "2", name: "Organic Face Moisturizer", price: "৳850", image: "https://via.placeholder.com/300x300?text=Moisturizer", rating: 4.2, reviews: 95 },
    { id: "3", name: "Arabic Coffee 1kg", price: "৳2,500", image: "https://via.placeholder.com/300x300?text=Coffee", rating: 4.8, reviews: 200, badge: "New" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            3D Product Showcase
          </h1>
          <p className="text-white/60 text-lg">Experience our products with advanced 3D visualization</p>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16 h-96 rounded-2xl overflow-hidden">
          <AdvancedViewer3D title="Interactive 3D Experience" />
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard3D
              key={product.id}
              {...product}
              onAddToCart={() => console.log(`Added ${product.name} to cart`)}
              onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
            />
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} transition={{ delay: 0.2 }} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "3D Visualization", desc: "Interactive 3D product models with real-time rotation" },
            { title: "Real-Time Calculations", desc: "Auto-calculated totals with tax, shipping & discounts" },
            { title: "Advanced Security", desc: "OAuth, Web3, OTP verification & data protection" },
          ].map((feature, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
