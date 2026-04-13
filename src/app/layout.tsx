import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { tajawal, ibmPlexArabic } from '@/lib/fonts';
import { SITE_METADATA } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/layout/LenisProvider';
import ThemeProvider from '@/components/layout/ThemeProvider';
import BackgroundTexture from '@/components/shared/BackgroundTexture';
import './globals.css';

const ScrollDots = dynamic(() => import('@/components/shared/ScrollDots'));
const ScrollToTop = dynamic(() => import('@/components/shared/ScrollToTop'));
const WhatsAppButton = dynamic(() => import('@/components/shared/WhatsAppButton'));
const PageLoader = dynamic(() => import('@/components/shared/PageLoader'));

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: '%s',
  },
  description: SITE_METADATA.description,
  keywords: ['إمكان المستقبل', 'علاج النطق', 'تعديل السلوك', 'تنمية مهارات التعلم', 'أطفال', 'تأهيل', 'الرياض'],
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${ibmPlexArabic.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body" suppressHydrationWarning>
        <BackgroundTexture />
        <ThemeProvider>
          <LenisProvider>
            <PageLoader />
            <Navbar />
            <ScrollDots />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <WhatsAppButton phone="+966 XX XXX XXXX" />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
