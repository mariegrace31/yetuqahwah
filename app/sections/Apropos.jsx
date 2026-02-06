import React from 'react';
import about from '@/app/assets/about.svg';
import Image from 'next/image';

function Apropos() {
  return (
    <section id="apropos" className="bg-yq_black pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <Image
          src={about}
          alt="about"
          width={100}
          height={100}
          className="w-full pt-10 lg:hidden"
        />

        <h1 className="text-center uppercase text-yq_white1 text-[14px] md:text-[15px] lg:text-[18px] font-bold font-montserrat py-6 lg:py-14">
          à propos de yetu qahwah
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:min-h-[70vh]">

          <div className="flex flex-col">
            <h3 className="text-[11px] md:text-[12px] lg:text-[13px] text-yq_orange uppercase font-extralight">
              nous avons une histoire passionnante à vous raconter
            </h3>

            <p className="font-light text-[14px] md:text-[15px] lg:text-[16px] text-yq_white2">
              Acteur engagé dans l'industrie du café depuis plus de 5 ans, la marque Yetu Qahwah
              oeuvre activement à la sensibilisation autour de la chaine de valeur du café congolais.
              Nous développons des solutions concrètes et innovantes qui contribuent à améliorer
              à la fois la production et la consommation de café cultivé localement en République
              Démocratique du Congo.
            </p>

            <h3 className="text-[11px] md:text-[12px] lg:text-[13px] text-yq_orange uppercase font-extralight mt-4">
              à propos du café congolais
            </h3>

            <p className="font-light text-[14px] md:text-[15px] lg:text-[16px] text-yq_white2">
              Aujourd'hui, plusieurs provinces de la République Démocratique du Congo cultivent du café,
              notamment le Sud-Kivu, le Nord-Kivu, entre autres. <br />
              Notre pays a la particularité de produire à la fois du café Arabica et du Robusta,
              cultivés dans des terroirs uniques qui offrent des profils de saveurs riches et diversifiés. <br />
              La RDC, avec son climat favorable et ses terres fertiles, possède un fort potentiel pour
              devenir un acteur majeur du café de spécialité sur le continent africain et à l'échelle mondiale.
            </p>

            <h3 className="text-[11px] md:text-[12px] lg:text-[13px] text-yq_orange uppercase font-extralight mt-4">
              défis et moyens de les surmonter
            </h3>

            <p className="font-light text-[14px] md:text-[15px] lg:text-[16px] text-yq_white2">
              En tant que startup évoluant en République Démocratique du Congo, l'accès au financement
              représente un véritable défi. Pour faire face à cette réalité, nous avons opté pour
              l'autofinancement et la réinjection systématique des profits, ce qui nous a permis de
              poursuivre notre développement de manière durable. <br />
              Par ailleurs, dans un contexte marqué par des instabilités et des conflits récurrents,
              il est essentiel de concevoir des solutions innovantes et résilientes. C'est dans cette
              optique que Yetu Qahwah propose des solutions flexibles, pratiques et centrées sur le café,
              visant non seulement à renforcer la chaine de valeur locale, mais également à contribuer
              activement au développement économique du pays à travers la culture et la valorisation
              du café congolais.
            </p>
          </div>

          <div className="hidden lg:flex justify-end">
            <Image
              src={about}
              alt="about"
              width={100}
              height={100}
              className="w-[85%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Apropos;

