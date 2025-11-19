import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Cake = ({ position = [0, -1, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const cakeRef = useRef();
  const { scene } = useGLTF('/cake.glb');
  const [animatedPosition, setAnimatedPosition] = useState([position[0], position[1] - 10, position[2]]);
  
  useEffect(() => {
    const startY = position[1] - 10;
    const targetY = position[1];
    const duration = 1.5;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 0.016;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentY = startY + (targetY - startY) * easeProgress;
      setAnimatedPosition([position[0], currentY, position[2]]);
      
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <primitive 
      ref={cakeRef}
      object={scene} 
      position={animatedPosition} 
      rotation={rotation}
      scale={scale}
    />
  );
};

useGLTF.preload('/cake.glb');

export default Cake;
