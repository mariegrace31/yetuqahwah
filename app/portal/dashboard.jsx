'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentSections, defaultSiteContent, mergeSiteContent } from '@/app/data/site-content';
import { createClient } from '@/lib/supabase/client';
import { PORTAL_SESSION_MAX_AGE_MS, PORTAL_SESSION_STARTED_AT_KEY } from '@/lib/supabase/portal-session';

const fieldLabels = {
  title: 'Titre', description: 'Description', image: 'Image', note: 'Texte complémentaire',
  items: 'Éléments', id: 'Identifiant', brand: 'Marque', name: 'Nom', price: 'Prix',
  quote: 'Témoignage', rating: 'Note sur 5 étoiles', proofImage: 'Photo facultative',
  storyTitle: 'Titre — Notre histoire', story: 'Notre histoire',
  coffeeTitle: 'Titre — Café congolais', coffee: 'À propos du café congolais',
  challengesTitle: 'Titre — Défis', challenges: 'Défis et solutions',
  shopButton: 'Bouton boutique', aboutButton: 'Bouton en savoir plus',
  customer: 'Nom du client',
  hoursTitle: 'Titre des horaires', contactTitle: 'Titre du contact',
  phone: 'Téléphone', email: 'Adresse e-mail', address: 'Adresse',
  hours: 'Horaires', day: 'Jour', logo: 'Logo', logoAlt: 'Texte alternatif du logo',
};

const focusStyle = 'transition focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]';

function isAuthError(error) {
  return error?.status === 401 || error?.code === 'PGRST301' || /jwt expired|invalid jwt|auth session missing|refresh token.*(expired|invalid|not found)/i.test(error?.message || '');
}

