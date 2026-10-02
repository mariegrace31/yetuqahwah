'use client';

import { createClient } from '@/lib/supabase/client';
import { PORTAL_SESSION_STARTED_AT_KEY } from '@/lib/supabase/portal-session';

export default function SignOutButton() {
  async function signOut() {
    window.localStorage.removeItem(PORTAL_SESSION_STARTED_AT_KEY);
    await createClient().auth.signOut();
    window.location.assign('/portal/login');
  }

  return <button onClick={signOut} className="mt-5 rounded border border-[#ded5c9] px-4 py-2 text-sm transition focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">Se déconnecter</button>;
}
