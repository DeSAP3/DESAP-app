import db from "@/shared/providers/dbProvider";
import { CheckingStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const {id} = body;

		if (!id) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		await db.analytics.update({
			where: {
				id: id
			},
			data: {
				status: CheckingStatus.CHECKED
			}
		})
        

		return NextResponse.json({
			message: "Record marked as checked",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
