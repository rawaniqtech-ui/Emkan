'use client';

import { useEffect, useState } from 'react';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(
  target: number,
  isActive: boolean,
  duration = 2200
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = eased * target;

      setValue(target % 1 === 0 ? Math.floor(current) : parseFloat(current.toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setValue(target);
      }
    }

    requestAnimationFrame(update);
  }, [target, isActive, duration]);

  return value;
}
