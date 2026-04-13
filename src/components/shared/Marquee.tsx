'use client';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  speed = 30,
  separator = '✦',
  className = '',
  reverse = false,
}: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className={`inline-flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="inline-block pe-4">{content}</span>
        <span className="inline-block pe-4">{content}</span>
        <span className="inline-block pe-4">{content}</span>
        <span className="inline-block pe-4">{content}</span>
      </div>
    </div>
  );
}
