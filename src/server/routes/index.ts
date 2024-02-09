import { publicProcedure, router } from "../trpc";
import { roomsRouter } from "./rooms";

export const appRouter = router({
  rooms: roomsRouter,
});

export type AppRouter = typeof appRouter;
