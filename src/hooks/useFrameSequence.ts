'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FrameSequenceOptions {
  frameCount: number;
  directory: string;
  prefix: string;
  extension: string;
  padLength: number;
  // When false, the hook won't subscribe to scroll — caller drives frames
  // manually via the returned `drawFrame(index)`. Used by mobile auto-play.
  enableScrollDriven?: boolean;
}

interface NetworkInfo {
  effectiveType?: string;
  saveData?: boolean;
}

function detectNetwork(): NetworkInfo {
  if (typeof navigator === 'undefined') return {};
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  return {
    effectiveType: conn?.effectiveType,
    saveData: conn?.saveData,
  };
}

export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
  options: FrameSequenceOptions
) {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // First-frame state lets the loader hide and the canvas show as soon as
  // frame 0 is decoded — instead of waiting for ALL 91 frames to download.
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  // On 2g/save-data we ship just the assembled end frame as a static poster
  // (graceful fallback so we don't burn 5MB on slow connections).
  const [staticFallback, setStaticFallback] = useState(false);

  // Preload all frames — frame 0 first, then the rest in parallel.
  useEffect(() => {
    const net = detectNetwork();
    const isSlowNet = net.effectiveType === '2g' || net.effectiveType === 'slow-2g' || net.saveData === true;

    if (isSlowNet) {
      // Static-fallback path: load only the final assembled frame.
      const lastNum = String(options.frameCount).padStart(options.padLength, '0');
      const img = new Image();
      img.src = `${options.directory}${options.prefix}${lastNum}${options.extension}`;
      img.fetchPriority = 'high';
      img.onload = () => {
        framesRef.current = [img];
        setStaticFallback(true);
        setFirstFrameLoaded(true);
        setIsLoaded(true);
        setLoadProgress(1);
      };
      return;
    }

    const frames: HTMLImageElement[] = new Array(options.frameCount);
    let loaded = 0;

    const startLoad = (i: number) => {
      const img = new Image();
      const num = String(i).padStart(options.padLength, '0');
      // Critical frames (start + end) get high priority; everything in
      // between is low-priority and queued via requestIdleCallback so the
      // initial paint isn't competing with 80+ parallel image downloads.
      if (i <= 8 || i > options.frameCount - 4) {
        img.fetchPriority = 'high';
      } else {
        img.fetchPriority = 'low';
      }
      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / options.frameCount);
        if (i === 1) setFirstFrameLoaded(true);
        if (loaded === options.frameCount) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (i === 1) setFirstFrameLoaded(true);
        if (loaded === options.frameCount) setIsLoaded(true);
      };
      img.src = `${options.directory}${options.prefix}${num}${options.extension}`;
      frames[i - 1] = img;
    };

    // Critical frames kick off immediately so the reveal can start instantly
    // and the final poster is ready as soon as the user scrolls to the end.
    for (let i = 1; i <= 8; i++) startLoad(i);
    for (let i = Math.max(9, options.frameCount - 3); i <= options.frameCount; i++) startLoad(i);

    // Mid-range frames (9 .. count-4) are queued on the browser's idle time
    // so they don't fight with LCP / hydration. Falls back to setTimeout on
    // Safari / older browsers that lack requestIdleCallback.
    const idleQueue = (cb: () => void) => {
      type IdleWindow = Window & { requestIdleCallback?: (cb: () => void) => number };
      const w = typeof window !== 'undefined' ? (window as IdleWindow) : undefined;
      if (w?.requestIdleCallback) w.requestIdleCallback(cb);
      else setTimeout(cb, 200);
    };
    idleQueue(() => {
      for (let i = 9; i <= options.frameCount - 4; i++) {
        if (!frames[i - 1]) startLoad(i);
      }
    });

    framesRef.current = frames;
  }, [options.frameCount, options.directory, options.prefix, options.extension, options.padLength]);

  // Draw a frame on the canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // In static-fallback mode there's only one image; clamp the index
      const img = staticFallback ? framesRef.current[0] : framesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      // Use CSS pixel dimensions (canvas was scaled by DPR in resize)
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;

      // Dark purple matches the surrounding HeroCanvas section (always dark
      // regardless of site theme), so the padding around the contain-fit
      // image blends into the section instead of showing a bright rim.
      ctx.fillStyle = '#1E1535';
      ctx.fillRect(0, 0, cssW, cssH);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cssW / cssH;
      const isMobile = window.innerWidth < 768;
      let drawW: number, drawH: number;

      if (isMobile) {
        // Contain-fit on mobile so the full landscape frame stays inside the
        // portrait viewport (no horizontal crop of the 3D letters).
        const scale = 0.98;
        if (canvasRatio > imgRatio) {
          drawH = cssH * scale;
          drawW = drawH * imgRatio;
        } else {
          drawW = cssW * scale;
          drawH = drawW / imgRatio;
        }
      } else {
        // Contain-fit at 94% for breathing room on desktop
        const scale = 0.94;
        if (canvasRatio > imgRatio) {
          drawH = cssH * scale;
          drawW = drawH * imgRatio;
        } else {
          drawW = cssW * scale;
          drawH = drawW / imgRatio;
        }
      }

      const drawX = (cssW - drawW) / 2;
      const drawY = (cssH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [canvasRef, staticFallback]
  );

  // Resize canvas — DPR-aware so retina phones get sharp logo edges.
  // Cap at 2x DPR (a 3x phone with 2x scaling looks identical to native eyes
  // but uses 44% less GPU memory than full 3x).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const cssW = parent ? parent.clientWidth : window.innerWidth;
      const cssH = parent ? parent.clientHeight : window.innerHeight;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef, drawFrame]);

  // Draw first frame as soon as it loads (don't wait for the whole sequence).
  useEffect(() => {
    if (firstFrameLoaded && currentFrameRef.current < 0) {
      drawFrame(0);
      currentFrameRef.current = 0;
    }
  }, [firstFrameLoaded, drawFrame]);

  // Scroll-driven frame updates — gated by IntersectionObserver so we don't
  // burn CPU on every scroll tick after the user has scrolled past the canvas.
  useEffect(() => {
    if (!firstFrameLoaded || staticFallback) return;
    if (options.enableScrollDriven === false) return; // caller drives manually
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    let isInView = true;

    function handleScroll() {
      if (!isInView || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!section) { ticking = false; return; }
        const rect = section.getBoundingClientRect();
        // Sticky pin range is bounded by the sticky container height, which
        // is the viewport on desktop (h-screen). The canvas element itself is
        // a flex-1 slice of that container — its height must not be used for
        // scroll math because it'd make progress drift by ~15% before the
        // sticky actually releases.
        const pinHeight = window.innerHeight;
        const scrollableHeight = section.offsetHeight - pinHeight;

        let progress: number;
        if (scrollableHeight > 50) {
          // Sticky mode: section meaningfully taller than the viewport
          // (desktop). Frames map to the pinned scroll range — progress 0 at
          // rect.top=0, 1 when sticky releases.
          progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
        } else {
          // Travel mode: section is compact (mobile section ≤ viewport).
          // Frames advance while the section travels through the viewport,
          // so the animation spans the natural scroll-through without a
          // pinned dead zone.
          const viewportH = window.innerHeight;
          const totalTravel = viewportH + section.offsetHeight;
          const scrolled = viewportH - rect.top;
          progress = Math.min(1, Math.max(0, scrolled / totalTravel));
        }

        const frameIndex = Math.min(
          options.frameCount - 1,
          Math.floor(progress * options.frameCount)
        );
        if (frameIndex !== currentFrameRef.current && frameIndex >= 0) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
        ticking = false;
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) handleScroll();
      },
      { rootMargin: '50% 0px' }
    );
    observer.observe(section);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [firstFrameLoaded, staticFallback, sectionRef, options.frameCount, options.enableScrollDriven, drawFrame]);

  return {
    loadProgress,
    isLoaded,
    firstFrameLoaded,
    staticFallback,
    currentFrame: currentFrameRef,
    drawFrame,
  };
}
