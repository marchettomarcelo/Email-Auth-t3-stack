import { type Ocorrencia, type Profile } from "@prisma/client";
import Link from "next/link";

function CardOcorrencia({
  ocorrencia,
  responsavel,
}: {
  ocorrencia: Ocorrencia;
  responsavel: Profile;
}) {
  const dd = String(ocorrencia.data.getDate()).padStart(2, "0");
  const mm = String(ocorrencia.data.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = ocorrencia.data.getFullYear();
  return (
    <div className="flex w-full flex-col rounded border-2 border-black p-4">
      <h2 className="text-xl font-bold">{ocorrencia.titulo}</h2>

      <h3>{ocorrencia.descricao}</h3>
      <h3 className="mt-3">
        Pontos ganhos: <strong>{ocorrencia.pontosGanhos}</strong>
      </h3>
      <h3>
        Dia: {dd}/{mm}/{yyyy}
      </h3>

      <h3 className="mt-4 font-bold">
        Cridado por{" "}
        <Link
          href={`/pessoas/${responsavel.username}`}
          className=" text-blue-800"
        >
          {responsavel.nome}
        </Link>
      </h3>
    </div>
  );
}

export default CardOcorrencia;
