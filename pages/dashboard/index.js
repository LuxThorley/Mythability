import { getSession } from "next-auth/react";

export default function Dashboard({ session }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧙‍♂️ Welcome to your Superability Dashboard</h1>
      <p>Your email: {session.user.email}</p>
      <p>This is your personalized hub for scrolls, upgrades, and support.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      }
    };
  }
  return {
    props: { session }
  };
}
