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

  return (
    <group position={position} rotation={rotation} scale={scale}>
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
