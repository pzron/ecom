import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useMemo, useCallback } from "react";
import { homeProducts } from "@/data/products";

const heroImages = [
  "https://myvertexbd.com/image/thumb/68d6d93e99754.webp",
  "https://myvertexbd.com/image/thumb/68d6d3bd6bf3a.webp",
  "https://myvertexbd.com/image/thumb/68d6d4cb6df63.webp",
  "https://myvertexbd.com/image/thumb/66c4ade538f4c.webp",
  "https://myvertexbd.com/image/thumb/68d6d77169f44.webp",
  "https://myvertexbd.com/image/thumb/68d6d9193c50c.webp",
  "https://myvertexbd.com/image/thumb/690a66b9db934.webp",
  "https://myvertexbd.com/image/thumb/68d6d995e21b6.webp",
];

const glowColors = [
  "rgba(168, 85, 247, 0.6)",
  "rgba(236, 72, 153, 0.6)",
  "rgba(6, 182, 212, 0.6)",
  "rgba(245, 158, 11, 0.6)",
  "rgba(16, 185, 129, 0.6)",
  "rgba(139, 92, 246, 0.6)",
  "rgba(244, 63, 94, 0.6)",
  "rgba(34, 211, 238, 0.6)",
  "rgba(251, 191, 36, 0.6)",
  "rgba(52, 211, 153, 0.6)",
  "rgba(192, 132, 252, 0.6)",
  "rgba(251, 113, 133, 0.6)",
];

const borderColors = [
  "border-purple-500/50",
  "border-pink-500/50",
  "border-cyan-500/50",
  "border-amber-500/50",
  "border-emerald-500/50",
  "border-violet-500/50",
  "border-rose-500/50",
  "border-teal-500/50",
  "border-yellow-500/50",
  "border-green-500/50",
  "border-fuchsia-500/50",
  "border-red-500/50",
];

interface FloatingProductProps {
  image: string;
  name: string;
  index: number;
  totalProducts: number;
}

