import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      {/* <main className="flex min-h-screen flex-col items-center "> */}
      <Header />

      <h1 className="mt-8 bg-gradient-to-br from-red-900 via-[#B90B23] to-[#ff0000] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        A empresa júnior
        <br />
        de ação social do
        <br />
        <h1 className="text-8xl">Insper</h1>
      </h1>

      {status !== "authenticated" ? (
        <button
          className=" rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
          onClick={() => signIn()}
        >
          Login
        </button>
      ) : (
        <div>
          logado
          <button onClick={() => signOut()}>signOut</button>
        </div>
      )}
      {/* </main> */}
    </>
  );
};

export default Home;
