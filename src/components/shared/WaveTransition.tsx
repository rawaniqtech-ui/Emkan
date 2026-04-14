interface WaveTransitionProps {
  /**
   * 'into-light' — dark surface above fading into a cream island below
   * (use before a light `.force-light` section).
   * 'out-of-light' — cream island above fading into dark surface below.
   */
  direction: 'into-light' | 'out-of-light';
  className?: string;
}

/**
 * Organic 3-layer SVG wave transition with a teal hairline accent, a soft
 * halo blur, and three floating decor dots. Matches the home-page
 * Journey-island transitions exactly — extracted so the same rhythm can
 * repeat across about / services / contact.
 */
export default function WaveTransition({ direction, className = '' }: WaveTransitionProps) {
  if (direction === 'into-light') {
    return (
      <div aria-hidden className={`relative h-32 md:h-44 bg-surface-primary overflow-hidden ${className}`}>
        <div className="absolute inset-x-0 bottom-8 h-24 bg-brand-teal/[0.05] blur-3xl" />
        <div className="absolute top-6 left-[15%] w-1 h-1 rounded-full bg-brand-teal/40 animate-float" />
        <div className="absolute top-10 right-[22%] w-1.5 h-1.5 rounded-full bg-brand-teal/30 animate-float-slow" />
        <div className="absolute top-14 left-[42%] w-1 h-1 rounded-full bg-brand-purple/40 animate-float-reverse" />
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 w-full h-full"
        >
          <path
            d="M0,110 C240,60 480,150 720,100 C960,50 1200,140 1440,90 L1440,180 L0,180 Z"
            fill="#F7F4EE"
            fillOpacity="0.12"
          />
          <path
            d="M0,135 C320,95 640,165 960,120 C1200,85 1320,150 1440,115 L1440,180 L0,180 Z"
            fill="#F7F4EE"
            fillOpacity="0.35"
          />
          <path
            d="M0,150 C220,120 520,175 800,145 C1080,115 1280,160 1440,135 L1440,180 L0,180 Z"
            fill="#F7F4EE"
          />
        </svg>
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none"
        >
          <path
            d="M0,150 C220,120 520,175 800,145 C1080,115 1280,160 1440,135"
            stroke="#87C6C7"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // out-of-light
  return (
    <div aria-hidden className={`relative h-32 md:h-44 bg-[#F7F4EE] overflow-hidden ${className}`}>
      <div className="absolute inset-x-0 top-6 h-24 bg-brand-teal/[0.08] blur-3xl" />
      <div className="absolute top-6 right-[18%] w-1 h-1 rounded-full bg-brand-purple/40 animate-float" />
      <div className="absolute top-10 left-[25%] w-1.5 h-1.5 rounded-full bg-brand-teal/50 animate-float-slow" />
      <div className="absolute top-14 right-[48%] w-1 h-1 rounded-full bg-brand-teal/40 animate-float-reverse" />
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-full"
      >
        <path
          d="M0,30 C240,80 480,0 720,50 C960,100 1200,10 1440,60 L1440,180 L0,180 Z"
          style={{ fill: 'var(--surface-primary)', fillOpacity: 0.18 }}
        />
        <path
          d="M0,55 C320,15 640,95 960,40 C1200,5 1320,70 1440,25 L1440,180 L0,180 Z"
          style={{ fill: 'var(--surface-primary)', fillOpacity: 0.45 }}
        />
        <path
          d="M0,75 C220,45 520,100 800,55 C1080,15 1280,70 1440,40 L1440,180 L0,180 Z"
          style={{ fill: 'var(--surface-primary)' }}
        />
      </svg>
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none"
      >
        <path
          d="M0,75 C220,45 520,100 800,55 C1080,15 1280,70 1440,40"
          stroke="#87C6C7"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
