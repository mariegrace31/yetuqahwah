import Image from 'next/image';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';

export default function Footer({ content }) {
  return (
    <footer className="bg-yq_choc px-5 pt-14 pb-7 lg:px-44 lg:pt-16">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col gap-7 lg:gap-10">
          <Image src={content.logo} alt="Yetu Qahwah" width={50} height={50} unoptimized className="w-28 md:w-32 lg:w-44" />
          <div className="flex gap-4 lg:gap-9">
            <FaFacebook className="text-xl text-yq_white1 md:text-2xl lg:text-4xl" />
            <a href="https://www.tiktok.com/@yetu.qahwah?_r=1&_t=ZS-9AC2jhBwp2D" target="_blank" rel="noopener noreferrer" aria-label="Yetu Qahwah sur TikTok"><FaTiktok className="text-xl text-yq_white1 md:text-2xl lg:text-4xl" /></a>
            <a href="https://www.instagram.com/yetu_qahwah?stkn=MWsyeGFzbjVjMDZ1dg==" target="_blank" rel="noopener noreferrer" aria-label="Yetu Qahwah sur Instagram"><FaInstagram className="text-xl text-yq_white1 md:text-2xl lg:text-4xl" /></a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 md:mt-0 lg:gap-24">
          <div>
            <h2 className="font-medium uppercase text-yq_lightchoc text-[12px] md:text-[14px] lg:text-[20px]">{content.hoursTitle}</h2>
            <dl className="mt-4 space-y-2">{content.hours.map((item) => <div key={item.day} className="flex justify-between gap-5 text-yq_white1 text-[10px] md:text-[12px] lg:text-[14px]"><dt className="font-light uppercase">{item.day}</dt><dd className="font-light">{item.hours}</dd></div>)}</dl>
          </div>
          <div>
            <h2 className="font-medium uppercase text-yq_lightchoc text-[12px] md:text-[14px] lg:text-[20px]">{content.contactTitle}</h2>
            <div className="mt-4 flex flex-col gap-5 text-yq_white1">
              <p className="text-[12px] md:text-[14px] lg:text-[16px]">Téléphone:<br /><span className="font-light text-[10px] md:text-[12px] lg:text-[14px]">{content.phone}</span></p>
              <p className="text-[12px] md:text-[14px] lg:text-[16px]">E-mail:<br /><a href={`mailto:${content.email}`} className="font-light text-[10px] md:text-[12px] lg:text-[14px]">{content.email}</a></p>
              <p className="text-[12px] md:text-[14px] lg:text-[16px]">Adresse:<br /><span className="font-light text-[10px] md:text-[12px] lg:text-[14px]">{content.address}</span></p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-12" />
      <div className="mt-7 flex flex-col justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="uppercase text-yq_white1 text-[11px] md:text-[13px] lg:text-[14px]">© 2025 Yetu Qahwah. all rights reserved.</p>
        <p className="uppercase text-yq_white1 text-[11px] md:text-[13px] lg:text-[14px]">coffee lovers</p>
      </div>
    </footer>
  );
}
