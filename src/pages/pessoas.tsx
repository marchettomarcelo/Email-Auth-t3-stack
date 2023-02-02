import { api } from "../utils/api";
import Link from "next/link";
import BaseLayout from "../components/BaseLayout";

function DiretorioMembros() {
  const pessoas = api.profile.getAllUsers.useQuery();

  return (
    <BaseLayout>
      <h1 className="text-2xl font-bold">Todos os integrantes do gas:</h1>
      <div className="flex w-full flex-col items-center gap-4">
        {pessoas.data?.map((pessoa) => (
          <Link
            href={`/pessoas/${pessoa.username}`}
            key={pessoa.id}
            className=" w-full rounded-md border p-4 shadow-md"
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
    </BaseLayout>
  );
}

export default DiretorioMembros;
