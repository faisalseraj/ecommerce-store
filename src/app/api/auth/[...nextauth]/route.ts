import User, { IUser } from "../../../_models/User"; // Adjust import

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { connectDb } from "../../../_utils/db"; // Adjust import

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDb(); // Establish the database connection

        const user = await User.findOne({ email: credentials?.email });

        if (
          user &&
          (await bcrypt.compare(credentials?.password as string, user.password))
        ) {
          // Return a subset of the user's properties, including the id
          return {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page to redirect to
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Save user information in JWT token
      if (user) {
        token.email = user.email;
        (token as unknown as IUser).phoneNumber = (user as IUser).phoneNumber;
        (token as unknown as IUser).fullName = (user as IUser).fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session?.user) return session;
      // Attach token attributes to the session
      session.user.email = token.email;
      (session.user as IUser).phoneNumber = token.phoneNumber as string;
      (session.user as IUser).fullName = token.fullName as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure your secret is set
});

export { handler as GET, handler as POST };
