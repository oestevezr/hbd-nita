import { useState, useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Letter = ({ position = [0, -1.5, 2], onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const envelopeRef = useRef();
  const [animatedPosition, setAnimatedPosition] = useState([position[0], position[1], position[2] + 15]);
  
  useEffect(() => {
    const startZ = position[2] + 15;
    const targetZ = position[2];
    const duration = 1.3;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 0.016;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentZ = startZ + (targetZ - startZ) * easeProgress;
      setAnimatedPosition([position[0], position[1], currentZ]);
      
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <group position={animatedPosition}>
      {/* ===== THE ENVELOPE (3D) ===== */}
      <mesh
        ref={envelopeRef}
        position={[0, isHovered ? 0.2 : 0, 1.5]} // Lift on hover
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onOpen && onOpen();
        }}
        scale={[1.5, 0.05, 1]} // Flattened box = envelope
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={isHovered ? '#e5b7f3' : '#dc6aff'} 
          roughness={0.8}
        />
      </mesh>

      {/* ===== TEXT BACKGROUND ===== */}
      <mesh position={[0, 0.6, 1.45]}>
        <planeGeometry args={[1.8, 0.6]} />
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>

      {/* ===== FLOATING "READ ME" TEXT ===== */}
      <Text
        position={[0, 0.6, 1.5]}
        fontSize={0.4}
        color={new THREE.Color('#520079').multiplyScalar(15)}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle"
      >
        Read Me
      </Text>
    </group>
  );
};

export default Letter;
