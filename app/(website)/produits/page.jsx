import Image from 'next/image';
import Link from 'next/link';
import { getSiteContent } from '@/lib/supabase/public-content';

export default async function ProductsPage() {
  const { products: productContent } = await getSiteContent();
  const products = productContent.items || [];
  return (
    <main className="min-h-screen bg-yq_lightbeige px-5 pt-32 pb-16 lg:px-20">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="font-montserrat text-lg font-bold uppercase text-yq_choc lg:text-2xl">{productContent.title}</h1>
        <p className="mt-4 text-yq_black">{productContent.description}</p>
        <p className="mt-2 text-sm text-yq_black/70">{productContent.note}</p>
      </header>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {products.map((product) => (
          <article key={product.id} className="mx-auto flex w-full max-w-sm flex-col gap-4 overflow-hidden bg-yq_white1 shadow-sm transition hover:shadow-lg">
            <div className="w-full">
              <Image src={product.image} alt={product.name} width={180} height={180} unoptimized className="block h-56 w-full object-cover" />
            </div>
            <div className="flex items-start justify-between gap-3 px-4">
              <div><p className="text-[10px] uppercase text-yq_black">{product.brand}</p><h2 className="font-montserrat text-lg font-bold text-yq_black">{product.name}</h2></div>
              <p className="text-right text-sm font-bold text-yq_black">{product.price}</p>
            </div>
            <Link href={`https://wa.me/243978026943?text=${encodeURIComponent(`Bonjour, je souhaite commander le produit : ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="mx-4 mb-4 w-fit bg-yq_main px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-yq_white1 transition hover:opacity-90">Je commande</Link>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center"><Link href="/#produits" className="text-sm text-yq_main underline">Retour à l’accueil</Link></div>
    </main>
  );
}