function FloatingProduct({ image, name, index, totalProducts }: FloatingProductProps) {
  const colorIndex = index % glowColors.length;
  const glowColor = glowColors[colorIndex];
  const borderColor = borderColors[colorIndex];
  
  const sizes = ["w-12 h-12", "w-14 h-14", "w-16 h-16", "w-18 h-18", "w-20 h-20", "w-10 h-10", "w-22 h-22", "w-24 h-24"];
  const size = sizes[index % sizes.length];
  
  const randomSeed = useMemo(() => ({
    startX: Math.random(),
    startY: Math.random(),
    pathVariant: Math.floor(Math.random() * 8),
    duration: 12 + Math.random() * 15,
    delay: (index * 0.15) % 10,
    rotateDir: Math.random() > 0.5 ? 1 : -1,
    scaleMax: 0.9 + Math.random() * 0.4,
  }), [index]);

  const getPath = useMemo(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 600;
    
    const paths = [
      { x: [-100, w * 0.3, w * 0.6, w + 100], y: [h * randomSeed.startY, h * 0.2, h * 0.7, h * randomSeed.startY] },
      { x: [w + 100, w * 0.7, w * 0.3, -100], y: [h * randomSeed.startY, h * 0.6, h * 0.3, h * randomSeed.startY] },
      { x: [w * randomSeed.startX, w * 0.2, w * 0.8, w * randomSeed.startX], y: [-100, h * 0.4, h * 0.6, h + 100] },
      { x: [w * randomSeed.startX, w * 0.8, w * 0.2, w * randomSeed.startX], y: [h + 100, h * 0.6, h * 0.3, -100] },
      { x: [-100, w * 0.5, w * 0.8, w * 0.2, w + 100], y: [h * 0.3, h * 0.1, h * 0.5, h * 0.8, h * 0.4] },
      { x: [w + 100, w * 0.6, w * 0.2, w * 0.7, -100], y: [h * 0.7, h * 0.4, h * 0.2, h * 0.6, h * 0.3] },
      { x: [w * 0.5, w * 0.1, w * 0.9, w * 0.5], y: [-100, h * 0.5, h * 0.5, h + 100] },
      { x: [w * 0.5, w * 0.9, w * 0.1, w * 0.5], y: [h + 100, h * 0.5, h * 0.5, -100] },
    ];
    
    return paths[randomSeed.pathVariant];
  }, [randomSeed]);

  return (
    <motion.div
      className={`absolute ${size} rounded-xl overflow-hidden border-2 ${borderColor} backdrop-blur-sm`}
      style={{
        boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        zIndex: Math.floor(Math.random() * 10),
      }}
      initial={{ 
        x: getPath.x[0], 
        y: getPath.y[0],
        opacity: 0,
        scale: 0.3,
        rotate: 0,
      }}
      animate={{
        x: getPath.x,
        y: getPath.y,
        opacity: [0, 0.9, 0.9, 0.9, 0],
        scale: [0.5, randomSeed.scaleMax, randomSeed.scaleMax * 0.9, randomSeed.scaleMax, 0.5],
        rotate: [0, 180 * randomSeed.rotateDir, 360 * randomSeed.rotateDir],
      }}
      transition={{
        duration: randomSeed.duration,
        delay: randomSeed.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
      >
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${glowColor} 0%, transparent 60%)`,
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ParticleEffect({ index }: { index: number }) {
  const colorIndex = index % glowColors.length;
  const color = glowColors[colorIndex];
  
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomDelay = useMemo(() => Math.random() * 8, []);
  const randomDuration = useMemo(() => 8 + Math.random() * 12, []);
  const randomSize = useMemo(() => 2 + Math.random() * 4, []);
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration: randomDuration, delay: randomDelay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function GlowingOrb({ position, color, size, delay }: { 
  position: { left: string; top: string }; 
  color: string; 
  size: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute ${size} rounded-full blur-3xl`}
      style={{ left: position.left, top: position.top, background: color }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [productCount, setProductCount] = useState(18);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const floatingProducts = useMemo(() => {
    const shuffled = [...homeProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, productCount).map((product, i) => ({
      id: `${product.id}-${i}`,
      image: product.image,
      name: product.name,
    }));
  }, [productCount]);

  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  const orbs = [
    { position: { left: "5%", top: "15%" }, color: "rgba(168, 85, 247, 0.35)", size: "w-72 h-72", delay: 0 },
    { position: { left: "75%", top: "55%" }, color: "rgba(236, 72, 153, 0.35)", size: "w-80 h-80", delay: 1 },
    { position: { left: "45%", top: "25%" }, color: "rgba(6, 182, 212, 0.25)", size: "w-64 h-64", delay: 2 },
    { position: { left: "15%", top: "65%" }, color: "rgba(245, 158, 11, 0.25)", size: "w-56 h-56", delay: 3 },
    { position: { left: "85%", top: "10%" }, color: "rgba(16, 185, 129, 0.25)", size: "w-48 h-48", delay: 4 },
    { position: { left: "55%", top: "75%" }, color: "rgba(139, 92, 246, 0.3)", size: "w-60 h-60", delay: 5 },
  ];

  return (
    <div className="relative h-[51vh] sm:h-[55vh] md:h-[60vh] min-h-[430px] max-h-[640px] flex flex-col items-center justify-center pt-10 md:pt-14 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        
        {orbs.map((orb, i) => (
          <GlowingOrb key={i} {...orb} />
        ))}
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, transparent 0%, transparent 2%, rgba(168, 85, 247, 0.12) 2%, transparent 3%)",
            backgroundSize: "45px 45px"
          }} />
        </div>
        
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)",
              "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {particles.map((i) => (
        <ParticleEffect key={i} index={i} />
      ))}

      <div className="absolute inset-0 z-[1] pointer-events-none">
        {floatingProducts.map((product, index) => (
          <FloatingProduct
            key={product.id}
            image={product.image}
            name={product.name}
            index={index}
            totalProducts={floatingProducts.length}
          />
        ))}
      </div>

      <div className="absolute right-4 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 z-[5] hidden md:block">
        <motion.div
          className="relative"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              className="relative w-48 lg:w-64 xl:w-72 h-48 lg:h-64 xl:h-72"
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                rotateY: [0, 5, -5, 0],
                scale: 1,
                rotateX: [0, -3, 3, 0],
              }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              transition={{ 
                duration: 0.8,
                rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)",
                  transform: "translateZ(20px)",
                }}
              >
                <img
                  src={heroImages[currentHeroImage]}
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
                      "linear-gradient(225deg, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                      "linear-gradient(315deg, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <motion.div
                className="absolute -inset-4 rounded-[2rem] blur-xl opacity-60"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-4 gap-2">
            {heroImages.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentHeroImage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentHeroImage 
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 w-6" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center md:items-start md:text-left md:pl-8 lg:pl-16">
        <motion.div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white mb-4 max-w-4xl leading-tight"
            data-testid="hero-title"
          >
            The Future of{" "}
            <span className="relative inline-block">
              <motion.span 
                className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent bg-[length:300%_auto]"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Shopping
              </motion.span>
              <motion.span 
                className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            {" "}Starts Here
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-base md:text-lg text-white/60 mb-8 max-w-2xl leading-relaxed"
          data-testid="hero-description"
        >
          Discover premium products with stunning visuals, personalized recommendations, and checkout in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/products">
            <Button 
              className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-testid="explore-products-button"
            >
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                className="flex items-center"
              >
                Explore Products 
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.span>
            </Button>
          </Link>
          
          <Link href="/signup">
            <Button 
              variant="outline" 
              className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base rounded-xl border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/30"
              data-testid="get-started-button"
            >
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
