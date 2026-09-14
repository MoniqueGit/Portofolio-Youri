/**
 * Faits sur Collins Aerospace.
 *
 * RÈGLE : tout chiffre présent ici doit être vérifiable et daté. Les données
 * financières et d'effectif viennent des résultats annuels 2025 publiés par
 * RTX en janvier 2026. Ne jamais compléter « au jugé » — un chiffre faux sur
 * le portfolio d'un alternant se voit immédiatement chez son employeur.
 */

export const collins = {
  name: "Collins Aerospace",
  parent: "RTX",
  /** Logo à déposer dans client/public/collins/. Absent = repli typographique. */
  logo: undefined as string | undefined,
  site: "https://www.collinsaerospace.com",

  /** Phrase d'ouverture de la page. */
  intro:
    "Collins Aerospace est l'un des plus gros équipementiers aéronautiques et de défense au monde. Avionique, intérieurs de cabine, systèmes électriques et systèmes de mission : une bonne partie de ce qui équipe un avion moderne sort de chez eux.",

  /** Relevés chiffrés du panneau. Chaque valeur porte sa date. */
  figures: [
    {
      value: 30.2,
      unit: "Md$",
      decimals: 1,
      label: "Ventes nettes 2025",
      note: "en hausse de 7 % sur 2024",
    },
    {
      value: 80000,
      unit: "",
      decimals: 0,
      label: "Salariés dans le monde",
      note: "sur six continents",
    },
    {
      value: 16.3,
      unit: "%",
      decimals: 1,
      label: "Marge opérationnelle 2025",
      note: "4,9 Md$ de résultat opérationnel",
    },
  ],

  source: {
    label: "Résultats annuels 2025 de RTX, publiés le 27 janvier 2026",
    href: "https://www.rtx.com/news/news-center/2026/01/27/rtx-reports-2025-results-and-announces-2026-outlook-",
  },

  /** Repères d'histoire. Ici les marqueurs numérotés sont légitimes : c'est
      bien une séquence chronologique. */
  timeline: [
    {
      year: "2018",
      text: "Naissance de Collins Aerospace, par fusion de Rockwell Collins et d'UTC Aerospace Systems.",
    },
    {
      year: "2020",
      text: "United Technologies fusionne avec Raytheon. Collins devient une filiale du nouveau groupe, aujourd'hui RTX.",
    },
    {
      year: "2025",
      text: "30,2 Md$ de ventes nettes, en croissance de 7 %, portées par l'après-vente commercial et la défense.",
    },
  ],

  /** Domaines d'activité. Description générale, sans chiffre par domaine. */
  domains: [
    {
      title: "Avionique",
      text: "Afficheurs de cockpit, calculateurs de vol, systèmes de navigation et de communication.",
    },
    {
      title: "Intérieurs de cabine",
      text: "Sièges, galleys, systèmes de divertissement et équipements de sécurité passagers.",
    },
    {
      title: "Systèmes électriques et commandes",
      text: "Génération et distribution de puissance, actionneurs, commandes de vol.",
    },
    {
      title: "Systèmes de mission",
      text: "Équipements de défense, communication tactique et systèmes pour le spatial.",
    },
  ],

  /** Le groupe, pour situer l'échelle. */
  parentFacts: {
    text: "Collins est l'une des trois branches de RTX, aux côtés de Pratt & Whitney et de Raytheon.",
    employees: "plus de 185 000 salariés",
    sales: "88,6 Md$ de ventes en 2025",
  },
};

/**
 * Ce que Youri fait chez Collins.
 *
 * Poste et site renseignés par Youri le 14/09/2026.
 * ⚠ `missions` et `takeaways` restent À COMPLÉTER PAR LUI. Je n'invente pas des
 * missions : un tuteur d'alternance lit ce genre de page. Tant que la liste est
 * vide, la page affiche le poste et s'arrête là, sans contenu fabriqué.
 */
export const alternance = {
  role: "Technicien de maintenance électronique",
  start: "2026",
  location: "Blagnac",
  /** Ex. : "Bureau d'études avionique". Laisser vide si non renseigné. */
  team: "",
  /** Trois à cinq missions concrètes, à la première personne. */
  missions: [] as string[],
  /** Ce que l'alternance apporte à la formation. À compléter aussi. */
  takeaways: [] as string[],
};
