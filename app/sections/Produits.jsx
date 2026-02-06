import Image from 'next/image';
import React from 'react';
import product1 from '@/app/assets/Ground.jpg';
import product2 from '@/app/assets/Instant-coffee.jpg';
import product3 from '@/app/assets/easy-drip.jpg';
import Link from 'next/link';

const products = [
  {
    id: 1,
    brand: 'Yetu Qahwah',
    name: 'Café Moulu',
    price: 'CDF 20,000',
    image: product1,
  },
  {
    id: 2,
    brand: 'Yetu Qahwah',
    name: 'Café Instantané',
    price: 'CDF 20,000',
    image: product2,
  },
  {
    id: 3,
    brand: 'Yetu Qahwah',
    name: 'Café Easy Drip',
    price: 'CDF 20,000',
    image: product3,
  },
];

function Produits() {
  return (
    <section
      id="produits"
      className="bg-yq_lightbeige py-10 lg:py-20 px-5 lg:px-20"
    >
      <div className="flex flex-col gap-4 items-center text-center mb-7 lg:mb-16">
        <h1 className="text-yq_choc uppercase font-bold font-montserrat text-[14px] md:text-[15px] lg:text-[18px]">
          nos produits
        </h1>

        <p className="font-sans text-[16px] md:text-[19px] lg:text-[22px] w-full lg:w-[70%] text-yq_black">
          Nous offrons une large gamme de produits et services autour du café
          biologique, en utilisant du café provenant du Kivu / République
          Démocratique du Congo.
        </p>

        <p className="text-[14px] md:text-[16px] lg:text-[18px] font-light text-yq_black/70">
          Nos cafés sont biologiques avec une certification Ecocert pour garantir
          l&apos;authenticité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex bg-yq_white1 flex-col mx-auto gap-6 transition hover:shadow-lg w-[97%] lg:w-full"
          >
            <div className="flex justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain w-full"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-start gap-3 lg:gap-4">
                <div className="px-2 lg:px-3">
                  <h2 className="text-yq_black text-[9px] md:text-[9px] lg:text-[10px] uppercase">
                    {product.brand}
                  </h2>
                  <p className="text-[13px] md:text-[16px] lg:text-[18px] font-montserrat text-yq_black font-bold">
                    {product.name}
                  </p>
                </div>

                <div className="text-right px-3">
                  <h3 className="text-yq_black uppercase text-[9px] md:text-[9px] lg:text-[10px]">
                    à partir de
                  </h3>
                  <p className="text-yq_black text-[13px] md:text-[16px] lg:text-[18px] font-bold">
                    {product.price}
                  </p>
                </div>
              </div>

              <Link
                href={`https://wa.me/243978026943?text=Bonjour,%20je%20souhaite%20commander%20le%20produit%20:${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[-12] lg:-mt-2 w-[34%] lg:w-[30%] mx-2 lg:mx-3 mb-4 lg:mb-8 px-1 py-2 lg:py-3 border bg-yq_main border-yq_main text-yq_white1 font-medium uppercase text-[10px] md:text-[9px] lg:text-[10px] tracking-wide transition hover:bg-yq_white1 hover:text-yq_black text-center"
              >
               je commande
             </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produits;
