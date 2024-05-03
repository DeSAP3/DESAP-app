import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const councilId = urlParams.get("councilId");

		if (!councilId) {
			return NextResponse.json({
				error: "Missing email",
				status: 400,
			});
		}

		const council = await db.council.findUnique({
			where: {
				id: parseInt(councilId),
			},
		});

		if (!council) {
			return NextResponse.json({
				error: "Council not found",
				status: 404,
			});
		}
		return NextResponse.json({
			name: council.name,
			city: council.city,
			state: council.state,
			address: council.address,
			createdAt: council.createdAt,
			createdBy: council.createdBy,
			leaderEmail: council.leaderEmail,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
