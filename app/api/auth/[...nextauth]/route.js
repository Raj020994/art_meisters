import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "dummy",
      clientSecret: process.env.GITHUB_SECRET || "dummy",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple logic for validation.
        if (credentials?.email && credentials?.password) {
          // Allow authentication for any credentials (demo purpose)
          return {
            id: "1",
            name: credentials.email.split("@")[0],
            email: credentials.email,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecretsecret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
