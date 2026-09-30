'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

function safeNext(value) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/portal/update-password';
}

export default function AuthConfirmPage() {
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function confirmLink() {
      const url = new URL(window.location.href);
      const query = url.searchParams;
      const fragment = new URLSearchParams(url.hash.slice(1));
      const next = safeNext(query.get('next'));
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        { auth: { detectSessionInUrl: false } },
      );

      let authError = null;
      const code = query.get('code');
      const tokenHash = query.get('token_hash');
      const type = query.get('type');

      if (query.has('error') || fragment.has('error')) {
        authError = new Error(query.get('error_description') || fragment.get('error_description') || 'Ce lien est invalide ou a expiré.');
      } else if (code) {
        ({ error: authError } = await supabase.auth.exchangeCodeForSession(code));
      } else if (tokenHash && ['invite', 'recovery', 'signup', 'email'].includes(type)) {
        ({ error: authError } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type }));
      } else if (fragment.get('access_token') && fragment.get('refresh_token')) {
        ({ error: authError } = await supabase.auth.setSession({
          access_token: fragment.get('access_token'),
          refresh_token: fragment.get('refresh_token'),
        }));
      } else {
        authError = new Error('Le lien est incomplet ou a expiré.');
      }

      if (!active) return;
      if (authError) {
        setError('Ce lien est invalide ou a expiré. Demande une nouvelle invitation ou un nouveau lien de réinitialisation.');
        return;
      }

      window.location.replace(next);
    }

    confirmLink().catch(() => {
      if (active) setError('Impossible de vérifier ce lien. Réessaie avec un nouveau lien.');
    });

    return () => { active = false; };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-yq_main/10 px-4 py-8">
      <section className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
        {error ? (
          <>
            <h1 className="font-montserrat text-xl font-bold text-yq_choc">Lien non valide</h1>
            <p role="alert" className="mt-3 text-sm text-yq_black/75">{error}</p>
            <Link href="/portal/login" className="mt-6 inline-block rounded bg-yq_main px-5 py-3 font-medium text-white">Aller à la connexion</Link>
          </>
        ) : (
          <p role="status" className="text-yq_black/75">Vérification du lien, un instant…</p>
        )}
      </section>
    </main>
  );
}
