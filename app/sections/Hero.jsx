import Image from 'next/image';
import React from 'react';
import coffeecup from '@/app/assets/coffeecup.svg';

function Hero() {
  return (
    <section
      id="acceuil"
      className="relative w-full h-[108vh] flex items-center"
    >
      <Image
        src={coffeecup}
        alt="Hero Image"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0"></div>

      <div className="relative z-10 max-w-2xl px-14">
        <h1 className="uppercase text-[38px] font-montserrat leading-relaxed font-normal text-yq_choc">
          marque de café <br /> congolaise de spécialité
        </h1>

        <p className="mt-6 text-yq_black font-light font-sans text-[15px] leading-relaxed">
          Yetu Qahwah est un extraordinaire café, produit d'une collaboration
          entre les petits producteurs de café d'une part et les dégustateurs
          professionnels de café de spécialité d'autre part.
        </p>

        <div className="mt-8 flex gap-6">
          <button className="px-6 py-3 bg-yq_main text-white uppercase text-[13px] tracking-wide transition hover:opacity-90">
            notre boutique
          </button>

          <button className="px-6 py-3 border border-yq_main text-yq_main uppercase text-[13px] tracking-wide transition hover:bg-yq_lightbeige">
            en savoir plus
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
