import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const FloatingCube = ({ position, color, size = 0.3, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const ProfileSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#00e5ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const AboutVisualization = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00e5ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      
      <ProfileSphere />
      
      {/* Floating cubes around */}
      <FloatingCube position={[-2, 1, -1]} color="#00e5ff" size={0.2} speed={0.8} />
      <FloatingCube position={[2, -0.5, -1]} color="#a855f7" size={0.25} speed={1.2} />
      <FloatingCube position={[-1.5, -1, 1]} color="#00e5ff" size={0.15} speed={1} />
      <FloatingCube position={[1.5, 1.5, 0]} color="#a855f7" size={0.2} speed={0.9} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const About3D = () => {
  return (
    <div className="w-full h-[300px] lg:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <AboutVisualization />
        </Suspense>
      </Canvas>
    </div>
  );
};
