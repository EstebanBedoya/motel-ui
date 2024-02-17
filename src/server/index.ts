import { router } from './trpc';
import { roomsRouter } from './routes/rooms';

export const appRouter = router({
  rooms: roomsRouter,
});

export type AppRouter = typeof appRouter;
