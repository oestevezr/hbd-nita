import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import IntroOverlay from './components/IntroOverlay';
import Scene from './components/Scene';
import LetterModal from './components/LetterModal';
import './index.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* ===== THE 3D CANVAS ===== */}
      <Canvas
        camera={{ 
          position: [0, 3, 12], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {isStarted && <Scene onOpenLetter={() => setIsLetterOpen(true)} />}
        </Suspense>
      </Canvas>

      {/* ===== LOADING INDICATOR ===== */}
      {isStarted && (
        <div className="absolute top-4 left-4 text-white font-vt323 text-xl bg-black bg-opacity-50 px-4 py-2 rounded z-10">
          Loading Experience...
        </div>
      )}

      {/* ===== INTRO TERMINAL OVERLAY ===== */}
      <AnimatePresence>
        {!isStarted && (
          <IntroOverlay onComplete={() => setIsStarted(true)} />
        )}
      </AnimatePresence>

      {/* ===== LETTER MODAL ===== */}
      <AnimatePresence>
        {isLetterOpen && (
          <LetterModal onClose={() => setIsLetterOpen(false)} />
        )}
      </AnimatePresence>

      {/* ===== INSTRUCTIONS OVERLAY (shows after intro) ===== */}
      {isStarted && !isLetterOpen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-vt323 text-lg bg-black bg-opacity-70 px-6 py-3 rounded-lg text-center z-10">
          <p>🖱️ Drag to rotate • Scroll to zoom • Click the envelope to read the letter</p>
        </div>
      )}
    </div>
  );
}

export default App;
