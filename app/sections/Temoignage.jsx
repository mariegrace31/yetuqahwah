'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { createClient } from '@/lib/supabase/client';

function Stars({ rating }) {
  return <div className="flex justify-center gap-1" aria-label={`Note : ${rating} sur 5`}>
    {Array.from({ length: 5 }, (_, index) => index < rating
      ? <FaStar key={index} aria-hidden="true" className="text-[#FFAE4D] text-lg" />
      : <CiStar key={index} aria-hidden="true" className="text-[#FFAE4D] text-xl" />)}
  </div>;
}

function TestimonialForm({ onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    if (!rating) {
      setError('Choisis une note entre 1 et 5 étoiles.');
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSubmitting(true);
    try {
      const { error: submitError } = await createClient().from('visitor_testimonials').insert({
        name: String(form.get('name')).trim(),
        quote: String(form.get('quote')).trim(),
        rating,
      });
      if (submitError) setError('Impossible d’envoyer ton témoignage pour le moment. Réessaie plus tard.');
      else {
        setMessage('Merci ! Ton témoignage sera publié après validation.');
        formElement.reset();
        setRating(0);
        onSubmitted();
      }
    } catch {
      setError('Impossible d’envoyer ton témoignage pour le moment. Réessaie plus tard.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-6 border-t border-yq_main/15 pt-5">
      <h3 className="font-montserrat text-base font-semibold text-yq_main">Laisser un commentaire</h3>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <label className="grid gap-1 text-sm text-yq_black">Ton nom
          <input name="name" required maxLength={80} autoComplete="name" className="w-full rounded border border-yq_lightchoc px-3 py-2 focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]" />
        </label>
        <fieldset>
          <legend className="text-sm text-yq_black">Ta note sur 5</legend>
          <div className="mt-1 flex gap-1" role="group" aria-label="Choisir une note sur 5">
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              return <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} étoile${value > 1 ? 's' : ''}`} aria-pressed={rating === value} className="rounded p-1 text-2xl text-[#FFAE4D] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]">
                {value <= rating ? '★' : '☆'}
              </button>;
            })}
          </div>
        </fieldset>
        <label className="grid gap-1 text-sm text-yq_black">Ton témoignage
          <textarea name="quote" required minLength={3} maxLength={1200} rows={4} className="w-full resize-y rounded border border-yq_lightchoc px-3 py-2 focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]" />
        </label>
        {message && <p role="status" className="text-sm text-green-800">{message}</p>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={submitting} className="w-fit rounded bg-yq_main px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60">
          {submitting ? 'Envoi…' : 'Envoyer mon témoignage'}
        </button>
      </form>
    </div>
  );
}

export default function Temoignage({ content }) {
  const testimonials = content.items || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState('');
  const current = testimonials[activeIndex] || testimonials[0];

  function move(direction) {
    if (!testimonials.length) return;
    setActiveIndex((index) => (index + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section id="temoignages" className="bg-yq_white1 px-5 py-12 lg:px-0 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <h2 className="mt-2 font-montserrat text-sm font-bold uppercase text-yq_choc md:text-base lg:mt-0 lg:text-lg">{content.title}</h2>
        <p className="text-base text-yq_black md:text-lg lg:text-[22px]">{content.description}</p>
      </div>

      {showForm ? <div className="mx-auto mt-8 w-full max-w-2xl rounded-lg bg-yq_beige p-5 sm:p-8">
        <TestimonialForm onSubmitted={() => {
          setShowForm(false);
          setSubmissionNotice('Merci pour ton témoignage ! Il sera visible après validation.');
        }} />
        <button type="button" onClick={() => setShowForm(false)} className="mt-4 text-sm text-yq_main underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yq_choc">Retour aux témoignages</button>
      </div> : <>
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 items-stretch gap-5 lg:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div className="relative h-52 overflow-hidden rounded-lg sm:h-64 lg:h-full lg:min-h-[480px]">
          <Image src={content.image} alt="Café Yetu Qahwah" unoptimized fill className="object-cover" />
        </div>

        <div className="flex min-h-[380px] flex-col justify-between gap-6 rounded-lg bg-yq_beige px-5 py-6 sm:px-8 lg:min-h-[480px] lg:px-12 lg:py-10">
          {current ? <>
            <Stars rating={Number(current.rating) || 0} />
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-2xl whitespace-pre-line text-sm font-light leading-relaxed text-yq_black sm:text-base lg:text-lg">{current.quote}</p>
              {current.proofImage && <a href={current.proofImage} target="_blank" rel="noopener noreferrer" className="block max-h-48 max-w-full overflow-hidden rounded-md">
                <img src={current.proofImage} alt="Photo partagée avec ce témoignage" className="max-h-48 max-w-full object-contain" />
              </a>}
              <h3 className="font-montserrat text-base font-medium text-yq_main sm:text-lg">{current.name}</h3>
            </div>
          </> : <p className="text-center text-yq_black/70">Aucun témoignage pour le moment.</p>}

          <div className="flex items-center justify-center gap-5">
            <button type="button" onClick={() => move(-1)} disabled={testimonials.length < 2} aria-label="Témoignage précédent" className="flex items-center justify-center rounded bg-yq_main p-2.5 text-white disabled:cursor-not-allowed disabled:opacity-40">
              <ImArrowLeft2 aria-hidden="true" />
            </button>
            <p className="min-w-16 text-center text-sm text-yq_main" aria-live="polite">
              {testimonials.length ? `${String(activeIndex + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}` : '00 / 00'}
            </p>
            <button type="button" onClick={() => move(1)} disabled={testimonials.length < 2} aria-label="Témoignage suivant" className="flex items-center justify-center rounded bg-yq_main p-2.5 text-white disabled:cursor-not-allowed disabled:opacity-40">
              <ImArrowRight2 aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        {submissionNotice && <p role="status" className="text-center text-sm text-green-800">{submissionNotice}</p>}
        <button type="button" onClick={() => { setSubmissionNotice(''); setShowForm(true); }} className="rounded border border-yq_main px-4 py-2 text-sm font-medium text-yq_main transition hover:bg-yq_main hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yq_choc">Laisser un commentaire</button>
      </div>
      </>}
    </section>
  );
}
