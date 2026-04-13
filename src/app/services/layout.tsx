import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'خدماتنا | إمكان المستقبل',
  description: 'خدمات متخصصة في علاج النطق والتخاطب، تعديل السلوك، تنمية مهارات التعلم، والفحص المدرسي — مركز إمكان المستقبل.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
