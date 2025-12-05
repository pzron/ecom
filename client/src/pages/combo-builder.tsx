import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { useState, useMemo, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { 
  ShoppingCart, 
  Trash2, 
  Plus,
  Check,
  AlertCircle,
  Package,
  Sparkles,
  Gift,
  Search,
  X,
  ShoppingBasket,
  Percent,
  ArrowRight
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { COMBO_CONFIG, calculateComboDiscount, getComboSavingsPercentage, isValidCombo } from "@/config/combos";

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

function FloatingBox({ position, index, color }: { position: [number, number, number]; index: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + index * 0.7) * 0.1;
      meshRef.current.rotation.y = time * 0.4 + index * 0.6;
      meshRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.5}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function CustomBasket3D({ products }: { products: SelectedProduct[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    }
  });

  const productPositions = useMemo((): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    const count = Math.min(products.length, 8);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.35 + (i % 2) * 0.12;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.4 + (i % 3) * 0.18;
      positions.push([x, y, z]);
    }
    return positions;
  }, [products.length]);

  const colors = ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.6, 0.8, 32, 1, true]} />
        <meshStandardMaterial color="#8B4513" side={THREE.DoubleSide} metalness={0.1} roughness={0.85} />
      </mesh>
      
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.6, 32]} />
        <meshStandardMaterial color="#6B3A0F" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.07, 12, 48]} />
        <meshStandardMaterial color="#A0522D" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {productPositions.map((pos, i) => (
        <FloatingBox key={i} position={pos} index={i} color={colors[i % colors.length]} />
      ))}
      
      {products.length > 0 && (
        <>
          <pointLight position={[0, 1.2, 0]} color="#a855f7" intensity={4} distance={4} />
          <pointLight position={[0, 0.6, 1.2]} color="#ec4899" intensity={3} distance={3} />
        </>
      )}
    </group>
  );
}

