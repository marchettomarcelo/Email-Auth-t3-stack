import { useRouter } from "next/router";

import { api } from "../../utils/api";

import MinhasOcorrencias from "../../components/MinhasOcorrencias";
import CriarOcorrencias from "../../components/CriarOcorrencias";

import BaseLayout from "../../components/BaseLayout";

function PerfilPessoas() {
  const { username } = useRouter().query;

  const { data, isLoading } = api.profile.getProfileFromUsername.useQuery(
    { username: username as string },
    {
      enabled: !!username,
    }
  );

  let PageContent = <></>;

  if (isLoading) {
    PageContent = <div>Carregando...</div>;
  } else if (data == null) {
    PageContent = <div>pessoa nao encontrada :P</div>;
  } else {
    PageContent = (
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-4xl font-bold">{data.nome}</h1>

        <div> {data.projetos}</div>
        <h3 className="text-xl font-medium">{data.areas}</h3>
        <h3 className="text-xl font-medium">{data.cargo}</h3>
      </div>
    );
  }

  return (
    <BaseLayout>
      {PageContent}
      <MinhasOcorrencias />
      <CriarOcorrencias />
    </BaseLayout>
  );
}

export default PerfilPessoas;
