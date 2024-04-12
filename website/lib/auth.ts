import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { login: credentials.login },
        });

        if (!user) {
          return null;
        }

        const { password, ...rest } = user;

        if (credentials.password !== password) {
          return null;
        }

        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30000,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      user && (token.user = user);
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: token.user as any,
      };
    },
  },
};

type SessionUser = Omit<User, "password">;
declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
