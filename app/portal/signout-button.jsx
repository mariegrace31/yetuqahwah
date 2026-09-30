'use client';

import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign('/portal/login');
  }

  return <button onClick={signOut} className="mt-5 rounded border border-[#ded5c9] px-4 py-2 text-sm transition focus:border-yq_choc focus:outline-none focus:ring-2 focus:ring-yq_choc/30 focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">Se déconnecter</button>;
}
