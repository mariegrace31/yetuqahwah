'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error') === 'invite') {
      setNotice("Le lien d'invitation est invalide ou expiré. Demande un nouvel e-mail d’invitation.");
    }
  }, []);

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
    <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center py-3">
    <section className="w-full max-w-md rounded-xl bg-white p-5 shadow-sm sm:p-7 md:p-10">
      <h1 className="text-center font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Connexion</h1>
      <p className="mt-2 text-sm text-center text-yq_black/70">Connectez-vous pour modifier le contenu du site.</p>
      {notice && <p role="alert" className="mt-4 rounded bg-[#f7f4ef] p-3 text-sm text-yq_choc">{notice}</p>}
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="block text-sm">Adresse e-mail<input required name="email" type="email" autoComplete="email" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3 transition focus:border-yq_choc focus:outline-none focus:ring-2 focus:ring-yq_choc/30 focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]" /></label>
        <label className="block text-sm">Mot de passe<input required name="password" type="password" autoComplete="current-password" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3 transition focus:border-yq_choc focus:outline-none focus:ring-2 focus:ring-yq_choc/30 focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="rounded bg-yq_main px-4 py-3 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-yq_choc focus:ring-offset-2 disabled:opacity-60">{busy ? 'Connexion…' : 'Se connecter'}</button>
      </form>
      <Link href="/portal/forgot-password" className="mt-5 inline-block text-sm text-yq_main underline">Mot de passe oublié ?</Link>
    </section>
    </div>
  );
}
