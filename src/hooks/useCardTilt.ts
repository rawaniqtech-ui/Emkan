'use client';

import { useCallback } from 'react';

export function useCardTilt(maxTilt = 8) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      el.style.transition = '';
    }, 500);
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
