import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ProductImageProps {
  position: [number, number, number];
  imageUrl: string;
  index: number;
  hovered: boolean;
}

function ProductImage({ position, imageUrl, index, hovered }: ProductImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = baseY + Math.sin(time * 2 + index * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.1;
      
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
          emissive="#a855f7"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
}

function WovenBasket({ hovered }: { hovered: boolean }) {
  const basketRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (basketRef.current) {
      const time = state.clock.elapsedTime;
      basketRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      const targetScale = hovered ? 1.05 : 1;
      basketRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const basketColor = useMemo(() => new THREE.Color("#8B4513"), []);
  const rimColor = useMemo(() => new THREE.Color("#A0522D"), []);
  const glowColor = useMemo(() => new THREE.Color("#a855f7"), []);

  return (
    <group ref={basketRef} position={[0, -0.3, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.5, 0.6, 32, 1, true]} />
        <meshStandardMaterial
          color={basketColor}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[0, -0.3, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial
          color={basketColor}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshStandardMaterial
          color={rimColor}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.65;
        const z = Math.sin(angle) * 0.65;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
            <meshStandardMaterial color={rimColor} roughness={0.7} />
          </mesh>
        );
      })}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`ring-${i}`} position={[0, -0.2 + i * 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52 + i * 0.06, 0.015, 4, 32]} />
          <meshStandardMaterial color={basketColor} roughness={0.8} />
        </mesh>
      ))}
      
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.6, 0.03, 8, 32, Math.PI]} />
        <meshStandardMaterial
          color={rimColor}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      
      {hovered && (
        <pointLight
          position={[0, 0.5, 0]}
          color={glowColor}
          intensity={2}
          distance={2}
        />
      )}
    </group>
  );
}

interface ComboBasketSceneProps {
  products: Array<{ id: string; image: string; name: string }>;
  hovered: boolean;
}

function Scene({ products, hovered }: ComboBasketSceneProps) {
  const productPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = Math.min(products.length, 6);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const radius = 0.35;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.1 + Math.random() * 0.1;
      positions.push([x, y, z]);
    }
    
    return positions;
  }, [products.length]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#a855f7" />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#ec4899" />
      
      <WovenBasket hovered={hovered} />
      
      {products.slice(0, 6).map((product, index) => (
        <ProductImage
          key={product.id}
          position={productPositions[index] || [0, 0.2, 0]}
          imageUrl={product.image}
          index={index}
          hovered={hovered}
        />
      ))}
      
      <Environment preset="studio" />
    </>
  );
}

export default function ComboBasketScene({ products, hovered }: ComboBasketSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene products={products} hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
