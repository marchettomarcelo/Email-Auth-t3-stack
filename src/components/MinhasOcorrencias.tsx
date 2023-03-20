import { api } from "../utils/api";
import { useRouter } from "next/router";
import CardOcorrencia from "./CardOcorrencia";

function MinhasOcorrencias() {
  const { username } = useRouter().query;
  const { data: podeVisualizarConteudo } =
    api.ocorrencias.podeVerOcorrencias.useQuery(
      {
        username: username as string,
      },
      {
        enabled: !!username,
      }
    );

  console.log(podeVisualizarConteudo);

  const { data, error } = api.ocorrencias.minhasOcorrencias.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
    }
  );

  console.log(data);

  if (!podeVisualizarConteudo) {
    return null;
  }

  if (!data) {
    console.log(error?.message);
    return null;
  } else {
    return (
      <div className="w-full">
        <h1 className="text-lg">Aqui estão as suas ocorrencias:</h1>

        <div className="flex flex-col gap-4">
          {data.map((ocorrencia, index) => {
            return (
              <CardOcorrencia
                key={index}
                ocorrencia={ocorrencia}
                responsavel={ocorrencia.responsavel}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MinhasOcorrencias;
