import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getSiteContent } from '@/lib/supabase/public-content';

export const dynamic = 'force-dynamic';

export default async function WebsiteLayout({ children }) {
  const content = await getSiteContent();
  return <><Navbar content={content.branding} />{children}<Footer content={content.footer} /></>;
}
