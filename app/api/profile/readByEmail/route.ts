import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const email = urlParams.get("email");

		if (!email) {
			return NextResponse.json({
				error: "Missing email",
				status: 400,
			});
		}

		const user = await db.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return NextResponse.json({
				error: "User not found",
				status: 404,
			});
		}
		return NextResponse.json({
			id: `${user.id}`,
			username: user.userName,
			email: user.email,
			role: user.role,
			councilId: user?.councilId,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
