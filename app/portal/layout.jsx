import Link from 'next/link';

export default function PortalLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-10 text-yq_black md:px-8">
      <header className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
        <Link href="/portal" className="font-montserrat text-sm font-bold uppercase tracking-wide text-yq_choc">Yetu Qahwah · Portail</Link>
        <Link href="/" className="text-sm text-yq_main underline">Voir le site</Link>
      </header>
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
