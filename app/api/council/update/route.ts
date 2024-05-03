import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const {
			councilId,
			councilState,
			councilCity,
			councilAddress,
			councilName,
			councilCreatedBy,
			councilLeaderEmail,
		} = body.council;

		if (
			!councilId ||
			!councilState ||
			!councilCity ||
			!councilAddress ||
			!councilName ||
			!councilCreatedBy ||
			!councilLeaderEmail
		) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const council = await db.council.update({
			where: {
				id: councilId,
			},
			data: {
				state: councilState,
				city: councilCity,
				address: councilAddress,
				name: councilName,
				createdBy: councilCreatedBy,
				leaderEmail: councilLeaderEmail,
			},
		});

		return NextResponse.json({
			council: council,
			message: "Council updated successfully",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
