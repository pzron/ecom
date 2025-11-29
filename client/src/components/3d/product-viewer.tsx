import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  Environment,
  Sparkles,
  MeshReflectorMaterial,
  Center
} from "@react-three/drei";
import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { RotateCw, ZoomIn, ZoomOut, Layers, Maximize, Play, Pause, Eye, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { WebGLErrorBoundary, Default3DFallback, useWebGLSupport } from "./webgl-check";

function GlowingSphere({ position, color, intensity = 1 }: { position: [number, number, number]; color: string; intensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
      <pointLight color={color} intensity={intensity} distance={3} />
    </mesh>
  );
}

function CinematicLighting({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.2 : 0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={isDarkMode ? 1 : 1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-10, 5, -10]}
        angle={0.3}
        penumbra={1}
        intensity={isDarkMode ? 0.5 : 0.8}
        color="#a855f7"
      />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#ec4899" />
      
      <GlowingSphere position={[2, 1, 2]} color="#a855f7" intensity={0.5} />
      <GlowingSphere position={[-2, 0.5, -2]} color="#ec4899" intensity={0.5} />
      <GlowingSphere position={[0, 2, -1]} color="#06b6d4" intensity={0.3} />
    </>
  );
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={50}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0a0f"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}

function FloatingParticles() {
  return (
    <Sparkles
      count={50}
      scale={4}
      size={2}
      speed={0.4}
      color="#a855f7"
      opacity={0.5}
    />
  );
}

function PremiumProduct({ 
  color = "#D3C1E7", 
  isExploded = false,
  productType = "box"
}: { 
  color?: string; 
  isExploded?: boolean;
  productType?: "box" | "sphere" | "torus" | "cylinder";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.envMapIntensity = 1 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const explodeOffset = isExploded ? 0.3 : 0;

  const renderGeometry = () => {
    switch (productType) {
      case "sphere":
        return <sphereGeometry args={[0.8, 64, 64]} />;
      case "torus":
        return <torusGeometry args={[0.6, 0.25, 32, 64]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.6, 0.6, 1.2, 64]} />;
      default:
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
    }
  };

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow position={[0, explodeOffset, 0]}>
        {renderGeometry()}
        <meshPhysicalMaterial
          ref={materialRef}
          color={color}
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.1}
          thickness={0.5}
          envMapIntensity={1}
          reflectivity={1}
        />
      </mesh>
      
      {isExploded && (
        <>
          <mesh castShadow position={[0.8 + explodeOffset, 0.4, 0]} scale={0.3}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial color="#a855f7" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh castShadow position={[-0.8 - explodeOffset, 0.2, 0.3]} scale={0.25}>
            <octahedronGeometry args={[0.5]} />
            <meshPhysicalMaterial color="#ec4899" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh castShadow position={[0, -0.6 - explodeOffset, 0.5]} scale={0.2}>
            <torusGeometry args={[0.4, 0.15, 16, 32]} />
            <meshPhysicalMaterial color="#06b6d4" roughness={0.1} metalness={0.8} />
          </mesh>
        </>
      )}
      
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.8} metalness={0.2} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function CameraController({ 
  autoRotate, 
  zoom,
  onZoomChange
}: { 
  autoRotate: boolean; 
  zoom: number;
  onZoomChange: (zoom: number) => void;
}) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    if (controlsRef.current) {
      const distance = 5 - (zoom - 1) * 2;
      camera.position.setLength(Math.max(2, Math.min(8, distance)));
    }
  }, [zoom, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={autoRotate}
      autoRotateSpeed={2}
      enableZoom={true}
      enablePan={false}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      makeDefault
    />
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#1a1a2e" wireframe />
    </mesh>
  );
}

interface ProductViewerProps {
  color?: string;
  productType?: "box" | "sphere" | "torus" | "cylinder";
  showFloor?: boolean;
  showParticles?: boolean;
  className?: string;
}

export function ProductViewer({ 
  color = "#D3C1E7",
  productType = "box",
  showFloor = true,
  showParticles = true,
  className = ""
}: ProductViewerProps) {
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setIsExploded(false);
    setIsAutoRotate(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full h-full min-h-[400px] bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f] rounded-2xl overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0a0f]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-white/60">Loading 3D View...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-10"
      >
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 text-xs text-white flex items-center gap-2 shadow-lg shadow-purple-500/10" data-testid="3d-status-indicator">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
          <span className="font-medium">3D View Active</span>
          <span className="text-white/40">|</span>
          <Eye className="w-3 h-3 text-purple-400" />
          <span className="text-purple-300">Interactive</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-4 right-4 z-10"
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          data-testid="toggle-lighting-mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </motion.div>
      
      <WebGLErrorBoundary fallback={<Default3DFallback />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 1, 5], fov: 45 }}
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: isDarkMode ? 1 : 1.5,
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0f');
          }}
        >
          <color attach="background" args={[isDarkMode ? '#0a0a0f' : '#1a1a2e']} />
          <fog attach="fog" args={[isDarkMode ? '#0a0a0f' : '#1a1a2e', 5, 20]} />
          
          <Suspense fallback={<LoadingFallback />}>
            <CinematicLighting isDarkMode={isDarkMode} />
            
            <Center>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <PremiumProduct 
                  color={color} 
                  isExploded={isExploded}
                  productType={productType}
                />
              </Float>
            </Center>
            
            {showFloor && <ReflectiveFloor />}
            {showParticles && <FloatingParticles />}
            
            <Environment preset="city" background={false} />
            
            <CameraController 
              autoRotate={isAutoRotate} 
              zoom={zoom}
              onZoomChange={setZoom}
            />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-9 h-9 rounded-full transition-all duration-300 ${isAutoRotate ? 'bg-purple-500/30 text-purple-300' : 'hover:bg-white/10 text-white/70'}`}
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          title={isAutoRotate ? "Pause Rotation" : "Play Rotation"}
          data-testid="toggle-rotation"
        >
          {isAutoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <div className="w-px h-6 bg-white/10" />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
          onClick={handleZoomOut}
          title="Zoom Out"
          data-testid="zoom-out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <div className="px-2 min-w-[40px] text-center">
          <span className="text-xs font-medium text-white/60">{Math.round(zoom * 100)}%</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
          onClick={handleZoomIn}
          title="Zoom In"
          data-testid="zoom-in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-white/10" />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-9 h-9 rounded-full transition-all duration-300 ${isExploded ? 'bg-pink-500/30 text-pink-300' : 'hover:bg-white/10 text-white/70'}`}
          onClick={() => setIsExploded(!isExploded)}
          title="Exploded View"
          data-testid="toggle-exploded-view"
        >
          <Layers className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
          onClick={handleReset}
          title="Reset View"
          data-testid="reset-view"
        >
          <Maximize className="w-4 h-4" />
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
      >
        <div className="px-2 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col items-center gap-2">
            <RotateCw className="w-4 h-4 text-white/40" />
            <div className="h-16 w-1 rounded-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 opacity-50" />
            <span className="text-[10px] text-white/40 writing-mode-vertical">DRAG</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MiniProductViewer({ color = "#D3C1E7" }: { color?: string }) {
  return (
    <div className="w-full h-full min-h-[200px] bg-gradient-to-b from-[#0a0a0f] to-[#12121a] rounded-xl overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3}>
            <mesh castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshPhysicalMaterial 
                color={color} 
                roughness={0.1} 
                metalness={0.9}
                clearcoat={1}
              />
            </mesh>
          </Float>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
