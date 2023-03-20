import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { useState } from "react";
import BaseLayout from "../components/BaseLayout";

export default function SignInPage({ providers, csrfToken }:any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("email", { email });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Insira seu e-mail do Insper:</h1>

        {!loading ? (
          <>
            <input
              type="email"
              className="w-1/2 rounded border border-black p-2"
              placeholder="elonrm@al.insper.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="m-2 w-1/2 rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
              onClick={handleSignIn}
            >
              Entrar
            </button>
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </div>
    </BaseLayout>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
}
