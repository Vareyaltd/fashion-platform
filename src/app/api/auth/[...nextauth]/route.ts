import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        let user = await prisma.user.findUnique({ where: { username: credentials.username } });
        
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              username: credentials.username,
              email: `${credentials.username}@vareya.com`,
              password: hashedPassword,
            }
          });
        } else {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) return null;
        }

        return { id: user.id, name: user.username, email: user.email };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
