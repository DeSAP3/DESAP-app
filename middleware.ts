import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

const roleBasedRoutes = {
	COMMUNITY_LEADER: [
		"/landing",
		"/community/dashboard",
		"/community/screening",
		"/council/management",
		"/council/detail",
		"/council/list",
		"/council/screening",
		"/council/new",
	],
	COMMUNITY_MEMBER: [
		"/landing",
		"/community/dashboard",
		"/community/screening",
		"/council/detail",
		"/council/list",
	],
	OPERATION_TEAM: [
		"/landing",
		"/ento/opencv",
		"/ento/calculator",
		"/ento/record",
	],
};

const publicRoutes = [
	"/",
	"/landing",
	"/ento/opencv",
	"/ento/calculator",
	"/community/profile",
];

const loginRoute = "/login";
const registerRoute = "/register";
const forbiddenRoute = "/forbidden";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	if (
		url.pathname.startsWith("/_next") ||
		url.pathname.startsWith("/static") ||
		url.pathname.startsWith("/public") ||
		url.pathname.startsWith("/api") ||
		url.pathname.startsWith("/favicon.ico")
	) {
		return NextResponse.next();
	}

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	console.log("Pathname:", url.pathname);

	if (!token) {
		if (
			!publicRoutes.includes(url.pathname) &&
			url.pathname !== loginRoute &&
			url.pathname !== registerRoute
		) {
			url.pathname = loginRoute;
			console.log("Redirecting to login:", url.pathname);
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}

	const role = token.role;

	const allowedRoutes =
		roleBasedRoutes[role as keyof typeof roleBasedRoutes] || [];

	if (role === Role.COMMUNITY_MEMBER || role === Role.COMMUNITY_LEADER || role === Role.OPERATION_TEAM) {
		if (url.pathname === loginRoute || url.pathname === registerRoute || url.pathname === "/") {
			url.pathname = "/landing";
			console.log("Redirecting to home:", url.pathname);
			return NextResponse.redirect(url);
		}

		return NextResponse.next();
	}

	if (
		allowedRoutes.includes(url.pathname) ||
		publicRoutes.includes(url.pathname)
	) {
		return NextResponse.next();
	}

	if (!allowedRoutes.includes(url.pathname)) {
		url.pathname = forbiddenRoute;
		console.log("Redirecting to forbidden:", url.pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/landing",
		"/community/:path*",
		"/council/:path*",
		"/ento/:path*",
		"/((?!api|_next|static|favicon.ico).*)",
		
	],
};
