import { api } from "../utils/api";
import { useRouter } from "next/router";

function MinhasOcorrencias() {
  const { username } = useRouter().query;
  const {  isLoading, isError } =
    api.ocorrencias.minhasOcorrencias.useQuery(
      {
        username: username as string,
      },
      {
        enabled: !!username,
      }
    );

  if (isLoading) {
    return <div>Carregando ocorrências...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar ocorrências</div>;
  }

  return <h1>aqui suas ocorrencias</h1>;
}

export default MinhasOcorrencias;
