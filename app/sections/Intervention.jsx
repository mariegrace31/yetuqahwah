'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

function galleryImages(card) {
  return [card.image || '/images/grayimage.jpeg', ...(card.gallery || []).map((photo) => typeof photo === 'string' ? photo : photo?.image)]
    .filter((image) => typeof image === 'string' && image.trim());
}

export default function Intervention({ content }) {
  const [selected, setSelected] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(-1);
  const [galleryStart, setGalleryStart] = useState(0);
  const gallery = selected ? galleryImages(selected) : [];
  while (selected && gallery.length > 0 && gallery.length < 3) gallery.push(gallery[0]);
  const visibleGallery = Array.from({ length: Math.min(3, gallery.length) }, (_, offset) => {
    const index = (galleryStart + offset) % gallery.length;
    return { image: gallery[index], index };
  });
  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);

  function openCard(card) {
    setSelected(card);
    setActiveImage(card.image || '/images/grayimage.jpeg');
    setActiveGalleryIndex(0);
    setGalleryStart(0);
  }

  function moveGallery(direction) {
    if (!gallery.length) return;
    setGalleryStart((start) => (start + direction + gallery.length) % gallery.length);
  }

  return (
    <>
      <main className="pt-24 lg:pt-44">
        <header className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="font-montserrat text-[14px] font-bold uppercase text-yq_choc md:text-[15px] lg:text-[18px]">{content.title}</h1>
          <p className="w-[90%] text-[16px] text-yq_black md:text-[19px] lg:w-[60%] lg:text-[22px]">{content.description}</p>
        </header>
        <div className="grid grid-cols-1 gap-7 px-5 pb-20 pt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-14">
          {content.cards.map((card, index) => (
            <article
              key={card.id || index}
              role="button"
              tabIndex={0}
              aria-label={`Ouvrir l’intervention : ${card.title || card.description}`}
              onClick={() => openCard(card)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openCard(card);
                }
              }}
              className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.16)]"
            >
              <Image src={card.image || '/images/grayimage.jpeg'} width={600} height={400} alt={card.title || 'Intervention Yetu Qahwah'} unoptimized className="h-[18vh] w-full object-cover md:h-[20vh] lg:h-[25vh]" />
              <p className="px-3 py-5 font-light text-[13px] text-yq_black md:text-[15px] lg:text-[16px]">{card.description}</p>
            </article>
          ))}
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="intervention-modal-title" className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-sm bg-yq_white1 shadow-2xl">
            <button type="button" onClick={() => setSelected(null)} aria-label="Fermer la fenêtre" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-yq_white1/95 text-2xl text-yq_choc shadow">×</button>
            <div className="overflow-y-auto p-5 sm:p-7 md:p-9">
              {(activeImage || selected.image) && (
                <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden bg-[#eee9e2]">
                  <Image src={activeImage || selected.image} alt={selected.title || 'Photo de l’intervention'} fill unoptimized className="object-cover" />
                </div>
              )}
              <h2 id="intervention-modal-title" className="font-montserrat text-sm font-bold uppercase text-yq_choc sm:text-base">{selected.title || 'Intervention'}</h2>
              {Array.isArray(selected.paragraphs) && selected.paragraphs.length > 0 ? (
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-yq_black sm:text-base">
                  {selected.paragraphs.map((paragraph, index) => <p key={`${selected.id || 'intervention'}-${index}`} className="whitespace-pre-line">{paragraph}</p>)}
                </div>
              ) : selected.description && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-yq_black sm:text-base">{selected.description}</p>}

              {gallery.length > 0 && (
                <div className="mt-7 flex items-center gap-3 sm:gap-5">
                  <button type="button" onClick={() => moveGallery(-1)} aria-label="Photos précédentes" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yq_choc text-white sm:h-10 sm:w-10"><ImArrowLeft2 aria-hidden="true" /></button>
                  <div className="grid min-w-0 flex-1 grid-cols-3 gap-2 sm:gap-4">
                    {visibleGallery.map(({ image, index }) => (
                      <button key={`${image}-${index}`} type="button" onClick={() => { setActiveImage(image); setActiveGalleryIndex(index); }} aria-label={`Afficher la photo ${index + 1}`} aria-pressed={activeGalleryIndex === index} className="relative aspect-square min-w-0 overflow-hidden">
                        <Image src={image} alt="" fill unoptimized className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => moveGallery(1)} aria-label="Photos suivantes" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yq_choc text-white sm:h-10 sm:w-10"><ImArrowRight2 aria-hidden="true" /></button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
