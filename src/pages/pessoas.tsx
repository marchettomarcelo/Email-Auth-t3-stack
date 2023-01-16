import { api } from "../utils/api";
import Header from "../components/Header";
import Link from "next/link";

function CriarOcorrencias() {
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
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{pessoa.nome}</h2>

              <div className="flex flex-row">
                {pessoa.areas} do {pessoa.projetos}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default CriarOcorrencias;
