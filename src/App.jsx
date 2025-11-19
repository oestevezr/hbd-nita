import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import IntroOverlay from './components/IntroOverlay';
import Scene from './components/Scene';
import LetterModal from './components/LetterModal';
import './index.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (isStarted) {
      setShowInstructions(true);
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isStarted]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* ===== THE 3D CANVAS ===== */}
      <Canvas
        camera={{ 
          position: [0, 7, 35], 
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
      <AnimatePresence>
        {isStarted && !isLetterOpen && showInstructions && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-vt323 text-lg bg-black bg-opacity-70 px-6 py-3 rounded-lg text-center z-10 transition-opacity duration-1000">
            <p>🖱️ Drag to rotate • Scroll to zoom • Click the envelope to read the letter</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
