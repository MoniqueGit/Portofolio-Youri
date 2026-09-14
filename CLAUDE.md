# CLAUDE.md — Instructions projet Portfolio Youri Figuié

## Identité (NE JAMAIS MODIFIER)
- **Nom** : Youri Figuié
- **Email** : youri.figuie@etu.umontpellier.fr
- **Tél** : 06 47 20 91 58
- **LinkedIn** : linkedin.com/in/youri-fg/
- **GitHub** : github.com/MoniqueGit/Portofolio-Youri
- **Lieu** : Prades-Le-Lez (34730) · travaille à Blagnac (31)
- **Âge** : 19 ans · Permis B

## Formation
- **BUT GEII** — IUT Montpellier — 2025/Présent
- **Bac Général** Maths & NSI — Lycée Jean Jaurès — Mention Assez Bien — 2022/2025
- **En alternance chez Collins Aerospace depuis 2026** (le site n'est plus une
  candidature mais une vitrine : décision de Youri du 14/09/2026)

## Expériences réelles
1. **Technicien de maintenance électronique — Collins Aerospace, site de Blagnac —
   depuis 2026** (poste actuel). Équipe et **missions détaillées** restent à
   renseigner par Youri dans `client/src/content/collins.ts`. Ne rien inventer :
   un tuteur d'alternance lit cette page.
2. Réserviste Opérationnel — Armée de Terre, 3e RPIMa, Carcassonne — 2025/Présent
3. Figurant — France Télévisions, "Karma - Trop jeunes pour se taire" — 2025-2026
4. Hôte de caisse polyvalent — Log'in Solutions, Prades-Le-Lez — 2024

## Projets académiques réels (exactement ces 3, pas d'autres)
1. Dé électronique — conception circuit, intégration composants, tests et correction de bugs
2. Soudure carte STM32 — assemblage, contrôle connexions, validation C (STMicroelectronics)
3. Robot suiveur de ligne analogique — capteurs, réglages électroniques, tests prototype

## Compétences réelles (NE PAS INVENTER d'autres)
- Langages : C/C++, Python, HTML
- Embarqué : STM32, électronique, soudure PCB
- Outils : n8n (automation), Git
- Savoir-être : rigueur, travail en équipe
- Anglais B2 technique

---

## Stack technique
- React 19 + TypeScript + Vite + Tailwind CSS 4
- Framer Motion, React Hook Form + Zod, Wouter, Lucide React
- Fichiers clés :
  - `client/src/content/profile.ts` — **tout le contenu du site** (textes, expériences,
    projets, compétences). Source unique de vérité : pour corriger un texte, c'est ici.
  - `client/src/content/collins.ts` — faits sur Collins Aerospace (chiffres sourcés
    et datés) + la mission de Youri, À COMPLÉTER par lui
  - `client/src/pages/home.tsx` — assemblage des sections (mise en forme uniquement)
  - `client/src/pages/collins.tsx` — page dédiée `/collins`, seul panneau sombre
  - `client/src/components/layout.tsx` — header / menu mobile / footer
  - `client/src/components/motion.tsx` — primitives d'animation partagées (Reveal, Parallax, EASE)
  - `client/src/index.css` — tokens de couleur, échelle typographique, utilitaires
  - `client/index.html` — métadonnées SEO, import Google Fonts

## Design — DA « planche de bord »
> Troisième direction du site. La DA claire précédente (Inter, bleu #0761d6, cartes
> arrondies façon Apple) a été remplacée le 14/09/2026 à la demande de Youri, après
> son entrée chez Collins Aerospace. Méthode suivie : le skill `frontend-design`.

**Principe fondateur** : le vocabulaire visuel vient du métier — afficheurs avioniques
certifiés et dessin technique — pas d'un goût générique. C'est ce qui empêche le site
d'être interchangeable avec celui de n'importe quel étudiant.

### Couleurs
| Jeton | Valeur | Emploi |
|---|---|---|
| `--background` | `#F3F5F6` | papier calque froid, lisible en vidéoprojection |
| `--foreground` | `#10171A` | texte |
| `--primary` | `#04607A` | cyan **profond** : texte d'accent sur fond clair (7,2:1) |
| `--efis` | `#00A9CE` | cyan EFIS pur : panneau sombre et éléments NON textuels |
| `--caution` | `#E8A33D` | ambre *caution*, uniquement pour un vrai état d'attention |
| `--panel` | `#0E1A1F` | panneau d'instruments (page Collins uniquement) |
| `--muted-foreground` | `#45555A` | texte secondaire, 8:1 |

**Règle de contraste** : le cyan EFIS n'a que 2,9:1 sur fond clair. Il ne sert JAMAIS
de couleur de texte sur le papier — filets, graduations et puces seulement.

### Typographie
**Archivo**, une seule famille variable à deux axes. C'est la **chasse** (`wdth` 62–125)
qui porte le registre, là où on mettrait d'ordinaire une seconde police :
- `.type-display` / `.type-title` : chasse 108–112 %, élargie, pour la présence
- corps de texte : chasse 100 %, graisse 440, 17 px
- `.type-data` / `.type-readout` : chasse 84–88 %, chiffres tabulaires, pour les relevés

