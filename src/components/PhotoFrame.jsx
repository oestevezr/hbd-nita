import { useState, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

const PhotoFrame = ({ 
  modelPath, 
  photoPath, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1 
}) => {
  const { scene } = useGLTF(modelPath);
  const photoTexture = useTexture(photoPath);
  const [animatedPosition, setAnimatedPosition] = useState([position[0] > 0 ? position[0] + 20 : position[0] - 20, position[1], position[2]]);
  
  useEffect(() => {
    const startX = position[0] > 0 ? position[0] + 20 : position[0] - 20;
    const targetX = position[0];
    const duration = 1.2;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 0.016;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentX = startX + (targetX - startX) * easeProgress;
      setAnimatedPosition([currentX, position[1], position[2]]);
      
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <group position={animatedPosition} rotation={rotation} scale={scale}>
      {/* The frame model */}
      <primitive object={scene.clone()} />
      
      {/* Photo plane - positioned slightly in front of the frame */}
      <mesh position={[-0.1, 0, 0.8]} rotation={[-Math.PI / 11, 0, 0]}>
        <planeGeometry args={[1.6, 2]} />
        <meshBasicMaterial 
          map={photoTexture} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default PhotoFrame;
