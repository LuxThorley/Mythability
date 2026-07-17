import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/credentials" style={{ padding: '2rem' }}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <h1>Sign In</h1>
      <label>
        Email <input name="email" type="text" />
      </label>
      <br />
      <label>
        Password <input name="password" type="password" />
      </label>
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
