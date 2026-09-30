import Image from 'next/image';

export default function Apropos({ content }) {
  const stories = [
    [content.storyTitle, content.story],
    [content.coffeeTitle, content.coffee],
    [content.challengesTitle, content.challenges],
  ];

  return (
    <section id="apropos" className="bg-yq_black pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Image src={content.image} alt="À propos de Yetu Qahwah" width={100} height={100} unoptimized className="w-full pt-10 lg:hidden" />
        <h1 className="py-6 text-center font-montserrat text-[14px] font-bold uppercase text-yq_white1 md:text-[15px] lg:py-14 lg:text-[18px]">{content.title}</h1>
        <div className="grid grid-cols-1 items-center gap-10 lg:min-h-[70vh] lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {stories.map(([title, text]) => (
              <div key={title}>
                <h2 className="mb-2 font-extralight uppercase text-yq_orange text-[11px] md:text-[12px] lg:text-[15px]">{title}</h2>
                <p className="font-light text-yq_white2 text-[14px] md:text-[15px] lg:text-[16px]">{text}</p>
              </div>
            ))}
          </div>
          <div className="hidden justify-end lg:flex">
            <Image src={content.image} alt="À propos de Yetu Qahwah" width={100} height={100} unoptimized className="w-[85%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
