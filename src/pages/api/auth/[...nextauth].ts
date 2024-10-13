/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signOut } from "next-auth/react";
import { ApiUrl } from "../../../../config/config";

const options: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          const response = await fetch(ApiUrl + "/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const user = await response.json();

          // Log response untuk memeriksa detail

          if (response.ok && user.meta.statusCode === 200) {
            // Mengembalikan data pengguna dan token
            return {
              id: user.data.user.id,
              email: user.data.user.email,
              name: user.data.user.name,
              role: user.data.user.role,
              createdAt: user.data.user.createdAt,
              accessToken: user.data.token, // Simpan accessToken untuk nanti
            };
          } else {
            // Log jika status dari response bukan 200
            console.error("Login gagal, status bukan 200:", user);
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "projectabsenniya",

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken, // Ensure this line is present
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
        };
      }
      return token;
    },

    async session({ session, token }: any) {
      // Meneruskan data dari token ke session
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        createdAt: token.createdAt,
      };

      // Profil API tambahan untuk user
      try {
        const response = await fetch(ApiUrl + "/auth/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: session.user.id,
          }),
        });

        const resp = await response.json();
        if (resp.message === "Unauthenticated.") {
          signOut();
          return;
        }

        session.user = resp.data;
      } catch (e) {
        console.error("Error fetching profile:", e);
      }

      return session;
    },
  },
};

export default NextAuth(options);
