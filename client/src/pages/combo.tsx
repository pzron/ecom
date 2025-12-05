import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { combos, type Combo } from "@/data/combos";
import { useState, useMemo, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Package, 
  Sparkles, 
  Percent,
  Gift,
  Zap,
  TrendingUp,
  ShoppingBasket,
  Plus,
  Wand2
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";

function FloatingProduct({ position, index, hovered }: { position: [number, number, number]; index: number; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = baseY + Math.sin(time * 1.5 + index * 0.8) * 0.08;
      meshRef.current.rotation.y = time * 0.3 + index * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.1;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const colors = ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial 
          color={colors[index % colors.length]}
          metalness={0.4}
          roughness={0.3}
          emissive={colors[index % colors.length]}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>
    </Float>
  );
}

function Basket3D({ hovered, productCount }: { hovered: boolean; productCount: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
      
      const targetScale = hovered ? 1.08 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  const productPositions = useMemo((): [number, number, number][] => {
    const positions: [number, number, number][] = [];
    const count = Math.min(productCount, 6);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.3 + (i % 2) * 0.1;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.35 + (i % 3) * 0.15;
      positions.push([x, y, z]);
    }
    return positions;
  }, [productCount]);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.55, 0.7, 32, 1, true]} />
        <meshStandardMaterial 
          color="#8B4513" 
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.85}
        />
      </mesh>
      
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#6B3A0F" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.06, 12, 48]} />
        <meshStandardMaterial color="#A0522D" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {[0.65, 0.75, 0.85].map((radius, i) => (
        <mesh key={`ring-${i}`} position={[0, -0.1 + i * 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.012, 6, 48]} />
          <meshStandardMaterial color="#5D3A1A" roughness={0.9} />
        </mesh>
      ))}
      
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const topRadius = 0.87;
        const bottomRadius = 0.52;
        const x1 = Math.cos(angle) * topRadius;
        const z1 = Math.sin(angle) * topRadius;
        const x2 = Math.cos(angle) * bottomRadius;
        const z2 = Math.sin(angle) * bottomRadius;
        
        return (
          <mesh key={`weave-${i}`} position={[(x1 + x2) / 2, 0, (z1 + z2) / 2]} rotation={[0, angle, Math.PI / 8]}>
            <cylinderGeometry args={[0.015, 0.015, 0.75, 6]} />
            <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
          </mesh>
        );
      })}
      
      <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.04, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#A0522D" metalness={0.35} roughness={0.4} />
      </mesh>
      
      {productPositions.map((pos, i) => (
        <FloatingProduct key={i} position={pos} index={i} hovered={hovered} />
      ))}
      
      {hovered && (
        <>
          <pointLight position={[0, 1, 0]} color="#a855f7" intensity={3} distance={3} />
          <pointLight position={[0, 0.5, 1]} color="#ec4899" intensity={2} distance={2} />
        </>
      )}
    </group>
  );
}

function Basket2DFallback({ productCount, hovered }: { productCount: number; hovered: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <motion.div
        animate={{ 
          rotateY: hovered ? 5 : 0,
          scale: hovered ? 1.05 : 1 
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative"
      >
        <svg viewBox="0 0 200 180" className="w-48 h-40" style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))" }}>
          <defs>
            <linearGradient id="basket3dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="basket3dRim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>
          
          <ellipse cx="100" cy="165" rx="70" ry="12" fill="rgba(0,0,0,0.4)" />
          
          <path d="M30 55 Q20 100 35 150 Q55 170 100 170 Q145 170 165 150 Q180 100 170 55 Z" fill="url(#basket3dGrad)" stroke="#92400e" strokeWidth="2" />
          
          <ellipse cx="100" cy="55" rx="70" ry="12" fill="url(#basket3dRim)" />
          
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={38 + i * 17} y1="60" x2={35 + i * 17} y2="160" stroke="#451a03" strokeWidth="2" opacity="0.5" />
          ))}
          
          {[0,1,2,3].map(i => (
            <path key={i} d={`M35 ${75 + i * 22} Q100 ${82 + i * 22} 165 ${75 + i * 22}`} stroke="#451a03" strokeWidth="1.5" fill="none" opacity="0.4" />
          ))}
          
          <path d="M45 55 Q30 20 100 5 Q170 20 155 55" stroke="url(#basket3dRim)" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
        
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 w-24">
          {Array.from({ length: Math.min(productCount, 6) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="w-6 h-6 rounded-md"
              style={{ 
                backgroundColor: ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"][i],
                boxShadow: hovered ? "0 0 12px rgba(168, 85, 247, 0.6)" : "0 2px 6px rgba(0,0,0,0.3)"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Basket3DScene({ productCount, hovered }: { productCount: number; hovered: boolean }) {
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
    return <Basket2DFallback productCount={productCount} hovered={hovered} />;
  }
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.2, 2.8], fov: 40 }}
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
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-3, 4, -3]} intensity={0.5} color="#a855f7" />
          <pointLight position={[0, 3, 0]} intensity={0.3} color="#ec4899" />
          
          <Basket3D hovered={hovered} productCount={productCount} />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

