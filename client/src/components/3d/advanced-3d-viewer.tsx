import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, BakeShadows } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Advanced 3D Product with Animation
function AnimatedProduct({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation based on hover
      groupRef.current.rotation.y += isHovered ? 0.03 : 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Animated Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={isHovered ? "#EC4899" : "#A855F7"}
          metalness={0.8}
          roughness={0.2}
          emissive={isHovered ? "#EC4899" : "#A855F7"}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh scale={1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={isHovered ? "#EC4899" : "#A855F7"} transparent opacity={0.1} />
      </mesh>

      {/* Rotating Ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// Scene with multiple products and lighting
function AdvancedScene() {
  return (
    <>
      <Environment preset="city" intensity={0.8} />
      <BakeShadows />
      
      {/* Lighting */}
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-10, 5, 5]} intensity={1} color="#EC4899" />
      <pointLight position={[5, -5, 10]} intensity={0.8} color="#06B6D4" />
      <ambientLight intensity={0.6} />

      {/* Products */}
      <AnimatedProduct position={[-3, 0, 0]} />
      <AnimatedProduct position={[0, 0, 0]} />
      <AnimatedProduct position={[3, 0, 0]} />

      {/* Ground Plane */}
      <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Background Grid */}
      <gridHelper args={[20, 20, "#444", "#333"]} position={[0, -1.99, 0]} />
    </>
  );
}

interface AdvancedViewer3DProps {
  title?: string;
  onProductClick?: (index: number) => void;
}

export function AdvancedViewer3D({ title = "3D Product Showcase", onProductClick }: AdvancedViewer3DProps) {
  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-purple-500/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sm font-bold text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur">
          {title}
        </h3>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <AdvancedScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={2}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-4 right-4 text-xs text-white/60 bg-black/50 px-3 py-1 rounded backdrop-blur">
        Drag to rotate • Scroll to zoom
      </div>
    </motion.div>
  );
}

export default AdvancedViewer3D;
