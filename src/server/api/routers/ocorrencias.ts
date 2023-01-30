import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ocorrenciasRouter = createTRPCRouter({
  minhasOcorrencias: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const perfilDaPaginaProcurada = await ctx.prisma.profile.findUnique({
        where: {
          username: input.username,
        },
      });

      const perfilDoUsuarioLogado = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      // check if the user is a leader and if the leader is in the same project as the user
      const ehLiderValido = perfilDaPaginaProcurada?.projetos.some((projeto) =>
        perfilDaPaginaProcurada.projetos.includes(projeto)
      );

      if (
        ehLiderValido ||
        perfilDoUsuarioLogado?.cargo === "DIRETOR" ||
        perfilDoUsuarioLogado?.id === perfilDaPaginaProcurada?.id
      ) {
        return ctx.prisma.ocorrencia.findMany({
          where: {
            receptorId: perfilDaPaginaProcurada?.id,
          },
          include: {
            responsavel: true,
          },
        });
      } else {
        throw new Error(
          "O usuário não tem permissão para acessar esse conteudo."
        );
      }
    }),

  podeCriarOcorrencia: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const perfilDaPaginaProcurada = await ctx.prisma.profile.findUnique({
        where: {
          username: input.username,
        },
      });

      const perfilDoUsuarioLogado = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      // check if the user is a leader and if the leader is in the same project as the user
      const ehLiderValido = perfilDaPaginaProcurada?.projetos.some((projeto) =>
        perfilDaPaginaProcurada.projetos.includes(projeto)
      );

      if (
        (ehLiderValido && perfilDoUsuarioLogado?.cargo == "LIDER") ||
        perfilDoUsuarioLogado?.cargo === "DIRETOR"
      ) {
        return true;
      } else {
        return false;
      }
    }),
});
