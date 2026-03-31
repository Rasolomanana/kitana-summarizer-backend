export default async function handler(req, res) {
  // 🔥 Autoriser les requêtes venant de ton extension Chrome
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Répondre immédiatement aux requêtes OPTIONS (pré‑vol CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL manquante" });
    }

    // 🧪 Résumé fictif pour tester la chaîne complète
    const fakeSummary = `Résumé fictif de la page : ${url}`;

    return res.status(200).json({ summary: fakeSummary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
