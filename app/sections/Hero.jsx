import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

function Hero({ content }) {
  return (
    <section
      id="acceuil"
      className="relative w-full min-h-screen h-auto py-16 lg:py-20 md:min-h-screen lg:min-h-[108vh] bg-yq_bg flex items-center overflow-hidden"
    >
      <Image src={content.image} alt="Yetu Qahwah" fill priority unoptimized className="object-cover object-[10%_right] md:object-center scale-105 md:scale-100"/>

      <div className="absolute inset-0 bg-yq_bg/80 md:bg-transparent"></div>

      <div className="relative z-10 max-w-2xl px-5 md:px-9 lg:px-14">
        <h1 className="uppercase text-[20px] md:text-[25px] lg:text-[38px] w-[70%] lg:w-full font-montserrat leading-7 lg:leading-[43px] font-black text-yq_choc">
          {content.title.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
        </h1>

        <p className="mt-4 lg:mt-6 text-yq_black font-light font-sans w-[60%] lg:w-full text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed">
          {content.description}
        </p>

        <div className="mt-5 lg:mt-8 flex gap-4 lg:gap-6">
          <Link href="/#produits" className="px-4 lg:px-6 py-2 lg:py-3 bg-yq_main text-white uppercase text-[10px] md:text-[11px] lg:text-[13px] tracking-wide transition hover:opacity-90">
            {content.shopButton}
          </Link>

          <Link href="/#apropos" className="px-4 lg:px-6 py-2 lg:py-3 border border-yq_main text-yq_main uppercase text-[10px] md:text-[11px] lg:text-[13px] tracking-wide transition duration-300 delay-100 hover:bg-yq_lightbeige">
            {content.aboutButton}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
