import { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { FloatingGeometry } from './FloatingGeometry';

interface ParticleFieldProps {
  count?: number;
  size?: number;
}

const ParticleField = ({ count = 800, size = 0.015 }: ParticleFieldProps) => {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const t = Math.random();
      colors[i * 3] = 0 + t * 0.5;
      colors[i * 3 + 1] = 0.8 - t * 0.3;
      colors[i * 3 + 2] = 1;
      
      sizes[i] = Math.random() * size + size * 0.5;
    }
    
    return { positions, colors, sizes };
  }, [count, size]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
      
      // Subtle wave motion
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + positions[i3]) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CentralOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.3);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Orbiting ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.5, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      
      <ParticleField count={1000} size={0.02} />
      <CentralOrb />
      <FloatingGeometry />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
