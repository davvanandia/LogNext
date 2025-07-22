import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username, // nama untuk session.user.name
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        if (session?.user && token?.name) {
            session.user.name = token.name as string;
        }
        return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name; // masukin ke token
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // redirect ke /login kalau belum login
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
