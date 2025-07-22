// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name: string;
//       role: string;
//     };
//   }

//   interface User {
//     name: string;
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     name: string;
//     role: string;
//   }
// }

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
    };
  }

  interface User {
    username: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: string;
  }
}
