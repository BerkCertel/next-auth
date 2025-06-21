// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const email = "admin@admin.com";
        const password = "1234";
        if (credentials.email === email && credentials.password === password) {
          return {
            id: "1",
            name: "Admin",
            email,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
