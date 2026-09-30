'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    const { error: authError } = await createClient().auth.signInWithPassword({
      email: form.get('email'), password: form.get('password'),
    });
    if (authError) { setError('Adresse e-mail ou mot de passe incorrect.'); setBusy(false); return; }
    window.location.assign('/portal');
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-7 shadow-sm md:p-10">
      <h1 className="font-montserrat text-xl font-bold text-yq_choc">Connexion au tableau de bord</h1>
      <p className="mt-2 text-sm text-yq_black/70">Connectez-vous pour modifier le contenu du site.</p>
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="text-sm">Adresse e-mail<input required name="email" type="email" autoComplete="email" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3" /></label>
        <label className="text-sm">Mot de passe<input required name="password" type="password" autoComplete="current-password" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="rounded bg-yq_main px-4 py-3 font-medium text-white disabled:opacity-60">{busy ? 'Connexion…' : 'Se connecter'}</button>
      </form>
      <Link href="/portal/forgot-password" className="mt-5 inline-block text-sm text-yq_main underline">Mot de passe oublié ?</Link>
    </section>
  );
}