### Mise en page
Fond clair partout **sauf** `/collins`, seul panneau sombre du site. Pas d'ombre qui
enfle : la hiérarchie se lit au filet et à l'espace. Chaque section porte un filet
supérieur avec une graduation cyan à gauche, comme une cote en marge de plan.

### Le rayon encode l'interaction (demande de Youri du 14/09/2026)
Sur un panneau d'instruments, ce qu'on **presse** est arrondi — boutons-poussoirs,
molettes, voyants — et ce qui **structure** reste franc. Le site suit la même règle,
donc le rayon n'est jamais décoratif :

| Rayon | Classe | Quoi |
|---|---|---|
| plein (pilule) | `.radius-control` | tout ce qui se presse : CTA, bouton d'envoi, bouton CV, hamburger, voyant de confirmation |
| 8 px | `.radius-field` | champs de saisie — on les remplit, on ne les presse pas |
| 6 px | `.block`, portrait | surfaces de contenu |
| 3 px | badges et étiquettes | ce sont des libellés, pas des commandes |

Un rayon **uniforme** partout est justement le défaut relevé par l'audit
`frontend-design`. Avant d'arrondir quoi que ce soit, se demander : est-ce que ça se
presse ? Si non, ça reste franc.

⚠ `.radius-control` est une classe CSS maison : les variantes Tailwind (`focus:`,
`hover:`…) ne s'y appliquent pas. Pour un état, utiliser `focus:rounded-full`.

### Motion design — UN seul moment orchestré
`client/src/index.css`, classes `po-*`. À l'ouverture, la page joue un **auto-test
d'allumage** (~1,8 s, jamais rejoué) : la réglette s'allume de haut en bas, la ligne
d'horizon se trace, le nom **s'élargit** de 62 % à 112 % de chasse pendant qu'il
apparaît (effet permis par l'axe variable — sans la police, il ne reste qu'un fondu),
puis le reste se pose.

Partout ailleurs, le mouvement **répond à une action** de l'utilisateur. Exceptions
assumées : les relevés chiffrés de la page Collins qui se stabilisent à l'entrée à
l'écran (`Readout` — le mouvement MONTRE la valeur qui arrive), et les impulsions des
pistes de circuit en arrière-plan.

**Interdit** : apparition fondu-glissé sur chaque section, survol animé sur chaque
carte. C'est le défaut générique, retiré volontairement.

