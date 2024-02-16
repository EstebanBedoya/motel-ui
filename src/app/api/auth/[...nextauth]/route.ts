/** @package */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/** @scripts */
import { db } from "@/libs/prisma";

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        // Esto tiene que cambiar por una comparación segura con bcrypt
        const matchPassword = user.password === credentials?.password;

        if (!matchPassword) return null;

        console.log(user);

        return { ...user, id: user.id };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, id: token.id } as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const authOptions = handler;
export { handler as GET, handler as POST };
