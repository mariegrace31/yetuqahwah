import Apropos from "./sections/Apropos";
import Hero from "./sections/Hero";
import Produits from "./sections/Produits";
import Service from "./sections/Service";
import Temoignage from "./sections/Temoignage";

export default function Home() {
  return (
    <div>
      <Hero />
      <Produits />
      <Apropos />
      <Service />
      <Temoignage />
    </div>
  );
}
