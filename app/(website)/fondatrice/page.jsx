import Image from 'next/image';
import Link from 'next/link';
import { getSiteContent } from '@/lib/supabase/public-content';
import { getLinkPreview } from '@/lib/link-preview';

export default async function FounderPage() {
  const { founder } = await getSiteContent();
  const press = await Promise.all(founder.press.map(async (item) => ({ ...item, ...(await getLinkPreview(item)) })));
  return (
    <main className="pt-24 lg:pt-44">
      <h1 className="mt-6 text-center font-montserrat text-yq_choc text-[14px] font-bold uppercase md:text-[15px] lg:mt-0 lg:text-[18px]">{founder.title}</h1>
      <div className="mt-2 grid gap-5 px-5 lg:mt-10 lg:grid-cols-2 lg:gap-12 lg:px-14">
        <Image src={founder.image} width={800} height={800} alt={founder.name} unoptimized className="h-[35vh] w-full object-cover lg:h-[75vh]" />
        <div className="flex flex-col gap-3 lg:gap-4">
          <h2 className="mt-4 font-extralight uppercase text-yq_main text-[12px] lg:mt-0 lg:text-[13px]">{founder.name}</h2>
          {founder.biography.map((paragraph, index) => <p key={index} className="font-light text-yq_black text-[12px] md:text-[14px] lg:text-[16px]">{paragraph}</p>)}
        </div>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-7 px-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-12 lg:px-14">
        {press.map((item) => <article key={item.id} className="mx-auto w-[98%] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] lg:w-full">
          {item.image && <Image src={item.image} width={500} height={300} alt={item.title} unoptimized className="h-[18vh] w-full object-cover md:h-[20vh] lg:h-[25vh]" />}
          <div className="px-3 py-3 lg:px-4 lg:py-6">
            <Link target="_blank" rel="noopener noreferrer" className="font-montserrat font-medium text-yq_choc text-[13px] md:text-[15px] lg:text-[17px]" href={item.link}>{item.title}</Link>
            <p className="mt-2 break-all text-[10px] font-light text-yq_black/60 md:text-[11px]">{item.site}</p>
          </div>
        </article>)}
      </div>
      <section className="mt-12 grid gap-5 px-5 pb-20 lg:mt-32 lg:grid-cols-2 lg:gap-12 lg:px-14">
        <div className="flex flex-col gap-4">
          <h2 className="font-montserrat text-yq_choc text-[12px] uppercase md:text-[13px] lg:text-[16px]">{founder.visionTitle}</h2>
          {founder.vision.map((paragraph, index) => <p key={index} className="font-light text-yq_black text-[12px] md:text-[14px] lg:text-[16px]">{paragraph}</p>)}
        </div>
        <Image src={founder.visionImage} width={800} height={600} alt={founder.visionTitle} unoptimized className="mx-auto mt-5 h-[30vh] w-[90%] object-cover lg:mt-0 lg:h-[57vh] lg:w-full" />
      </section>
    </main>
  );
}
