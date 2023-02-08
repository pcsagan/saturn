import NextAuth, { DefaultUser, DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    authorization: string;
  }
  interface Session extends DefaultSession {
    authorization: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    authorization: string;
  }
}
