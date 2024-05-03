import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		username: string;
		email: string;
	}
	interface Session {
		user: User & {
			username: string;
			email: string;
		}
		token: {
			username: string;
		};
	}
}