function Basket2DFallback({ productCount }: { productCount: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="relative">
        <svg viewBox="0 0 200 180" className="w-56 h-48" style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}>
          <defs>
            <linearGradient id="builderBasketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="builderBasketRim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>
          
          <ellipse cx="100" cy="165" rx="70" ry="12" fill="rgba(0,0,0,0.4)" />
          <path d="M30 55 Q20 100 35 150 Q55 170 100 170 Q145 170 165 150 Q180 100 170 55 Z" fill="url(#builderBasketGrad)" stroke="#92400e" strokeWidth="2" />
          <ellipse cx="100" cy="55" rx="70" ry="12" fill="url(#builderBasketRim)" />
          
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={38 + i * 17} y1="60" x2={35 + i * 17} y2="160" stroke="#451a03" strokeWidth="2" opacity="0.5" />
          ))}
          
          <path d="M45 55 Q30 20 100 5 Q170 20 155 55" stroke="url(#builderBasketRim)" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
        
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 w-28">
          {Array.from({ length: Math.min(productCount, 8) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring" }}
              className="w-7 h-7 rounded-lg"
              style={{ 
                backgroundColor: ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"][i],
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomBasketScene({ products }: { products: SelectedProduct[] }) {
  const [webglSupported, setWebglSupported] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);
  
  if (!webglSupported) {
    return <Basket2DFallback productCount={products.length} />;
  }
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 3.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: true }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl }) => {
          if (!gl.capabilities.isWebGL2 && !gl.capabilities.maxTextureSize) {
            setWebglSupported(false);
          }
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow />
          <directionalLight position={[-3, 4, -3]} intensity={0.6} color="#a855f7" />
          <pointLight position={[0, 3, 0]} intensity={0.4} color="#ec4899" />
          
          <CustomBasket3D products={products} />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function ComboBuilderPage() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addItem } = useCart();

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ["all", ...cats.filter(c => COMBO_CONFIG.ALLOWED_CATEGORIES.includes(c))];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const isAllowed = COMBO_CONFIG.ALLOWED_CATEGORIES.includes(p.category);
      const notSelected = !selectedProducts.find(sp => sp.id === p.id);
      return matchesCategory && matchesSearch && isAllowed && notSelected;
    });
  }, [selectedCategory, searchQuery, selectedProducts]);

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, p) => sum + p.price, 0);
  }, [selectedProducts]);

  const discount = useMemo(() => {
    return calculateComboDiscount(totalPrice, selectedProducts.length);
  }, [totalPrice, selectedProducts.length]);

  const discountPercent = useMemo(() => {
    return getComboSavingsPercentage(selectedProducts.length);
  }, [selectedProducts.length]);

  const finalPrice = totalPrice - discount;

  const validation = useMemo(() => {
    const categories = selectedProducts.map(p => p.category);
    return isValidCombo(totalPrice, selectedProducts.length, categories);
  }, [totalPrice, selectedProducts]);

  const addProduct = (product: typeof products[0]) => {
    if (selectedProducts.length >= COMBO_CONFIG.MAX_PRODUCTS) return;
    
    setSelectedProducts(prev => [...prev, {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }]);
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddToCart = () => {
    if (!validation.valid) return;
    
    const comboId = `custom-combo-${Date.now()}`;
    addItem({
      id: comboId,
      name: `Custom Combo (${selectedProducts.length} items)`,
      price: finalPrice,
      originalPrice: totalPrice,
      image: selectedProducts[0]?.image || "",
    }, 1);
    
    setSelectedProducts([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium">Custom Combo Builder</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Your Own
              </span>
              <br />
              <span className="text-white">Combo Package</span>
            </h1>
            
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Select {COMBO_CONFIG.MIN_PRODUCTS}-{COMBO_CONFIG.MAX_PRODUCTS} products to create your personalized bundle 
              and save up to 20% on your order!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-3xl border border-white/10 overflow-hidden"
              >
                <div className="h-80 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]" />
                  <CustomBasketScene products={selectedProducts} />
                  
                  <motion.div 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-amber-600/95 to-orange-600/95 px-5 py-2.5 rounded-full shadow-xl"
                    animate={{ scale: selectedProducts.length > 0 ? 1 : 0.9 }}
                  >
                    <ShoppingBasket className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">{selectedProducts.length} items</span>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-400" />
                    Your Custom Combo
                  </h3>
                  
                  <AnimatePresence mode="popLayout">
                    {selectedProducts.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 text-white/40"
                      >
                        <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Add products to build your combo</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {selectedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10"
                          >
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{product.name}</p>
                              <p className="text-purple-400 text-sm font-semibold">৳{product.price.toLocaleString()}</p>
                            </div>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                  
                  {selectedProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-6 border-t border-white/10"
                    >
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-white/60">
                          <span>Subtotal</span>
                          <span>৳{totalPrice.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span className="flex items-center gap-1">
                              <Percent className="w-4 h-4" />
                              Combo Discount ({discountPercent}%)
                            </span>
                            <span>-৳{discount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                          <span>Total</span>
                          <span>৳{finalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {!validation.valid && (
                        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                          {validation.errors.map((error, i) => (
                            <p key={i} className="text-amber-400 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              {error}
                            </p>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        onClick={handleAddToCart}
                        disabled={!validation.valid}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold py-4 text-base"
                      >
                        {validation.valid ? (
                          <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add Combo to Cart
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Complete Requirements
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-3xl border border-white/10 p-6"
              >
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/60 text-sm">
                    {filteredProducts.length} products available
                  </p>
                  <p className="text-white/60 text-sm">
                    {selectedProducts.length}/{COMBO_CONFIG.MAX_PRODUCTS} selected
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all group"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-2 left-2 bg-purple-500/80 text-white border-0 text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-white font-semibold mb-1 line-clamp-1">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 font-bold">৳{product.price.toLocaleString()}</span>
                          <Button
                            size="sm"
                            onClick={() => addProduct(product)}
                            disabled={selectedProducts.length >= COMBO_CONFIG.MAX_PRODUCTS}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white rounded-lg"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-white/40">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No products found</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
