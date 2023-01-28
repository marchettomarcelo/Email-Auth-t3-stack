import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) => {
    const pessoas = ctx.prisma.profile.findMany();
    return pessoas;
  }),

  getProfileFromUsername: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {

      const profile = await ctx.prisma.profile.findUnique({
        where: {
          username: input.username,
        },
      });

      return profile;
    }),
});
