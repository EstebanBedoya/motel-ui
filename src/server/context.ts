import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

export const createTRPCContext = async ({ req }: CreateNextContextOptions) => {
  const session = await getSession({ req });
  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
