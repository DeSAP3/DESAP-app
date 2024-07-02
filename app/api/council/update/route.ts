import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const {
			councilId,
			name,
			state,
			city,
			address,
			createdBy,
			leaderEmail,
		} = body.council;

		if (
			!councilId ||
			!name ||
			!state ||
			!city ||
			!address ||
			!createdBy ||
			!leaderEmail
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
				state: state,
				city: city,
				address: address,
				name: name,
				createdBy: createdBy,
				leaderEmail: leaderEmail,
			},
		});

		return NextResponse.json({
			data: council,
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
