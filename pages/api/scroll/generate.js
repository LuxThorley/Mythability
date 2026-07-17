export default function handler(req, res) {
  const { name, ability } = req.body;
  const scroll = `Sovereign Scroll of ${name}\n\nYou are activated with:\n✨ ${ability} ✨\n\nThis is sealed by Malcolm AI.`;
  res.status(200).json({ scroll });
}
