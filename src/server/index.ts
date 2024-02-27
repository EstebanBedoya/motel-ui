import { router } from './trpc';
import { roomsRouter } from './routes/rooms';
import { recordsRouter } from './routes/records';

export const appRouter = router({
  rooms: roomsRouter,
  records: recordsRouter,
});

export type AppRouter = typeof appRouter;
