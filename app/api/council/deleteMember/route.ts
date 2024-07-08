import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const memberId = urlParams.get("memberId");
		if (!memberId) {
			return NextResponse.json({
				error: "Missing member id",
				status: 400,
			});
		}

		const member = await db.user.update({
			where: {
				id: parseInt(memberId),
			},
			data: {
				councilId: null,
			},
		});
		if (!member) {
			return NextResponse.json({
				data: null,
				message: "The member does not exist",
				status: 200,
			});
		}
		return NextResponse.json({
			data: member,
			message: "Member removed from council successfully",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
