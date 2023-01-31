import { api } from "../utils/api";
import Header from "../components/Header";
import Link from "next/link";

function DiretorioMembros() {
  const pessoas = api.profile.getAllUsers.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />

      <h1 className="text-2xl font-bold">Todos os bananas do gas:</h1>
      <div className="flex w-full flex-col items-center gap-4">
        {pessoas.data?.map((pessoa) => (
          <Link
            href={`/pessoas/${pessoa.username}`}
            key={pessoa.id}
            className="w-3/5 rounded-md border p-4 shadow-md"
          >
            <div className="flex w-full flex-col gap-1">
              <h2 className="text-xl font-bold">{pessoa.nome}</h2>

              <div className="flex w-full flex-row gap-2">
                <p>Cargo: {pessoa.cargo} </p> <p>Área: {pessoa.areas}</p>{" "}
                {pessoa.projetos.length !== 0 && (
                  <p>Projeto: {pessoa.projetos}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default DiretorioMembros;
