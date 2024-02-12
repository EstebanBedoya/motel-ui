import { appRouter } from "@/server";
import { createCallerFactory } from "@/server/trpc";

export const createCaller = createCallerFactory(appRouter);
