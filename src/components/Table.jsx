import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Table = ({ position = [0, -2, 0], scale = 1 }) => {
  const { scene } = useGLTF('/table.glb');
  const [animatedPosition, setAnimatedPosition] = useState([position[0], position[1] - 15, position[2]]);
  
  useEffect(() => {
    const startY = position[1] - 15;
    const targetY = position[1];
    const duration = 1.8;
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
      object={scene} 
      position={animatedPosition} 
      scale={scale}
    />
  );
};

useGLTF.preload('/table.glb');

export default Table;
