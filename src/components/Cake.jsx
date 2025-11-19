import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Cake = ({ position = [0, -1, 0], scale = 1 }) => {
  const cakeRef = useRef();
  const { scene } = useGLTF('/cake.glb');

  return (
    <primitive 
      ref={cakeRef}
      object={scene} 
      position={position} 
      scale={scale}
    />
  );
};

useGLTF.preload('/cake.glb');

export default Cake;
