'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '@/app/assets/logoBlack.svg';
import moblogo from '@/app/assets/moblogochoc.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const sections = [
  { id: 'acceuil', label: 'acceuil', type: 'scroll' },
  { id: 'produits', label: 'nos produits', type: 'scroll' },
  { id: 'apropos', label: 'à propos', type: 'scroll' },
  { id: 'fondatrice', label: 'fondatrice', type: 'page', path: '/fondatrice' },
  { id: 'intervention', label: 'intervention', type: 'page', path: '/intervention' },
  { id: 'temoignages', label: 'témoignages', type: 'scroll' },
  { id: 'contact', label: 'contact', type: 'scroll' },
];

function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('acceuil');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      sections.forEach((section) => {
        if (section.type !== 'scroll') return;

        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500
        ${scrolled ? 'bg-yq_white1 shadow-md' : 'bg-transparent'}`}
    >
      {/* logo */}
      <div className="flex justify-between items-center py-5 px-5 md:px-9 lg:px-14">
        <Image src={logo} alt="Logo" width={80} height={60} className="hidden md:block md:w-24 lg:block lg:w-28" />
        <Link href="/"><Image src={moblogo} alt="Logo" width={80} height={60} className="w-[75px] md:hidden lg:hidden" /></Link>

        {/* Desktop navlinks */}
        <ul className="hidden lg:flex gap-11 items-center">
          {sections.map((section) => {
            const isActive =
              section.type === 'scroll'
                ? activeSection === section.id && pathname === '/'
                : pathname === section.path;

            return (
              <li
                key={section.id}
                className="relative uppercase text-[12px] font-sans font-medium group"
              >
                <Link
                  href={
                    section.type === 'scroll'
                      ? `/#${section.id}`
                      : section.path
                  }
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

        {/* Mobile / Tablet icon */}
        <button
          className="lg:hidden text-yq_main text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className='text-yq_main text-2xl md:text-4xl'  /> : <HiOutlineMenuAlt3 className='text-yq_main text-2xl md:text-4xl' />}
        </button>
      </div>

      {/* Mobile & Tablet navlinks */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col items-center gap-6 py-8 bg-yq_white1 shadow-md">
          {sections.map((section) => (
            <li
              key={section.id}
              className="uppercase text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <Link
                href={
                  section.type === 'scroll'
                    ? `/#${section.id}`
                    : section.path
                }
                className="text-yq_main hover:text-yq_lightchoc transition-colors"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

