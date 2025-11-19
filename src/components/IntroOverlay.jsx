import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Terminal messages - Customize these lines for your story!
const TERMINAL_LINES = [
  '> System Initializing...',
  '> Loading shared memories...',
  '> Location: [Un lugar especial]...',
  '> Subject: Nita',
  '> HAPPY BIRTHDAY DETECTED.',
];

const IntroOverlay = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= TERMINAL_LINES.length) {
      // All lines typed, show the button
      setTimeout(() => setShowButton(true), 500);
      return;
    }

    const currentLine = TERMINAL_LINES[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setDisplayedText((prev) => {
          const allPreviousLines = TERMINAL_LINES
            .slice(0, currentLineIndex)
            .join('\n');
          const currentTyping = currentLine.slice(0, charIndex);
          return allPreviousLines
            ? allPreviousLines + '\n' + currentTyping
            : currentTyping;
        });
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait before starting next line
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, 500);
      }
    }, 50); // Typing speed (ms per character)

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center p-8"
    >
      <div className="max-w-3xl w-full">
        {/* Terminal Output */}
        <pre className="font-vt323 text-green-400 text-2xl md:text-3xl whitespace-pre-wrap mb-8">
          {displayedText}
          <span className="animate-pulse">_</span>
        </pre>

        {/* Open Gift Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, textShadow: '0 0 8px rgb(74, 222, 128)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="font-vt323 text-green-400 text-3xl border-2 border-green-400 px-8 py-4 hover:bg-green-400 hover:text-black transition-all duration-300"
          >
            [ CLICK ME! ]
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
