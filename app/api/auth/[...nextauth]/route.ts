import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/shared/providers/dbProvider"; 
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				const existingUser = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
					select: {
						id: true,
						userName: true,
						email: true,
						role: true,
						councilId: true,
						password: true,
					},
				});

				if (!existingUser) {
					throw new Error("No user found with this email");
				}

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					existingUser.password
				);

				if (!isValidPassword) {
					throw new Error("Invalid password");
				}

				return {
					id: `${existingUser.id}`,
					username: existingUser.userName,
					email: existingUser.email,
					role: existingUser.role,
					councilId: existingUser.councilId,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
				token.role = user.role;
				token.councilId = user.councilId;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				username: token.username,
				role: token.role,
				councilId: token.councilId,
			};
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
