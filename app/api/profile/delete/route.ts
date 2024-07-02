import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const userId = urlParams.get("userId");
		if (!userId) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}
		
		const res = await db.user.delete({
			where: {
				id: parseInt(userId),
			},
		});
		return NextResponse.json({
			message:
				"User deleted successfully. You will be redirected to login page",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
