import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Canvas, useFrame } from "@react-three/fiber";
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
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * rotationSpeed;
      meshRef.current.rotation.y += 0.008 * rotationSpeed;
    }
  });
  
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
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow>
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

function FloatingTorus({ position, color, size = 0.4 }: { 
  position: [number, number, number]; 
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[size, size * 0.3, 16, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.85}
          clearcoat={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, color, size = 0.5 }: { 
  position: [number, number, number]; 
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[size, size * 0.15, 16, 48]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.05} 
          metalness={0.95}
          clearcoat={1}
          iridescence={0.5}
          iridescenceIOR={1.5}
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
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ failIfMajorPerformanceCaveat: false, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />
        <pointLight position={[10, -5, 5]} intensity={0.3} color="#ec4899" />
        
        <Suspense fallback={null}>
          <FloatingCube position={[-3.5, 1.5, -2]} color="#a855f7" size={0.7} rotationSpeed={1.2} />
          <FloatingCube position={[3.5, -0.8, -1.5]} color="#ec4899" size={0.55} rotationSpeed={0.8} />
          <FloatingCube position={[0, 2.5, -3]} color="#06b6d4" size={0.5} rotationSpeed={1} />
          
          <FloatingSphere position={[-2, -1.8, 0.5]} color="#06b6d4" size={0.4} />
          <FloatingSphere position={[2.5, 2, -1]} color="#f59e0b" size={0.3} />
          <FloatingSphere position={[-3, 0.5, 1]} color="#10b981" size={0.25} />
          
          <FloatingTorus position={[3, 0, -2]} color="#8b5cf6" size={0.45} />
          <FloatingTorus position={[-2.5, 2, -1]} color="#f43f5e" size={0.35} />
          
          <FloatingRing position={[0, -2, -1]} color="#fbbf24" size={0.6} />
          <FloatingRing position={[-1.5, 0, -2.5]} color="#22d3ee" size={0.4} />
          <FloatingRing position={[2, 1.5, -2]} color="#e879f9" size={0.35} />
          
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.3}
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
      className="relative h-[51vh] sm:h-[55vh] md:h-[60vh] min-h-[430px] max-h-[640px] flex flex-col items-center justify-center pt-10 md:pt-14 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.width / 2);
        mouseY.set(e.clientY - rect.height / 2);
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-10 right-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "3s" }} />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, transparent 0%, transparent 2%, rgba(168, 85, 247, 0.1) 2%, transparent 3%)",
            backgroundSize: "60px 60px"
          }} />
        </div>
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
        <div className="absolute w-full h-full">
          <HeroScene />
        </div>
      </div>


      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white mb-4 max-w-4xl leading-tight"
            data-testid="hero-title"
          >
            The Future of{" "}
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
