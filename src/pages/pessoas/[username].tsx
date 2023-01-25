import { useRouter } from "next/router";
import Header from "../../components/Header";
import { api } from "../../utils/api";
import Image from "next/image";

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
      <div className="flex w-4/6 flex-col gap-4">
        <h1 className="text-4xl font-bold">{data.nome}</h1>

        <div> {data.projetos}</div>
        <h3 className="text-xl font-medium">{data.areas}</h3>
        <h3 className="text-xl font-medium">{data.cargo}</h3>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />

      {PageContent}
    </main>
  );
}

export default PerfilPessoas;
