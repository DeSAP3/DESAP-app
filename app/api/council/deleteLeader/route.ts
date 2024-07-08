import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
        const urlParams = new URL(request.url).searchParams;
        const councilId = urlParams.get("councilId");
        if (!councilId) {
			return NextResponse.json({
				error: "Missing council id",
				status: 400,
			});
		}

        const councils = await db.council.update({
			where: {
				id: parseInt(councilId),
			},
			data: {
				leaderId: null,
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
