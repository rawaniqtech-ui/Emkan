import { Tajawal, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Subset to weights actually used in the codebase: dropped Tajawal 800 and
// IBM Plex 300 (zero font-extrabold / font-light usage at audit time).
export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
});

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
  preload: true,
});
