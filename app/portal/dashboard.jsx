'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentSections, defaultSiteContent, mergeSiteContent } from '@/app/data/site-content';
import { createClient } from '@/lib/supabase/client';

const fieldLabels = {
  title: 'Titre', description: 'Description', image: 'Image', note: 'Texte complémentaire',
  items: 'Produits', id: 'Identifiant', brand: 'Marque', name: 'Nom', price: 'Prix',
  storyTitle: 'Titre — Notre histoire', story: 'Notre histoire',
  coffeeTitle: 'Titre — Café congolais', coffee: 'À propos du café congolais',
  challengesTitle: 'Titre — Défis', challenges: 'Défis et solutions',
  shopButton: 'Bouton boutique', aboutButton: 'Bouton en savoir plus',
  customer: 'Nom du client', quote: 'Témoignage', rating: 'Note',
  hoursTitle: 'Titre des horaires', contactTitle: 'Titre du contact',
  phone: 'Téléphone', email: 'Adresse e-mail', address: 'Adresse',
  hours: 'Horaires', day: 'Jour', logo: 'Logo', logoAlt: 'Texte alternatif du logo',
};

const focusStyle = 'transition focus:border-yq_choc focus:outline-none focus:ring-2 focus:ring-yq_choc/30 focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]';

function labelFor(key) {
  return fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function ContentEditor({ value, path, onChange, supabase, section, notify }) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-4">
        {value.map((item, index) => (
          <fieldset key={item.id || index} className="relative rounded-lg border border-[#e6ded3] p-4">
            <legend className="px-2 text-sm font-semibold">Produit {index + 1}</legend>
            <button type="button" onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))} className={`absolute right-3 top-2 rounded px-1 text-xs text-red-700 ${focusStyle}`}>Supprimer</button>
            <ContentEditor value={item} path={[...path, index]} onChange={onChange} supabase={supabase} section={section} notify={notify} />
          </fieldset>
        ))}
          <button type="button" onClick={() => {
            const item = structuredClone(value[0] || { title: '', description: '', image: '' });
            if (item && typeof item === 'object' && 'id' in item) item.id = `${item.id}-${crypto.randomUUID()}`;
            onChange(path, [...value, item]);
          }} className={`rounded border border-yq_main px-4 py-2 text-sm text-yq_main ${focusStyle}`}>+ Ajouter un produit</button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    const isProductsRoot = section === 'products' && path.length === 1;
    const isHeroRoot = section === 'hero' && path.length === 1;
    const isAboutRoot = section === 'about' && path.length === 1;
    const isContactRoot = section === 'contact' && path.length === 1;
    return <div className="grid gap-4 md:grid-cols-2">{Object.entries(value).map(([key, child]) => {
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
      return (
      <div key={key} className={layout}>
        <label className="mb-2 block text-sm font-medium">{labelFor(key)}</label>
        <ContentEditor value={child} path={[...path, key]} onChange={onChange} supabase={supabase} section={section} notify={notify} />
      </div>
    );})}</div>;
  }

  const imageKey = typeof path[path.length - 1] === 'string' ? path[path.length - 1].toLowerCase() : '';
  const isImage = imageKey.includes('image') || imageKey.includes('logo');
  const isLongText = typeof value === 'string' && (value.length > 100 || value.includes('\n'));

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const objectPath = `${section}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from('site-assets').upload(objectPath, file, { upsert: false });
    if (error) { notify('error', `Échec du téléversement : ${error.message}`); return; }
    const { data } = supabase.storage.from('site-assets').getPublicUrl(objectPath);
    onChange(path, data.publicUrl);
  }

  return (
    <div className="space-y-2">
      {isLongText ? <textarea rows={4} value={value ?? ''} onChange={(event) => onChange(path, event.target.value)} className={`w-full rounded border border-yq_lightchoc bg-white px-3 py-2 text-sm ${focusStyle}`} /> :
        <input value={value ?? ''} type="text" onChange={(event) => onChange(path, event.target.value)} className={`w-full rounded border border-yq_lightchoc bg-white px-3 py-2 text-sm ${focusStyle}`} />}
      {isImage && <>
        {value && <img src={value} alt="Aperçu de l’image" className="max-h-40 max-w-full rounded object-contain" />}
        <label className="inline-flex cursor-pointer rounded border border-yq_main px-3 py-2 text-xs text-yq_main focus-within:border-yq_choc focus-within:ring-2 focus-within:ring-yq_choc/30 focus-within:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">{value ? 'Modifier l’image' : 'Ajouter l’image'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} className="sr-only" /></label>
      </>}
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

  function notify(type, message) {
    setToast({ type, message });
  }

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let active = true;
    supabase.from('site_sections').select('section,content').then(({ data, error }) => {
      if (!active) return;
      if (error) setStatus(`Impossible de charger le contenu : ${error.message}. Vérifiez la migration Supabase.`);
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
    setSaving(true); setStatus('');
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('site_sections').upsert({
      section: activeSection, content: content[activeSection], updated_by: user?.id,
    });
    setSaving(false);
    if (error) notify('error', `Erreur lors de l’enregistrement : ${error.message}`);
    else {
      setStatus('');
      notify('success', 'Modifications enregistrées avec succès.');
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace('/portal/login'); router.refresh();
  }

  const selected = contentSections.find((section) => section.id === activeSection);
  return (
    <div className="grid h-[calc(100dvh-1.5rem)] grid-rows-[auto_minmax(0,1fr)] gap-3 overflow-hidden md:grid-cols-[240px_minmax(0,1fr)] md:grid-rows-1">
      <aside className="flex min-h-0 flex-col overflow-hidden rounded-xl bg-white p-3 shadow-sm">
        <div className="mb-4 border-b border-[#eee7df] pb-4">
          <p className="text-xs uppercase text-yq_black/50">Connecté en tant que</p><p className="mt-1 break-all text-sm font-medium">{email}</p>
        </div>
        <nav className="flex flex-wrap gap-2 overflow-hidden md:flex-1 md:flex-col">
          {contentSections.map((section) => <button key={section.id} onClick={() => { setActiveSection(section.id); setStatus(''); }} className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${focusStyle} ${activeSection === section.id ? 'bg-yq_main text-white' : 'hover:bg-[#f5f1eb]'}`}>{section.label}</button>)}
        </nav>
        <button onClick={logout} className={`mt-5 w-full rounded border border-[#ded5c9] px-3 py-2 text-sm md:mt-auto ${focusStyle}`}>Se déconnecter</button>
      </aside>
      <section className="min-h-0 min-w-0 overflow-y-auto rounded-xl bg-white p-3 shadow-sm sm:p-4">
        <div className="sticky top-0 z-20 -mx-3 -mt-3 mb-4 flex flex-wrap items-start justify-between gap-4 border-b border-[#eee7df] bg-white p-3 sm:-mx-4 sm:-mt-4 sm:p-4">
          <div><p className="text-xs uppercase tracking-wider text-yq_main">Éditeur de contenu</p><h1 className="mt-1 font-montserrat text-xl font-bold text-yq_choc">{selected?.label}</h1><p className="mt-1 text-sm text-yq_black/60">Modifiez les textes, ajoutez des produits ou téléversez vos images.</p></div>
          <button onClick={save} disabled={saving} className={`rounded bg-yq_main px-4 py-2 text-sm font-medium text-white disabled:opacity-60 ${focusStyle}`}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
        </div>
        <ContentEditor value={content[activeSection]} path={[activeSection]} onChange={changeValue} supabase={supabase} section={activeSection} notify={notify} />
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
