import { useGLTF } from '@react-three/drei';

const Table = ({ position = [0, -2, 0], scale = 1 }) => {
  const { scene } = useGLTF('/table.glb');

  return (
    <primitive 
      object={scene} 
      position={position} 
      scale={scale}
    />
  );
};

useGLTF.preload('/table.glb');

export default Table;
