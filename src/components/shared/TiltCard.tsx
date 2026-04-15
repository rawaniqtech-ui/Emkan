'use client';

import { useState } from 'react';
import Atropos from 'atropos/react';
import 'atropos/css';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  shadow?: boolean;
  highlight?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  intensity = 5,
  shadow = true,
  highlight = true,
}: TiltCardProps) {
  // Atropos installs mousemove listeners and builds multiple 3D compositing
  // layers per card. On touch devices there's no mouse to track, so the tilt
  // never triggers — but the layers and listeners still cost scroll-frame
  // paint work. Detect hover capability once at mount and skip Atropos
  // entirely on touch devices: render a plain div with the same className.
  const [canTilt] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  );

  if (!canTilt) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Atropos
      className={`atropos-custom ${className}`}
      rotateXMax={intensity}
      rotateYMax={intensity}
      shadow={shadow}
      highlight={highlight}
      shadowScale={0.95}
    >
      {children}
    </Atropos>
  );
}
