import { useRouter } from 'next/router';

export default function Download() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Scroll is Ready</h1>
      <p>Thank you, {name}. Your cosmic scroll is now available.</p>
      <a
        href={`/${name}_scroll.pdf`}
        download
        style={{ color: 'gold', fontWeight: 'bold', fontSize: '18px' }}
      >
        ⬇️ Download Your Scroll
      </a>
    </div>
  );
}
