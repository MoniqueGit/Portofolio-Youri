import { PencilRuler, ScanSearch, Wrench, PackageCheck, type LucideIcon } from "lucide-react";

/**
 * Référentiel de compétences du BUT GEII — parcours ESE.
 *
 * ⚠ CE FICHIER N'EST PAS À RÉÉCRIRE À LA MAIN. Il a été généré par extraction
 * du PDF officiel fourni par Youri le 28/09/2026 (« BUT GEII — Référentiel de
 * compétences »), pages 2 à 5, qui sont celles du parcours « Électronique et
 * systèmes embarqués ». Les trois autres blocs du PDF décrivent les parcours
 * EME et AII : ils ne s'appliquent pas.
 *
 * Les libellés sont repris MOT POUR MOT. Ne pas les reformuler : c'est un
 * document de référence que des enseignants connaissent par cœur.
 *
 * ⚠ Anomalie du PDF source, laissée telle quelle : le code AC33.03 y apparaît
 * DEUX FOIS (« Produire une procédure de maintenance » et « Proposer un appui
 * technique… »). Le second est vraisemblablement AC33.04. À faire confirmer
 * par l'IUT avant de corriger — ce n'est pas à nous de renuméroter.
 */

export type ApprentissageCritique = {
  code: string;
  libelle: string;
};

export type Competence = {
  /** Identifiant stable, utilisé pour les ancres et les liens depuis un projet. */
  cle: string;
  /** Le verbe, tel qu'il structure le référentiel. */
  nom: string;
  /** L'intitulé complet de la compétence. */
  intitule: string;
  icone: LucideIcon;
  /** Apprentissages critiques, par année de BUT. */
  annees: { annee: 1 | 2 | 3; acs: ApprentissageCritique[] }[];
};

export const parcours = "Électronique et systèmes embarqués";
export const diplome = "BUT Génie Électrique et Informatique Industrielle";

export const referentiel: Competence[] = [
  {
    cle: "concevoir",
    nom: "Concevoir",
    intitule: "Concevoir la partie GEII d’un système",
    icone: PencilRuler,
    annees: [
      {
        annee: 1,
        acs: [
          { code: "AC11.01", libelle: "Produire une analyse fonctionnelle d’un système simple" },
          { code: "AC11.02", libelle: "Réaliser un prototype pour des solutions techniques matériel et/ou logiciel" },
          { code: "AC11.03", libelle: "Rédiger un dossier de fabrication à partir d'un dossier de conception" },
        ],
      },
      {
        annee: 2,
        acs: [
          { code: "AC21.01", libelle: "Proposer des solutions techniques liées à l'analyse fonctionnelle" },
          { code: "AC21.02", libelle: "Dérisquer les solutions techniques retenues" },
        ],
      },
      {
        annee: 3,
        acs: [
          { code: "AC31.01", libelle: "Contribuer à la rédaction d'un cahier des charges" },
          { code: "AC31.02", libelle: "Prouver la pertinence de ses choix technologiques" },
          { code: "AC31.03", libelle: "Rédiger un dossier de conception" },
        ],
      },
    ],
  },
  {
    cle: "verifier",
    nom: "Vérifier",
    intitule: "Vérifier la partie GEII d’un système",
    icone: ScanSearch,
    annees: [
      {
        annee: 1,
        acs: [
          { code: "AC12.01", libelle: "Appliquer une procédure d’essais" },
          { code: "AC12.02", libelle: "Identifier un dysfonctionnement" },
          { code: "AC12.03", libelle: "Décrire un dysfonctionnement" },
        ],
      },
      {
        annee: 2,
        acs: [
          { code: "AC22.01", libelle: "Identifier les tests et mesures à mettre en place pour valider le fonctionnement d’un système" },
          { code: "AC22.02", libelle: "Certifier le fonctionnement d’un nouvel équipement industriel" },
        ],
      },
      {
        annee: 3,
        acs: [
          { code: "AC32.01", libelle: "Evaluer la cause racine d’un dysfonctionnement" },
          { code: "AC32.02", libelle: "Proposer une solution corrective à un dysfonctionnement" },
          { code: "AC32.03", libelle: "Produire une procédure d’essais pour valider la conformité d’un système" },
        ],
      },
    ],
  },
  {
    cle: "mco",
    nom: "Assurer le MCO",
    intitule: "Assurer le maintien en condition opérationnelle d’un système",
    icone: Wrench,
    annees: [
      {
        annee: 2,
        acs: [
          { code: "AC23.01", libelle: "Exécuter l’entretien et le contrôle d’un système en respectant une procédure" },
          { code: "AC23.02", libelle: "Exécuter une opération de maintenance (corrective, préventive, améliorative)" },
          { code: "AC23.03", libelle: "Diagnostiquer un dysfonctionnement dans un système" },
          { code: "AC23.04", libelle: "Identifier la cause racine du dysfonctionnement" },
        ],
      },
      {
        annee: 3,
        acs: [
          { code: "AC33.01", libelle: "Proposer une solution de maintenance" },
          { code: "AC33.02", libelle: "Évaluer les coûts d’indisponibilité et de maintenance d’un système" },
          { code: "AC33.03", libelle: "Produire une procédure de maintenance" },
          { code: "AC33.03", libelle: "Proposer un appui technique aux différents acteurs à l'échelle nationale et internationale" },
        ],
      },
    ],
  },
  {
    cle: "implanter",
    nom: "Implanter",
    intitule: "Implanter un système matériel ou logiciel",
    icone: PackageCheck,
    annees: [
      {
        annee: 2,
        acs: [
          { code: "AC24.01", libelle: "Appliquer une procédure de fabrication pour implanter les composants matériels et/ou logiciels dans un système" },
          { code: "AC24.02", libelle: "Évaluer la conformité du système" },
        ],
      },
      {
        annee: 3,
        acs: [
          { code: "AC34.01", libelle: "Produire une procédure d’installation et de mise en service d’un système" },
          { code: "AC34.02", libelle: "Exécuter la mise en service d’un système en respectant la procédure" },
          { code: "AC34.03", libelle: "Produire le dossier de conformité du système en gérant le versionnage" },
        ],
      },
    ],
  },
]

/** Retrouve un apprentissage critique par son code, pour l'afficher sur un projet. */
export const acParCode = new Map(
  referentiel.flatMap((c) =>
    c.annees.flatMap((a) => a.acs.map((ac) => [ac.code, { ...ac, competence: c }] as const)),
  ),
);
