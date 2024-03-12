/** @packages */
import { additionalRouter } from './routes/additionals';
import { recordsRouter } from './routes/records';
import { roomsRouter } from './routes/rooms';
import { router } from './trpc';

export const appRouter = router({
  rooms: roomsRouter,
  records: recordsRouter,
  additional: additionalRouter,
});

export type AppRouter = typeof appRouter;
