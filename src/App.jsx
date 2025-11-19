import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import IntroOverlay from './components/IntroOverlay';
import Scene from './components/Scene';
import LetterModal from './components/LetterModal';
import './index.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showBirthdayText, setShowBirthdayText] = useState(false);

  useEffect(() => {
    if (isStarted) {
      setShowInstructions(true);
      const instructionsTimer = setTimeout(() => {
        setShowInstructions(false);
      }, 10000);

      // Show birthday text after 5 seconds
      const birthdayTimer = setTimeout(() => {
        setShowBirthdayText(true);
        // Hide it after 5 seconds with fade out
        setTimeout(() => {
          setShowBirthdayText(false);
        }, 5000);
      }, 5000);

      return () => {
        clearTimeout(instructionsTimer);
        clearTimeout(birthdayTimer);
      };
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

      {/* ===== BIRTHDAY TEXT ===== */}
      <AnimatePresence>
        {showBirthdayText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, exit: { duration: 1.5 } }}
            className="absolute top-1/3 left-1/4.5 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{
              textShadow: '0 0 20px rgba(216, 150, 255, 0.8), 0 0 40px rgba(216, 150, 255, 0.5), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -1px 0 0 #000, 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000',
            }}
          >
            <h1 className="font-vt323 text-5xl md:text-7xl text-white font-bold">
              ¡Feliz Cumpleaños!
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
