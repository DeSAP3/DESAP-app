import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { title, description, result, status, userId } =
			body.dengueScreeningPost;
		if (!title || !description || !result || !status || !userId) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const dengueScreeningPost = await db.dengueScreeningPost.create({
			data: {
				title: title,
				description: description,
				result: result,
				status: status,
				userId: userId,
			},
		});

		return NextResponse.json({
			dengueScreeningPost: dengueScreeningPost,
			message: "Post created successfully",
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
