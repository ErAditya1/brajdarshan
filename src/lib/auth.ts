import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "../lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Implement your own logic here to authenticate users
                // For example, you can use a database to store user credentials
                // and compare the credentials to those stored in your database
                // If the credentials are valid, return the user object
                // If the credentials are invalid, return null or throw an error

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const isPasswordValid =  bcrypt.compare(credentials.password, user?.password!)
                    // const isPasswordValid = await user.comparePassword(credentials.password);

                    if (!isPasswordValid) {
                        throw new Error("Wrong password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                        name: user.name
                    };
                } catch (error) {
                    console.log("Authentication error log", error)
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }

                    throw new Error("Authentication Failed");
                }


            },
        })

        //...add more providers here
        // For example, Google OAuth, Facebook OAuth, etc.
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.avatar = user.avatar;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token, }) {

            if (session.user) {
                session.user.id = token.id as string;
                session.user.avatar = token.avatar;
                session.user.role = token.role;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,



}




