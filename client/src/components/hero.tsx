import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Box, Star, Headset, Globe, Sparkles, Zap, Shield, Truck } from "lucide-react";
import { Link } from "wouter";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { WebGLErrorBoundary, Default3DFallback } from "./3d/webgl-check";

function FloatingCube({ position, color, size = 0.5, rotationSpeed = 1 }: { 
  position: [number, number, number]; 
  color: string;
  size?: number;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={rotationSpeed} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.9}
          clearcoat={1}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, size = 0.3 }: { 
  position: [number, number, number]; 
  color: string;
  size?: number;
}) {
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position} castShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.05} 
          metalness={0.9}
          clearcoat={1}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <Default3DFallback className="absolute inset-0" />;
  }

  return (
    <WebGLErrorBoundary fallback={<Default3DFallback className="absolute inset-0" />}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ failIfMajorPerformanceCaveat: false }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        
        <Suspense fallback={null}>
          <FloatingCube position={[-2.5, 1, 0]} color="#a855f7" size={0.6} />
          <FloatingCube position={[2.5, -0.5, -1]} color="#ec4899" size={0.5} rotationSpeed={1.5} />
          <FloatingSphere position={[-1.5, -1.5, 0.5]} color="#06b6d4" size={0.35} />
          <FloatingSphere position={[1.5, 1.5, -0.5]} color="#f59e0b" size={0.25} />
          <FloatingCube position={[0, 2, -2]} color="#10b981" size={0.4} rotationSpeed={0.5} />
          
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </WebGLErrorBoundary>
  );
}

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.width / 2);
        mouseY.set(e.clientY - rect.height / 2);
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, transparent 0%, transparent 2%, rgba(168, 85, 247, 0.1) 2%, transparent 3%)",
            backgroundSize: "60px 60px"
          }} />
        </div>
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute w-full h-full">
          <HeroScene />
        </div>
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl mb-8 shadow-lg shadow-purple-500/10"
          data-testid="hero-badge"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            AI-Powered • Real-Time 3D • Web3 Ready
          </span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white mb-6 max-w-5xl leading-tight"
            data-testid="hero-title"
          >
            The Future of <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Shopping
              </span>
              <motion.span 
                className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            {" "}Starts Here
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed"
          data-testid="hero-description"
        >
          Experience the next generation of e-commerce with immersive 3D product visualization, 
          AI-powered recommendations, and seamless Web3 payments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/products">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-testid="explore-products-button"
            >
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                className="flex items-center"
              >
                Explore Products 
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.span>
            </Button>
          </Link>
          
          <Link href="/signup">
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg rounded-xl border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/30"
              data-testid="get-started-button"
            >
              Get Started Free
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-white/40"
        >
          {[
            { icon: Truck, text: "Free Shipping" },
            { icon: Shield, text: "Secure Payments" },
            { icon: Zap, text: "Fast Delivery" },
            { icon: Headset, text: "24/7 Support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
        >
          <StatsCard icon={Box} value="500+" label="Products" color="purple" delay={0} />
          <StatsCard icon={Star} value="4.9" label="Rating" color="yellow" delay={0.1} />
          <StatsCard icon={Globe} value="150+" label="Countries" color="cyan" delay={0.2} />
          <StatsCard icon={Headset} value="24/7" label="Support" color="green" delay={0.3} />
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-white/40"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatsCard({ 
  icon: Icon, 
  value, 
  label, 
  color,
  delay = 0
}: { 
  icon: any;
  value: string;
  label: string;
  color: "purple" | "yellow" | "cyan" | "green";
  delay?: number;
}) {
  const colorClasses = {
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20 text-yellow-400",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
    green: "from-green-500/20 to-green-500/5 border-green-500/20 text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 + delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
      data-testid={`stats-${label.toLowerCase()}`}
    >
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${colorClasses[color].split(' ').pop()}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold font-heading text-white">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </motion.div>
  );
}
