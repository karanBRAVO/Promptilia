import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleSignIn } from "@app/lib/user/handleSignIn";

const authOptions = {
  providers: [
    GithubProvider({
      id: "github",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "username_email_password",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "abc@xyz.ky" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "########",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await handleSignIn({
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            image: undefined,
            method: "credentials",
          });

          if (res.success) {
            const user = res.userData;
            return user;
          } else {
            throw new Error(`Error`);
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "username_email_password") {
        return true;
      }
      if (account?.provider == "github" || account?.provider == "google") {
        const res = await handleSignIn({
          username: user.name,
          email: user.email,
          password: "",
          image: user.image,
          method: "oauthprovider",
        });

        if (res?.success) {
          return true;
        } else {
          return false;
        }
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
