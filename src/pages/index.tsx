import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center ">
        <Header />

        {status !== "authenticated" ? (
          <button
            className=" rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
            onClick={() => signIn()}
          >
            Login
          </button>
        ) : (
          <div>logado</div>
        )}
      </main>
    </>
  );
};

export default Home;