function labelFor(key) {
  return fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function ContentEditor({ value, path, onChange, supabase, section, notify, ensureSession, onSessionExpired }) {
  if (Array.isArray(value)) {
    const isFounderParagraphs = section === 'founder' && ['biography', 'vision'].includes(path[path.length - 1]);
    const itemLabel = section === 'products' ? 'Produit' : section === 'testimonials' ? 'Témoignage' : isFounderParagraphs ? 'Paragraphe' : 'Élément';
    const addLabel = section === 'products' ? 'produit' : section === 'testimonials' ? 'témoignage' : isFounderParagraphs ? 'paragraphe' : 'élément';
    return (
      <div className="space-y-4">
        {value.map((item, index) => (
          <fieldset key={item.id || index} className="relative rounded-lg border border-[#e6ded3] p-4">
            <legend className="px-2 text-sm font-semibold">{itemLabel} {index + 1}</legend>
            <button type="button" onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))} className={`absolute right-3 top-2 rounded px-1 text-xs text-red-700 ${focusStyle}`}>Supprimer</button>
            <ContentEditor value={item} path={[...path, index]} onChange={onChange} supabase={supabase} section={section} notify={notify} ensureSession={ensureSession} onSessionExpired={onSessionExpired} />
          </fieldset>
        ))}
          <button type="button" onClick={() => {
            const item = structuredClone(value[0] || (section === 'testimonials'
              ? { id: 'new-testimonial', quote: '', name: '', rating: 5, proofImage: '' }
              : { title: '', description: '', image: '' }));
            if (item && typeof item === 'object' && 'id' in item) item.id = `${item.id}-${crypto.randomUUID()}`;
            onChange(path, [...value, item]);
          }} className={`rounded border border-yq_main px-4 py-2 text-sm text-yq_main ${focusStyle}`}>+ Ajouter un {addLabel}</button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    const isProductsRoot = section === 'products' && path.length === 1;
    const isHeroRoot = section === 'hero' && path.length === 1;
    const isAboutRoot = section === 'about' && path.length === 1;
    const isContactRoot = section === 'contact' && path.length === 1;
    const isTestimonialItem = section === 'testimonials' && path[1] === 'items' && typeof path[2] === 'number';
    const fields = Object.entries(value).filter(([key]) => !isTestimonialItem || key !== 'id');
    return <div className="grid gap-4 md:grid-cols-2">{fields.map(([key, child]) => {
      let layout = typeof child === 'object' ? 'md:col-span-2' : '';
      if (isProductsRoot) {
        if (key === 'title') layout = 'md:order-1';
        if (key === 'note') layout = 'md:order-2';
        if (key === 'description') layout = 'md:col-span-2 md:order-3';
        if (key === 'items') layout = 'md:col-span-2 md:order-4';
      }
      if (isHeroRoot) {
        if (key === 'aboutButton') layout = 'md:order-3';
        if (key === 'shopButton') layout = 'md:order-4';
        if (key === 'image') layout = 'md:col-span-2 md:order-5';
      }
      if (isAboutRoot) layout = 'md:col-span-2';
      if (isContactRoot) {
        if (key === 'title') layout = 'md:col-span-2 md:order-1';
        if (key === 'description') layout = 'md:col-span-2 md:order-2';
        if (key === 'image') layout = 'md:col-span-2 md:order-3';
      }
      if (isTestimonialItem) {
        if (key === 'quote') layout = 'md:col-span-2 md:order-1';
        if (key === 'proofImage') layout = 'md:col-span-2 md:order-2';
        if (key === 'name') layout = 'md:col-span-2 md:order-3';
        if (key === 'rating') layout = 'md:col-span-2 md:order-4';
      }
      return (
      <div key={key} className={layout}>
        <label className="mb-2 block text-sm font-medium">{key === 'items' ? (section === 'products' ? 'Produits' : section === 'testimonials' ? 'Témoignages' : 'Éléments') : isTestimonialItem && key === 'name' ? 'Nom du client' : labelFor(key)}</label>
        <ContentEditor value={child} path={[...path, key]} onChange={onChange} supabase={supabase} section={section} notify={notify} ensureSession={ensureSession} onSessionExpired={onSessionExpired} />
      </div>
    );})}</div>;
  }

  const imageKey = typeof path[path.length - 1] === 'string' ? path[path.length - 1].toLowerCase() : '';
  const isImage = imageKey.includes('image') || imageKey.includes('logo');
  const isTestimonialRating = section === 'testimonials' && imageKey === 'rating';
  const isLongText = (section === 'testimonials' && imageKey === 'quote') || (typeof value === 'string' && (value.length > 100 || value.includes('\n')));

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!await ensureSession()) return;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const objectPath = `${section}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from('site-assets').upload(objectPath, file, { upsert: false });
    if (error) {
      if (isAuthError(error)) { onSessionExpired(); return; }
      notify('error', `Échec du téléversement : ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from('site-assets').getPublicUrl(objectPath);
    onChange(path, data.publicUrl);
  }

  return (
    <div className="space-y-2">
      {isTestimonialRating ? <div className="flex gap-2" role="group" aria-label="Noter ce témoignage sur cinq étoiles">
        {Array.from({ length: 5 }, (_, index) => {
          const rating = index + 1;
          return <button key={rating} type="button" onClick={() => onChange(path, rating)} aria-label={`${rating} étoile${rating > 1 ? 's' : ''}`} aria-pressed={Number(value) === rating} className="rounded p-1 text-2xl text-[#FFAE4D] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">{rating <= Number(value) ? '★' : '☆'}</button>;
        })}
      </div> : isLongText ? <textarea rows={4} value={value ?? ''} onChange={(event) => onChange(path, event.target.value)} className={`w-full rounded border border-yq_lightchoc bg-white px-3 py-2 text-sm ${focusStyle}`} /> :
        <input value={value ?? ''} type="text" onChange={(event) => onChange(path, event.target.value)} className={`w-full rounded border border-yq_lightchoc bg-white px-3 py-2 text-sm ${focusStyle}`} />}
      {isImage && <>
        {value && <img src={value} alt="Aperçu de l’image" className="max-h-40 max-w-full rounded object-contain" />}
        <label className="inline-flex cursor-pointer rounded border border-yq_main px-3 py-2 text-xs text-yq_main focus-within:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">{value ? 'Modifier l’image' : 'Ajouter l’image'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} className="sr-only" /></label>
      </>}
    </div>
  );
}

