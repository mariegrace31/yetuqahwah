export const contentSections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'products', label: 'Produits' },
  { id: 'about', label: 'À propos' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Témoignages' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer', label: 'Pied de page' },
  { id: 'founder', label: 'Fondatrice' },
  { id: 'intervention', label: 'Intervention' },
  { id: 'branding', label: 'Identité visuelle' },
];

export const defaultSiteContent = {
  hero: {
    title: 'marque de café\ncongolaise de\nspécialité',
    description: "Yetu Qahwah est un extraordinaire café, produit d'une collaboration entre les petits producteurs de café d'une part et les dégustateurs professionnels de café de spécialité d'autre part.",
    image: '/images/hero3.jpg',
    shopButton: 'notre boutique', aboutButton: 'en savoir plus',
  },
  products: {
    title: 'nos produits',
    description: 'Nous offrons une large gamme de produits et services autour du café biologique, en utilisant du café provenant du Kivu / République Démocratique du Congo.',
    note: "Nos cafés sont biologiques avec une certification Ecocert pour garantir l'authenticité.",
    items: [
      { id: 'ground-coffee', brand: 'Yetu Qahwah', name: 'Café Moulu', price: 'CDF 20,000', image: '/images/Ground.jpg' },
      { id: 'instant-coffee', brand: 'Yetu Qahwah', name: 'Café Instantané', price: 'CDF 20,000', image: '/images/Instant-coffee.jpg' },
      { id: 'easy-drip', brand: 'Yetu Qahwah', name: 'Café Easy Drip', price: 'CDF 20,000', image: '/images/easy-drip.jpg' },
    ],
  },
  about: {
    title: 'à propos de yetu qahwah', image: '/images/aboutimage.jpg',
    storyTitle: 'nous avons une histoire passionnante à vous raconter',
    story: "Acteur engagé dans l'industrie du café depuis plus de 5 ans, la marque Yetu Qahwah oeuvre activement à la sensibilisation autour de la chaine de valeur du café congolais. Nous développons des solutions concrètes et innovantes qui contribuent à améliorer à la fois la production et la consommation de café cultivé localement en République Démocratique du Congo.",
    coffeeTitle: 'à propos du café congolais',
    coffee: "Aujourd'hui, plusieurs provinces de la République Démocratique du Congo cultivent du café, notamment le Sud-Kivu, le Nord-Kivu, entre autres. Notre pays a la particularité de produire à la fois du café Arabica et du Robusta, cultivés dans des terroirs uniques qui offrent des profils de saveurs riches et diversifiés. La RDC, avec son climat favorable et ses terres fertiles, possède un fort potentiel pour devenir un acteur majeur du café de spécialité sur le continent africain et à l'échelle mondiale.",
    challengesTitle: 'défis et moyens de les surmonter',
    challenges: "En tant que startup évoluant en République Démocratique du Congo, l'accès au financement représente un véritable défi. Pour faire face à cette réalité, nous avons opté pour l'autofinancement et la réinjection systématique des profits, ce qui nous a permis de poursuivre notre développement de manière durable. Par ailleurs, dans un contexte marqué par des instabilités et des conflits récurrents, il est essentiel de concevoir des solutions innovantes et résilientes. C'est dans cette optique que Yetu Qahwah propose des solutions flexibles, pratiques et centrées sur le café, visant non seulement à renforcer la chaine de valeur locale, mais également à contribuer activement au développement économique du pays à travers la culture et la valorisation du café congolais.",
  },
  services: {
    title: 'nos services',
    description: 'Nos services incluent également plusieurs prestations pensées pour vous accompagner.',
    items: [
      { id: 'mobile', title: 'service du café mobile', description: 'Un comptoir mobile pour savourer du café fraîchement préparé lors de vos rencontres et activités.', image: '/images/mobile.svg' },
      { id: 'catering', title: 'service de catering café pour événements intérieurs et extérieurs', description: 'Un service café sur mesure pour accueillir vos invités et animer vos événements, en intérieur comme en extérieur.', image: '/images/catering.svg' },
      { id: 'training', title: 'formation de barista et cupping / dégustation', description: "Des formations pratiques pour apprendre les techniques du barista et développer votre expérience de dégustation.", image: '/images/formation.svg' },
      { id: 'installation', title: "programme d'installation de café et station de lavage", description: 'Un accompagnement pour installer des espaces café et des stations de lavage adaptés aux besoins des producteurs.', image: '/images/programme.svg' },
      { id: 'consulting', title: 'service de consultant', description: 'Appui technique aux coopératives sur les bonnes pratiques agricoles, analyse de café de spécialité, présentation et dégustation de cafés congolais aux événements mondiaux du café tels que AFCA, World of Coffee.', image: '/images/service.svg' },
    ],
  },
  testimonials: {
    title: 'témoignages', description: 'Ce que nos clients disent sur nous', image: '/images/about.svg',
    items: [
      { id: 'jane-doe', quote: '“Lorem ipsum, Café lorem! 10/10. lorem recommender café. le meilleur café du pays.”', name: 'Jane Doe', rating: 4, proofImage: '' },
    ],
  },
  contact: {
    title: 'rester en contact',
    description: 'Restons connectés pour partager notre passion du café, nos nouveautés et les meilleurs conseils pour sublimer chaque tasse.',
    image: '/images/contact.svg',
  },
  footer: {
    logo: '/images/logowhite.svg',
    hoursTitle: 'heures de service', contactTitle: 'contact', phone: '+243 978 026 943',
    email: 'yetuqahwah2020@gmail.com', address: 'Bukavu, Place Mulamba',
    hours: [
      { day: 'lundi', hours: '8h - 20h' }, { day: 'mardi', hours: '8h - 20h' },
      { day: 'mercredi', hours: '8h - 20h' }, { day: 'jeudi', hours: '8h - 20h' },
      { day: 'vendredi', hours: '8h - 20h' }, { day: 'samedi', hours: '8h - 20h' },
      { day: 'dimanche', hours: '8h - 18h' },
    ],
  },
  founder: {
    title: 'Profil personnel', name: 'Linda Mugaruka', image: '/images/grayimage.jpeg',
    biography: [
      "Linda Mugaruka est la fondatrice de Yetu Qahwah, une marque engagée dans la promotion du café congolais à travers une approche inclusive et durable. Pionnière dans le secteur du café en République Démocratique du Congo, elle oeuvre à valoriser la chaine de valeur locale tout en créant des opportunités pour les communautés rurales, en particulier les femmes et les jeunes.",
      "Linda est titulaire d'un diplôme en Agronomie obtenu avec distinction, et elle continue de renforcer ses compétences à travers diverses formations en analyse de café de spécialité, entrepreneuriat, innovation sociale et développement durable.",
      "Son parcours professionnel s'est construit à l'intersection de l'agriculture, de l'impact social et de l'entrepreneuriat. Passionnée par la transformation du potentiel agricole congolais, elle développe des initiatives qui lient le café à l'autonomisation économique et à la paix durable dans les zones post-conflit.",
      "Engagée en faveur de l'autonomisation des femmes, Linda encadre et forme des femmes productrices de café, les aidant à accéder aux marchés, aux financements et à des compétences entrepreneuriales. Elle participe également à plusieurs programmes régionaux et internationaux pour le développement de la jeunesse et l'entrepreneuriat féminin en Afrique centrale.",
      "Maman de 3 enfants, Linda est aussi une grande passionnée de voyages, de gastronomie locale et de rencontres interculturelles. Elle incarne une nouvelle génération de leaders africains qui croient en un développement endogène, durable et humain.",
    ],
    press: [
      { id: 'daily-coffee-news', title: "Three Questions with Linda Mugaruka, the 'Queen of Beans' in the DRC", image: '', link: 'https://dailycoffeenews.com/2021/09/14/three-questions-with-linda-mugaruka-the-queen-of-beans-in-the-drc/' },
      { id: 'youtube', title: 'Linda Mugaruka — Yetu Qahwah', image: '', link: 'https://www.youtube.com/watch?v=9gJUGZO_x00' },
      { id: 'time', title: 'Queen of Beans', image: '', link: 'https://time.com/collection/next-generation-leaders/4971126/linda-mugaruka-head-next-generation-leaders/' },
      { id: 'nytimes', title: 'Specialty Coffee in the Democratic Republic of Congo', image: '', link: 'https://www.nytimes.com/2017/08/23/world/africa/democratic-republic-congo-specialty-coffee.html' },
      { id: 'comunicaffe', title: 'Drink Congo Coffee: the lesson with BWT Italia on water', image: '', link: 'https://www.comunicaffe.com/fatuma-lokembo-renata-zanon-davide-spinelli-drink-congo-coffee-bwt-italia/' },
    ],
    visionTitle: "L'avenir des femmes africaines", visionImage: '/images/grayimage.jpeg',
    vision: [
      "Nous ne faisons pas que participer à l'évolution de notre continent, nous en sommes les actrices principales. Je suis convaincue que lorsqu'une femme est outillée et soutenue, elle devient à son tour un pilier pour d'autres femmes. Celles qui ont trouvé leur voix ont le devoir de parler, non seulement pour elles-mêmes, mais aussi pour celles qui n'ont pas encore eu cette chance.",
      "L'autonomisation des femmes passe par l'accès au savoir, à la finance, et aux outils numériques. En leur donnant les moyens de maîtriser ces leviers, nous posons les fondations d'une économie durable et inclusive, qui bénéficie à toutes et à tous.",
      "Chez Yetu Qahwah, nous croyons fermement en ce pouvoir de transformation. C'est pourquoi nous accompagnons les femmes productrices de café pour qu'elles deviennent non seulement des actrices économiques, mais aussi des leaders au sein de leurs communautés.",
      "Transmettre, soutenir, élever les autres : telle est notre responsabilité. Je suis Linda Mugaruka, je suis une femme africaine, et je construis, chaque jour, l'avenir que je veux voir pour les femmes de notre continent.",
    ],
  },
  intervention: {
    title: 'intervention',
    description: 'Initiative sociale et environnementale visant à accompagner les femmes vulnérables dans leur autonomisation en devenant productrices de café durable.',
    cards: Array.from({ length: 6 }, (_, index) => ({ id: `initiative-${index + 1}`, image: '/images/grayimage.jpeg', description: 'Lorem Ipsum quando porque el fruto, el celebro di coffee' })),
  },
  branding: { logo: '/images/moblogochoc.svg', logoAlt: 'Yetu Qahwah' },
};

export function mergeSiteContent(rows = []) {
  const content = structuredClone(defaultSiteContent);
  for (const row of rows) {
    if (row?.section && row.content && content[row.section]) {
      content[row.section] = { ...content[row.section], ...row.content };
      if (row.section === 'testimonials' && !Array.isArray(row.content.items) && row.content.quote) {
        content.testimonials.items = [{
          id: 'legacy-testimonial',
          quote: row.content.quote,
          name: row.content.name || row.content.customer || '',
          rating: Number(row.content.rating) || 5,
          proofImage: '',
        }];
      }
      if (row.section === 'testimonials') {
        delete content.testimonials.customer;
        delete content.testimonials.quote;
        delete content.testimonials.name;
        delete content.testimonials.rating;
      }
    }
  }
  return content;
}
