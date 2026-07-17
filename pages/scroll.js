import { useState } from 'react';

export default function Scroll() {
  const [name, setName] = useState('');
  const [ability, setAbility] = useState('Teleportation');

  const handleCheckout = async () => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ability })
    });
    const data = await res.json();
    window.location = data.url;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Activate Your Superability</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Your Name" /><br />
      <select value={ability} onChange={e => setAbility(e.target.value)}>
        <option>Time Travel</option>
        <option>Teleportation</option>
        <option>Mind Reading</option>
        <option>Healing</option>
        <option>Lightbody Activation</option>
      </select><br />
      <button onClick={handleCheckout} style={{ marginTop: '1rem' }}>Proceed to Payment</button>
    </div>
  );
}
