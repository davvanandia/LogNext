// types/next-auth.d.ts atau app/types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      role: string; // ✅ tambahkan role di sini
    };
  }

  interface User {
    role: string; // ✅ juga deklarasi di sini
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string; // ✅ juga deklarasi di token
  }
}
