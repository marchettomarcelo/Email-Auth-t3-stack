import { api } from "../utils/api";
import { useRouter } from "next/router";

function CriarOcorrencias() {
  const { username } = useRouter().query;
  const { data, error } = api.ocorrencias.podeCriarOcorrencia.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
    }
  );

  if (data === true) {
    return <div>Voce pode criar ocorrencias para essa pessoa</div>;
  } else if (data === false) {
    console.log("Voce nao pode criar ocorrencias para essa pessoa");
    return <div>Voce nao pode criar ocorrencia</div>;
  } else {
    return null;
  }
}

export default CriarOcorrencias;
