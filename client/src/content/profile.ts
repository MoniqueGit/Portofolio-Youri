/**
 * Source unique de vérité pour le contenu du portfolio.
 * Les composants ne font que la mise en forme : pour corriger un texte,
 * c'est ici et nulle part ailleurs.
 */
import {
  Cpu, Wrench, Code2, MonitorCog, Zap, CircuitBoard, Bot,
  Nfc, LayoutDashboard, Shirt, Mail, Phone, Linkedin, MapPin, Gamepad2,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  firstName: "Youri",
  lastName: "Figuié",
  title: "Technicien de maintenance électronique en alternance chez Collins Aerospace",
  tagline:
    "Technicien de maintenance électronique en alternance chez Collins Aerospace, sur le site de Blagnac. Le reste du temps, étudiant en BUT GEII à Montpellier.",
  email: "youri.figuie@etu.umontpellier.fr",
  phone: "06 47 20 91 58",
  phoneHref: "tel:+33647209158",
  linkedin: "https://linkedin.com/in/youri-fg/",
  linkedinLabel: "linkedin.com/in/youri-fg",
  location: "Prades-Le-Lez (34730)",
  cvFile: "cv-youri-figuie.pdf",
  photo: "photo-profil.jpg",
} as const;

/** Bandeau de caractéristiques sous le hero — lecture en 3 secondes. */
export const highlights: { value: string; label: string }[] = [
  { value: "Collins Aerospace", label: "Maintenance électronique, Blagnac" },
  { value: "BUT GEII", label: "IUT de Montpellier" },
  { value: "Depuis 2026", label: "En alternance" },
  { value: "Réserviste", label: "Armée de Terre, 3ᵉ RPIMa" },
];

export const about = {
  intro:
    "Technicien supérieur en formation en Génie Électrique et Informatique Industrielle à l'IUT de Montpellier, je me spécialise dans les systèmes embarqués. Depuis 2026, je partage mon temps entre l'IUT et le site Collins Aerospace de Blagnac, comme technicien de maintenance électronique.",
  facts: [
    { label: "Qualités", items: ["Rigoureux et curieux", "En quête d'apprentissage constant"] },
    { label: "Langues", items: ["Français, langue maternelle", "Anglais, niveau B2 technique"] },
    { label: "Centres d'intérêt", items: ["Bivouac et randonnée", "Musculation", "Nouvelles technologies"] },
    { label: "Informations", items: ["Prades-Le-Lez (34)", "19 ans, permis B", "Alternant chez Collins Aerospace"] },
  ],
};

/**
 * Ancien argumentaire de candidature. PLUS AFFICHÉ depuis que Youri est en
 * poste chez Collins (choix du 14/09/2026) : le site est devenu une vitrine,
 * pas une candidature. Conservé ici pour pouvoir être remis facilement.
 */
export const alternanceArchive = {
  intro:
    "L'alternance est pour moi la meilleure façon d'apprendre : confronter la théorie à la réalité professionnelle, prendre de vraies responsabilités et progresser dans un cadre structuré.",
  arguments: [
    {
      title: "Goût du travail concret",
      text: "J'aime produire quelque chose de tangible. Contribuer à de vrais projets techniques, avec de vrais enjeux, me motive davantage que n'importe quel cours magistral.",
    },
    {
      title: "Indépendance",
      text: "L'alternance me fait avancer vers l'autonomie financière et professionnelle. C'est une démarche active, pas subie — je veux construire ma place.",
    },
  ],
  missions: [
    "R&D systèmes embarqués",
    "Conception et test électronique",
    "Développement firmware C / C++",
    "Intégration capteurs et signaux",
    "Robotique et automatisation",
    "Validation et prototypage",
  ],
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  /** Peut être vide quand le détail vit sur une page dédiée. */
  bullets: string[];
  tags: string[];
  /** Lien vers la page dédiée, le cas échéant. */
  href?: string;
  hrefLabel?: string;
};

