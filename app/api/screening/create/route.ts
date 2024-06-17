import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { title, content, result, status, authorEmail } =
			body;
		if (!title || !content || !result || !status || !authorEmail) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}
		const userId = await db.user
			.findUnique({
				where: {
					email: authorEmail,
				},
			})
			.then((user) => {
				return user?.id;
			});

		if (!userId) {
			return NextResponse.json({
				error: "User not found",
				status: 404,
			});
		}

		const dengueScreeningPost = await db.dengueScreeningPost.create({
			data: {
				title: title,
				content: content,
				result: result,
				status: status,
				authorId: userId,
			},
		});

		return NextResponse.json({
			data: dengueScreeningPost,
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
