import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا | إمكان المستقبل',
  description: 'تواصل مع مركز إمكان المستقبل — احجز استشارة مجانية أو تواصل معنا عبر الهاتف أو الواتساب أو البريد الإلكتروني.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
