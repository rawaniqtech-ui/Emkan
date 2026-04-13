'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.2,
  scale = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isDesktop = window.innerWidth >= 1024;
    const ctx = gsap.context(() => {
      // Parallax movement — desktop only (scrub is too costly on mobile)
      if (isDesktop) {
        gsap.to(image, {
          y: () => -container.offsetHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Scale reveal on enter
      if (scale) {
        gsap.from(image, {
          scale: 1.3,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} className="w-full h-[120%] relative -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
