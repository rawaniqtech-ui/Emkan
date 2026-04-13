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

export const NAV_ITEMS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'خدماتنا', href: '/services' },
  { label: 'اتصل بنا', href: '/contact' },
] as const;

export const SITE_METADATA = {
  title: 'إمكان المستقبل | Future Emkan',
  description: 'مركز متخصص لدعم الأطفال في النطق والتخاطب، تعديل السلوك، وتنمية مهارات التعلم، بالشراكة مع الأسرة لإطلاق إمكاناتهم وبناء مستقبل أكثر استقلالاً وثقة',
  url: 'https://futureemkan.com',
} as const;

export const FRAME_CONFIG = {
  count: 91,
  directory: '/frames/hero/',
  prefix: 'frame_',
  extension: '.jpg',
  padLength: 4,
} as const;
