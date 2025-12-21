import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DNAProps {
  position?: [number, number, number];
  scale?: number;
}

export const DNA = ({ position = [0, 0, 0], scale = 1 }: DNAProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const spheres = useMemo(() => {
    const items = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const t = i / count * Math.PI * 4;
      const y = (i - count / 2) * 0.3;
      
      items.push({
        position1: [Math.cos(t) * 0.8, y, Math.sin(t) * 0.8] as [number, number, number],
        position2: [Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8] as [number, number, number],
        color1: '#00e5ff',
        color2: '#a855f7',
      });
    }
    
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {spheres.map((sphere, index) => (
        <group key={index}>
          {/* First helix */}
          <mesh position={sphere.position1}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={sphere.color1}
              emissive={sphere.color1}
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Second helix */}
          <mesh position={sphere.position2}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={sphere.color2}
              emissive={sphere.color2}
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Connection */}
          {index % 3 === 0 && (
            <mesh position={[0, sphere.position1[1], 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.3}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};
