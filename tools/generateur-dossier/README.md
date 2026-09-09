# Atelier Dossier

Générateur de dossiers scolaires et professionnels : consignes → plan éditable →
rédaction section par section → export PDF A4 paginé.

`index.html` est un **fragment** destiné aux artifacts Claude : pas de `<!doctype>`,
pas de `<head>`, pas de `<body>` — l'hôte les fournit. Toute la logique tient dans
le seul `<script type="text/plain" id="app-src">`, compilé par Babel au chargement.

## Deux transports pour la génération

| Contexte | Transport | Clé API |
|---|---|---|
| Artifact publié sur claude.ai | capacité `sample` du runtime, en streaming | aucune |
| Déploiement autonome | `POST /api/claude` (fonction serverless) | `ANTHROPIC_API_KEY` côté serveur |

Le choix est automatique : l'app tente `claude.use("sample")`, et bascule sur
l'appel HTTP si la capacité n'est pas disponible. Sans clé, l'édition, la mise en
page et l'export PDF continuent de fonctionner ; seuls les boutons de génération
renvoient une erreur explicite.

## Déployer sur Vercel

```bash
node build-standalone.mjs      # écrit deploy/
cd deploy
npx vercel deploy --prod
```

Puis, dans le tableau de bord Vercel du projet, **Settings → Environment
Variables** :

- `ANTHROPIC_API_KEY` — obligatoire, une clé depuis console.anthropic.com
- `CLAUDE_MODEL` — optionnelle, `claude-sonnet-5` par défaut

Redéployer après avoir ajouté la clé (les variables ne sont lues qu'au démarrage
de la fonction).

## Développement

Aucune étape de build : ouvrir `deploy/index.html` dans un navigateur suffit.
Pour vérifier la syntaxe du JSX après modification :

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('index.html','utf8');\
fs.writeFileSync('/tmp/app.jsx',s.match(/id=\"app-src\">([\s\S]*?)\n<\/script>/)[1])"
bunx esbuild --loader=jsx --jsx-factory=React.createElement /tmp/app.jsx --outfile=/dev/null
```
