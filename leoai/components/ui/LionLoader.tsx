// components/ui/LionLoader.tsx
'use client';

import { motion } from 'framer-motion';

interface LionLoaderProps {
  message?: string;
  onCancel?: () => void;
}

export function LionLoader({ message = 'Leo is thinking...', onCancel }: LionLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6 max-w-md px-6">
        {/* Animated Lion Icon */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer Circle */}
          <motion.div
            className="absolute inset-0 border-4 border-gold/30 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Middle Circle */}
          <motion.div
            className="absolute inset-2 border-4 border-gold/50 rounded-full"
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            }}
          />

          {/* Lion Emoji with Pulse */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-5xl"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🦁
          </motion.div>

          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2 text-2xl"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            ✨
          </motion.div>
        </div>

        {/* Loading Message */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gold font-cinzel">{message}</h3>
          
          {/* Animated Dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <p className="text-sm text-warm-beige/80">
            Analyzing through 4 strategic frameworks...
          </p>
        </motion.div>

        {/* Cancel Button */}
        {onCancel && (
          <motion.button
            onClick={onCancel}
            className="mt-6 px-6 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Cancel Analysis
          </motion.button>
        )}
      </div>
    </div>
  );
}