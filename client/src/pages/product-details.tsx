import { Navbar } from "@/components/navbar";
import { ProductViewer } from "@/components/3d/product-viewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Heart, Share2, ShieldCheck, Truck, 
  RotateCcw, Zap, Box, Cuboid, ScanFace, Check, Star, Minus, Plus, Sparkles, Play, Image, ChevronLeft, ChevronRight,
  Gift, ShoppingBasket, Percent, Loader2
} from "lucide-react";
import { useRoute, Link } from "wouter";
import { useState, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
import { getRelatedCombos } from "@/lib/combo-utils";
import { useQuery } from "@tanstack/react-query";

interface DbProduct {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  shortDescription?: string | null;
  price: number;
  originalPrice: number | null;
  categoryId: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  stock?: number | null;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isActive: boolean;
  vendorName?: string | null;
  has3D?: boolean;
  model3dType?: string;
  colors?: { name: string; value: string }[];
  sizes?: string[];
  category?: string;
}

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const productId = params?.id || "";

  const { data: product, isLoading, isError, error } = useQuery<DbProduct | null>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}`);
      if (res.status === 404) {
        return null;
      }
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    enabled: !!productId,
  });
  
  const [selectedColor, setSelectedColor] = useState("#D3C1E7");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [hasPurchased] = useState(false);
  
  const { addItem } = useCart();
  
  const relatedCombos = useMemo(() => product ? getRelatedCombos(product.id, 4) : [], [product?.id]);
  const hasCombos = relatedCombos.length > 0;

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || "",
      selectedColor,
      selectedSize,
    }, quantity);
    
    setTimeout(() => setIsAddingToCart(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-foreground flex items-center justify-center">
        <Navbar />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-foreground flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Failed to Load Product</h1>
          <p className="text-white/60 mb-6">Something went wrong while loading this product. Please try again.</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-foreground flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const colors = product.colors || [
    { name: "Default", value: "#D3C1E7" },
    { name: "Midnight Black", value: "#1A1222" },
    { name: "Neon Blue", value: "#3b82f6" },
  ];

  const sizes = product.sizes || [];
  const productImage = product.images?.[0] || "";
  const productImages = product.images?.length ? product.images : [productImage, productImage, productImage, productImage];

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden relative shadow-2xl shadow-purple-500/10"
            >
              {showVideo ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    src="https://videos.pexels.com/video-files/4388331/4388331-sd_small.mp4"
                  />
                </div>
              ) : (
                <ProductViewer 
                  color={selectedColor} 
                  productType={product.model3dType || "box"}
                />
              )}
              
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className={`rounded-full backdrop-blur-xl border ${showVideo ? 'bg-pink-500/30 border-pink-500/50' : 'bg-white/10 hover:bg-white/20 border-white/10'}`}
                  onClick={() => setShowVideo(!showVideo)}
                  title={showVideo ? "View Product" : "View Video"}
                  data-testid="video-button"
                >
                  {showVideo ? <Image className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4"
            >
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`aspect-square rounded-lg md:rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                    activeImageIndex === i 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    alt={`${product.name} view ${i + 1}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-xs md:text-sm">
                    New Arrival
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none text-xs md:text-sm">
                    Bestseller
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight" data-testid="product-name">
                {product.name}
              </h1>
              
              {product.vendorName && (
                <p className="text-white/50 text-sm mb-4">
                  Sold by <span className="text-purple-400">{product.vendorName}</span>
                </p>
              )}
              
              <div className="flex items-end gap-2 md:gap-4 mb-6 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-testid="product-price">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg md:text-xl text-white/40 line-through mb-1">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/20 text-xs md:text-sm">
                      Save ৳{(product.originalPrice - product.price).toLocaleString()}
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
              className="space-y-4 md:space-y-6 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm"
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
              className="flex flex-col gap-3 md:gap-4"
            >
              <div className="flex gap-2 md:gap-4 flex-wrap md:flex-nowrap">
                <Button 
                  size="lg" 
                  className="flex-1 min-h-12 md:h-14 text-sm md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:shadow-purple-500/50"
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
                        className="flex items-center text-xs md:text-base"
                      >
                        <Check className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" /> Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center text-xs md:text-base"
                      >
                        <ShoppingCart className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
                <Button 
                  size="icon"
                  className="h-12 w-12 md:h-14 md:w-14 border-white/20 bg-white/5 hover:bg-white/10 hover:border-pink-500/30 rounded-lg md:rounded-xl"
                  data-testid="wishlist-button"
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
                <Button 
                  size="icon"
                  className="h-12 w-12 md:h-14 md:w-14 border-white/20 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl"
                  data-testid="share-button"
                >
                  <Share2 className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full min-h-12 md:h-12 text-xs md:text-sm font-medium rounded-lg md:rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 hover:from-orange-500/30 hover:to-yellow-500/30"
                data-testid="crypto-button"
              >
                <Zap className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" /> Buy with Crypto
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
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none p-0 h-auto overflow-x-auto">
              {["description", "features", "specifications", "reviews"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="px-4 md:px-8 py-3 md:py-4 rounded-t-lg text-xs md:text-sm data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-all capitalize whitespace-nowrap"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-4 md:p-8 bg-gradient-to-br from-white/5 to-transparent rounded-b-2xl border-x border-b border-white/10 min-h-[300px]">
              <TabsContent value="description" className="mt-0 space-y-6">
                <h3 className="text-2xl font-heading font-bold text-white">Product Description</h3>
                <div className="prose prose-invert max-w-none">
                  {product.description ? (
                    <div className="space-y-4">
                      {product.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-white/70 leading-relaxed text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70 leading-relaxed">
                      {product.shortDescription || `Discover the ${product.name} - a premium product designed to meet your needs with exceptional quality and value.`}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-white/10">
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-purple-400">{product.reviewCount.toLocaleString()}</div>
                    <div className="text-sm text-white/50">Reviews</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-pink-400">{product.rating}</div>
                    <div className="text-sm text-white/50">Rating</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-green-400">{product.stock}</div>
                    <div className="text-sm text-white/50">In Stock</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-cyan-400">{product.colors?.length || 1}</div>
                    <div className="text-sm text-white/50">Colors</div>
                  </div>
                </div>
              </TabsContent>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">Category</span>
                        <span className="text-white font-medium">{product.category}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">SKU</span>
                        <span className="text-white font-medium">{product.id}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">Vendor</span>
                        <span className="text-white font-medium">{product.vendorName || "NexCommerce"}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">Rating</span>
                        <span className="text-white font-medium">{product.rating} / 5.0</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">Stock Status</span>
                        <span className="text-green-400 font-medium">{product.inStock ? `${product.stock} available` : "Out of Stock"}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/50">Colors</span>
                        <span className="text-white font-medium">{product.colors?.length || 1} options</span>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-heading font-bold text-white">Customer Reviews</h3>
                  {hasPurchased ? (
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Write a Review</Button>
                  ) : (
                    <div className="text-sm text-white/50 italic">Only purchasers can write reviews</div>
                  )}
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

        {/* Available Combo Packages */}
        {hasCombos && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-12 md:mt-20"
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <ShoppingBasket className="w-5 h-5 text-purple-400" />
                </div>
                Available in Combo Packages
              </h3>
              <Link href="/combo">
                <span className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 cursor-pointer">
                  View All Combos
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedCombos.map((combo, idx) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all group"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {combo.badge && (
                          <Badge className={`bg-gradient-to-r ${combo.badgeColor} text-white border-0 text-xs mb-2`}>
                            {combo.badge}
                          </Badge>
                        )}
                        <h4 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-purple-300 transition-colors">
                          {combo.name}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex -space-x-2">
                        {combo.products.slice(0, 4).map((p, i) => (
                          <img
                            key={p.id}
                            src={p.image}
                            alt={p.name}
                            className="w-8 h-8 rounded-lg border-2 border-slate-800 object-cover"
                            style={{ zIndex: 4 - i }}
                          />
                        ))}
                        {combo.products.length > 4 && (
                          <div className="w-8 h-8 rounded-lg border-2 border-slate-800 bg-purple-500/30 flex items-center justify-center text-xs text-purple-300 font-bold">
                            +{combo.products.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-white/50 text-xs">{combo.products.length} items</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-white/40 text-xs line-through block">৳{combo.originalPrice.toLocaleString()}</span>
                        <span className="text-lg font-bold text-white">৳{combo.comboPrice.toLocaleString()}</span>
                      </div>
                      <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        {combo.savingsPercent}% OFF
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => {
                        addItem({
                          id: combo.id,
                          name: `${combo.name} (${combo.products.length} items)`,
                          price: combo.comboPrice,
                          originalPrice: combo.originalPrice,
                          image: combo.products[0]?.image || "",
                        }, 1);
                      }}
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold"
                    >
                      <Gift className="w-4 h-4 mr-1" />
                      Add Combo
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Similar Products - Auto-scroll Left to Right */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 md:mt-20"
        >
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-6 md:mb-8">Similar Products</h3>
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl">
              <motion.div 
                className="flex gap-4"
                animate={{ x: ["-100%", "0%"] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...products.filter(p => p.categorySlug === product.categorySlug).slice(0, 8), ...products.filter(p => p.categorySlug === product.categorySlug).slice(0, 8)].map((p, idx) => (
                  <Link key={`${p.id}-${idx}`} href={`/product/${p.id}`}>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      className="flex-shrink-0 w-48 group/card cursor-pointer"
                    >
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-3 hover:border-purple-500/30 transition-all">
                        <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden mb-3 relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-300" />
                          <div className="absolute top-2 left-2 flex gap-1">
                            {p.isNew && <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-xs"><Zap className="w-2 h-2 mr-0.5" /> New</Badge>}
                            {p.isBestseller && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none text-xs">⭐ Best</Badge>}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-white line-clamp-2 mb-1">{p.name}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-white/50">({p.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">৳{p.price}</span>
                          {p.originalPrice && <span className="text-xs text-white/40 line-through">৳{p.originalPrice}</span>}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Top Products - Auto-scroll Right to Left */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-20 pb-12 md:pb-20"
        >
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-6 md:mb-8">Top Products</h3>
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl">
              <motion.div 
                className="flex gap-4"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...products.filter(p => p.isBestseller).slice(0, 8), ...products.filter(p => p.isBestseller).slice(0, 8)].map((p, idx) => (
                  <Link key={`${p.id}-${idx}`} href={`/product/${p.id}`}>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      className="flex-shrink-0 w-48 group/card cursor-pointer"
                    >
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-3 hover:border-pink-500/30 transition-all">
                        <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden mb-3 relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-300" />
                          <div className="absolute top-2 left-2 flex gap-1">
                            {p.isNew && <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none text-xs"><Zap className="w-2 h-2 mr-0.5" /> New</Badge>}
                            {p.isBestseller && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none text-xs">⭐ Top</Badge>}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-white line-clamp-2 mb-1">{p.name}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-white/50">({p.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">৳{p.price}</span>
                          {p.originalPrice && <span className="text-xs text-white/40 line-through">৳{p.originalPrice}</span>}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
