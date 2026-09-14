/**
 * Projet « Pichenette Game » — borne d'arcade miniature de bureau.
 *
 * ⚠ RÈGLE DE CE FICHIER : rien ici ne doit être inventé.
 * Le principe du jeu vient de la description de Youri. Tout ce qui touche à
 * l'ÉLECTRONIQUE RÉELLE (capteur, microcontrôleur, affichage, alimentation)
 * est volontairement laissé VIDE tant que Youri ne l'a pas renseigné : la page
 * affiche alors proprement « à renseigner » plutôt qu'une spécification
 * plausible mais fausse. Un enseignant et un tuteur lisent ce site.
 *
 * Pour compléter : remplir les chaînes vides ci-dessous, rien d'autre à toucher.
 */

export const pichenette = {
  name: "Pichenette Game",
  /** Cadre du projet. */
  origin: "BUT GEII",
  /** Ex. « En cours », « Terminé ». Vide = aucun badge affiché. */
  status: "",
  /** Une ligne, c'est la promesse du projet. */
  summary: "Une borne d'arcade de bureau qui mesure la force d'une pichenette.",
  intro:
    "Une borne d'arcade miniature, posée sur un coin de bureau. On envoie une pichenette, la machine mesure la force du coup et affiche un score. Derrière le jeu, il y a la chaîne de mesure classique du génie électrique : un capteur, un signal à conditionner, un calcul, un affichage.",
  /** Contexte pédagogique — factuel, vérifiable. */
  context: "Projet mené en BUT GEII, à l'IUT de Montpellier.",
  /** À renseigner : seul, en binôme, en groupe de N. */
  team: "",
} as const;

/**
 * La chaîne de mesure. Les quatre étapes sont la structure canonique de tout
 * système instrumenté — c'est le squelette, pas une affirmation sur le montage
 * de Youri. Le champ `composant` est ce qui, lui, est spécifique : tant qu'il
 * est vide, l'étape s'affiche en attente.
 */
export type Etape = {
  /** Le rôle de l'étage, toujours vrai. */
  stage: string;
  /** Ce que fait l'étage, en une phrase. */
  role: string;
  /** ⚠ À COMPLÉTER : le composant réellement utilisé. */
  composant: string;
};

export const chaine: Etape[] = [
  {
    stage: "Capter",
    role: "Transformer le choc de la pichenette en grandeur électrique.",
    composant: "",
  },
  {
    stage: "Conditionner",
    role: "Mettre le signal à l'échelle et le nettoyer avant de le lire.",
    composant: "",
  },
  {
    stage: "Traiter",
    role: "Convertir, calculer le score et décider quand le coup est terminé.",
    composant: "",
  },
  {
    stage: "Afficher",
    role: "Restituer le résultat au joueur, tout de suite.",
    composant: "",
  },
];

/** Fiche technique. `valeur` vide ⇒ ligne affichée en attente. */
export const specs: { label: string; valeur: string }[] = [
  { label: "Microcontrôleur", valeur: "" },
  { label: "Capteur de force", valeur: "" },
  { label: "Affichage", valeur: "" },
  { label: "Alimentation", valeur: "" },
  { label: "Carte électronique", valeur: "" },
  { label: "Structure mécanique", valeur: "" },
];

/** Ce que Youri a fait sur le projet. Vide ⇒ section masquée. */
export const faits: string[] = [];

/** Documents et sources. `href` vide ⇒ lien masqué. */
export const ressources: { label: string; href: string }[] = [
  { label: "Dossier technique", href: "" },
  { label: "Code source", href: "" },
  { label: "Fichiers de conception", href: "" },
];
