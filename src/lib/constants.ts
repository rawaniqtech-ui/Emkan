export const BRAND = {
  colors: {
    purple: '#3B2C59',
    purpleLight: '#5A4580',
    purpleDark: '#2A1E42',
    teal: '#87C6C7',
    tealLight: '#A8D8D9',
    tealDark: '#4A9899',
    cream: '#FAF8F5',
    white: '#FFFFFF',
    text: '#2D2D2D',
    textMuted: '#6B6B6B',
  },
  name: {
    ar: 'إمكان المستقبل',
    en: 'Future Emkan',
  },
  tagline: {
    ar: 'معًا نطلق إمكاناتهم',
    en: 'Together we unlock their potential',
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'خدماتنا', href: '/services' },
  { label: 'مقالات', href: '/articles' },
  {
    label: 'اتصل بنا',
    href: '/contact',
    children: [
      { label: 'تواصل معنا', href: '/contact' },
      { label: 'التسجيل والتقديم', href: '/contact#registration' },
      { label: 'التوظيف', href: '/contact#employment' },
      { label: 'الشراكات', href: '/contact#partnership' },
    ],
  },
];

export const SITE_METADATA = {
  title: 'إمكان المستقبل | Future Emkan',
  description: 'مركز متخصص لدعم الأطفال في النطق والتخاطب، تعديل السلوك، وتنمية مهارات التعلم، بالشراكة مع الأسرة لإطلاق إمكاناتهم وبناء مستقبل أكثر استقلالاً وثقة',
  url: 'https://futureemkan.com',
} as const;

// FormSubmit.co — every contact form on the site POSTs directly to one of
// these URLs. No API key, no backend code, no env var: the destination email
// address IS the identifier. Change FORMSUBMIT_EMAIL when swapping from the
// testing inbox to the client's production inbox; after the swap, submit
// once and click the FormSubmit confirmation email that arrives at the new
// address (one-time, ~10 seconds).
//
// Two endpoints because FormSubmit's AJAX endpoint silently drops file
// attachments. Forms WITHOUT files use the AJAX endpoint (cleaner UX, real
// success/error JSON). The CV form uses the standard endpoint via a hidden
// iframe so multipart file uploads actually deliver as email attachments.
const FORMSUBMIT_EMAIL = 'rawaniqtech@gmail.com';
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;
export const FORMSUBMIT_FORM_ENDPOINT = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;

