import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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
        const backendUrl = process.env.BACKEND_URL || "http://localhost:3480";
        try {
          const response = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const resJson = await response.json();

          if (response.ok && resJson.Success) {
            // Retrieve cookies from response headers
            const setCookie = response.headers.get("set-cookie");
            if (setCookie) {
              const match = setCookie.match(/authToken=([^;]+)/);
              if (match && match[1]) {
                const token = match[1];
                const cookieStore = await cookies();
                cookieStore.set("authToken", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  path: "/",
                  maxAge: 60 * 60 * 24 * 7, // 1 week
                });
              }
            }

            return {
              id: resJson.Data.id || "1",
              name: resJson.Data.name,
              email: resJson.Data.email,
              image: resJson.Data.avatar || "/me.png",
            };
          } else {
            // Throw custom error message from backend
            throw new Error(resJson.Data?.Error || "Invalid email or password. Please try again.");
          }
        } catch (error) {
          console.error("Backend auth failed:", error);
          throw new Error(error.message || "Authentication service is currently unavailable.");
        }
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    }
  },
  events: {
    async signOut() {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("authToken")?.value;
        if (token) {
          const backendUrl = process.env.BACKEND_URL || "http://localhost:3480";
          await fetch(`${backendUrl}/auth/logout`, {
            method: "POST",
            headers: {
              Cookie: `authToken=${token}`,
            },
          });
        }
        cookieStore.delete("authToken");
      } catch (error) {
        console.error("Backend logout error:", error);
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecretsecret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

