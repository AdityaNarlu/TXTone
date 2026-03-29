import React from 'react';
import { motion } from 'framer-motion';

export default function TypingBubbles() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-2 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-sky_blue to-mint"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
