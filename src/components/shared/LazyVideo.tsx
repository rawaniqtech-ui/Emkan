'use client';

import { useRef, useEffect, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
}

export default function LazyVideo({ src, className = '', overlayClassName }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          video.src = src;
          video.load();
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, loaded]);

  return (
    <>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className={className}
      />
      {overlayClassName && <div className={overlayClassName} />}
    </>
  );
}
