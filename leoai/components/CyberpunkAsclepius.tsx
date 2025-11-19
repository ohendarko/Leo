import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface CyberpunkAsclepiusProps {
  mousePosition: { x: number; y: number };
  isMenuOpen?: boolean;
  scale?: number;
}

const AsclepiusStaff = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const staffRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (staffRef.current) {
      // Gentle rotation
      staffRef.current.rotation.y += 0.002;
      
      // Parallax effect based on mouse
      staffRef.current.rotation.x = mousePosition.y * 0.3;
      staffRef.current.rotation.z = mousePosition.x * 0.1;
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  // Create particles geometry
  const particleCount = 100;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 1.5 + Math.random() * 1.5;
    
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group ref={staffRef}>
      {/* Main Staff - Cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.5, 16]} />
        <meshStandardMaterial
          color="#B8693D"
          emissive="#00FFFF"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Snake - Torus Knot */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusKnotGeometry args={[0.6, 0.12, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#7A9B76"
          emissive="#FF00FF"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Glowing Sphere at top */}
      <Sphere args={[0.2, 32, 32]} position={[0, 1.8, 0]}>
        <MeshDistortMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={1.5}
          distort={0.3}
          speed={2}
        />
      </Sphere>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00FFFF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Wireframe overlay on staff */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 3.5, 16]} />
        <meshBasicMaterial
          color="#00FFFF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Point lights for neon effect */}
      <pointLight position={[0, 2, 0]} color="#00FFFF" intensity={2} distance={5} />
      <pointLight position={[0, -2, 0]} color="#FF00FF" intensity={2} distance={5} />
    </group>
  );
};

export const CyberpunkAsclepius = ({ mousePosition, isMenuOpen = false, scale = 1 }: CyberpunkAsclepiusProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <group scale={scale}>
          <AsclepiusStaff mousePosition={mousePosition} />
        </group>
        
        {!isMenuOpen && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
};
