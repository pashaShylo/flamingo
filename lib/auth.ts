import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import { CLIENT_ROUTES } from './constants/routes.constants';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: CLIENT_ROUTES.SIGN_IN,
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'database',
  },
});
