import { createClient } from '@supabase/supabase-js';
import { defaultSiteContent, mergeSiteContent } from '@/app/data/site-content';

export async function getSiteContent() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return defaultSiteContent;

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase.from('site_sections').select('section, content');
    if (error) return defaultSiteContent;
    return mergeSiteContent(data);
  } catch {
    return defaultSiteContent;
  }
}
