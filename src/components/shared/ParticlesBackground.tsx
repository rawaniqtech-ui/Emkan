'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground({ inverted = false }: { inverted?: boolean }) {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip particles entirely on reduced-motion or low-end devices.
    // hardwareConcurrency <= 2 catches dual-core phones where canvas particles tank scroll.
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2) return;
    setEnabled(true);

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!enabled || !ready) return null;

  const colors = inverted ? ['#FFFFFF', '#87C6C7'] : ['#3B2C59', '#87C6C7'];

  return (
    <Particles
      id={inverted ? 'particles-inverted' : 'particles-main'}
      className="absolute inset-0 -z-[1]"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 30, density: { enable: true } },
          color: { value: colors },
          opacity: { value: { min: 0.15, max: 0.5 } },
          size: { value: { min: 3, max: 10 } },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none' as const,
            outModes: { default: 'bounce' as const },
          },
          shape: { type: 'circle' },
          links: { enable: false },
        },
        detectRetina: true,
        responsive: [
          { maxWidth: 768, options: { particles: { number: { value: 12 } } } },
        ],
      }}
    />
  );
}
