import { Navbar } from "@/components/navbar";
import { ProductViewer } from "@/components/3d/product-viewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, getProductById } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Heart, Share2, ShieldCheck, Truck, 
  RotateCcw, Zap, Box, Cuboid, ScanFace, Check, Star, Minus, Plus, Sparkles
} from "lucide-react";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const product = getProductById(params?.id || "") || products[0];
  
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value || "#D3C1E7");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      selectedColor,
      selectedSize,
    }, quantity);
    
    setTimeout(() => setIsAddingToCart(false), 1500);
  };

  const colors = product.colors || [
    { name: "Default", value: "#D3C1E7" },
    { name: "Midnight Black", value: "#1A1222" },
    { name: "Neon Blue", value: "#3b82f6" },
  ];

  const sizes = product.sizes || [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground selection:bg-primary selection:text-white pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/40 mb-8"
        >
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-400 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-white/70">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[500px] lg:h-[600px] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden relative shadow-2xl shadow-purple-500/10"
            >
              <ProductViewer 
                color={selectedColor} 
                productType={product.model3dType || "box"}
              />
              
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10" 
                  title="View in AR"
                  data-testid="ar-button"
                >
                  <Cuboid className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10" 
                  title="Try On"
                  data-testid="tryon-button"
                >
                  <ScanFace className="w-5 h-5" />
                </Button>
              </div>
              
              {product.has3D && (
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-xl border-none text-white">
                    <Box className="w-3 h-3 mr-1" /> Interactive 3D Model
                  </Badge>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-4 gap-4"
            >
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                    activeImageIndex === i 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover" 
                    alt={`${product.name} view ${i + 1}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none">
                      New Arrival
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                      Bestseller
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <Star 
                        key={s} 
                        className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span className="text-white/40 text-sm">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight" data-testid="product-name">
                {product.name}
              </h1>
              
              {product.vendorName && (
                <p className="text-white/50 text-sm mb-4">
                  Sold by <span className="text-purple-400">{product.vendorName}</span>
                </p>
              )}
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-testid="product-price">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-white/40 line-through mb-1">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/20">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
              
              {product.shortDescription && (
                <p className="text-white/60 leading-relaxed mb-6">
                  {product.shortDescription}
                </p>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm"
            >
              {colors.length > 1 && (
                <div>
                  <label className="text-sm font-medium text-white/60 mb-3 block">
                    Color: <span className="text-white">{colors.find(c => c.value === selectedColor)?.name}</span>
                  </label>
                  <div className="flex gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.value)}
                        className={`w-10 h-10 rounded-full transition-all duration-300 ${
                          selectedColor === c.value 
                            ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0a0a0f] scale-110' 
                            : 'opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                        data-testid={`color-${c.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {sizes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-white/60 mb-3 block">
                    Size: <span className="text-white">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedSize === size 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                            : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                        }`}
                        data-testid={`size-${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-white/60 mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg hover:bg-white/10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      data-testid="decrease-quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-white" data-testid="quantity">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg hover:bg-white/10"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="increase-quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {product.stock && (
                    <span className="text-sm text-white/40">
                      {product.stock} available
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 rounded-xl font-semibold transition-all duration-300 hover:shadow-purple-500/50"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  data-testid="add-to-cart-button"
                >
                  <AnimatePresence mode="wait">
                    {isAddingToCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Check className="mr-2 w-5 h-5" /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 w-14 border-white/20 bg-white/5 hover:bg-white/10 hover:border-pink-500/30 rounded-xl"
                  data-testid="wishlist-button"
                >
                  <Heart className="w-6 h-6" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 w-14 border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                  data-testid="share-button"
                >
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full h-12 font-medium rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 hover:from-orange-500/30 hover:to-yellow-500/30"
                data-testid="crypto-button"
              >
                <Zap className="mr-2 w-4 h-4" /> Buy Now with Crypto (Web3)
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            >
              {[
                { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
                { icon: ShieldCheck, text: "Verified", subtext: "Authenticity guaranteed" },
                { icon: RotateCcw, text: "30-Day Returns", subtext: "Easy returns" },
              ].map(({ icon: Icon, text, subtext }) => (
                <div key={text} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Icon className="w-6 h-6 text-purple-400" />
                  <span className="text-sm font-medium text-white">{text}</span>
                  <span className="text-xs text-white/40">{subtext}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none p-0 h-auto">
              {["features", "specifications", "reviews"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="px-8 py-4 rounded-t-lg data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-all capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-b-2xl border-x border-b border-white/10 min-h-[300px]">
              <TabsContent value="features" className="mt-0 space-y-6">
                <h3 className="text-2xl font-heading font-bold text-white">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "AI-Enhanced Performance Optimization",
                    "Premium Build Quality & Materials",
                    "Advanced Security Features",
                    "Eco-Friendly Manufacturing",
                    "Industry-Leading Warranty",
                    "24/7 Premium Support"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-purple-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="mt-0 space-y-6">
                <h3 className="text-2xl font-heading font-bold text-white">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50">Specifications coming soon...</p>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="mt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-heading font-bold text-white">Customer Reviews</h3>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Write a Review</Button>
                </div>
                <div className="flex items-center gap-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">{product.rating}</div>
                    <div className="flex mt-2">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-5 h-5 ${s <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                      ))}
                    </div>
                    <div className="text-white/40 mt-1">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(rating => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-white/50 w-8">{rating} ★</span>
                        <div className="flex-1 h-2 rounded-full bg-white/10">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
