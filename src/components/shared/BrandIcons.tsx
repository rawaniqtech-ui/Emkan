// Brand icon set inspired by the Future Emkan logo
// Uses sound wave bars, curved swoosh, circle/dot motifs

interface IconProps {
  className?: string;
  size?: number;
}

// Speech/Assessment — sound wave bars (from logo)
export function IconSpeech({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="10" y="18" width="3" height="12" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="16" y="12" width="3" height="24" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="22" y="8" width="3" height="32" rx="1.5" fill="currentColor" />
      <rect x="28" y="12" width="3" height="24" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="34" y="18" width="3" height="12" rx="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="38" cy="10" r="3" fill="currentColor" opacity="0.6" />
      <path d="M8 36 C16 42, 32 42, 40 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}

// Therapy/Rehab — hands reaching up with wave
export function IconTherapy({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="10" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="24" cy="10" r="3" fill="currentColor" />
      <path d="M12 40 C12 28, 24 20, 24 20 C24 20, 36 28, 36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M16 18 L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M32 18 L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <rect x="22" y="26" width="1.5" height="6" rx="0.75" fill="currentColor" opacity="0.3" />
      <rect x="25" y="24" width="1.5" height="8" rx="0.75" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Hearing/Auditory — ear with sound waves
export function IconHearing({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M20 8 C28 6, 36 12, 36 22 C36 30, 30 36, 26 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M20 16 C24 14, 28 18, 28 22 C28 26, 26 28, 24 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="22" cy="22" r="3" fill="currentColor" />
      <rect x="10" y="18" width="2" height="5" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="20" width="2" height="3" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// Early intervention — small figure with growth arc
export function IconEarly({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="14" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="14" r="3.5" fill="currentColor" />
      <path d="M16 40 L24 28 L32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10 38 C10 24, 18 14, 24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" strokeDasharray="3 3" />
      <path d="M38 38 C38 24, 30 14, 24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  );
}

// Behavior — brain with wave pattern
export function IconBehavior({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="12" r="6" fill="currentColor" opacity="0.3" />
      <path d="M14 28 C14 20, 24 16, 24 16 C24 16, 34 20, 34 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M18 34 C18 30, 24 27, 24 27 C24 27, 30 30, 30 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="24" cy="12" r="3" fill="currentColor" />
      <rect x="22" y="22" width="1.5" height="8" rx="0.75" fill="currentColor" opacity="0.4" />
      <rect x="25" y="20" width="1.5" height="10" rx="0.75" fill="currentColor" opacity="0.6" />
      <rect x="19" y="24" width="1.5" height="6" rx="0.75" fill="currentColor" opacity="0.3" />
      <rect x="28" y="24" width="1.5" height="6" rx="0.75" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Education support — open book with bars
export function IconLearning({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 36 V14 C8 14, 16 10, 24 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M40 36 V14 C40 14, 32 10, 24 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="24" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="14" y="20" width="2" height="8" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="18" y="17" width="2" height="11" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="28" y="17" width="2" height="11" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="32" y="20" width="2" height="8" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Family services — family figure with heart
export function IconFamily({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="16" cy="12" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="18" r="3" fill="currentColor" />
      <path d="M8 38 C8 28, 16 24, 16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M40 38 C40 28, 32 24, 32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M16 38 C16 30, 24 26, 24 26 C24 26, 32 30, 32 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24 32 L22 30 C20 28, 22 26, 24 28 C26 26, 28 28, 26 30 Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Screening — magnifying glass with wave
export function IconScreening({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="22" cy="22" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="31" y1="31" x2="40" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="17" y="18" width="1.5" height="8" rx="0.75" fill="currentColor" opacity="0.4" />
      <rect x="21" y="15" width="1.5" height="14" rx="0.75" fill="currentColor" opacity="0.7" />
      <rect x="25" y="18" width="1.5" height="8" rx="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Phone/Contact
export function IconPhone({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M14 8 C14 8, 10 8, 10 14 L10 18 C10 32, 16 38, 30 38 L34 38 C40 38, 40 34, 40 34 L40 30 C40 28, 38 26, 36 26 L32 26 C30 26, 28 28, 28 30 C24 28, 20 24, 18 20 C20 20, 22 18, 22 16 L22 12 C22 10, 20 8, 18 8 Z" fill="currentColor" opacity="0.8" />
      <path d="M30 8 C33 8, 36 10, 38 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M30 14 C32 14, 34 15, 35 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

// Assessment clipboard
export function IconAssessment({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M29 32 L31 34 L35 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Plan/Document
export function IconPlan({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M18 6 V12 C18 13, 19 14, 20 14 L28 14 C29 14, 30 13, 30 12 V6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <rect x="16" y="20" width="2" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="20" y="18" width="2" height="10" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="24" y="20" width="2" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <line x1="16" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="16" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

// Journey — child figure reaching up (from logo)
export function IconJourney({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="10" r="5" fill="currentColor" />
      <path d="M16 40 C16 28, 24 22, 24 22 C24 22, 32 28, 32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M12 30 C18 26, 24 22, 24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M36 30 C30 26, 24 22, 24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <rect x="22" y="16" width="1.5" height="6" rx="0.75" fill="currentColor" opacity="0.3" />
      <rect x="25" y="14" width="1.5" height="8" rx="0.75" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Email
export function IconEmail({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="12" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M6 16 L24 28 L42 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// Location
export function IconLocation({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 44 C24 44, 38 30, 38 20 C38 12, 32 6, 24 6 C16 6, 10 12, 10 20 C10 30, 24 44, 24 44Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="24" cy="20" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

// Chat/WhatsApp
export function IconChat({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 36 L10 28 C8 25, 7 22, 7 19 C7 11, 14 4, 24 4 C34 4, 41 11, 41 19 C41 27, 34 34, 24 34 C21 34, 18 33, 16 32 L8 36Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <rect x="17" y="17" width="2" height="5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="23" y="15" width="2" height="9" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="29" y="17" width="2" height="5" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Government building
export function IconGov({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6 L40 16 L8 16 Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="12" y1="16" x2="12" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="16" x2="20" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="16" x2="28" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="16" x2="36" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="6" y="36" width="36" height="4" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Globe/International
export function IconGlobe({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="8" y1="16" x2="40" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="8" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
