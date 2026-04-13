'use client';

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
