import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Link from "next/link";
import MinhasOcorrencias from "../../components/MinhasOcorrencias";
import CriarOcorrencias from "../../components/CriarOcorrencias";

import BaseLayout from "../../components/BaseLayout";

function PerfilPessoas() {
  const { username } = useRouter().query;
  const { data, isLoading, isSuccess, isError, error } =
    api.profile.getProfileFromUsername.useQuery(
      { username: username as string },
      {
        enabled: !!username,
      }
    );

  if (isLoading) {
    return (
      <BaseLayout>
        <div>Carregando...</div>
      </BaseLayout>
    );
  }

  if (isError) {
    return (
      <BaseLayout>
        <div>Erro: {error.message}</div>
      </BaseLayout>
    );
  }

  if (!isSuccess) {
    return <div>Pessoa não encontrada</div>;
  }

  return (
    <BaseLayout>
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-4xl font-bold">{data!.nome}</h1>
        <div> {data!.projetos}</div>
        <h3 className="text-xl font-medium">{data!.areas}</h3>
        <h3 className="text-xl font-medium">{data!.cargo}</h3>
      </div>
      <MinhasOcorrencias />
      <CriarOcorrencias />
      <div className="flex w-full ">
        {" "}
        <Link href={"/pessoas"}>
          <p className="text-blue-700">&lt;- Voltar</p>{" "}
        </Link>
      </div>
    </BaseLayout>
  );
}

export default PerfilPessoas;
