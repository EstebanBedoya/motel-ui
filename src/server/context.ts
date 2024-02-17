import { getSession } from 'next-auth/react';

export const createTRPCContext = async () => {
  const session = await getSession();

  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
