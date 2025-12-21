import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AnimatedGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
    }
  });

  return (
    <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[50, 50, '#00e5ff', '#0a1628']}
        position={[0, 0, -10]}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#0a0a12"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};
