import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import podeCriarOcorrencia from "../../../utils/PodeCriarOcorrencia";
import { allNames } from "../../../utils/gamb";

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
      const podeCriar = await podeCriarOcorrencia({
        loggedUserId: ctx.session.user.id,
        username: input.username,
      });

      return podeCriar;
    }),

  criarOcorrencia: protectedProcedure
    .input(
      z.object({
        titulo: z.string(),
        descricao: z.string(),
        pontos: z.number(),
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const podeCriar = await podeCriarOcorrencia({
        username: input.username,
        loggedUserId: ctx.session.user.id,
      });

      if (!podeCriar) throw new Error("Você não pode criar essa ocorrência");

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

      const ocorrencia = await ctx.prisma.ocorrencia.create({
        data: {
          titulo: input.titulo,
          descricao: input.descricao,
          pontosGanhos: input.pontos,
          data: new Date(),
          responsavelId: perfilDoUsuarioLogado?.id as string,
          receptorId: perfilDaPaginaProcurada?.id as string,
        },
      });

      return ocorrencia;
    }),

  excelFormatOcorrencias: protectedProcedure.query(async ({ ctx }) => {
    const ocorrencias = await ctx.prisma.ocorrencia.findMany({
      include: {
        receptor: true,
      },
    });

    console.log(ocorrencias);

    let returnDate: any = allNames().map((name) => {
      return [name, "", 0];
    });

    console.log(returnDate);

    returnDate = returnDate.map((item: any) => {
      const ocorrencia = ocorrencias.find(
        (ocorrencia) => ocorrencia.receptor.nome === item[0]
      );

      if (ocorrencia) {
        item[1] = item[1] + ocorrencia.titulo;
        item[2] = item[2] + 
        ocorrencia.pontosGanhos;
      }

      return item;
    });

    return returnDate;
  }),
});
