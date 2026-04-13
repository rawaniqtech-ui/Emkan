'use client';

import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-purple dark:bg-brand-teal text-white dark:text-brand-purple-dark hover:bg-brand-purple-dark dark:hover:bg-brand-teal-light border border-brand-purple dark:border-brand-teal hover:border-brand-purple-dark dark:hover:border-brand-teal-light',
  secondary:
    'bg-transparent text-brand-purple dark:text-brand-teal border border-brand-purple/20 dark:border-brand-teal/20 hover:border-brand-purple dark:hover:border-brand-teal hover:bg-brand-purple/5 dark:hover:bg-brand-teal/5',
  ghost:
    'bg-transparent text-brand-purple dark:text-brand-teal hover:bg-brand-purple/5 dark:hover:bg-brand-teal/5 border border-transparent',
  white:
    'bg-surface-elevated text-brand-purple hover:bg-surface-card border border-[var(--border-subtle)] dark:bg-white dark:text-brand-purple-dark dark:border-white dark:hover:bg-brand-cream',
};

const sizes = {
  sm: 'text-xs px-4 sm:px-5 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0',
  md: 'text-sm px-5 sm:px-7 py-3 sm:py-3 min-h-[44px]',
  lg: 'text-sm px-7 sm:px-10 py-3.5 sm:py-4 min-h-[48px]',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const { ref: magneticRef, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  const baseClasses = `inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 hover:scale-[0.97] active:scale-[0.95] ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <div
        ref={magneticRef as React.RefObject<HTMLDivElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        style={{ transition: 'transform 0.15s ease' }}
      >
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={magneticRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ transition: 'transform 0.15s ease' }}
    >
      <button type={type} onClick={onClick} className={baseClasses}>
        {children}
      </button>
    </div>
  );
}
