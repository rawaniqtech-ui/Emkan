import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من نحن | إمكان المستقبل',
  description: 'تعرف على مركز إمكان المستقبل — رسالتنا، رؤيتنا، قيمنا، وفريقنا المتخصص في تأهيل الأطفال وتنمية مهاراتهم.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
