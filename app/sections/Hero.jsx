import Image from 'next/image';
import React from 'react';
import coffeecup from '@/app/assets/hero3.jpg';

function Hero() {
  return (
    <section
      id="acceuil"
      className="relative w-full h-[100vh] md:h-[100vh] lg:h-[108vh] bg-yq_bg flex items-center overflow-hidden"
    >
      <Image src={coffeecup} alt="Hero Image" fill priority className="object-cover object-[10%_right] md:object-center scale-105 md:scale-100"/>

      <div className="absolute inset-0 bg-yq_bg/80 md:bg-transparent"></div>

      <div className="relative z-10 max-w-2xl px-5 md:px-9 lg:px-14">
        <h1 className="uppercase text-[20px] md:text-[25px] lg:text-[38px] w-[70%] lg:w-full font-montserrat leading-7 lg:leading-[43px] font-black text-yq_choc">
          marque de café <br /> congolaise de <br /> spécialité
        </h1>

        <p className="mt-4 lg:mt-6 text-yq_black font-light font-sans w-[60%] lg:w-full text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed">
          Yetu Qahwah est un extraordinaire café, produit d'une collaboration
          entre les petits producteurs de café d'une part et les dégustateurs
          professionnels de café de spécialité d'autre part.
        </p>

        <div className="mt-5 lg:mt-8 flex gap-4 lg:gap-6">
          <button className="px-4 lg:px-6 py-2 lg:py-3 bg-yq_main text-white uppercase text-[10px] md:text-[11px] lg:text-[13px] tracking-wide transition hover:opacity-90">
            notre boutique
          </button>

          <button className="px-4 lg:px-6 py-2 lg:py-3 border border-yq_main text-yq_main uppercase text-[10px] md:text-[11px] lg:text-[13px] tracking-wide transition duration-300 delay-100 hover:bg-yq_lightbeige">
            en savoir plus
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

