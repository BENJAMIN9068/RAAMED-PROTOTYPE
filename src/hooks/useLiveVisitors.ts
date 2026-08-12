'use client';

import { useEffect, useState } from 'react';

export function useLiveVisitors() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // Prototype simulated live visitor fluctuations
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        const next = prev + delta;
        return next < 1 ? 1 : next > 12 ? 8 : next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return count;
}

export function usePresence() {
  // No-op for prototype mode
  useEffect(() => {}, []);
}
