import { redirect } from 'next/navigation';
import PortalDashboard from './dashboard';
import SignOutButton from './signout-button';
import { createClient } from '@/lib/supabase/server';

export default async function PortalPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return <section className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-7"><h1 className="font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Configurer Supabase</h1><p className="mt-3 break-words text-sm">Copiez <code>.env.example</code> vers <code>.env.local</code>, ajoutez l’URL et la clé publique Supabase, puis appliquez la migration <code className="break-all">supabase/migrations/202609300001_site_content.sql</code>.</p></section>;
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims) redirect('/portal/login');
  const { data: editor } = await supabase.from('site_editors').select('user_id').eq('user_id', claims.sub).maybeSingle();
  if (!editor) return <section className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-7"><h1 className="font-montserrat text-lg font-bold text-yq_choc sm:text-xl">Accès en attente</h1><p className="mt-3 break-words text-sm">Ce compte est connecté, mais n’a pas encore été autorisé à modifier le site. Demandez à l’administrateur Supabase d’ajouter son identifiant à la table <code>site_editors</code>.</p><SignOutButton /></section>;
  return <PortalDashboard email={claims.email || ''} />;
}
