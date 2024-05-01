import { loginGoogle, loginUser } from "@/lib/firebase/services";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

interface Credentials {
  username: string;
  email: string;
  password: string;
}

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email.." },
        password: {
          label: "password",
          type: "password",
          placeholder: "password..",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;
        const data = {
          email,
          password,
        };
        const user: any = await loginUser(data);
        if (!user) {
          return null;
        } else {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) return user;
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID || "",
      clientSecret: process.env.GOOGLE_CLIENTSECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.username = user.username;
        token.email = user.email;
        token.gender = user.gender;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        token.username = user.name;
        token.email = user.email;
        token.role = "member";
        token.login = "google";
        const userGoogle = {
          username: user.name || "",
          email: user.email || "",
          gender: user.gender || "",
          image: user.image || "",
          role: "member",
          login: "google",
        };
        await loginGoogle(userGoogle);
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.username = token.username || "";
      session.user.email = token.email || "";
      session.user.gender = token.gender || "";
      session.user.role = token.role || "";
      session.user.login = token.login || "credentials";
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
