import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/logoBlack.svg';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="flex justify-between bg-transparent py-5 px-20 items-center">
      <Image src={logo} alt="Logo" width={80} height={60} className="w-28"/>

      <ul className="flex gap-11 items-center">
        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            acceuil
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/produits" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            nos produits
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/apropos" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            à propos
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/fondatrice" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            fondatrice
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/intervention" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            intervention
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/temoignages" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            témoignages
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc  transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative uppercase text-[12px] font-sans font-medium text-yq_main group">
          <Link href="/contact" className="transition-colors duration-300 group-hover:text-yq_lightchoc">
            contact
          </Link>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yq_lightchoc transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;