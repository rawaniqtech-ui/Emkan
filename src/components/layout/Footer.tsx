import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, BRAND } from '@/lib/constants';
import { content } from '@/content/ar';
import { SoundWaveBars } from '@/components/shared/BrandDecor';

const SOCIAL_LINKS = [
  { label: 'تويتر', icon: 'X', href: '#' },
  { label: 'لينكدإن', icon: 'In', href: '#' },
  { label: 'انستغرام', icon: 'Ig', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-purple-dark text-white/80 relative overflow-hidden" role="contentinfo">
      {/* Wave divider top */}
      <div className="wave-divider-top" />
      {/* Floating brand icon */}
      <SoundWaveBars color="teal" size="lg" className="absolute top-24 left-12 opacity-[0.15] animate-float-slow hidden md:flex" />

      <div className="relative z-[2] max-w-[1200px] mx-auto px-5 md:px-12 pt-12 md:pt-20 pb-8 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group" aria-label="الصفحة الرئيسية">
              <Image
                src="/images/logo-icon.jpg"
                alt="شعار إمكان المستقبل"
                width={56}
                height={56}
                loading="lazy"
                quality={65}
                className="rounded-lg brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div>
                <p className="font-display font-bold text-white text-sm">{BRAND.name.ar}</p>
                <p className="text-xs text-white/60 tracking-wider">{BRAND.name.en}</p>
              </div>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed mt-4 max-w-xs">
              {content.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="روابط سريعة">
            <h4 className="font-display font-bold text-white text-sm mb-5">
              {content.footer.quickLinks}
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-brand-teal transition-colors duration-300 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">
              {content.footer.contactUs}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p dir="ltr" className="text-right">{content.contact.info.phone}</p>
              <p>{content.contact.info.email}</p>
              <p>{content.contact.info.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[2] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">{content.footer.copyright}</p>
          <div className="flex gap-3" role="list" aria-label="روابط التواصل الاجتماعي">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                role="listitem"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/30 hover:bg-brand-teal/20 hover:text-brand-teal transition-all duration-300 hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
