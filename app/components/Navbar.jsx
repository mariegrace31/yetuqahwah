'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '@/app/assets/logoBlack.svg';
import Link from 'next/link';

const sections = [
  { id: 'acceuil', label: 'acceuil' },
  { id: 'produits', label: 'nos produits' },
  { id: 'apropos', label: 'à propos' },
  { id: 'fondatrice', label: 'fondatrice' },
  { id: 'intervention', label: 'intervention' },
  { id: 'temoignages', label: 'témoignages' },
  { id: 'contact', label: 'contact' },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('acceuil');

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between bg-transparent py-5 px-14 items-center">
      <Image src={logo} alt="Logo" width={80} height={60} className="w-28" />

      <ul className="flex gap-11 items-center">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <li
              key={section.id}
              className="relative uppercase text-[12px] font-sans font-medium group"
            >
              <Link
                href={`#${section.id}`}
                className={`transition-colors duration-300 ${
                  isActive ? 'text-yq_lightchoc' : 'text-yq_main'
                }`}
              >
                {section.label}
              </Link>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-yq_lightchoc transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
