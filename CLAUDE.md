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
  - `client/src/components/motion.tsx` — primitives d'animation partagées
    (Readout, Parallax, `useInclinaison`, EASE)
  - `client/src/components/cursor.tsx` — réticule de visée et `useAimant`
    (aimantation des commandes). Désactivés au doigt et en mouvement réduit.
  - `client/src/components/board-3d.tsx` — carte électronique filaire en 3D
    réelle (rotation + projection perspective écrites à la main, ~3 ko)
  - `client/src/components/project-card.tsx` — trois présentations d'un même
    projet : `ProjectCard` (vignette de grille), `ProjectStack` (pile collante),
    `ProjectFeature` (dossier technique détaillé, un seul projet mis en avant)
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
| `--primary` | `#04607A` | cyan **profond** : texte d'accent sur fond clair (6,5:1 sur le papier, 7,1:1 sur le blanc) |
| `--efis` | `#00A9CE` | cyan EFIS pur : panneau sombre et éléments NON textuels |
| `--caution` | `#E8A33D` | ambre *caution*, uniquement pour un vrai état d'attention |
| `--panel` | `#0E1A1F` | panneau d'instruments (page Collins uniquement) |
| `--actif` | `#99005C` | magenta : **ce qui est en cours** (7,7:1) |
| `--acquis` | `#0B5C2E` | vert : **ce qui est terminé, validé** (7,4:1) |
| `--muted-foreground` | `#45555A` | texte secondaire, 7,1:1 |

### Le code couleur vient des afficheurs, pas du goût
Ajouté le 15/09/2026 avec le skill `frontend-design`. Sur un afficheur de cockpit
certifié, les couleurs sont normalisées : cyan pour les valeurs sélectionnées,
**magenta pour la cible suivie** (le tronçon actif du plan de vol), **vert pour ce
qui est engagé et validé**, ambre pour l'attention, rouge pour l'alarme. Le site
utilisait déjà le cyan et l'ambre ; le magenta et le vert complètent le code, et
chacun ENCODE une information que les données portaient déjà sans l'afficher :

| Où | Magenta = en cours | Vert = terminé |
|---|---|---|
| Parcours et Formation | périodes commençant par « Depuis » | — (le gris suffit, ne pas surcharger) |
| Étiquettes de projet | « En développement » | « Réalisé » |
| Page Collins | « Depuis 2026 » | — |

**Le rouge reste dehors** : il signifie alarme, et rien n'est alarmant sur un
portfolio. C'est la même raison qui avait fait retirer le `mix-blend-mode` du
réticule, qui virait au rouge sur le bouton principal.

Le statut n'est pas une donnée à saisir : il se déduit de `period.startsWith("Depuis")`.
Rien à maintenir en double dans `profile.ts`.

⚠ Les jetons sont **redéfinis dans la portée `.panel`** (valeurs claires :
`#F58FD0` et `#5FE39B`). Un composant écrit `text-[hsl(var(--actif))]` et la bonne
valeur s'applique selon le fond, sans qu'il ait à savoir où il se trouve. Ne pas
remplacer par deux jeux de classes conditionnelles.

