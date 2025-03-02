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
          // Return user object
          return {
            id: user._id.toString(), // Ensure ID is a string
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
     
      if (user) {
        token.email = user.email;
        token.phoneNumber = (user as any)?.phoneNumber; // Direct assignment
        token.id = user.id; // Use user.id directly
        token.fullName = (user as any)?.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session?.user) return session;
      session.user.email = token.email;
      (session.user as any).phoneNumber = token.phoneNumber; // Direct assignment
      (session.user as any).id = token.id; // Ensure this exists
      (session.user as any).fullName = token.fullName; // Ensure this exists
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure your secret is set
});

export { handler as GET, handler as POST };
