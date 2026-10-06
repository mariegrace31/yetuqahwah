import { redirect } from 'next/navigation';
import PortalDashboard from './dashboard';
import SignOutButton from './signout-button';
import { createClient } from '@/lib/supabase/server';

export default async function PortalPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return <section className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-7"><h1 className="font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Configurer Supabase</h1><p className="mt-3 break-words text-sm">Les variables Supabase ne sont pas configurées pour ce déploiement. Dans Vercel, ouvrez <strong>Settings → Environment Variables</strong> et ajoutez <code>NEXT_PUBLIC_SUPABASE_URL</code> ainsi que <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, avec les valeurs du projet Supabase. Activez-les pour Production (et Preview si nécessaire), puis redéployez le site. Pour le développement local, utilisez <code>.env.example</code> comme modèle pour créer <code>.env.local</code>.</p></section>;
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims) redirect('/portal/login');
  const { data: editor } = await supabase.from('site_editors').select('user_id').eq('user_id', claims.sub).maybeSingle();
  if (!editor) return <section className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-7"><h1 className="font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Accès en attente</h1><p className="mt-3 break-words text-sm">Ce compte est connecté, mais n’a pas encore été autorisé à modifier le site. Demandez à l’administrateur Supabase d’ajouter son identifiant à la table <code>site_editors</code>.</p><SignOutButton /></section>;
  return <PortalDashboard email={claims.email || ''} />;
}
