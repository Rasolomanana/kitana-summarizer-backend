export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//test
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

    // 1. Télécharger la page (fetch natif Vercel)
    const response = await fetch(url);
    const html = await response.text();

    // 2. Extraire le texte
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // 3. Résumé simple
    const sentences = text.split(". ");
    const summary = sentences.slice(0, 3).join(". ") + ".";

    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
