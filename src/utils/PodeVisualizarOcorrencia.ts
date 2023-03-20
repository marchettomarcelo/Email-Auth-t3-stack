// intanciate prisma client

// src/server/api/trpc.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function podeVisualizarOcorrencia({
  username,
  loggedUserId,
}: {
  username: string;
  loggedUserId: string;
}) {
  const perfilDaPaginaProcurada = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });

  const perfilDoUsuarioLogado = await prisma.profile.findUnique({
    where: {
      userId: loggedUserId,
    },
  });

  // check if the user is a leader and if the leader is in the same project as the user
  const ehLiderValido = perfilDaPaginaProcurada?.projetos.some((projeto) =>
    perfilDaPaginaProcurada.projetos.includes(projeto)
  );

  return (
    (ehLiderValido && perfilDoUsuarioLogado?.cargo == "LIDER") ||
    perfilDoUsuarioLogado?.cargo === "DIRETOR" || perfilDoUsuarioLogado?.id === perfilDaPaginaProcurada?.id
  );
}