interface ComboCardProps {
  combo: Combo;
  index: number;
}

function ComboCard({ combo, index }: ComboCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: combo.id,
      name: `${combo.name} (${combo.products.length} items)`,
      price: combo.comboPrice,
      originalPrice: combo.originalPrice,
      image: combo.products[0]?.image || "",
    }, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-3xl border border-white/10 overflow-hidden hover:border-purple-500/60 transition-all duration-500 shadow-xl hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        {combo.badge && (
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${combo.badgeColor} shadow-lg`}
          >
            {combo.badge}
          </motion.div>
        )}
        
        <motion.button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all shadow-lg ${
            isWishlisted 
              ? "bg-pink-500 text-white" 
              : "bg-black/40 backdrop-blur-md text-white/70 hover:bg-black/60 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>
        
        {combo.isLimited && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-red-500/95 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg"
          >
            <Zap className="w-3 h-3" /> Limited Stock
          </motion.div>
        )}
        
        <div className="h-72 w-full bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          <Basket3DScene productCount={combo.products.length} hovered={isHovered} />
          
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-amber-600/95 to-orange-600/95 px-4 py-2 rounded-full shadow-xl backdrop-blur-sm"
            animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShoppingBasket className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">{combo.products.length} items</span>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{combo.category}</span>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white text-sm font-semibold">{combo.rating}</span>
            <span className="text-white/40 text-xs">({combo.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
          {combo.name}
        </h3>
        
        <p className="text-white/60 text-sm mb-5 line-clamp-2 leading-relaxed">{combo.description}</p>
        
        <motion.div 
          className="bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-xl px-4 py-3 mb-5 border border-green-500/25"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Save ৳{combo.savings.toLocaleString()}
            </span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {combo.savingsPercent}% OFF
            </span>
          </div>
        </motion.div>
        
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-white/40 text-sm line-through block">৳{combo.originalPrice.toLocaleString()}</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ৳{combo.comboPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-white/50 text-xs block mb-1">Bundle includes</span>
            <span className="text-purple-400 font-bold">{combo.products.length} products</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:via-purple-600 hover:to-pink-700 text-white rounded-xl font-bold py-4 text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export default function ComboPage() {
  const stats = useMemo(() => ({
    totalCombos: combos.length,
    avgSavings: Math.round(combos.reduce((sum, c) => sum + c.savingsPercent, 0) / combos.length),
    maxSavings: Math.max(...combos.map(c => c.savingsPercent)),
    totalProducts: combos.reduce((sum, c) => sum + c.products.length, 0),
  }), []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/30" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/25 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[80px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/25 to-pink-500/25 border border-purple-500/40 mb-8 backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-semibold">Exclusive Combo Deals</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                  Super Combo
                </span>
                <br />
                <span className="text-white">Packages</span>
              </h1>
              
              <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Get more for less with our carefully curated combo packages. 
                Save up to <span className="text-green-400 font-bold">{stats.maxSavings}%</span> on bundled products!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto mb-12">
                {[
                  { icon: Package, value: `${stats.totalCombos}+`, label: "Combo Packs", color: "purple" },
                  { icon: Percent, value: `${stats.avgSavings}%`, label: "Avg. Savings", color: "green" },
                  { icon: TrendingUp, value: `${stats.maxSavings}%`, label: "Max Savings", color: "amber" },
                  { icon: Gift, value: `${stats.totalProducts}+`, label: "Products", color: "pink" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <stat.icon className={`w-7 h-7 text-${stat.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <Link href="/combo/builder">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer"
                >
                  <Wand2 className="w-6 h-6" />
                  Create Your Own Combo
                  <Plus className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {combos.map((combo, index) => (
                <ComboCard key={combo.id} combo={combo} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
