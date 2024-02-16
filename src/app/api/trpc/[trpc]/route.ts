import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";
import { getServerSession } from "next-auth/next";

const handler = async (req: Request) => {
  const session = await getServerSession();

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ session }),
  });
};

export { handler as GET, handler as POST };
