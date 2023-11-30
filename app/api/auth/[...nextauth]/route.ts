import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import bcrypt from 'bcrypt';

import prisma from '@/app/utils/prismadb.utils';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error('Invalid User');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Password');
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    updateAge: 24 * 60 * 60 * 1000,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.role=token.role as string
      }

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role as string
      }
      if (account) {
      //   cookies().set({
      //       name: 'accessToken',
      //       value: account.access_token as string,
      //       httpOnly: true, //optional
      //       maxAge: 7*24*60*60*1000, //optional
      //   });
          token.accessToken=account.access_token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)


export { handler as POST, handler as GET };
