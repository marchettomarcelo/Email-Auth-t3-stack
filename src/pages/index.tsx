import { type NextPage } from "next";
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
// import { api } from "../utils/api";

const Home: NextPage = () => {
  const { status } = useSession();

  let button = <></>;

  if (status === "authenticated") {
    button = (
      <button
        className=" rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
        onClick={ () => void signOut()}
      >
        Sign Out
      </button>
    );
  } else if (status === "unauthenticated") {
    button = (
      <button
        className=" rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl"
        onClick={ () =>  void signIn()}
      >
        Login
      </button>
    );
  } else if (status === "loading") {
    button = (
      <button className=" rounded border-2 border-gray-200 py-4 px-8 text-lg font-bold shadow-2xl">
        Loading
      </button>
    );
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-8 ">
        <Header />

        <h1 className="mt-8 bg-gradient-to-br from-red-900 via-[#B90B23] to-[#ff0000] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          A empresa júnior
          <br />
          de ação social do
          <br />
          <p className="text-8xl">Insper</p>
        </h1>

        {button}
      </main>
    </>
  );
};

export default Home;
