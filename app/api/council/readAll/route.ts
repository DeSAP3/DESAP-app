import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const councils = await db.council.findMany({
			select: {
				id: true,
				name: true,
				address: true,
				city: true,
				state: true,
				leader: {
					select: {
						email: true,
					},
				},
				createdBy: true,
				createdAt: true,
			},
		});
		if (!councils) {
			return NextResponse.json({
				data: null,
				message: "There are no councils",
				status: 200,
			});
		}
		return NextResponse.json({
			data: councils,
			message: "All councils loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
