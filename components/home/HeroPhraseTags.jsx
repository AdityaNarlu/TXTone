import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  { text: '"k"', meaning: 'They might be annoyed' },
  { text: '"lol"', meaning: 'They are not actually laughing' },
  { text: '"it\'s fine"', meaning: 'It is probably not fine' },
  { text: '"whatever"', meaning: 'They care a lot actually' },
  { text: '"haha yeah"', meaning: 'They want to change the topic' },
  { text: '"no worries"', meaning: 'There are definitely worries' },
  { text: '"sure"', meaning: 'They are just going along with it' },
  { text: '"..."', meaning: 'Something is on their mind' },
];

export default function HeroPhraseTags() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-2.5 max-w-xl mx-auto">
      {phrases.map((phrase, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08 }}
          onMouseEnter={() => setFlippedIndex(i)}
          onMouseLeave={() => setFlippedIndex(null)}
          onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
          className="relative h-9 px-4 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {flippedIndex === i ? (
              <motion.span
                key="meaning"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center h-full bg-solar text-ink px-4 -mx-4 rounded-full"
              >
                {phrase.meaning}
              </motion.span>
            ) : (
              <motion.span
                key="text"
                initial={{ rotateX: 90, opacity: 0 }}
 
