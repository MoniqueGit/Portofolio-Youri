# CLAUDE.md — Instructions projet Portfolio Youri Figuié

## Identité (NE JAMAIS MODIFIER)
- **Nom** : Youri Figuié
- **Email** : youri.figuie@etu.umontpellier.fr
- **Tél** : 06 47 20 91 58
- **LinkedIn** : linkedin.com/in/youri-fg/
- **GitHub** : github.com/MoniqueGit/Portofolio-Youri
- **Lieu** : Prades-Le-Lez (34730)
- **Âge** : 19 ans · Permis B

## Formation
- **BUT GEII** — IUT Montpellier — 2025/Présent
- **Bac Général** Maths & NSI — Lycée Jean Jaurès — Mention Assez Bien — 2022/2025
- Recherche **alternance 2026–2028** — Défense / Systèmes embarqués / Robotique

## Expériences réelles (exactement ces 2, pas d'autres)
1. Réserviste Opérationnel — Armée de Terre, 3e RPIMa, Carcassonne — 2025/Présent
2. Figurant — France Télévisions, "Karma - Trop jeunes pour se taire" — 2025-2026

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
  - `client/src/pages/home.tsx` — assemblage des sections (mise en forme uniquement)
  - `client/src/components/layout.tsx` — header / menu mobile / footer
  - `client/src/components/motion.tsx` — primitives d'animation partagées (Reveal, Parallax, EASE)
  - `client/src/index.css` — tokens de couleur, échelle typographique, utilitaires
  - `client/index.html` — métadonnées SEO, import Google Fonts

## Design — DA « claire » (refonte validée par Youri)
> L'ancienne DA militaire sombre (fond `hsl(142,24%,8%)`, Space Grotesk, JetBrains Mono,
> scanline, libellés monospace type HUD) a été **remplacée** à la demande de Youri :
> fond clair et lisible en projection pour les enseignants, animations façon Apple.

- **Police unique** : `Inter` (axe optique `opsz` 14..32 — équivalent SF Pro Text / Display).
  Pas de police display ni monospace séparée.
- **Fonds** : `--background` `hsl(240 20% 99%)` (#fbfbfd) · surfaces `#ffffff` · bandeaux `hsl(240 12% 96%)`
- **Texte** : `--foreground` `hsl(240 6% 10%)` · secondaire `hsl(240 4% 42%)` (contraste AA)
- **Accent unique** : bleu `hsl(214 95% 43%)` (#0761d6) — liens, CTA, onglet actif
- **Bandeau sombre** de contraste : `--ink` `hsl(240 8% 9%)` (section « Pourquoi me choisir »)
- **Formes** : pilules pour les boutons, cartes `rounded-[1.25rem]`, ombres très douces, aucune lueur
- **Animations** : une seule courbe `EASE = cubic-bezier(0.16, 1, 0.3, 1)`.
  Apparitions au scroll courtes (24 px + léger flou), parallaxe faible, hero qui recule au scroll.
  Tout est désactivé sous `prefers-reduced-motion`.

### Règles de design
- Une seule couleur d'accent. Pas de dégradé voyant, pas de lueur, pas d'icône qui flotte en boucle.
- Toute nouvelle animation réutilise `EASE` et les composants de `motion.tsx`.
- Ne pas réintroduire le vert tactique, Space Grotesk, JetBrains Mono ni les libellés monospace.

---

## Git
- Remote GitHub : `github` → https://github.com/MoniqueGit/Portofolio-Youri.git
- Branche principale : `main`
- Push : `git push github main`

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
