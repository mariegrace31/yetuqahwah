'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentSections, defaultSiteContent, mergeSiteContent } from '@/app/data/site-content';
import { createClient } from '@/lib/supabase/client';

const fieldLabels = {
  title: 'Titre', description: 'Description', image: 'Image', note: 'Texte complémentaire',
  items: 'Éléments', id: 'Identifiant', brand: 'Marque', name: 'Nom', price: 'Prix',
  storyTitle: 'Titre — Notre histoire', story: 'Notre histoire',
  coffeeTitle: 'Titre — Café congolais', coffee: 'À propos du café congolais',
  challengesTitle: 'Titre — Défis', challenges: 'Défis et solutions',
  shopButton: 'Bouton boutique', aboutButton: 'Bouton en savoir plus',
  customer: 'Nom du client', quote: 'Témoignage', rating: 'Note',
  hoursTitle: 'Titre des horaires', contactTitle: 'Titre du contact',
  phone: 'Téléphone', email: 'Adresse e-mail', address: 'Adresse',
  hours: 'Horaires', day: 'Jour', logo: 'Logo', logoAlt: 'Texte alternatif du logo',
};

function labelFor(key) {
  return fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function ContentEditor({ value, path, onChange, supabase, section }) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-4">
        {value.map((item, index) => (
          <fieldset key={item.id || index} className="relative rounded-lg border border-[#e6ded3] p-4">
            <legend className="px-2 text-sm font-semibold">Élément {index + 1}</legend>
            <button type="button" onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-3 top-2 text-xs text-red-700">Supprimer</button>
            <ContentEditor value={item} path={[...path, index]} onChange={onChange} supabase={supabase} section={section} />
          </fieldset>
        ))}
          <button type="button" onClick={() => {
            const item = structuredClone(value[0] || { title: '', description: '', image: '' });
            if (item && typeof item === 'object' && 'id' in item) item.id = `${item.id}-${crypto.randomUUID()}`;
            onChange(path, [...value, item]);
          }} className="rounded border border-yq_main px-4 py-2 text-sm text-yq_main">+ Ajouter un élément</button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return <div className="grid gap-4 md:grid-cols-2">{Object.entries(value).map(([key, child]) => (
      <div key={key} className={typeof child === 'object' ? 'md:col-span-2' : ''}>
        <label className="mb-2 block text-sm font-medium">{labelFor(key)}</label>
        <ContentEditor value={child} path={[...path, key]} onChange={onChange} supabase={supabase} section={section} />
      </div>
    ))}</div>;
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
    if (error) { window.alert(`Échec du téléversement : ${error.message}`); return; }
    const { data } = supabase.storage.from('site-assets').getPublicUrl(objectPath);
    onChange(path, data.publicUrl);
  }

  return (
    <div className="space-y-2">
      {isLongText ? <textarea rows={4} value={value ?? ''} onChange={(event) => onChange(path, event.target.value)} className="w-full rounded border border-[#ded5c9] bg-white px-3 py-2 text-sm" /> :
        <input value={value ?? ''} type="text" onChange={(event) => onChange(path, event.target.value)} className="w-full rounded border border-[#ded5c9] bg-white px-3 py-2 text-sm" />}
      {isImage && <>
        {value && <img src={value} alt="Aperçu de l’image" className="max-h-40 max-w-full rounded object-contain" />}
        <label className="inline-flex cursor-pointer rounded border border-yq_main px-3 py-2 text-xs text-yq_main">Téléverser une image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} className="sr-only" /></label>
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
  const [saving, setSaving] = useState(false);

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
    setStatus(error ? `Erreur : ${error.message}` : 'Modifications enregistrées. Le site public les affiche désormais.');
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace('/portal/login'); router.refresh();
  }

  const selected = contentSections.find((section) => section.id === activeSection);
  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-4 border-b border-[#eee7df] pb-4">
          <p className="text-xs uppercase text-yq_black/50">Connecté en tant que</p><p className="mt-1 break-all text-sm font-medium">{email}</p>
        </div>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {contentSections.map((section) => <button key={section.id} onClick={() => { setActiveSection(section.id); setStatus(''); }} className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${activeSection === section.id ? 'bg-yq_main text-white' : 'hover:bg-[#f5f1eb]'}`}>{section.label}</button>)}
        </nav>
        <button onClick={logout} className="mt-5 w-full rounded border border-[#ded5c9] px-3 py-2 text-sm transition focus:border-yq_choc focus:outline-none focus:ring-2 focus:ring-yq_choc/30 focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">Se déconnecter</button>
      </aside>
      <section className="min-w-0 rounded-xl bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs uppercase tracking-wider text-yq_main">Éditeur de contenu</p><h1 className="mt-1 font-montserrat text-xl font-bold text-yq_choc">{selected?.label}</h1><p className="mt-1 text-sm text-yq_black/60">Modifiez les textes, ajoutez des éléments ou téléversez vos images.</p></div>
          <button onClick={save} disabled={saving} className="rounded bg-yq_main px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
        </div>
        <ContentEditor value={content[activeSection]} path={[activeSection]} onChange={changeValue} supabase={supabase} section={activeSection} />
        {status && <p role="status" className="mt-5 rounded bg-[#f7f4ef] p-3 text-sm">{status}</p>}
      </section>
    </div>
  );
}
