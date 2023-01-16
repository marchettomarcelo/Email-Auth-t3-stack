import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) => {
    

    const pessoas = ctx.prisma.profile.findMany();

    return pessoas;
  }),
});
