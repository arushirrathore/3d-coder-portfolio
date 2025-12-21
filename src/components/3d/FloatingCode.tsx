import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const codeSnippets = [
  'public class',
  '@SpringBoot',
  'const App',
  'SELECT * FROM',
  'async/await',
  'interface {}',
  'npm install',
  'git commit',
  'docker run',
  'REST API',
  'JWT Token',
  'Microservices',
];

interface CodeBlockProps {
  position: [number, number, number];
  text: string;
  index: number;
}

const CodeBlock = ({ position, text, index }: CodeBlockProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <mesh>
          <boxGeometry args={[text.length * 0.12 + 0.4, 0.35, 0.05]} />
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.9}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
};

export const FloatingCode = () => {
  const codeBlocks = useMemo(() => {
    return codeSnippets.map((text, i) => {
      const angle = (i / codeSnippets.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      return {
        text,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius - 5,
        ] as [number, number, number],
      };
    });
  }, []);

  return (
    <group>
      {codeBlocks.map((block, index) => (
        <CodeBlock
          key={index}
          position={block.position}
          text={block.text}
          index={index}
        />
      ))}
    </group>
  );
};