### Performance des animations — règles issues d'une mesure, pas d'une intuition
Le 14/09/2026, le site tournait à **27 images/s au scroll**. Diagnostic mesuré au
banc (Playwright + compteur de frames + désactivation d'un coupable à la fois) :

| Cause | Coût mesuré |
|---|---|
| Masque CSS (`mask-composite`) sur une couche déplacée en parallaxe | **−33 fps** |
| Flou `backdrop-filter` sur une barre collante | −4 fps |
| Impulsions SVG en `stroke-dashoffset` | négligeable, mais tournaient en continu |

**La règle, non négociable** : seules `transform` et `opacity` s'animent sur le
compositeur. Tout le reste — `font-stretch`, `letter-spacing`, `clip-path`,
`width`, `stroke-dashoffset`, `mask-*` — passe par le fil principal et fait tomber
les images. ([web.dev](https://web.dev/articles/animations-guide))

Conséquences appliquées, à ne pas défaire :
- **Aucun masque CSS sur une couche animée.** Les pistes d'arrière-plan évitent le
  texte par leur GÉOMÉTRIE (elles ne sont dessinées que dans le bandeau haut, la
  colonne de droite et le bandeau bas). La géométrie est calculée une fois ; un
  masque est recomposé à chaque image.
- L'entrée du titre utilise `transform: scaleX()`, pas `font-stretch`.
- La réglette utilise `transform: scaleY()`, pas `clip-path`.
- Les compteurs écrivent dans le DOM par `ref`, jamais par `setState` par image.
- La parallaxe est une interpolation directe, sans `useSpring` (un ressort
  entretient une boucle même à l'arrêt).
- Les barres collantes ont un fond quasi opaque et un flou de 3 px maximum.
- Les arrière-plans décoratifs sont masqués sous 1024 px.

**Avant de pousser une animation** : mesurer. Le script de banc est reproductible —
compter les images rendues pendant un scroll scripté, avec `Emulation.setCPUThrottlingRate`
à 4. Cible : 60 fps sur les deux pages, en mobile comme en bureau.

### Lisibilité en vidéoprojection (contrainte explicite de Youri)
- Corps de texte 17 px, graisse 440, interlignage 1,6.
- Textes secondaires 15 px minimum, badges 13 px minimum. Rien sous 13 px.
- Toute nouvelle couleur de texte doit tenir au moins 7:1 sur le fond clair.
- Le motif d'arrière-plan est masqué dans la bande occupée par le texte
  (`.backdrop-fade`). Un fond animé ne passe jamais derrière un titre.

### Tics à ne pas réintroduire (audit via `frontend-design`)
1. Étiquette en CAPITALES espacées au-dessus d'un titre de section.
2. Marqueurs 01/02/03 sur du contenu qui n'est pas une séquence. (La chronologie
   de la page Collins en est une : là, c'est légitime.)
3. Méta-infos jointes par des points médians `A · B · C`.
4. Libellés `MOT — fragment` au tiret cadratin. Les plages de dates s'écrivent
   `2026–2028` (demi-cadratin serré) ou « Depuis 2026 ».
5. `→` accolé au texte d'un bouton. Une flèche reste justifiée quand elle porte
   une information : lien externe, changement de page, retour.
6. Cartes toutes identiques, même rayon, même ombre.
7. Apparition fondu-glissé sur chaque section.
8. Survol animé sur chaque carte.

### Règles de design
- Une seule couleur d'accent, déclinée clair/sombre selon le fond.
- Toute nouvelle animation réutilise `EASE` et les composants de `motion.tsx`.
- Ne pas réintroduire le vert tactique, Space Grotesk, JetBrains Mono, Inter,
  ni les libellés monospace.

---

## Git
- Remote GitHub : `github` → https://github.com/MoniqueGit/Portofolio-Youri.git
- Branche principale : `main`
- Push : `git push github main`

## Logo Collins Aerospace
- Déposer le fichier dans `client/public/collins/` (PNG ou SVG, fond transparent,
  version claire puisqu'il est posé sur le panneau sombre).
- Le renseigner dans `client/src/content/collins.ts` : `logo: "collins.svg"`.
- Sans logo, la page affiche proprement le nom en typographie : rien n'est cassé.

## Routage GitHub Pages
Le site a deux routes (`/` et `/collins`). GitHub Pages ne sert pas les routes
profondes : `client/public/404.html` les réécrit en `?p=chemin`, et un script en
tête de `client/index.html` les restaure avant le démarrage de l'application.
**Les deux vont ensemble** — modifier l'un sans l'autre casse les liens directs.
Les liens internes passent par `<Link>` de wouter, jamais par `<a href="/...">` :
le site est servi sous `/Portofolio-Youri/`.

## Photos de projet
- Déposer les images dans `client/public/projets/` (JPG ou WebP, format paysage ~16/10,
  largeur 1200–1600 px, < 300 Ko).
- Les référencer dans `client/src/content/profile.ts` sur le projet concerné :
  `cover: "carte-stm32.jpg"` pour la vignette, `gallery: ["...", "..."]` pour le dossier.
- Sans `cover`, la carte affiche proprement son icône de repli : rien n'est cassé,
  le dossier indique simplement « Photos du projet à venir ».

## Skills installés
De https://github.com/anthropics/skills (Apache 2.0), copiés dans `.claude/skills/` :
- **`frontend-design`** — direction artistique, typographie, et surtout la liste des
  tics visuels qui trahissent une page générée. À relire avant toute évolution de la DA.
- **`webapp-testing`** — outillage Playwright pour piloter le site en local
  (captures, console, découverte d'éléments). `scripts/with_server.py` lance
  `npm run dev:client` et attend que le port réponde avant de jouer le script.

De https://github.com/vercel-labs/skills (MIT), installé par `npx skills add` :
- **`find-skills`** — recherche et installation de skills via `npx skills`.
  Posé dans `.agents/skills/` avec un lien symbolique depuis `.claude/skills/`,
  et tracé dans `skills-lock.json` (source + empreinte SHA-256).
  **Limite dans cet environnement** : `skills.sh` est bloqué par le proxy réseau,
  donc `npx skills find` ne renvoie jamais rien — et il annonce « No skills found »
  au lieu de signaler l'échec réseau. `npx skills add <url github>` fonctionne,
  lui, puisqu'il passe par GitHub.

### Avant d'installer un skill
Un skill, ce sont des instructions que l'agent suivra, avec ses permissions.
Les lire avant installation : chercher les appels réseau sortants, `eval`/`exec`,
et les scripts fournis. Préférer l'installation dans le projet (versionnée) plutôt
qu'en global : le conteneur distant est éphémère, un `-g` disparaît avec lui.

## Dev
- Lancer le frontend : `npm run dev:client` → http://localhost:5000
- `npm run dev` ne fonctionne pas sur Windows (syntaxe NODE_ENV Unix)

---

## Règles absolues
- Ne JAMAIS inventer des expériences, compétences ou projets qui ne sont pas dans ce fichier
- Ne JAMAIS changer les couleurs ou polices sans accord explicite (la DA claire ci-dessus
  a fait l'objet d'un accord explicite le 14/09/2026)
- Ne JAMAIS remettre "Alexandre Durand", "AD.Systems", "IUT Ville d'Avray", "TECH-DEFENSE SOLUTIONS", "AERO-LAB INNOVATION", "VHDL", "FPGA", "ROS", "OpenCV"
- Toujours vérifier la cohérence avec le CV PDF avant d'ajouter du contenu
- Le site liste 3 expériences (Réserviste, Figurant, Hôte de caisse Log'in Solutions) alors
  que la section « Expériences réelles » ci-dessus n'en cite que 2 : Log'in Solutions était
  déjà en ligne, elle a été conservée. À trancher avec Youri.
