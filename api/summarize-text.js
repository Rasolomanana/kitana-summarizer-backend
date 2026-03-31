export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texte manquant" });
  }

  // Résumé simple : on prend les 300 premiers caractères
  const summary = text.substring(0, 300) + "...";

  return res.status(200).json({ summary });
}
