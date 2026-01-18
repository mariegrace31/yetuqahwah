import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/logowhite.svg';
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div className='bg-yq_choc mt-12 px-44 pt-16 pb-7'>
      <div className='flex justify-between'>

        <div className='flex flex-col gap-10'>
          <Image src={logo} alt="Yetu Qahwah Logo" width={50} height={50} className='w-44' />
          <div className='flex gap-9'>
            <FaFacebook className='text-4xl text-yq_white1' />
            <FaTiktok className='text-4xl text-yq_white1' />
            <FaInstagram className='text-4xl text-yq_white1' />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-36'>
          <div className='flex flex-col gap-2'>
            <h1 className='uppercase text-center font-medium text-yq_lightchoc text-[20px]'>heures de service</h1>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p className='uppercase text-[14px] font-light text-yq_white1 mt-5'>lundi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>mardi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>mercredi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>jeudi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>vendredi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>samedi</p>
                <p className='uppercase text-[14px] font-light text-yq_white1'>dimanche</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-[14px] font-light text-yq_white1 mt-5'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 20h</p>
                <p className='text-[14px] font-light text-yq_white1'>8h - 18h</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='uppercase font-medium text-yq_lightchoc text-[20px]'>contact</h1>
            <div className='flex flex-col gap-6 mt-5'>
              <div>
              <p className='text-yq_white1 text-[16px]'>Téléphone:</p>
              <p className='text-yq_white1 text-[14px] font-light'>+243 978 026 943</p>
            </div>
             <div>
              <p className='text-yq_white1 text-[16px]'>E-mail:</p>
              <p className='text-yq_white1 text-[14px] font-light'>yetuqahwah2020@gmail.com</p>
            </div>
             <div>
              <p className='text-yq_white1 text-[16px]'>Adresse:</p>
              <p className='text-yq_white1 text-[14px] font-light'>Lorem Ipsum, Loremp Ipsum</p>
            </div>
            </div>
            
          </div>

        </div>
      </div>

      <hr className='mt-16' />

      <div className='flex justify-between mt-20'>
        <p className='text-yq_white1 text-[14px] uppercase'>© 2025 Yetu Qahwah. all rights reserved.</p>
        <p className='text-yq_white1 text-[14px] uppercase'>coffee lovers</p>
      </div>

    </div>
  )
}

export default Footer