function VisitorTestimonialsInbox({ supabase, ensureSession, onSessionExpired, notify }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.from('visitor_testimonials')
      .select('id,name,quote,rating,approved,created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error && isAuthError(error)) onSessionExpired();
        else if (error) notify('error', `Impossible de charger les commentaires : ${error.message}`);
        else setItems(data || []);
        setLoading(false);
      });
    return () => { active = false; };
  }, [supabase]);

  async function setApproval(item, approved) {
    if (!await ensureSession()) return;
    const { error } = await supabase.from('visitor_testimonials').update({ approved }).eq('id', item.id);
    if (error && isAuthError(error)) onSessionExpired();
    else if (error) notify('error', `Impossible de modifier le commentaire : ${error.message}`);
    else {
      setItems((current) => current.map((review) => review.id === item.id ? { ...review, approved } : review));
      notify('success', approved ? 'Témoignage publié.' : 'Témoignage retiré du site.');
    }
  }

  async function remove(item) {
    if (!await ensureSession()) return;
    const { error } = await supabase.from('visitor_testimonials').delete().eq('id', item.id);
    if (error && isAuthError(error)) onSessionExpired();
    else if (error) notify('error', `Impossible de supprimer le commentaire : ${error.message}`);
    else {
      setItems((current) => current.filter((review) => review.id !== item.id));
      notify('success', 'Témoignage supprimé.');
    }
  }

  return (
    <div className="mt-10 border-t border-[#e6ded3] pt-6">
      <h2 className="font-montserrat text-lg font-bold text-yq_choc">Commentaires reçus des visiteurs</h2>
      <p className="mt-1 text-sm text-yq_black/70">Les nouveaux commentaires restent privés jusqu’à leur validation.</p>
      {loading ? <p className="mt-4 text-sm text-yq_black/60">Chargement des commentaires…</p> : items.length === 0 ?
        <p className="mt-4 rounded-lg bg-[#f7f4ef] p-4 text-sm text-yq_black/70">Aucun commentaire reçu pour le moment.</p> :
        <div className="mt-4 space-y-3">
          {items.map((item) => <article key={item.id} className="rounded-lg border border-[#e6ded3] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-yq_main">{item.name}</h3>
              <span className={`rounded-full px-2.5 py-1 text-xs ${item.approved ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>{item.approved ? 'Publié' : 'À valider'}</span>
            </div>
            <p className="mt-2 text-sm text-[#FFAE4D]" aria-label={`Note : ${item.rating} sur 5`}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</p>
            <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-yq_black">{item.quote}</p>
            <p className="mt-2 text-xs text-yq_black/50">{new Date(item.created_at).toLocaleDateString('fr-FR')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setApproval(item, !item.approved)} className={`rounded bg-yq_main px-3 py-2 text-sm text-white ${focusStyle}`}>{item.approved ? 'Retirer du site' : 'Publier'}</button>
              <button type="button" onClick={() => remove(item)} className={`rounded border border-red-300 px-3 py-2 text-sm text-red-700 ${focusStyle}`}>Supprimer</button>
            </div>
          </article>)}
        </div>}
    </div>
  );
}

export default function PortalDashboard({ email }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(contentSections[0].id);
  const [content, setContent] = useState(() => structuredClone(defaultSiteContent));
  const [supabase] = useState(() => createClient());
  const [status, setStatus] = useState('');
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const loggingOut = useRef(false);
  const redirectHandled = useRef(false);

  function notify(type, message) {
    setToast({ type, message });
  }

  function redirectToLogin() {
    if (redirectHandled.current) return;
    redirectHandled.current = true;
    loggingOut.current = true;
    setRedirecting(true);
    window.localStorage.removeItem(PORTAL_SESSION_STARTED_AT_KEY);
    void supabase.auth.signOut({ scope: 'local' });
    router.replace('/portal/login?expired=1');
  }

  function checkSessionDeadline() {
    const startedAt = Number(window.localStorage.getItem(PORTAL_SESSION_STARTED_AT_KEY));
    if (startedAt && Date.now() >= startedAt + PORTAL_SESSION_MAX_AGE_MS) {
      redirectToLogin();
      return true;
    }
    return false;
  }

  async function ensureSession() {
    if (checkSessionDeadline()) return null;
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user && !error) return user;
    if (!error || isAuthError(error) || error.name === 'AuthSessionMissingError') redirectToLogin();
    else notify('error', 'Impossible de vérifier la session. Vérifie ta connexion et réessaie.');
    return null;
  }

  useEffect(() => {
    let timer;
    let startedAt = Number(window.localStorage.getItem(PORTAL_SESSION_STARTED_AT_KEY));
    if (!startedAt || startedAt > Date.now()) {
      startedAt = Date.now();
      window.localStorage.setItem(PORTAL_SESSION_STARTED_AT_KEY, String(startedAt));
    }
    const remaining = startedAt + PORTAL_SESSION_MAX_AGE_MS - Date.now();
    if (remaining <= 0) redirectToLogin();
    else timer = window.setTimeout(redirectToLogin, remaining);

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && ((event === 'SIGNED_OUT' && !loggingOut.current) || (event === 'INITIAL_SESSION' && !session))) redirectToLogin();
    });

    async function verifySession() {
      if (checkSessionDeadline()) return;
      const { data: { user }, error } = await supabase.auth.getUser();
      if (active && !user && (!error || isAuthError(error) || error.name === 'AuthSessionMissingError')) redirectToLogin();
    }

    const verifyWhenVisible = () => {
      if (document.visibilityState === 'visible') verifySession();
    };
    verifySession();
    window.addEventListener('focus', verifySession);
    document.addEventListener('visibilitychange', verifyWhenVisible);
    return () => {
      active = false;
      window.clearTimeout(timer);
      subscription.unsubscribe();
      window.removeEventListener('focus', verifySession);
      document.removeEventListener('visibilitychange', verifyWhenVisible);
    };
  }, [supabase, router]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let active = true;
    supabase.from('site_sections').select('section,content').then(({ data, error }) => {
      if (!active) return;
      if (error && isAuthError(error)) redirectToLogin();
      else if (error) setStatus(`Impossible de charger le contenu : ${error.message}. Vérifiez la migration Supabase.`);
      else if (data?.length) setContent(mergeSiteContent(data));
    });
    return () => { active = false; };
  }, [supabase]);

  function changeValue(path, value) {
    setContent((current) => {
      const updated = structuredClone(current);
      let target = updated;
      for (const segment of path.slice(0, -1)) target = target[segment];
      target[path[path.length - 1]] = value;
      return updated;
    });
    setStatus('');
  }

  async function save() {
    const user = await ensureSession();
    if (!user) return;
    setSaving(true); setStatus('');
    const { error } = await supabase.from('site_sections').upsert({
      section: activeSection, content: content[activeSection], updated_by: user?.id,
    });
    setSaving(false);
    if (error && isAuthError(error)) redirectToLogin();
    else if (error) notify('error', `Erreur lors de l’enregistrement : ${error.message}`);
    else {
      setStatus('');
      notify('success', 'Modifications enregistrées avec succès.');
    }
  }

  async function logout() {
    loggingOut.current = true;
    redirectHandled.current = true;
    setRedirecting(true);
    window.localStorage.removeItem(PORTAL_SESSION_STARTED_AT_KEY);
    await supabase.auth.signOut();
    router.replace('/portal/login'); router.refresh();
  }

  const selected = contentSections.find((section) => section.id === activeSection);
  if (redirecting) {
    return <main className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f7f4ef]" role="status" aria-label="Redirection vers la connexion">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-yq_lightchoc border-t-yq_main" />
    </main>;
  }

  return (
    <div onPointerDownCapture={checkSessionDeadline} onKeyDownCapture={checkSessionDeadline} className="fixed inset-3 grid grid-rows-[auto_minmax(0,1fr)] gap-3 overflow-hidden md:grid-cols-[240px_minmax(0,1fr)] md:grid-rows-1">
      <aside className="flex min-h-0 flex-col overflow-hidden rounded-xl bg-white p-2 shadow-sm sm:p-3">
        <div className="mb-2 border-b border-[#eee7df] pb-2 md:mb-4 md:pb-4">
          <p className="text-xs uppercase text-yq_black/50">Connecté en tant que</p><p className="mt-1 break-all text-sm font-medium">{email}</p>
        </div>
        <nav className="flex flex-wrap gap-2 overflow-hidden md:flex-1 md:flex-col">
          {contentSections.map((section) => <button key={section.id} onClick={() => { setActiveSection(section.id); setStatus(''); }} className={`shrink-0 rounded-lg px-2 py-1.5 text-left text-xs focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yq_choc sm:px-3 sm:py-2 sm:text-sm ${activeSection === section.id ? 'bg-yq_main text-white' : 'hover:bg-[#f5f1eb]'}`}>{section.label}</button>)}
        </nav>
        <button onClick={logout} className={`mt-2 w-full rounded border border-[#ded5c9] px-2 py-1.5 text-xs hover:bg-yq_lightbeige sm:px-3 sm:py-2 sm:text-sm md:mt-auto ${focusStyle}`}>Se déconnecter</button>
      </aside>
      <section className="min-h-0 min-w-0 overflow-y-auto rounded-xl bg-white px-3 pb-3 pt-0 shadow-sm sm:px-4 sm:pb-4 sm:pt-0">
        <div className="sticky top-0 z-30 -mx-3 mb-4 flex flex-wrap items-start justify-between gap-4 bg-white px-3 pb-3 pt-0 sm:-mx-4 sm:px-4 sm:pb-4 sm:pt-0">
          <div><p className="text-xs pt-2 uppercase tracking-wider text-yq_main">Éditeur de contenu</p><h1 className="mt-1 font-montserrat text-xl font-bold text-yq_choc">{selected?.label}</h1><p className="mt-1 text-sm text-yq_black/60">Modifiez les textes, ajoutez des produits ou téléversez vos images.</p></div>
          <button onClick={save} disabled={saving} className={`rounded bg-yq_main px-4 py-2 mt-2 text-sm font-medium text-white disabled:opacity-60 ${focusStyle}`}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
        </div>
        <ContentEditor value={content[activeSection]} path={[activeSection]} onChange={changeValue} supabase={supabase} section={activeSection} notify={notify} ensureSession={ensureSession} onSessionExpired={redirectToLogin} />
        {activeSection === 'testimonials' && <VisitorTestimonialsInbox supabase={supabase} ensureSession={ensureSession} onSessionExpired={redirectToLogin} notify={notify} />}
        {status && <p role="status" className="mt-5 rounded bg-[#f7f4ef] p-3 text-sm">{status}</p>}
      </section>
      {toast && <div role={toast.type === 'error' ? 'alert' : 'status'} className={`fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium shadow-lg animate-[toast-in_250ms_ease-out] ${toast.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
        {toast.type === 'error' ? (
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" /></svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.78-9.22a.75.75 0 0 0-1.06-1.06L9 11.44 7.28 9.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25Z" clipRule="evenodd" /></svg>
        )}
        <span>{toast.message}</span>
      </div>}
    </div>
  );
}
