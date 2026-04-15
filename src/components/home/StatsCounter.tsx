'use client';

import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { SoundWaveBars } from '@/components/shared/BrandDecor';
import { content } from '@/content/ar';

function CircleProgress({ value, max, isActive }: { value: number; max: number; isActive: boolean }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = isActive ? (value / max) * circumference : 0;

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full m-auto -rotate-90">
      {/* Track */}
      <circle
        cx="50" cy="50" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-text/[0.06]"
      />
      {/* Progress */}
      <circle
        cx="50" cy="50" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-brand-teal transition-all duration-[2200ms] ease-out"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
      />
      {/* Glow dot at the end */}
      {isActive && (
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-brand-teal/40 blur-[2px] transition-all duration-[2200ms] ease-out"
          strokeDasharray={`2 ${circumference - 2}`}
          strokeDashoffset={circumference - progress}
        />
      )}
    </svg>
  );
}

function StatItem({ number, suffix, label, isActive, delay, index }: {
  number: number;
  suffix: string;
  label: string;
  isActive: boolean;
  delay: number;
  index: number;
}) {
  const value = useCountUp(number, isActive, 2200 + delay);

  return (
    <div className="relative text-center py-5 sm:py-10 px-2 sm:px-4 group">
      {/* Circular progress ring */}
      <div className="relative w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] mx-auto mb-3 sm:mb-5">
        <CircleProgress value={value} max={number} isActive={isActive} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-brand-text tabular-nums">
            {value}
            <span className="text-brand-teal text-xs sm:text-lg">{suffix}</span>
          </span>
        </div>
      </div>
      <span className="text-[11px] sm:text-xs text-brand-text-muted block leading-tight">{label}</span>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/[0.03] rounded-2xl transition-colors duration-500" />
    </div>
  );
}

export default function StatsCounter() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section ref={ref} className="relative bg-surface-secondary py-12 md:py-20 lg:py-28 overflow-hidden">
      {/* Wave divider top */}

      {/* Ambient glows — floating */}
      <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[500px] h-[150px] sm:h-[300px] bg-brand-teal/[0.04] rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[200px] sm:w-[400px] h-[125px] sm:h-[250px] bg-brand-purple/[0.03] rounded-full blur-[100px] animate-float-reverse" />

      {/* Floating brand icon */}
      <SoundWaveBars color="teal" size="lg" className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-[0.12] hidden md:flex" />

      <div className="relative z-[2] max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-14">
          <span className="text-xs text-brand-teal font-medium block mb-3">
            {content.home.stats.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-text">
            أرقام نفخر بها
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0">
          {content.home.stats.items.map((item, i) => (
            <div
              key={i}
              className={`${
                i < content.home.stats.items.length - 1
                  ? 'md:border-l border-[var(--border-subtle)]'
                  : ''
              } ${i < 2 ? 'border-b md:border-b-0 border-[var(--border-subtle)]' : ''}`}
            >
              <StatItem
                number={item.number}
                suffix={item.suffix}
                label={item.label}
                isActive={isInView}
                delay={i * 200}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
