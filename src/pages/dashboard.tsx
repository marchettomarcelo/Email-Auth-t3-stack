import { api } from "../utils/api";
import Header from "../components/Header";

function CriarOcorrencias() {
  const pessoas = api.profile.getAllUsers.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />

      <h1 className="text-2xl font-bold">Todos os bananas do gas:</h1>
      <div className="flex w-full flex-col items-center">
        {pessoas.data?.map((pessoa) => (
          <div
            key={pessoa.id}
            className="w-3/5 rounded-md border p-4 shadow-md"
          >
            {pessoa.nome}
            {pessoa.areas}
          </div>
        ))}
      </div>
    </main>
  );
}

export default CriarOcorrencias;
