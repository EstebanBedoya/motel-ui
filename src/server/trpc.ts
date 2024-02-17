import { initTRPC, TRPCError } from '@trpc/server';

import superjson from 'superjson';
import { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
