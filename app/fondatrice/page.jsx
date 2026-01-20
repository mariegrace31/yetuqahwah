import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import image from '@/app/assets/grayimage.jpeg';

function page() {
  return (
    <div className='pt-44'>
      <h1 className="text-yq_choc uppercase text-center font-montserrat text-[16px]">Profil personnel</h1>
      <div className='grid grid-cols-2 gap-12 mt-10 px-14 h-[85vh]'>
        <div>
          <Image src={image} width={100} height={100} alt='image' className="w-full h-[75vh]" />
        </div>

        <div className='flex flex-col gap-4 h-[75vh]'>
          <h1 className='text-[13px] text-yq_main font-extralight uppercase'>Linda Mugaruka</h1>
          <p className='font-light text-[16px] text-yq_black'>Linda Mugaruka est la fondatrice de Yetu Qahwah, une marque engagée dans la promotion du café congolais 
            à travers une approche inclusive et durable. Pionnière dans le secteur du café en République Démocratique 
            du Congo, elle oeuvre à valoriser a chaine de valeur locale tout en créant des opportunités pour les communautés
             rurales, en particulier les femmes et les jeunes.</p>
          <p className='font-light text-[16px] text-yq_black'>Linda est titulaire d'un diplôme en Agronomie obtenu avec distinction, et elle continue de renforcer ses compétences
             à travers diverses formations en analyse de café de spécialité, entrepreneuriat, innovation sociale et développement durable.</p>
          <p className='font-light text-[16px] text-yq_black'>Son parcours professionnel s'est construit à l'intersection de l'agriculture, de l'impact social et de 
             l'entrepreneuriat. Passionnée par la transformation du potentiel agricole congolais, elle développe des initiatives qui lient le café à
             l'autonomisation économique et à la paix durable dans les zones post-conflit.</p>
          <p className='font-light text-[16px] text-yq_black'>Engagée en faveur de l'autonomisation des femmes, Linda encadre et forme des femmes productrice de café, 
            les aidant à accéder à ds marchés, à ds financements et à des compétences entrepreneuriales. Elle participe également à plusieurs programmes
             régionaux et internationaux pour le développement de la jeunesse et l'entrepreneuriat féminin en Afrique centrale.</p>
          <p className='font-light text-[16px] text-yq_black'>Maman de 3 enfants, Linda est aussi une grande passionée de voyages, de gastronomie locale et de rencontres interculturelles.Elle incarne une 
            nouvelle génération de leaders africains qui croient en un développement endogène, durable et humain.</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-12 px-14'>
        <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <div className='px-4 py-6'>
             <Link target="_blank" rel="noopener noreferrer" className='text-yq_blue my-auto text-[16px] font-light' href="https://dailycoffeenews.com/2021/09/14/three-questions-with-linda-mugaruka-the-queen-of-beans-in-the-drc/"> https://dailycoffeenews.com/2021/09/14/three-questions-with-linda-mugaruka-the-queen-of-beans-in-the-drc/</Link>
          </div>
          </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]' />
          <div className='px-4 py-6 flex'>
            <Link target="_blank" rel="noopener noreferrer" className='text-yq_blue flex text-[16px] font-light' href="https://www.youtube.com/watch?v=9gJUGZO_x00">https://www.youtube.com/watch?v=9gJUGZO_x00</Link>
          </div>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]'  />
          <div className='px-4 py-6'>
             <Link target="_blank" rel="noopener noreferrer" className='text-yq_blue text-[16px] font-light' href="https://time.com/collection/next-generation-leaders/4971126/linda-mugaruka-head-next-generation-leaders/">
          https://time.com/collection/next-generation-leaders/4971126/linda-mugaruka-head-next-generation-leaders/</Link>
          </div>
        </div>

         <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]'  />
          <div className='px-4 py-6'>
            <Link target="_blank" rel="noopener noreferrer" className='text-yq_blue text-[16px] font-light' href="https://www.nytimes.com/2017/08/23/world/africa/democratic-republic-congo-specialty-coffee.html">https://www.nytimes.com/2017/08/23/world/ <br /> africa/democratic-republic-congo-specialty-coffee.html</Link>
          </div>  
        </div>

        <div className='shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <Image src={image} width={100} height={100} alt='image' className='w-full h-[25vh]'  />
          <div className='px-4 py-6'>
            <Link target="_blank" rel="noopener noreferrer" className='text-yq_blue text-[16px] font-light' href="https://www.comunicaffe.com/fatuma-lokembo-renata-zanon-davide-spinelli-drink-congo-coffee-bwt-italia/">
          https://www.comunicaffe.com/fatuma-lokembo-renata-zanon-davide-spinelli-drink-congo-coffee-bwt-italia/</Link>
          </div>  
        </div>
      </div>

      <div className='grid grid-cols-2 gap-12 mt-32 px-14 h-[65vh]'>
        <div className='flex flex-col gap-4 h-[57vh]'>
          <h2 className="text-yq_choc uppercase font-montserrat text-[16px]">L'avenir des femmes africaines</h2>
          <p className='font-light text-[16px] text-yq_black'>Nous ne faisons pas que participer à l'évolution de notre continent, nous en sommes les actrices principales. 
          Je suis convaincue que lorsqu'une femme est outilée et soutenue, elle devient à son tour un pilier pour d'autres femmes.
           Celles qui ont trouvé leur voix ont le devoir de parler, non seulement pour elles-mêmes, mais aussi pour celles qui n'ont
           pas encore eu cette chance.</p>
          <p className='font-light text-[16px] text-yq_black'>L'autonomisation des femmes passe par l'accès au savoir, à la finance, et aux outils numériques.
           En leur donnant les moyens de maîtriser ces leviers, nous posons les fondations d'une économie 
           durable et inclusive, qui bénéficie à toutes et à tous.</p>
          <p className='font-light text-[16px] text-yq_black'>Chez Yetu Qahwah, nous croyons fermement en ce pouvoir de transformation. C'est pourquoi nous accompagnons les femmes 
            productrices de café pour qu'elles deviennent non seulement des actrices économiques, mais aussi des leaders au sein de leurs communautés.</p>
          <p className='font-light text-[16px] text-yq_black'>Transmettre, soutenir, élever les autres : telle est notre responsabilité.
            Je suis Linda Mugaruka, je suis une femme africaine, et je construis, chaque jour, l'avenir que je veux voir pour les femmes de notre continent.</p>
        </div>
        <Image src={image} width={100} height={100} alt='image' className="w-full h-[57vh]" />
      </div>
    </div>
  )
}

export default page