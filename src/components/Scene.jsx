import { useRef, Suspense, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import PhotoFrame from './PhotoFrame';
import Letter from './Letter';
import Cake from './Cake';
import Table from './Table';
import MusicPlayer from './MusicPlayer';

// Component for the background
function Background() {
  const texture = useTexture('/background.jpg');
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture;
    return () => {
      scene.background = null;
    };
  }, [texture, scene]);

  return null;
}

const Scene = ({ onOpenLetter }) => {
  return (
    <>
      {/* ===== LIGHTING ===== */}
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.5} groundColor="#444444" />
      
      {/* Warm candlelight */}
      <pointLight 
        position={[0, 2, 0]} 
        intensity={5} 
        color="#ffaa33" 
        distance={20}
        decay={2}
      />
      <pointLight 
        position={[4, 3, 4]} 
        intensity={2} 
        color="#ff9933" 
      />
      <pointLight 
        position={[-4, 3, 4]} 
        intensity={2} 
        color="#ff9933" 
      />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* ===== BACKGROUND ===== */}
      <Suspense fallback={null}>
        <Background />
      </Suspense>

      {/* ===== STARS ===== */}
      <Stars 
        radius={40} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />

      {/* ===== REFERENCE CUBE (for debugging) ===== */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      {/* ===== TABLE ===== */}
      <Suspense fallback={null}>
        <Table position={[0, -18.5, 0]} scale={12} />
      </Suspense>

      {/* ===== CAKE ===== */}
      <Suspense fallback={null}>
        <Cake 
          position={[-1.5, 0, 0]} scale={0.2} 
          rotation={[0, -Math.PI / -6, 0]}
        />
      </Suspense>

      {/* ===== PHOTO FRAMES ===== */}
      <Suspense fallback={null}>
        <PhotoFrame
          modelPath="/frame.glb"
          photoPath="/photo1.jpg"
          position={[-9, -0.3, -5]}
          rotation={[0, Math.PI / 6, 0]}
          scale={1.5}
        />
      </Suspense>
      <Suspense fallback={null}>
        <PhotoFrame
          modelPath="/frame.glb"
          photoPath="/photo2.jpg"
          position={[9, -0.3, -5]}
          rotation={[0, -Math.PI / 6, 0]}
          scale={1.5}
        />
      </Suspense>

      {/* ===== MUSIC PLAYER ===== */}
      <Suspense fallback={null}>
        <MusicPlayer 
          position={[8, -1.5, 3]} scale={0.02} 
          rotation={[0, -Math.PI / 6, 0]}
        />
      </Suspense>

      {/* ===== INTERACTIVE LETTER ===== */}
      <Letter position={[5, -1.8, 8]} onOpen={onOpenLetter} />

      {/* ===== CAMERA CONTROLS ===== */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        target={[0, 2, 0]}
      />
    </>
  );
};

export default Scene;
