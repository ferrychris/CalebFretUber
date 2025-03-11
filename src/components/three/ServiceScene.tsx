import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../utils/theme';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

interface ServiceMeshProps {
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
  distort?: number;
}

const ServiceMesh: React.FC<ServiceMeshProps> = ({ 
  color, 
  position, 
  scale = 1, 
  speed = 1,
  distort = 0.4
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.1;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <mesh ref={mesh} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={0.5}
          distort={distort}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

export const ServiceScene: React.FC = () => {
  const { theme } = useTheme();
  
  const colors = useMemo(() => ({
    carpooling: theme === 'dark' ? '#4ADE80' : '#22C55E',
    shopping: theme === 'dark' ? '#FF9764' : '#FF7940',
    largeItems: theme === 'dark' ? '#9F7AEA' : '#805AD5'
  }), [theme]);

  return (
    <group>
      {/* Carpooling Service */}
      <ServiceMesh
        color={colors.carpooling}
        position={[-4, 2, 0]}
        scale={1.5}
        speed={1.2}
      />
      <ServiceMesh
        color={colors.carpooling}
        position={[-3, -1, -2]}
        scale={0.8}
        speed={0.8}
      />

      {/* Shopping Service */}
      <ServiceMesh
        color={colors.shopping}
        position={[0, 3, -1]}
        scale={1.2}
        speed={1}
      />
      <ServiceMesh
        color={colors.shopping}
        position={[1, -2, -3]}
        scale={0.7}
        speed={1.5}
      />

      {/* Large Items Service */}
      <ServiceMesh
        color={colors.largeItems}
        position={[4, 1, -2]}
        scale={1.3}
        speed={0.9}
      />
      <ServiceMesh
        color={colors.largeItems}
        position={[3, -1.5, -1]}
        scale={0.9}
        speed={1.1}
      />
    </group>
  );
};