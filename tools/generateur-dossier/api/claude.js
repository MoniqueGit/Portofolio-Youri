// Relais minimal vers l'API Anthropic pour le déploiement autonome de l'atelier.
// La clé ne quitte jamais le serveur : le navigateur ne voit que ce point d'entrée.
// Variables d'environnement : ANTHROPIC_API_KEY (obligatoire), CLAUDE_MODEL (optionnelle).

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée : utilisez POST." });
    return;
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(503).json({
      error: "Aucune clé API n'est configurée sur ce déploiement. " +
             "Ajoutez ANTHROPIC_API_KEY dans les variables d'environnement du projet Vercel, puis redéployez.",
    });
    return;
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const messages = body && Array.isArray(body.messages) ? body.messages : null;
  if (!messages || !messages.length) {
    res.status(400).json({ error: "Requête invalide : « messages » est absent ou vide." });
    return;
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: Math.min(Number(body.max_tokens) || 4000, 8000),
        messages,
      }),
    });
    const j = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: (j && j.error && j.error.message) || "L'API Anthropic a refusé la requête." });
      return;
    }
    const text = (j.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    res.status(200).json({ text, truncated: j.stop_reason === "max_tokens" });
  } catch (e) {
    res.status(502).json({ error: "Appel à l'API Anthropic impossible : " + (e && e.message ? e.message : "erreur réseau") });
  }
};

function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }
