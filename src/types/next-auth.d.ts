import NextAuth, { DefaultSession } from "next-auth";

export type UserRole = "tourist" | "admin" | "vendor"| "editor";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: {
      url: string;
      imageFileId: string;
    };
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      avatar?: {
        url: string;
        imageFileId: string;
      };
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    avatar?: {
      url: string;
      imageFileId: string;
    };
  }
}
