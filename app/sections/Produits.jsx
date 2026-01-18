import Image from 'next/image';
import React from 'react';
import productImage from '@/app/assets/coffee.svg';

const products = Array.from({ length: 6 });

function Produits() {
  return (
    <section id="produits" className="bg-yq_lightbeige py-20 px-20">
      <div className="flex flex-col gap-4 items-center text-center mb-16">
        <h1 className="text-yq_choc uppercase font-montserrat text-[16px]">
          nos produits
        </h1>

        <p className="font-sans text-[22px] w-[70%] text-yq_black">
          Nous offrons une large gamme de produits et services autour du café
          biologique, en utilisant du café provenant du Kivu / République
          Démocratique du Congo.
        </p>

        <p className="text-[18px] font-light text-yq_black/70">
          Nos cafés sont biologiques avec une certification Ecocert pour garantir
          l&apos;authenticité.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {products.map((_, index) => (
          <div
            key={index}
            className="flex bg-yq_white1 flex-col gap-6 transition hover:shadow-lg"
          >
            <div className="flex justify-center">
              <Image
                src={productImage}
                alt="Produit"
                width={150}
                height={150}
                className="object-contain w-full"
              />
            </div>

            <div className="flex justify-between items-start gap-4">
              <div className='px-5'>
                <h2 className="text-yq_black text-[10px] uppercase">
                  yetu Qahwah
                </h2>
                <p className="text-[18px] font-montserrat text-yq_black font-medium mt-1">
                  Yetu Qahwah
                </p>
              </div>

              <div className="text-right px-5 ">
                <h3 className=" text-yq_black uppercase text-[10px]">
                  à partir de
                </h3>
                <p className="text-yq_black text-[18px] font-medium mt-1">
                  CDF 20,000
                </p>
              </div>
            </div>

            <button className="mt-auto w-[30%] mx-5 mb-8 px-4 py-3 border bg-yq_main border-yq_main text-yq_white1 font-medium uppercase text-[10px] tracking-wide transition hover:bg-yq_white1 hover:text-yq_black">
              je commande
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produits;