export const experiences: Experience[] = [
  {
    role: "Technicien de maintenance électronique",
    company: "Collins Aerospace, Blagnac",
    period: "Depuis 2026",
    tags: ["Alternance", "Aéronautique", "Maintenance électronique"],
    // Missions volontairement non listées ici : elles vivent sur la page dédiée,
    // et restent à renseigner par Youri dans content/collins.ts.
    bullets: [],
    href: "/collins",
    hrefLabel: "Voir la page Collins Aerospace",
  },
  {
    role: "Réserviste opérationnel",
    company: "Armée de Terre, 3ᵉ RPIMa, Carcassonne",
    period: "Depuis 2025",
    tags: ["Défense", "Discipline", "Engagement"],
    bullets: [
      "Engagement opérationnel au sein du 3ᵉ RPIMa, avec application stricte des procédures et protocoles militaires.",
      "Réactivité et prise de décision rapide sous contrainte physique et temporelle.",
      "Travail en cohésion d'équipe sur des missions à hautes exigences : fiabilité, rigueur, engagement collectif.",
      "Réflexes directement transposables en milieu industriel : sang-froid et respect des consignes de sécurité.",
    ],
  },
  {
    role: "Figurant",
    company: "France Télévisions, « Karma, trop jeunes pour se taire »",
    period: "2025 à 2026",
    tags: ["Travail en équipe", "Adaptabilité", "Cadre professionnel"],
    bullets: [
      "Participation à un tournage professionnel long format, aux côtés d'équipes techniques et artistiques structurées.",
      "Adaptation immédiate aux directives de production dans un environnement à contraintes multiples.",
      "Collaboration avec des équipes pluridisciplinaires : réalisateurs, techniciens de plateau et comédiens.",
    ],
  },
  {
    role: "Hôte de caisse polyvalent",
    company: "Log'in Solutions, Prades-Le-Lez",
    period: "2024",
    tags: ["Service client", "Rigueur", "Polyvalence"],
    bullets: [
      "Gestion autonome des opérations de caisse : précision comptable et respect des procédures internes.",
      "Accueil et orientation des clients, avec aisance relationnelle et sens du service.",
      "Polyvalence opérationnelle : adaptation aux différents postes selon les flux d'activité.",
    ],
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail: string;
  modules: string[];
};

export const education: Education[] = [
  {
    degree: "BUT Génie Électrique et Informatique Industrielle",
    school: "IUT de Montpellier",
    period: "Depuis 2025",
    detail: "Spécialisation systèmes embarqués et électronique industrielle.",
    modules: [
      "Programmation systèmes (C / Python)",
      "Électronique analogique et numérique",
      "Automatisme industriel",
      "Traitement du signal",
    ],
  },
  {
    degree: "Baccalauréat général, spécialités mathématiques et NSI",
    school: "Lycée Jean Jaurès",
    period: "2022 à 2025",
    detail: "Mention Assez Bien.",
    modules: [],
  },
];

export type SkillGroup = {
  icon: LucideIcon;
  label: string;
  skills: { name: string; desc: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    icon: Code2,
    label: "Programmation",
    skills: [
      { name: "Python", desc: "Scripts, automatisation, traitement de données." },
      { name: "C / C++", desc: "Bases orientées systèmes embarqués." },
      { name: "HTML", desc: "Bases web techniques." },
    ],
  },
  {
    icon: Cpu,
    label: "Électronique",
    skills: [
      { name: "Analogique et numérique", desc: "Bases théoriques et pratiques." },
      { name: "Lecture de schémas", desc: "Schémas électriques et PCB." },
      { name: "Capteurs et signaux", desc: "Acquisition et traitement." },
      { name: "Logique embarquée", desc: "STM32, ESP32, soudure." },
    ],
  },
  {
    icon: Wrench,
    label: "Outils",
    skills: [
      { name: "n8n", desc: "Automatisation de workflows." },
      { name: "Git", desc: "Versionnement et environnement de développement." },
      { name: "Windows / Linux", desc: "Environnements de travail." },
    ],
  },
  {
    icon: MonitorCog,
    label: "Logiciels",
    skills: [
      { name: "QElectrotech", desc: "Schémas électriques." },
      { name: "Control Expert", desc: "Automatisme Schneider (PLC)." },
      { name: "Quartus", desc: "Conception logique numérique." },
    ],
  },
];

export const softSkills = [
  "Rigueur",
  "Travail en équipe",
  "Curiosité et autonomie",
  "Adaptabilité",
  "Permis B",
];

export type Project = {
  /** Identifiant stable, utilisé pour l'ancre du dossier. */
  slug: string;
  title: string;
  /** Icône de repli tant qu'aucune photo n'est fournie. */
  icon: LucideIcon;
  /** Badge affiché en haut de la vignette (cadre du projet). */
  origin: string;
  status?: string;
  /** Une ligne, affichée en accent sur la carte. */
  summary: string;
  /** Paragraphe : tronqué sur la carte, complet dans le dossier. */
  desc: string;
  tags: string[];
  context: string;
  /** Ce qui a été fait, point par point. Affiché dans le dossier. */
  highlights: string[];
  /**
   * Photo de couverture — nom de fichier déposé dans `client/public/projets/`.
   * Tant que la clé est absente, la carte affiche proprement l'icône de repli.
   */
  cover?: string;
  /** Photos supplémentaires du dossier, même dossier que `cover`. */
  gallery?: string[];
  /**
   * Route interne quand le projet a sa propre page : la carte y mène au lieu
   * d'ouvrir le dossier en surimpression. Chemin sans le préfixe de base —
   * wouter s'en charge (le site est servi sous /Portofolio-Youri/).
   */
  page?: string;
};

export const academicProjects: Project[] = [
  {
    slug: "pichenette-game",
    title: "Pichenette Game",
    icon: Gamepad2,
    origin: "BUT GEII",
    summary: "Une borne d'arcade de bureau qui mesure la force d'une pichenette.",
    desc: "Borne d'arcade miniature : on envoie une pichenette, la machine mesure la force du coup et affiche un score. Derrière le jeu, la chaîne de mesure complète — capter, conditionner, traiter, afficher.",
    tags: ["Électronique", "Instrumentation", "Mesure"],
    context: "Projet mené en BUT GEII, à l'IUT de Montpellier.",
    /* Vide volontairement : le détail vit sur la page dédiée, et rien n'y est
       inventé tant que Youri n'a pas renseigné client/src/content/pichenette.ts */
    highlights: [],
    page: "/pichenette",
  },
  {
    slug: "de-electronique",
    title: "Dé électronique",
    icon: Zap,
    origin: "BUT GEII",
    summary: "Du schéma au prototype fonctionnel.",
    desc: "Conception d'un circuit électronique complet : intégration des composants, tests de fonctionnement et correction des bugs électroniques.",
    tags: ["Électronique", "PCB", "Hardware"],
    context: "Projet mené en BUT GEII, à l'IUT de Montpellier.",
    highlights: [
      "Conception du circuit électronique complet.",
      "Intégration des composants sur la carte.",
      "Tests de fonctionnement du montage.",
      "Identification et correction des bugs électroniques.",
    ],
  },
  {
    slug: "carte-stm32",
    title: "Carte STM32",
    icon: CircuitBoard,
    origin: "BUT GEII",
    summary: "Soudure fine et validation logicielle.",
    desc: "Assemblage et soudure d'une carte STM32, contrôle des connexions et validation du fonctionnement en langage C (STMicroelectronics).",
    tags: ["STM32", "C", "Embarqué", "Soudure"],
    context: "Projet mené en BUT GEII, à l'IUT de Montpellier, sur matériel STMicroelectronics.",
    highlights: [
      "Assemblage et soudure des composants de la carte.",
      "Contrôle des connexions avant mise sous tension.",
      "Validation du fonctionnement en langage C.",
    ],
  },
  {
    slug: "robot-suiveur-de-ligne",
    title: "Robot suiveur de ligne",
    icon: Bot,
    origin: "BUT GEII",
    summary: "Zéro microcontrôleur, tout en analogique.",
    desc: "Conception d'un robot analogique avec capteurs de ligne, réglages électroniques fins et tests prototype jusqu'à la validation finale.",
    tags: ["Robotique", "Capteurs", "Analogique"],
    context: "Projet mené en BUT GEII, à l'IUT de Montpellier.",
    highlights: [
      "Conception d'un robot entièrement analogique.",
      "Intégration et câblage des capteurs de ligne.",
      "Réglages électroniques fins du suivi de trajectoire.",
      "Tests sur prototype jusqu'à la validation finale.",
    ],
  },
];

export const personalProjects: Project[] = [
  {
    slug: "locker-room-rfid",
    title: "Locker Room RFID",
    icon: Nfc,
    origin: "Projet perso",
    status: "Réalisé",
    summary: "Casier électronique sécurisé par badge.",
    desc: "Système de casier électronique sécurisé par badge RFID, conçu autour d'une ESP32 programmée en C++ : gestion des accès, lecture des tags et retour d'état par LED.",
    tags: ["ESP32", "C++", "RFID", "Électronique"],
    context: "Projet personnel, hors cursus.",
    highlights: [
      "Conception du système autour d'une ESP32.",
      "Programmation du firmware en C++.",
      "Lecture des tags RFID et gestion des accès.",
      "Retour d'état visuel par LED.",
    ],
  },
  {
    slug: "atlas",
    title: "Atlas",
    icon: LayoutDashboard,
    origin: "Projet perso",
    status: "En développement",
    summary: "Automatisation pour gérants de locations.",
    desc: "Solution tout-en-un pour gérants de locations courte durée : automatisation des tâches récurrentes (messages, check-in, calendrier) et tableau de bord centralisé des réservations.",
    tags: ["Automatisation", "Dashboard", "n8n", "Web"],
    context: "Projet personnel en cours de développement.",
    highlights: [
      "Automatisation des messages aux voyageurs.",
      "Automatisation du check-in et du calendrier.",
      "Tableau de bord centralisé de suivi des réservations.",
    ],
  },
  {
    slug: "nlmb-collection",
    title: "Collection NLMB",
    icon: Shirt,
    origin: "Projet perso",
    status: "Réalisé",
    summary: "Collection de t-shirts, du design à la livraison.",
    desc: "Création d'une collection de t-shirts pour mon équipe sous le nom NLMB : conception du design, choix des supports, coordination de la production et distribution.",
    tags: ["Design", "Entrepreneuriat", "Équipe"],
    context: "Projet personnel mené pour mon équipe.",
    highlights: [
      "Conception du design de la collection.",
      "Choix des supports et des matières.",
      "Coordination de la production.",
      "Distribution auprès de l'équipe.",
    ],
  },
];

/**
 * Ancienne section « Pourquoi me choisir ». PLUS AFFICHÉE pour la même raison
 * que `alternanceArchive`. Conservée pour pouvoir être remise.
 */
export const whyMeArchive = [
  {
    title: "Des bases concrètes, dès la première année",
    desc: "En BUT GEII, j'ai déjà conçu des circuits, soudé des cartes STM32 et fabriqué un robot suiveur de ligne. J'arrive avec de la pratique réelle, pas uniquement de la théorie.",
  },
  {
    title: "De l'engagement et de la rigueur acquis sur le terrain",
    desc: "Réserviste au 3ᵉ RPIMa, j'ai appris à respecter les procédures, rester calme sous pression et être fiable dans un cadre exigeant. Des réflexes qui s'appliquent partout.",
  },
  {
    title: "Une curiosité qui ne s'arrête pas au cours",
    desc: "Système RFID en C++, automatisation n8n, tableau de bord Atlas : j'explore en dehors des cours, parce que ça m'intéresse vraiment. L'apprentissage est un moteur, pas une contrainte.",
  },
  {
    title: "Un cap défini, une motivation sincère",
    desc: "Je sais dans quelle direction je veux aller : les systèmes embarqués, l'électronique, la défense. C'est une orientation claire que j'assume et que je construis chaque jour.",
  },
];

export const contactLinks = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, external: false },
  { icon: Phone, label: profile.phone, href: profile.phoneHref, external: false },
  { icon: Linkedin, label: profile.linkedinLabel, href: profile.linkedin, external: true },
  { icon: MapPin, label: profile.location, href: undefined, external: false },
];

export const navItems = [
  { href: "#profil", label: "Profil" },
  { href: "#collins", label: "Collins" },
  { href: "#parcours", label: "Parcours" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];
