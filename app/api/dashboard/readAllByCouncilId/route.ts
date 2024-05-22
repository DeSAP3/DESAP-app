import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const councilId = urlParams.get("councilId");
		console.log(councilId);
		if (!councilId) {
			return NextResponse.json({
				error: "Missing councilId",
				status: 400,
			});
		}

		const users = await db.user.findMany({
			where: {
				councilId: parseInt(councilId),
			},
		})

		if (!users) {
			return NextResponse.json({
				error: "There are no users in the council",
				status: 200,
			});
		}

		const postList = await db.dengueScreeningPost.findMany({
			where: {
				userId: {
					in: users.map((user) => user.email),
				}
			},
		})
	
		if (!postList) {
			return NextResponse.json({
				error: "There are no post in the council",
				status: 200,
			});
		}
		return NextResponse.json({
			dengueScreeningPosts: postList,
			message: "All posts loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
