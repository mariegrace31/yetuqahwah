'use client';

export default function SuccessModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="success-modal-title" className="w-full max-w-sm rounded-xl bg-white px-7 py-8 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-9 w-9">
            <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 id="success-modal-title" className="mt-4 font-montserrat text-lg font-semibold text-yq_choc">Envoyé avec succès</h2>
        <p className="mt-2 text-sm text-yq_black">{message}</p>
        <button type="button" onClick={onClose} autoFocus className="mt-6 rounded bg-yq_main px-6 py-2 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yq_choc">Fermer</button>
      </div>
    </div>
  );
}
