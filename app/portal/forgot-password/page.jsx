'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault(); setError(''); setMessage('');
    const email = new FormData(event.currentTarget).get('email');
    const { error: resetError } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/portal/update-password`,
    });
    if (resetError) setError(resetError.message);
    else setMessage('Si cette adresse est associée à un compte, un lien de réinitialisation lui sera envoyé.');
  }

  return (
    <div className="flex min-h-[calc(100dvh-1.5rem)] items-center justify-center py-3">
    <section className="w-full max-w-md rounded-xl bg-white p-4 shadow-sm sm:p-7 md:p-10">
      <h1 className="font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Mot de passe oublié</h1>
      <p className="mt-2 text-sm text-yq_black/70">Nous vous enverrons un lien pour choisir un nouveau mot de passe.</p>
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="block text-sm">Adresse e-mail<input required name="email" type="email" autoComplete="email" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3 transition focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]" /></label>
        {message && <p role="status" className="text-sm text-green-800">{message}</p>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="rounded bg-yq_main px-4 py-3 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-yq_choc focus:ring-offset-2">Envoyer le lien</button>
      </form>
      <Link href="/portal/login" className="mt-5 inline-block text-sm text-yq_main underline">Retour à la connexion</Link>
    </section>
    </div>
  );
}
