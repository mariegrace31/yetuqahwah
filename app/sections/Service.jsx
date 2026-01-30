import React from 'react';
import mobile from '@/app/assets/mobile.svg';
import catering from '@/app/assets/catering.svg';
import formation from '@/app/assets/formation.svg';
import programme from '@/app/assets/programme.svg';
import service from '@/app/assets/service.svg';
import Image from 'next/image';

function Service() {
  return (
    <section className="bg-yq_main py-8 lg:py-16">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-yq_white1 uppercase font-montserrat text-[10px] md:text-[13px] lg:text-[16px]">
          nos services
        </h1>
        <p className="text-[12px] md:text-[15px] lg:text-[22px] w-[80%] lg:w-full text-yq_beige text-center">
          Nos services incluent également plusieurs prestations pensées pour vous accompagner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-11 pb-3 lg:pb-16 lg:pt-16 gap-7 px-7 md:px-8 lg:px-14">
       
        <div className="bg-yq_white1 p-4 lg:p-6 flex flex-col h-[180px] md:h-[190px] lg:h-[260px] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={mobile} alt="mobile" width={50} height={50} className="mb-2 lg:mb-4 w-9 lg:w-14" />
          <h2 className="uppercase font-montserrat text-[12px] md:text-[14px] lg:text-[16px] font-medium text-left mb-2">
            service du café mobile
          </h2>
        </div>

        <div className="bg-yq_white1 p-4 lg:p-6 flex flex-col h-[180px] md:h-[190px] lg:h-[260px] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={catering} alt="catering" width={50} height={50} className="mb-2 lg:mb-4 w-9 lg:w-14" />
          <h2 className="uppercase font-montserrat text-[12px] md:text-[14px] lg:text-[16px] font-medium text-left mb-2">
            service de catering café pour événements intérieurs et extérieurs
          </h2>
        </div>

        <div className="bg-yq_white1 p-4 lg:p-6 flex flex-col h-[180px] md:h-[190px] lg:h-[260px] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={formation} alt="formation" width={50} height={50} className="mb-2 lg:mb-4 w-9 lg:w-14" />
          <h2 className="uppercase font-montserrat text-[12px] md:text-[14px] lg:text-[16px] font-medium text-left mb-2">
            formation de barista et cupping / dégustation
          </h2>
        </div>

        <div className="bg-yq_white1 p-4 lg:p-6 flex flex-col h-[180px] md:h-[190px] lg:h-[260px] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={programme} alt="programme" width={50} height={50} className="mb-2 lg:mb-4 w-9 lg:w-14" />
          <h2 className="uppercase font-montserrat text-[12px] md:text-[14px] lg:text-[16px] font-medium text-left mb-2">
            programme d&apos;installation de café et station de lavage
          </h2>
        </div>

        <div className="bg-yq_white1 p-4 lg:p-6 flex flex-col h-[180px] md:h-[190px] lg:h-[260px] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
          <Image src={service} alt="service" width={50} height={50} className="mb-2 lg:mb-4 w-9 lg:w-14" />
          <h2 className="uppercase font-montserrat text-[12px] md:text-[14px] lg:text-[16px] font-medium text-left mb-2">
            service de consultant
          </h2>
          <p className="text-[10px] md:text-[12px] lg:text-[15px] text-yq_black font-light text-left flex-1 leading-relaxed">
            Appui technique aux coopératives sur les bonnes pratiques agricoles,
            analyse de café de spécialité, présentation et dégustation de cafés
            congolais aux événements mondiaux du café tels que AFCA, World of Coffee.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Service;
