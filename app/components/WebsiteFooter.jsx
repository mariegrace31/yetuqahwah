'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/app/components/Footer';

export default function WebsiteFooter({ content }) {
  const pathname = usePathname();
  if (pathname === '/intervention') return null;
  return <Footer content={content} />;
}
