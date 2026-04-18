import type { Metadata } from 'next';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `مقالات وفعاليات | ${SITE_METADATA.title}`,
  description:
    'مقالات متخصصة في النطق والتخاطب وتطور الأطفال، وفعاليات مجتمعية يقدمها مركز إمكان المستقبل في تبوك لدعم الأسرة والطفل.',
  openGraph: {
    title: `مقالات وفعاليات | ${SITE_METADATA.title}`,
    description:
      'مقالات متخصصة في النطق والتخاطب وتطور الأطفال، وفعاليات مجتمعية يقدمها مركز إمكان المستقبل في تبوك.',
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
