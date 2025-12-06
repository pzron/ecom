import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useMemo } from "react";

const productImages = [
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", name: "Watch" },
  { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", name: "Headphones" },
  { src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80", name: "Shoes" },
  { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80", name: "Cosmetics" },
  { src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", name: "Medicine" },
  { src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80", name: "Camera" },
  { src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", name: "Sunglasses" },
  { src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", name: "Bag" },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", name: "Perfume" },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", name: "Sneakers" },
  { src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&q=80", name: "Luxury Shoes" },
  { src: "https://images.unsplash.com/photo-1491553895911-0055uj8jde1g?w=300&q=80", name: "Laptop" },
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
];

interface FloatingProductProps {
  image: { src: string; name: string };
  index: number;
  totalProducts: number;
}

function FloatingProduct({ image, index, totalProducts }: FloatingProductProps) {
  const colorIndex = index % glowColors.length;
  const glowColor = glowColors[colorIndex];
  const borderColor = borderColors[colorIndex];
  
  const sizes = ["w-16 h-16", "w-20 h-20", "w-24 h-24", "w-28 h-28", "w-14 h-14", "w-18 h-18"];
  const size = sizes[index % sizes.length];
  
  const animations = useMemo(() => {
    const baseDelay = index * 0.3;
    const duration = 15 + (index % 5) * 3;
    
    const startPositions = [
      { x: -150, y: Math.random() * 100 - 50 },
      { x: window.innerWidth + 150, y: Math.random() * 100 - 50 },
      { x: Math.random() * 100 - 50, y: -150 },
      { x: Math.random() * 100 - 50, y: window.innerHeight + 150 },
    ];
    
    const startPos = startPositions[index % 4];
    
    const paths = [
      { 
        x: [startPos.x, window.innerWidth * 0.2, window.innerWidth * 0.5, window.innerWidth * 0.8, window.innerWidth + 200],
        y: [startPos.y, 100, 250, 150, startPos.y]
      },
      {
        x: [window.innerWidth + 200, window.innerWidth * 0.7, window.innerWidth * 0.3, -200],
        y: [100, 300, 200, 150]
      },
      {
        x: [startPos.x, window.innerWidth * 0.3, window.innerWidth * 0.6, startPos.x],
        y: [-100, 200, 350, 500]
      },
      {
        x: [window.innerWidth * 0.5, window.innerWidth * 0.2, window.innerWidth * 0.8, window.innerWidth * 0.5],
        y: [500, 250, 150, -100]
      },
    ];
    
    return {
      path: paths[index % paths.length],
      duration,
      delay: baseDelay,
      rotate: index % 2 === 0 ? [0, 360] : [0, -360],
      scale: [0.8, 1.1, 0.9, 1.2, 0.8],
    };
  }, [index]);

  return (
    <motion.div
      className={`absolute ${size} rounded-2xl overflow-hidden border-2 ${borderColor} backdrop-blur-sm`}
      style={{
        boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
        zIndex: 10 - (index % 5),
      }}
      initial={{ 
        x: animations.path.x[0], 
        y: animations.path.y[0],
        opacity: 0,
        scale: 0.5,
        rotate: 0,
      }}
      animate={{
        x: animations.path.x,
        y: animations.path.y,
        opacity: [0, 1, 1, 1, 0],
        scale: animations.scale,
        rotate: animations.rotate,
      }}
      transition={{
        duration: animations.duration,
        delay: animations.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img 
          src={image.src} 
          alt={image.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${glowColor} 0%, transparent 50%)`,
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
  const randomDelay = useMemo(() => Math.random() * 5, []);
  const randomDuration = useMemo(() => 10 + Math.random() * 10, []);
  const randomSize = useMemo(() => 2 + Math.random() * 4, []);
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        background: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ 
        y: "-10vh",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
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
      style={{
        left: position.left,
        top: position.top,
        background: color,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const floatingProducts = useMemo(() => 
    productImages.slice(0, 10).map((img, i) => ({
      ...img,
      id: i,
    })), 
  []);

  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => i),
  []);

  const orbs = [
    { position: { left: "10%", top: "20%" }, color: "rgba(168, 85, 247, 0.4)", size: "w-64 h-64", delay: 0 },
    { position: { left: "70%", top: "60%" }, color: "rgba(236, 72, 153, 0.4)", size: "w-80 h-80", delay: 1 },
    { position: { left: "50%", top: "30%" }, color: "rgba(6, 182, 212, 0.3)", size: "w-72 h-72", delay: 2 },
    { position: { left: "20%", top: "70%" }, color: "rgba(245, 158, 11, 0.3)", size: "w-56 h-56", delay: 3 },
    { position: { left: "80%", top: "10%" }, color: "rgba(16, 185, 129, 0.3)", size: "w-48 h-48", delay: 4 },
  ];

  return (
    <div className="relative h-[51vh] sm:h-[55vh] md:h-[60vh] min-h-[430px] max-h-[640px] flex flex-col items-center justify-center pt-10 md:pt-14 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        
        {orbs.map((orb, i) => (
          <GlowingOrb key={i} {...orb} />
        ))}
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, transparent 0%, transparent 2%, rgba(168, 85, 247, 0.15) 2%, transparent 3%)",
            backgroundSize: "50px 50px"
          }} />
        </div>
        
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {particles.map((i) => (
        <ParticleEffect key={i} index={i} />
      ))}

      <div className="absolute inset-0 z-[1] pointer-events-none">
        {floatingProducts.map((product, index) => (
          <FloatingProduct
            key={product.id}
            image={product}
            index={index}
            totalProducts={floatingProducts.length}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
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
