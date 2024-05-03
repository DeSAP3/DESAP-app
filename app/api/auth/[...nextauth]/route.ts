import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/shared/providers/dbProvider";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	pages: {
		signIn: "/community/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "john@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await db.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});
				
				if (!existingUser) {
					return null;
				}
				
				if (credentials.password !== existingUser.password) {
					return null;
				}
				
				let council = null;
				if (existingUser?.councilId) {
					council = await db.council.findUnique({
						where: {
							id: existingUser?.councilId,
						},
					});
				}
				return {
					id: `${existingUser.id}`,
					username: existingUser.userName,
					email: existingUser.email,
					councilName: council?.name,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return { 
                    ...token, 
                    username: user.username 
                };
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
                    ...session.user,
                    username: token.username
                },
			};
		},
	},
	session: {
		strategy: "jwt",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

