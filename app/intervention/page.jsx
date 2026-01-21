import Image from 'next/image';
import React from 'react';
import image from '@/app/assets/grayimage.jpeg';

function page() {
  return (
    <div className='pt-44'>
      <div className='flex flex-col gap-3 justify-center items-center text-center'>
        <h1 className='text-[16px] text-yq_choc font-montserrat uppercase'>intervention</h1>
        <p className='text-[22px] text-yq_black w-[60%]'>Initiative sociale et environnementale visant à accompagner les femmes vulnérables dans leur autonomisation en devenant productrices de café durable.</p>
      </div>
      <div className='grid grid-cols-3 px-14 gap-10 mt-16 pb-16'>
        <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>

         <div  className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
           <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
           <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1'>
           <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <p className='text-[16px] text-yq_black font-light py-5 px-3'>Lorem Ipsum quando porque el fruto, el celebro di coffee</p>
        </div>
      </div>
    </div>
  )
}

export default page