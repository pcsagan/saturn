import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import * as Backend from '@/helpers/rest';

const options = {
  providers: [
    // allow signing in with e-mail and password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'user@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // the value returned by this function will be used as the user object in the callbacks,
      // but only when the credentials (e-mail/password) provider is used to sign in
      async authorize(credentials, req) {
        return await Backend.signIn({
          email: credentials.email,
          password: credentials.password,
        });
      },
    }),
    // allow signing in with a google account
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // the value returned by this function will determine if the user is allowed to sign in
    async signIn({ user, account, profile, email, credentials }) {
      // if we're not dealing with our custom e-mail/password provider...
      if (account && account.provider != 'credentials') {
        // attempt to sign in to the backend by providing a profile value along with the e-mail
        const backendUser = await Backend.signIn({
          email: profile.email,
          profile: profile.sub,
        });
        // if the backend sign in attempt was successful...
        if (backendUser)
          // make the backend authorization available in the jwt callback via the user parameter
          user.authorization = backendUser.authorization;
        // otherwise, do not allow the user to sign in
        else return false;
      }
      // allow the user to sign in
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // if this is a sign in attempt...
      if (user)
        // make the backend authorization available in the session callback via the token parameter
        token.authorization = user.authorization;
      return token;
    },
    async session({ session, token, user }) {
      // make the backend authorization available on the session object returned by useSession()
      session.authorization = token.authorization;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(options);
