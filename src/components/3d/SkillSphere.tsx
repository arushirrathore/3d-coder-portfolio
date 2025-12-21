import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';
import { ParticleField } from './ParticleField';

export const SkillSphere = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
          
          <Sphere args={[1.5, 64, 64]} position={[3, 0, -2]}>
            <MeshDistortMaterial
              color="#00e5ff"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.3}
            />
          </Sphere>
          
          <Sphere args={[1, 64, 64]} position={[-3, 1, -3]}>
            <MeshDistortMaterial
              color="#a855f7"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.3}
            />
          </Sphere>
          
          <ParticleField count={200} size={0.01} />
          
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
