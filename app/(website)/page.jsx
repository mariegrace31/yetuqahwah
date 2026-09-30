import Apropos from "@/app/sections/Apropos";
import Contact from "@/app/sections/Contact";
import Hero from "@/app/sections/Hero";
import Produits from "@/app/sections/Produits";
import Service from "@/app/sections/Service";
import Temoignage from "@/app/sections/Temoignage";
import { getSiteContent } from "@/lib/supabase/public-content";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <div className="bg-yq_white1">
      <Hero content={content.hero} />
      <Produits content={content.products} />
      <Apropos content={content.about} />
      <Service content={content.services} />
      <Temoignage content={content.testimonials} />
      <Contact content={content.contact} />
    </div>
  );
}
