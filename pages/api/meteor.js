
export default function handler(req, res) {
  const events = Array.from({ length: 5 }, (_, i) => ({
    id: `meteor-${i}`,
    brightness: Math.random() * 100,
    speed: Math.random() * 30000,
  }));
  res.status(200).json({ events });
}
