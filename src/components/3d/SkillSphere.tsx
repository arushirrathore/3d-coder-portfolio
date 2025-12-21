import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import * as THREE from 'three';

// Wireframe Sphere
const WireframeSphere = ({ position, size }: { position: [number, number, number]; size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
    </mesh>
  );
};

// Glowing Sphere
const GlowingSphere = ({ position, size, opacity }: { position: [number, number, number]; size: number; opacity: number }) => {
  return (
    <Sphere args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color="#ffffff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={opacity}
      />
    </Sphere>
  );
};

export const SkillSphere = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
          
          <GlowingSphere position={[3, 0, -2]} size={1.5} opacity={0.15} />
          <GlowingSphere position={[-3, 1, -3]} size={1} opacity={0.12} />
          
          <WireframeSphere position={[2, -1, -4]} size={0.8} />
          <WireframeSphere position={[-2, 2, -5]} size={0.6} />
          
          <ParticleField count={300} size={0.01} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};