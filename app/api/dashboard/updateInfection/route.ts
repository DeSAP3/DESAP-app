import db from "@/shared/providers/dbProvider";
import { CheckingStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { postId, result } = body;

		if (!postId || !result) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		await db.dengueScreeningPost.update({
			where: {
				id: postId,
			},
			data: {
				result: result,
			},
		});

		return NextResponse.json({
			message: "Post marked as checked",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
