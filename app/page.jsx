import Apropos from "./sections/Apropos";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Produits from "./sections/Produits";
import Service from "./sections/Service";
import Temoignage from "./sections/Temoignage";

export default function Home() {
  return (
    <div className="bg-yq_white1">
      <Hero />
      <Produits />
      <Apropos />
      <Service />
      <Temoignage />
      <Contact />
    </div>
  );
}
