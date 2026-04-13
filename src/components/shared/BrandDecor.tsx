import Image from 'next/image';

/* ── Sound Wave Bars — the logo's signature motif ── */
export function SoundWaveBars({
  color = 'teal',
  size = 'md',
  className = '',
}: {
  color?: 'purple' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const heights = {
    sm: [6, 10, 14, 10, 6],
    md: [10, 18, 26, 18, 10],
    lg: [16, 28, 40, 28, 16],
  };
  const widths = { sm: 2.5, md: 3.5, lg: 4.5 };
  const gaps = { sm: 2, md: 2.5, lg: 3 };
  const c = color === 'purple' ? 'bg-[#3B2C59]' : 'bg-[#5AA8A9]';

  return (
    <div className={`flex items-end pointer-events-none ${className}`} aria-hidden="true" style={{ gap: `${gaps[size]}px` }}>
      {heights[size].map((h, i) => (
        <div key={i} className={`rounded-full ${c}`} style={{ width: widths[size], height: h }} />
      ))}
    </div>
  );
}

/* ── Swoosh Curve — the logo's flowing arc ── */
export function SwooshCurve({
  color = 'teal',
  width = 400,
  className = '',
}: {
  color?: 'purple' | 'teal';
  width?: number;
  className?: string;
}) {
  const c = color === 'purple' ? '#3B2C59' : '#5AA8A9';

  return (
    <svg
      width={width}
      height={width * 0.15}
      viewBox="0 0 400 60"
      fill="none"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 50 C80 50, 120 10, 200 10 C280 10, 320 50, 400 50"
        stroke={c}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Brand Circle — concentric circle + center dot ── */
export function BrandCircle({
  size = 150,
  color = 'purple',
  className = '',
}: {
  size?: number;
  color?: 'purple' | 'teal';
  className?: string;
}) {
  const c = color === 'purple' ? 'border-brand-purple' : 'border-brand-teal';

  return (
    <div
      className={`rounded-full ${c} border pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={`w-full h-full rounded-full ${c} border flex items-center justify-center`} style={{ margin: size * 0.15, width: size * 0.7, height: size * 0.7 }}>
        <div className={`rounded-full ${color === 'purple' ? 'bg-brand-purple' : 'bg-brand-teal'}`} style={{ width: size * 0.08, height: size * 0.08 }} />
      </div>
    </div>
  );
}

/* ── Logo Watermark — ghost logo at large scale ── */
export function LogoWatermark({
  size = 300,
  invert = false,
  className = '',
}: {
  size?: number;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/images/logo-icon.jpg"
        alt=""
        width={size}
        height={size}
        className={`w-full h-full object-contain ${invert ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}

/* ── Pattern Strip — section transition using brand pattern ── */
export function PatternStrip({
  height = 50,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`w-full brand-pattern ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  );
}

/* ── Sound Wave Row — multiple bars across width ── */
export function SoundWaveRow({
  color = 'teal',
  className = '',
}: {
  color?: 'purple' | 'teal';
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-16 md:gap-24 py-4 pointer-events-none ${className}`} aria-hidden="true">
      <SoundWaveBars color={color} size="sm" className="opacity-[0.2]" />
      <SoundWaveBars color={color} size="md" className="opacity-[0.3]" />
      <SoundWaveBars color={color} size="lg" className="opacity-[0.4]" />
      <SoundWaveBars color={color} size="md" className="opacity-[0.3] hidden sm:flex" />
      <SoundWaveBars color={color} size="sm" className="opacity-[0.2] hidden md:flex" />
    </div>
  );
}
