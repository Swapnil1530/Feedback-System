import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        prnNumber: { label: "prnNumber", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { prnNumber, password } = credentials ?? {};
        if (!prnNumber || !password) {
          throw new Error("Missing username or password");
        }
        const user = await db.user.findFirst({
          where: {
            prnNumber,
          },
        });

        const exist = user?.hasSubmitted;
        if (exist) {
          throw new Error("You have already submitted the form");
        }

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return {
          id: user.id,
          name: user.name,
          prnNumber: user.prnNumber,
        };
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
