/** @package */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/** @scripts */
import prisma from "@/libs/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user) return null;

        // Esto tiene que cambiar por una comparación segura con bcrypt
        const matchPassword = user.password === credentials?.password;

        if (!matchPassword) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
