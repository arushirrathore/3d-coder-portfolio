import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'torus' | 'octahedron' | 'icosahedron' | 'torusKnot';
  color: string;
  scale?: number;
  speed?: number;
}

const FloatingShape = ({ position, geometry, color, scale = 1, speed = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[0.5 * scale, 0.2 * scale, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.5 * scale]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.5 * scale]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.4 * scale, 0.15 * scale, 64, 8]} />;
      default:
        return <octahedronGeometry args={[0.5 * scale]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <MeshDistortMaterial
        color={color}
        distort={0.2}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

interface GlowingOrbProps {
  position: [number, number, number];
  color: string;
  size?: number;
  pulseSpeed?: number;
}

const GlowingOrb = ({ position, color, size = 0.3, pulseSpeed = 1 }: GlowingOrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2;
      meshRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.5);
      
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      glowRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[size * 1.5, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

interface WireframeCubeProps {
  position: [number, number, number];
  size?: number;
  color: string;
}

const WireframeCube = ({ position, size = 1, color }: WireframeCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

interface RingProps {
  position: [number, number, number];
  color: string;
  size?: number;
}

const FloatingRing = ({ position, color, size = 1 }: RingProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, 0.02, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

export const FloatingGeometry = () => {
  return (
    <group>
      {/* Floating shapes */}
      <FloatingShape position={[-4, 2, -3]} geometry="torus" color="#00e5ff" scale={0.8} speed={0.8} />
      <FloatingShape position={[4, -1, -4]} geometry="octahedron" color="#a855f7" scale={1} speed={0.6} />
      <FloatingShape position={[-3, -2, -2]} geometry="icosahedron" color="#00e5ff" scale={0.6} speed={1} />
      <FloatingShape position={[3, 2, -5]} geometry="torusKnot" color="#a855f7" scale={0.5} speed={0.5} />
      
      {/* Glowing orbs */}
      <GlowingOrb position={[5, 1, -3]} color="#00e5ff" size={0.15} pulseSpeed={2} />
      <GlowingOrb position={[-5, -1, -4]} color="#a855f7" size={0.2} pulseSpeed={1.5} />
      <GlowingOrb position={[0, 3, -6]} color="#00e5ff" size={0.1} pulseSpeed={3} />
      <GlowingOrb position={[-2, 0, -2]} color="#a855f7" size={0.12} pulseSpeed={2.5} />
      <GlowingOrb position={[2, -2, -3]} color="#00e5ff" size={0.18} pulseSpeed={1.8} />
      
      {/* Wireframe cubes */}
      <WireframeCube position={[-6, 0, -5]} size={1.5} color="#00e5ff" />
      <WireframeCube position={[6, 2, -6]} size={1.2} color="#a855f7" />
      
      {/* Floating rings */}
      <FloatingRing position={[0, 0, -8]} color="#00e5ff" size={3} />
      <FloatingRing position={[0, 0, -10]} color="#a855f7" size={4} />
    </group>
  );
};
