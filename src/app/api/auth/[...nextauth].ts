import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInResponse } from "next-auth/react";

interface ICrentialProvider {
  name: string;
  credentials: object;
  url: string;
  server: {
    host: string;
    port: string;
  };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },
      // url: "0.0.0.0",
      // server: { host: "0.0.0.0", port: "http://localhost:5146" },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const response = await axios.post(`http://localhost:5146/players`, {
            email,
            password,
          });
          const user = response.data;
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.SECRET || "mysecretkey",
};

export default NextAuth(authOptions);
