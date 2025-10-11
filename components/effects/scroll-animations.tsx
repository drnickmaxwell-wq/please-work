'use client';
import { motion } from 'framer-motion';
import React from 'react';

export function Reveal({ children, delay=0.1, y=12 }:{children: React.ReactNode; delay?: number; y?: number}){
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}
