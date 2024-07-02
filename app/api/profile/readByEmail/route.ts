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
			select: {
				id: true,
				userName: true,
				email: true,
				role: true,
				livingAddress: true,
				councilId: true,
			},
		});

		if (!user) {
			return NextResponse.json({
				data: null,
				message: "User not found",
				status: 200,
			});
		}
		return NextResponse.json({
			data: user,
			message: "User loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
