import localFont from 'next/font/local';
import { IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google';

// HACEN Maghreb LT — the brand display font. Maghrebi Arabic calligraphy
// matching the logo's "إمكان المستقبل" glyphs. Used for all headings,
// hero titles, and brand marks via the `font-display` Tailwind utility.
export const hacenMaghreb = localFont({
  src: '../app/fonts/HacenMaghrebLT.ttf',
  variable: '--font-hacen',
  display: 'swap',
  preload: true,
  // Tajawal is the fallback for any glyph HACEN doesn't cover (Latin,
  // numerals, some rare characters) — prevents the display font from
  // silently falling back to the system font for English text.
  fallback: ['Tajawal', 'system-ui', 'sans-serif'],
});

// Tajawal — kept as the fallback display font for Latin/English text
// and a secondary display style. Only the weights actually used in the
// codebase (dropped 800 and 300 in the earlier mobile audit).
export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false, // secondary — don't preload
});

// IBM Plex Sans Arabic — kept as a deep fallback only. Body copy now uses
// HACEN (via --font-body), so IBM Plex is no longer in the active stack.
// `preload: false` removes the <link rel=preload> from the critical path.
export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
  preload: false,
});
