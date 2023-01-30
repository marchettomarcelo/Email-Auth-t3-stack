import { api } from "../utils/api";
import { useRouter } from "next/router";
import CardOcorrencia from "./CardOcorrencia";
import { isError } from "@tanstack/react-query";

function MinhasOcorrencias() {
  const { username } = useRouter().query;
  const { data, error } = api.ocorrencias.minhasOcorrencias.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
    }
  );

  if (!data) {
    console.log(error?.message);
    return null;
  } else {
    return (
      <div className="w-full">
        <h1 className="text-lg">Aqui estão as suas ocorrencias:</h1>
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
    );
  }
}

export default MinhasOcorrencias;
