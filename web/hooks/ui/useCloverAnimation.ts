'use client';
import { useState } from 'react';

export const useCloverAnimation = () => {
  const [clovers, setClovers] = useState<{ id: number; x: number }[]>([]);

  const startCloverAnimation = () => {
    const id = Date.now();
    const randomX = Math.random() * 60;
    setClovers(prev => [...prev, { id, x: randomX }]);

    setTimeout(() => {
      setClovers(prev => prev.filter(c => c.id !== id));
    }, 2000);
  };

  return { clovers, startCloverAnimation };
};
