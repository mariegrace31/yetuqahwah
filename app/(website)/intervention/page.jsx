import Image from 'next/image';
import { getSiteContent } from '@/lib/supabase/public-content';

export default async function InterventionPage() {
  const { intervention } = await getSiteContent();
  return (
    <main className="pt-24 lg:pt-44">
      <header className="flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="font-montserrat font-bold uppercase text-yq_choc text-[14px] md:text-[15px] lg:text-[18px]">{intervention.title}</h1>
        <p className="w-[90%] text-yq_black text-[16px] md:text-[19px] lg:w-[60%] lg:text-[22px]">{intervention.description}</p>
      </header>
      <div className="grid grid-cols-1 gap-7 px-5 pt-14 pb-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-14">
        {intervention.cards.map((card, index) => <article key={card.id || index} className="shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={card.image} width={600} height={400} alt={card.description} unoptimized className="h-[18vh] w-full object-cover md:h-[20vh] lg:h-[25vh]" />
          <p className="px-3 py-5 font-light text-yq_black text-[13px] md:text-[15px] lg:text-[16px]">{card.description}</p>
        </article>)}
      </div>
    </main>
  );
}
