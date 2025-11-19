import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useGLTF, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const MusicPlayer = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, audioSrc = '/music.mp3' }) => {
  const { scene } = useGLTF('/music_player.glb');
  const musicPlayerRef = useRef();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Setup audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 1;
    audioRef.current = audio;
    return () => {
      try { audio.pause(); } catch {}
      audio.src = '';
      audioRef.current = null;
    };
  }, [audioSrc]);

  const togglePlay = useCallback((e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Audio play failed:', err);
      });
    }
  }, [isPlaying]);

  // Compute model height to place the label reliably above it
  const labelY = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const height = box.max.y - box.min.y || 1;
    return box.max.y + Math.max(0.25, height * 0.1); // small margin above
  }, [scene]);

  const [animatedPosition, setAnimatedPosition] = useState([position[0] + 15, position[1], position[2]]);
  
  useEffect(() => {
    const startX = position[0] + 15;
    const targetX = position[0];
    const duration = 1.4;
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
    <group
      position={animatedPosition}
      rotation={rotation}
      scale={scale}
      onClick={togglePlay}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      {/* Model */}
      <primitive ref={musicPlayerRef} object={scene.clone()} />

      {/* Floating label above the music player (always faces camera) */}
      <Billboard position={[0, labelY, 0]} follow>
        {/* Label background */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.6, 0.6]} />
          <meshBasicMaterial color="black" transparent opacity={0.55} />
        </mesh>

        {/* Text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.35}
          color={isPlaying ? new THREE.Color('#14e6ff').multiplyScalar(12) : '#ffffff'}
          anchorX="center"
          anchorY="middle"
        >
          {isPlaying ? 'Pause' : 'Click me'}
        </Text>
      </Billboard>
    </group>
  );
};

// Preload the model
useGLTF.preload('/music_player.glb');

export default MusicPlayer;
