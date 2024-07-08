import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const councilId = urlParams.get("councilId");
		if (!councilId) {
			return NextResponse.json({
				error: "Missing council id",
				status: 400,
			});
		}

		const council = await db.council.findUnique({
			where: {
				id: parseInt(councilId),
			},
			select: {
				id: true,
				name: true,
				city: true,
				state: true,
				address: true,
				createdAt: true,
				leader: {
					select: {
						email: true,
					}
				},
				createdBy: true,
				leaderId: true,
			},
		});

		if (!council) {
			return NextResponse.json({
				data: null,
				message: "Council not found",
				status: 200,
			});
		}

		return NextResponse.json({
			data: council,
			message: "Council loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
