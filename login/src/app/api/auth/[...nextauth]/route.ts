import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // pastikan path ini sesuai

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
