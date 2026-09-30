'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault(); setError(''); setMessage('');
    const password = new FormData(event.currentTarget).get('password');
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) setError(updateError.message);
    else setMessage('Votre mot de passe a été changé. Vous pouvez maintenant vous connecter.');
  }
  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-7 shadow-sm md:p-10">
      <h1 className="font-montserrat text-xl font-bold text-yq_choc">Choisir un nouveau mot de passe</h1>
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="text-sm">Nouveau mot de passe<input required minLength={8} name="password" type="password" autoComplete="new-password" className="mt-1 w-full rounded border border-yq_lightchoc px-3 py-3" /></label>
        {message && <p role="status" className="text-sm text-green-800">{message}</p>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="rounded bg-yq_main px-4 py-3 font-medium text-white">Enregistrer</button>
      </form>
      {message && <Link href="/portal/login" className="mt-5 inline-block text-sm text-yq_main underline">Aller à la connexion</Link>}
    </section>
  );
}
