import { getSiteContent } from '@/lib/supabase/public-content';
import Intervention from '@/app/sections/Intervention';

export default async function InterventionPage() {
  const { intervention } = await getSiteContent();
  return <Intervention content={intervention} />;
}
