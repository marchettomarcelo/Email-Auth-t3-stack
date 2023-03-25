/* eslint-disable */

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import podeCriarOcorrencia from "../../../utils/PodeCriarOcorrencia";
import podeVisualizarOcorrencia from "../../../utils/PodeVisualizarOcorrencia";


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

  podeCriarOcorrencias: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const podeCriar = await podeCriarOcorrencia({
        loggedUserId: ctx.session.user.id,
        username: input.username,
      });

      return podeCriar;
    }),

  deletarOcorrencia: protectedProcedure
  .input(z.object({ id: z.string(), username: z.string() })).mutation(async ({ ctx, input }) => {
     const podeCriar = await podeCriarOcorrencia({
       loggedUserId: ctx.session.user.id,
       username: input.username,
     });

     if (podeCriar){
        const ocorrencia = await ctx.prisma.ocorrencia.delete({
          where: {
            id: input.id
          }
        })
        return ocorrencia;
     }

      throw new Error("Você não pode deletar essa ocorrência");

  }),

  podeVerOcorrencias: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const podeVisualizar = await podeVisualizarOcorrencia({
        loggedUserId: ctx.session.user.id,
        username: input.username,
      })

      return podeVisualizar;
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

    let returnData: Record<string, any> = [];

    ocorrencias.forEach((ocorrencia) => {
      if (returnData[ocorrencia.receptor.username]) {
        returnData[ocorrencia.receptor.username].desc +=
          ocorrencia.descricao + " | ";
        returnData[ocorrencia.receptor.username].pontos +=
          +ocorrencia.pontosGanhos;
      } else {
        returnData[ocorrencia.receptor.username] = {
          nome: ocorrencia.receptor.nome,
          desc: ocorrencia.descricao + " | ",
          pontos: ocorrencia.pontosGanhos,
        };
      }
    });

    let finalData: Record<string, any> = [];

    Object.values(returnData).forEach((key) => {
      finalData.push(Object.values(key));
    });

    console.log(returnData);
    console.log(finalData);

    return finalData;
  }),
});
