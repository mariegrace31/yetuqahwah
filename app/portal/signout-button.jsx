'use client';

import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign('/portal/login');
  }

  return <button onClick={signOut} className="mt-5 rounded border border-[#ded5c9] px-4 py-2 text-sm">Se déconnecter</button>;
}
