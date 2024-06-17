import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { userName, email, role, councilId, livingAddress } = body.userData;

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
				 livingAddress: livingAddress
			},
		});

		return NextResponse.json({
			data: user,
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


