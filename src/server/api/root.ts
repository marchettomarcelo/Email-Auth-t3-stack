import { createTRPCRouter } from "./trpc";
import { profileRouter } from "./routers/profile";
import { ocorrenciasRouter } from "./routers/ocorrencias";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  ocorrencias: ocorrenciasRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
