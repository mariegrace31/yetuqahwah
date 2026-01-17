import Image from 'next/image';
import React from 'react';
import coffee from '@/app/assets/about.svg';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ImArrowLeft2, ImArrowRight2} from "react-icons/im";

function Temoignage() {
  return (
    <section id='temoignages' className='bg-yq_white1 py-14'>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-yq_choc uppercase font-montserrat text-[16px]">témoignages</h1>
        <p className="text-[22px] text-yq_black text-center">Ce que nos clients disent sur nous</p>
      </div>

      <div className='grid grid-cols-2  px-48 py-14'>
        <Image src={coffee} alt='coffee pic' width={100} height={100} className='w-96' />
        <div className='flex flex-col text-center items-center justify-between bg-yq_beige p-10'>
          <div className='flex gap-1'>
            <FaStar className='text-[#FFAE4D] text-[23px]' />
            <FaStar className='text-[#FFAE4D] text-[23px]' />
            <FaStar className='text-[#FFAE4D] text-[23px]' />
            <FaStar className='text-[#FFAE4D] text-[23px]' />
            <CiStar className='text-[#FFAE4D] text-[27px]' />
          </div>

          <div className='flex flex-col gap-3'>
            <h1 className='text-[22px] font-montserrat font-medium text-yq_main'>LOREM IPSUM CAFÉ</h1>
            <p className='font-light text-[18px] text-yq_black'>“Lorem ipsum, Café lorem! 10/10. lorem recommender café. le meilleure café du pays”</p>
          </div>

          <div className='flex gap-10'>
            <button className='bg-yq_main flex items-center justify-center py-1 px-4'>
               <ImArrowLeft2 className='text-yq_white1 text-[25px]' />
            </button>
            <div>
              <h2 className='text-[18px] font-medium text-yq_main'>Jane Doe</h2>
              <p className='text-yq_black text-[13px] font-light'>02/10</p>
            </div>
            <button className='bg-yq_main flex items-center justify-center py-1 px-4'>
              <ImArrowRight2 className='text-yq_white1 text-[25px]' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Temoignage