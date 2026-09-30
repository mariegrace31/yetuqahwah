import Image from 'next/image';

export default function Service({ content }) {
  return (
    <section className="bg-yq_beige pt-8 pb-16 lg:pt-16 lg:pb-24">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-montserrat font-bold uppercase text-yq_main text-[14px] md:text-[14px] lg:text-[18px]">{content.title}</h1>
        <p className="w-[80%] text-center text-yq_black text-[16px] md:text-[19px] lg:w-full lg:text-[22px]">{content.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-7 px-7 pt-11 pb-3 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-14 lg:pt-16 lg:pb-16">
        {content.items.map((item) => (
          <article key={item.id || item.title} className="flex min-h-[210px] flex-col rounded-md bg-yq_white1 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1 lg:min-h-[260px] lg:p-6">
            <Image src={item.image} alt="" width={50} height={50} unoptimized className="mb-2 h-9 w-9 object-contain lg:mb-4 lg:h-14 lg:w-14" />
            <h2 className="mb-2 text-left font-montserrat font-medium uppercase text-[12px] md:text-[14px] lg:text-[16px]">{item.title}</h2>
            <p className="flex-1 text-left font-light leading-relaxed text-yq_black text-[12px] md:text-[13px] lg:text-[15px]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
