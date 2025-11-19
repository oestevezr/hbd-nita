import { motion } from 'framer-motion';

const LetterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative bg-[#f9f5e7] rounded-lg shadow-2xl max-w-md w-full border-4 border-amber-900 max-h-[90vh] flex flex-col overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #f9f5e7 0%, #f0e8d8 100%)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-amber-900 hover:text-amber-700 text-2xl font-bold z-20"
        >
          ✕
        </button>

        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent z-10"></div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8">
          <div className="font-typewriter text-amber-900 leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Querida Nita,
            </h2>
            
            <p className="mb-3 indent-8">
              Happy Birthday! 🎂 Today is all about celebrating YOU and the incredible person you are.
            </p>
            
            <p className="mb-3 indent-8">
              From the moment we met at [that special place], I knew you were someone extraordinary. 
              Your smile lights up every room, your laughter is contagious, and your kindness touches 
              everyone around you.
            </p>
            
            <p className="mb-3 indent-8">
              I created this little digital experience to show you how much you mean to me. 
              Every photo here holds a precious memory, every candle on that cake represents 
              a wish for your happiness.
            </p>
            
            <p className="mb-3 indent-8">
              May this year bring you endless joy, amazing adventures, and all the love you deserve. 
              Thank you for being you, and for letting me be part of your journey.
            </p>
            
            <p className="mt-6 text-right">
              Te amo,<br />
              <span className="font-bold">Nene</span> ❤️
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent z-10"></div>
      </motion.div>
    </div>
  );
};

export default LetterModal;
