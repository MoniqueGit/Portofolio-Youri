/**
 * Source unique de vérité pour le contenu du portfolio.
 * Les composants ne font que la mise en forme : pour corriger un texte,
 * c'est ici et nulle part ailleurs.
 */
import {
  Cpu, Wrench, Code2, MonitorCog, Zap, CircuitBoard, Bot,
  Nfc, LayoutDashboard, Shirt, Mail, Phone, Linkedin, MapPin,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  firstName: "Youri",
  lastName: "Figuié",
  title: "Étudiant en BUT GEII — systèmes embarqués & électronique",
  tagline:
    "Je conçois, soude et teste des cartes électroniques. Je cherche une alternance de 2026 à 2028 pour mettre cette pratique au service d'une vraie équipe.",
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
  { value: "BUT GEII", label: "IUT de Montpellier" },
  { value: "2026 — 2028", label: "Alternance recherchée" },
  { value: "Montpellier", label: "Mobilité · Permis B" },
  { value: "Réserviste", label: "3ᵉ RPIMa · Armée de Terre" },
];

export const about = {
  intro:
    "Technicien supérieur en formation en Génie Électrique et Informatique Industrielle à l'IUT de Montpellier, je me spécialise dans les systèmes embarqués. Je recherche une alternance pour confronter la théorie à la réalité d'une entreprise.",
  facts: [
    { label: "Qualités", items: ["Rigoureux et curieux", "En quête d'apprentissage constant"] },
    { label: "Langues", items: ["Français — natif", "Anglais — B2 technique"] },
    { label: "Centres d'intérêt", items: ["Bivouac et randonnée", "Musculation", "Nouvelles technologies"] },
    { label: "Informations", items: ["Prades-Le-Lez (34)", "19 ans · Permis B", "Alternance 2026 — 2028"] },
  ],
};

export const alternance = {
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
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    role: "Réserviste opérationnel",
    company: "Armée de Terre — 3ᵉ RPIMa, Carcassonne",
    period: "2025 — Présent",
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
    company: "France Télévisions — « Karma, trop jeunes pour se taire »",
    period: "2025 — 2026",
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
    period: "2025 — Présent",
    detail: "Spécialisation systèmes embarqués et électronique industrielle.",
    modules: [
      "Programmation systèmes (C / Python)",
      "Électronique analogique et numérique",
      "Automatisme industriel",
      "Traitement du signal",
    ],
  },
  {
    degree: "Baccalauréat général — Mathématiques & NSI",
    school: "Lycée Jean Jaurès",
    period: "2022 — 2025",
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
  title: string;
  icon: LucideIcon;
  summary: string;
  desc: string;
  tags: string[];
  status?: string;
};

export const academicProjects: Project[] = [
  {
    title: "Dé électronique",
    icon: Zap,
    summary: "Du schéma au prototype fonctionnel.",
    desc: "Conception d'un circuit électronique complet : intégration des composants, tests de fonctionnement et correction des bugs électroniques.",
    tags: ["Électronique", "PCB", "Hardware"],
  },
  {
    title: "Carte STM32",
    icon: CircuitBoard,
    summary: "Soudure fine et validation logicielle.",
    desc: "Assemblage et soudure d'une carte STM32, contrôle des connexions et validation du fonctionnement en langage C (STMicroelectronics).",
    tags: ["STM32", "C", "Embarqué"],
  },
  {
    title: "Robot suiveur de ligne",
    icon: Bot,
    summary: "Zéro microcontrôleur, tout en analogique.",
    desc: "Conception d'un robot analogique avec capteurs de ligne, réglages électroniques fins et tests prototype jusqu'à la validation finale.",
    tags: ["Robotique", "Capteurs", "Analogique"],
  },
];

export const personalProjects: Project[] = [
  {
    title: "Locker Room RFID",
    icon: Nfc,
    status: "Réalisé",
    summary: "Casier électronique sécurisé par badge.",
    desc: "Système de casier électronique sécurisé par badge RFID, conçu autour d'une ESP32 programmée en C++ : gestion des accès, lecture des tags et retour d'état par LED.",
    tags: ["ESP32", "C++", "RFID", "Électronique"],
  },
  {
    title: "Atlas",
    icon: LayoutDashboard,
    status: "En développement",
    summary: "Automatisation pour gérants de locations.",
    desc: "Solution tout-en-un pour gérants de locations courte durée : automatisation des tâches récurrentes (messages, check-in, calendrier) et tableau de bord centralisé des réservations.",
    tags: ["Automatisation", "Dashboard", "n8n", "Web"],
  },
  {
    title: "NLMB — Collection",
    icon: Shirt,
    status: "Réalisé",
    summary: "Collection de t-shirts, du design à la livraison.",
    desc: "Création d'une collection de t-shirts pour mon équipe sous le nom NLMB : conception du design, choix des supports, coordination de la production et distribution.",
    tags: ["Design", "Entrepreneuriat", "Équipe"],
  },
];

export const whyMe = [
  {
    num: "01",
    title: "Des bases concrètes, dès la première année",
    desc: "En BUT GEII, j'ai déjà conçu des circuits, soudé des cartes STM32 et fabriqué un robot suiveur de ligne. J'arrive avec de la pratique réelle, pas uniquement de la théorie.",
  },
  {
    num: "02",
    title: "De l'engagement et de la rigueur acquis sur le terrain",
    desc: "Réserviste au 3ᵉ RPIMa, j'ai appris à respecter les procédures, rester calme sous pression et être fiable dans un cadre exigeant. Des réflexes qui s'appliquent partout.",
  },
  {
    num: "03",
    title: "Une curiosité qui ne s'arrête pas au cours",
    desc: "Système RFID en C++, automatisation n8n, tableau de bord Atlas : j'explore en dehors des cours, parce que ça m'intéresse vraiment. L'apprentissage est un moteur, pas une contrainte.",
  },
  {
    num: "04",
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
  { href: "#parcours", label: "Parcours" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#alternance", label: "Alternance" },
  { href: "#contact", label: "Contact" },
];