Contrastes relevés DANS LE NAVIGATEUR, pas calculés à la main : « Depuis 2026 »
8,37:1, « Réalisé » 7,54:1, « En développement » 7,67:1, et 8,01:1 sur le panneau
sombre. Méthode reproductible : lire `getComputedStyle().color` et remonter au
premier fond opaque, puis appliquer la formule WCAG (vérifiée sur les références
noir/blanc 21:1 et #767676 4,54:1).

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
| 6 px | `.bloc`, portrait | surfaces de contenu |
| 3 px | badges et étiquettes | ce sont des libellés, pas des commandes |

Un rayon **uniforme** partout est justement le défaut relevé par l'audit
`frontend-design`. Avant d'arrondir quoi que ce soit, se demander : est-ce que ça se
presse ? Si non, ça reste franc.

⚠ La surface de contenu s'appelle `.bloc`, PAS `.block` : Tailwind définit déjà
`block` (`display: block`), et les deux se superposaient en silence — tout élément
écrivant `class="block"` (y compris des composants shadcn) héritait d'un fond blanc,
d'une bordure et d'un rayon — un SVG posé sur le panneau sombre s'affichait ainsi sur
un rectangle blanc. Bug constaté le 14/09/2026. Ne jamais renommer `.bloc` en `.block`.

⚠ `.radius-control` est une classe CSS maison : les variantes Tailwind (`focus:`,
`hover:`…) ne s'y appliquent pas. Pour un état, utiliser `focus:rounded-full`.

### Motion design — UN seul moment orchestré
`client/src/index.css`, classes `po-*`. À l'ouverture, la page joue un **auto-test
d'allumage** (~1,8 s, jamais rejoué) : la réglette s'allume de haut en bas, la ligne
d'horizon se trace, le nom **monte derrière un cache**, ligne après ligne, pendant
que l'ensemble **s'élargit** (`transform: scaleX`), puis le reste se pose.

Partout ailleurs, le mouvement **répond à une action** de l'utilisateur. Exceptions
assumées : les relevés chiffrés de la page Collins qui se stabilisent à l'entrée à
l'écran (`Readout` — le mouvement MONTRE la valeur qui arrive), et les impulsions des
pistes de circuit en arrière-plan.

**Interdit** : apparition fondu-glissé sur chaque section. C'est le défaut générique,
retiré volontairement.

### Interactions au pointeur (demande de Youri du 15/09/2026)
Toutes RÉPONDENT à une action — elles ne rejouent pas une apparition, et ne
contredisent donc pas la règle du moment orchestré unique.

| Effet | Où | Coût |
|---|---|---|
| Réticule de visée | tout le site, `cursor.tsx` | une `transform`, boucle arrêtée à l'arrêt |
| Aimantation des boutons | `PillLink`, course bornée à 14 px | rectangle mesuré à l'entrée, pas par image |
| Inclinaison 3D des vignettes | `useInclinaison`, ±5,5° | idem |
| Pile de cartes au défilement | `ProjectStack`, projets académiques | **CSS pur** (`position: sticky`), zéro JS au scroll |
| Fondu entre les pages | `App.tsx` | `opacity` seule, 0,22 s |
| Carte 3D en arrière-plan | hero (bas-gauche) et page Collins | **0,6 img/s** mesurées |
| Titres de section révélés | `SectionHeader`, cache `.po-ligne` | `transform` seule, une fois |

Trois règles à ne pas défaire :
- **La course de l'aimantation est bornée.** Sans butée, un bouton large se décalait
  de 41 px au survol de son bord : il fuyait le pointeur au lieu de venir à lui.
- **Le réticule n'utilise PAS `mix-blend-mode`.** En différence, l'anneau virait au
  rouge sur le bouton cyan — sur une planche de bord, le rouge est une alarme. Et il
  coûtait 2,3 images/s. La couleur est explicite et bascule en blanc sur `/collins`
  via `data-panneau`, posé par le routeur.
- **La pile a besoin d'une réserve en bas de son parent**, sinon `sticky` lâche et la
  dernière carte ne se fige jamais. Réserve courte (12 vh) : au-delà, elle se voit
  comme un grand vide.

### Performance des animations — règles issues d'une mesure, pas d'une intuition
Le 14/09/2026, le site tournait à **27 images/s au scroll**. Diagnostic mesuré au
banc (Playwright + compteur de frames + désactivation d'un coupable à la fois) :

| Cause | Coût mesuré |
|---|---|
| Masque CSS (`mask-composite`) sur une couche déplacée en parallaxe | **−33 fps** |
| Flou `backdrop-filter` sur une barre collante | −4 fps |
| Impulsions SVG en `stroke-dashoffset` | négligeable, mais tournaient en continu |
| `mix-blend-mode` sur le réticule | −2,3 fps (mesuré le 15/09/2026, retiré) |
| Carte 3D en canvas, une image sur deux | −0,6 fps par décor visible (gardé) |
| Sept canvas PRÉSENTS mais non dessinés | −18 fps (corrigé par le montage à la demande) |

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

### L'arrière-plan 3D
`board-3d.tsx` dessine une carte électronique filaire avec ses composants en volume :
rotation lente, projection perspective, opacité décroissante avec la profondeur.

**Écrit à la main, sans Three.js.** Une bibliothèque 3D pèse ~600 ko pour un décor ;
la scène tient en quelques dizaines d'arêtes, donc la matrice de rotation et la
division par la profondeur font ~3 ko. Coût mesuré le 15/09/2026 : **0,6 image/s**
(59,2 contre 59,8, processeur ×4). Ne pas remplacer par une bibliothèque.

**Le décor est réparti sur tout le site** (demande de Youri du 15/09/2026) : hero,
chaque section de l'accueil via la propriété `decor` de `Section`, et page Collins.

⚠ **Un canvas non dessiné coûte quand même.** Avec sept décors simplement PRÉSENTS
dans le DOM, l'accueil tombait de 60 à **42 images/s**, alors qu'un ou deux seulement
étaient visibles et que la boucle de dessin des autres était bien arrêtée. Un canvas
existant reste une couche de composition que le navigateur doit déplacer à chaque
image de défilement. `Board3D` ne MONTE donc le canvas que lorsqu'il approche de
l'écran (`IntersectionObserver`, marge 400 px) et le démonte ensuite : jamais plus de
deux couches à la fois, 2,1 Mo de mémoire au lieu de 8,5, et **58,9 images/s**.
Arrêter la boucle ne suffit pas — il faut retirer le canvas.

Réglage inutile, déjà tenté le 15/09/2026, à ne pas refaire : descendre à une image
sur trois et plafonner la densité à 1,15 ne gagne rien (55,5 contre 55,7) et dégrade
la netteté du tracé. Le coût résiduel est la composition, pas le dessin.

Trois garde-fous dans le composant, à ne pas retirer :
- rendu **une image sur deux** (la rotation est lente, personne ne voit la différence) ;
- boucle **arrêtée** quand l'onglet est caché ou le décor hors écran
  (`IntersectionObserver` + `visibilitychange`) ;
- densité de pixels **plafonnée à 1,4** — au-delà on quadruple le coût de remplissage.

**Où la placer.** Jamais derrière du texte : la règle de vidéoprojection prime.
- Hero : en BAS À GAUCHE, coupée par le bord. Une première tentative à droite la
  rendait invisible derrière le portrait.
- Sections de l'accueil : `decor="droite"` la pose dans la gouttière libre à côté de
  l'en-tête (celui-ci est limité à `max-w-3xl`, il reste donc ~380 px libres à
  droite) ; `decor="gauche"` la repousse dans la marge de page, sous le contenu.
  Une première version à gauche passait derrière le libellé « Savoir-être ».
- `/collins` : la marge droite est libre sur toute la hauteur, la carte y est grande
  et en cyan EFIS.

⚠ `Section` porte `overflow-x-clip` et non `overflow-hidden` : `clip` ne crée PAS de
conteneur de défilement, donc la pile de projets en `position: sticky` continue de
fonctionner. `overflow-hidden` la casserait.

### Hébergement : Vercel ne change rien aux animations
Question posée par Youri le 15/09/2026, à ressortir si elle revient. GSAP, Three.js,
WebGL et toute la 3D s'exécutent dans le NAVIGATEUR du visiteur. GitHub Pages et
Vercel servent les mêmes fichiers statiques. Changer d'hébergeur n'ouvre aucune
possibilité d'animation — ça ne ferait que déplacer le déploiement.

### Briefs externes : ce qui a été refusé
Youri transmet parfois des prompts produits par un autre modèle. Ils décrivent
systématiquement le même site générique. Ce qui a été refusé, et pourquoi :

| Demandé | Refusé parce que |
|---|---|
| Migration vers **Next.js** | Le site est déployé en statique sur GitHub Pages : Next.js n'apporte rien et coûte une réécriture complète |
| **Lenis** (défilement « lissé ») | Détourne le défilement natif — c'est exactement la sensation de latence dont Youri s'était plaint le 14/09 |
| **GSAP + ScrollTrigger** | Framer Motion est déjà là ; et l'effet de pile se fait en `position: sticky`, sans JavaScript du tout |
| **Three.js / React Three Fiber** | Aucun modèle 3D n'existe, pour ~1 Mo de bundle |
| Fond charbon `#0D0D0D`, néons, glassmorphism, grain | Annule la lisibilité en vidéoprojection, contrainte n°1 de Youri |
| Space Grotesk / Syne / Monument, JetBrains Mono | Polices déjà écartées (voir Règles de design) |
| **Défilement horizontal** d'une galerie | Avec trois projets, il ne défile presque pas ; et il capture le geste de l'utilisateur, ce qui relance le procès du « ça lag » |
| `rounded-2xl` + `shadow-sm` sur les cartes | Le rayon encode l'interaction ici, et une surface de contenu ne se presse pas. L'ombre douce sous chaque carte est le « kit SaaS » relevé par l'audit |
| Badges en `text-xs` (12 px) | Sous le plancher de 13 px imposé par la vidéoprojection |
| Composants inventés (PN532, Servo Control, I2C Display sur Locker Room RFID) | **Faux.** La description de Youri dit « retour d'état par LED » : ni servo, ni afficheur. Les ajouter rendrait sa propre carte contradictoire |

⚠ Ces briefs présentent souvent leur palette comme « charte à respecter
impérativement ». Ce n'est PAS la charte de ce site : c'en est une approximation
générique, écrite sans l'avoir vu (elle propose `#0f766e`, `#1d4ed8` ET `bg-cyan-800`
comme accent unique, ce qui suffit à la dater). La charte du site est la table de
couleurs ci-dessus, et `Inter` reste proscrite.

