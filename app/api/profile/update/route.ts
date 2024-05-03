import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		console.log(body);
		const { userName, email, role, councilId } = body.userData;
		console.log(userName, email, role, councilId);

		if (!userName || !email) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const user = await db.user.update({
			where: {
				email: email,
			},
			data: {
				userName: userName,
				role: role,
				councilId: councilId,
			},
		});

		return NextResponse.json({
			user: user,
			message: "User updated successfully",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}


