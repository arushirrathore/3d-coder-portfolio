import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface OrbitingSkillProps {
  text: string;
  angle: number;
  radius: number;
  speed: number;
  color: string;
}

const OrbitingSkill = ({ text, angle, radius, speed, color }: OrbitingSkillProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialAngle = useRef(angle);
  
  useFrame((state) => {
    if (groupRef.current) {
      const currentAngle = initialAngle.current + state.clock.elapsedTime * speed;
      groupRef.current.position.x = Math.cos(currentAngle) * radius;
      groupRef.current.position.z = Math.sin(currentAngle) * radius;
      groupRef.current.position.y = Math.sin(currentAngle * 2) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
};

const CentralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00e5ff"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere ref={glowRef} args={[1.3, 32, 32]}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  );
};

const skills = [
  'Java', 'Spring Boot', 'React', 'TypeScript', 'MySQL',
  'Redis', 'Git', 'REST API', 'Microservices', 'Docker'
];

const SkillsVisualization = () => {
  const orbitingSkills = useMemo(() => {
    return skills.map((skill, index) => ({
      text: skill,
      angle: (index / skills.length) * Math.PI * 2,
      radius: 2 + (index % 2) * 0.5,
      speed: 0.2 + Math.random() * 0.1,
      color: index % 2 === 0 ? '#00e5ff' : '#a855f7',
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <CentralCore />
      
      {orbitingSkills.map((skill, index) => (
        <OrbitingSkill key={index} {...skill} />
      ))}
      
      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.01, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const Skills3D = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <SkillsVisualization />
        </Suspense>
      </Canvas>
    </div>
  );
};