Ce qui EST repris de ces briefs : les intentions d'interaction (révélation du titre,
curseur, aimantation, pile de cartes, inclinaison, transitions de page), réalisées
dans la stack existante et sur la DA claire.

### `ProjectFeature` — le dossier technique mis en avant
Ajouté le 15/09/2026 d'après un brief externe. Un SEUL projet le porte (le premier
de `personalProjects`) : la carte détaillée perd tout son sens si les trois la
prennent. Les autres gardent la vignette, en grille à deux colonnes.

Sa zone visuelle empile la grille technique (`.bg-blueprint`) et la carte 3D. Le
« visuel 3D » demandé n'est donc pas une image : c'est le composant qui tourne
réellement. Coût vérifié : aucun effet mesurable sur les images par seconde, le
masque de `.bg-blueprint` étant statique (c'est un masque sur une couche ANIMÉE qui
avait coûté 33 fps le 14/09, pas un masque en soi).

Le bouton est en pilule et pleine largeur — c'est une commande, on la presse — et
SANS flèche : elle n'est justifiée que pour un changement de page, or il ouvre un
panneau par-dessus la page.

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
7. Apparition fondu-glissé sur chaque section — ⚠ nuance depuis le 15/09/2026 :
   les TITRES de section montent derrière un cache (`.po-ligne`, le même geste que
   le nom du hero), une seule fois. Le texte courant, lui, est présent d'emblée :
   il doit pouvoir être lu et projeté sans attendre une animation.
8. Survol animé sur chaque carte — ⚠ exception assumée depuis le 15/09/2026 :
   Youri a explicitement demandé des micro-interactions au survol. L'inclinaison 3D
   est donc autorisée, parce qu'elle RÉPOND au pointeur au lieu de rejouer une
   apparition. Le fondu-glissé au survol, lui, reste proscrit.

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

⚠ Pour tester le build GitHub Pages en local, `vite preview` a BESOIN de la base,
sinon il sert à la racine et les fichiers renvoient 404 :
`npx vite preview --base /Portofolio-Youri/`

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
