import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

function Produits({ content }) {
  const products = content.items || [];
  return (
    <section
      id="produits"
      className="bg-yq_lightbeige pt-10 pb-16 lg:pt-20 lg:pb-28 px-5 lg:px-20"
    >
      <div className="flex flex-col gap-4 items-center text-center mb-7 lg:mb-16">
        <h1 className="text-yq_choc uppercase font-bold font-montserrat text-[14px] md:text-[15px] lg:text-[18px]">
          {content.title}
        </h1>

        <p className="font-sans text-[16px] md:text-[19px] lg:text-[22px] w-full lg:w-[70%] text-yq_black">
          {content.description}
        </p>

        <p className="text-[14px] md:text-[16px] lg:text-[18px] font-light text-yq_black/70">
          {content.note}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="flex bg-yq_white1 flex-col mx-auto gap-4 transition hover:shadow-lg w-full max-w-sm overflow-hidden"
          >
            <div className="w-full">
              <Image src={product.image} alt={product.name} width={180} height={180} unoptimized
                className="block h-56 w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-5 px-4 pb-4">
              <div className="flex justify-between items-start gap-3 lg:gap-4">
                <div className="">
                  <h2 className="text-yq_black text-[9px] md:text-[9px] lg:text-[10px] uppercase">
                    {product.brand}
                  </h2>
                  <p className="text-[11px] md:text-[13px] lg:text-[15px] font-montserrat text-yq_black font-bold">
                    {product.name}
                  </p>
                </div>

                <div className="text-right px-2">
                  <h3 className="text-yq_black uppercase text-[9px] md:text-[9px] lg:text-[10px]">
                    à partir de
                  </h3>
                  <p className="text-yq_black text-[11px] md:text-[13px] lg:text-[15px] font-bold">
                    {product.price}
                  </p>
                </div>
              </div>

              <Link href={`https://wa.me/243978026943?text=Bonjour,%20je%20souhaite%20commander%20le%20produit%20:${encodeURIComponent(product.name)}`} target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-4 py-1 lg:py-2 border rounded-sm bg-yq_main border-yq_main text-yq_white1 font-medium uppercase text-[10px] tracking-wide transition hover:bg-yq_white1 hover:text-yq_black text-center"
              >
               je commande
             </Link>
            </div>
          </div>
        ))}
      </div>
      {products.length > 6 && (
        <div className="mt-8 lg:mt-12 flex justify-center">
          <Link href="/produits" className="px-6 py-3 border border-yq_main text-yq_main uppercase text-xs tracking-wide transition hover:bg-yq_main hover:text-yq_white1">
            voir plus
          </Link>
        </div>
      )}
    </section>
  );
}

export default Produits;
