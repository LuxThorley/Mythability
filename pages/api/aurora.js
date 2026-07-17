
export default function handler(req, res) {
  const intensity = Math.random(); // Simulate aurora fluctuation
  res.status(200).json({ intensity });
}
