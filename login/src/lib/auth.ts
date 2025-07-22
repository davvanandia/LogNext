import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  if (!credentials?.username || !credentials?.password) return null;

  const user = await prisma.user.findUnique({
    where: { username: credentials.username },
  });

  if (!user || !user.password) return null;

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) return null;

  return {
    id: user.id,
    name: user.name ?? user.username,
    role: user.role ?? "user", // hanya jika kamu pakai role
  };
}
    }),
  ],
  pages: {
    signIn: "/login", // custom halaman login jika ada
  },
};
