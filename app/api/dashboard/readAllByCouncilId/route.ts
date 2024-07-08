import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export type DashboardProps = {
	postId: number;
	title: string;
	content: string;
	result: string;
	status: string;
	createdAt: Date;
	authorUsername: string;
	authorEmail: string;
	authorRole: string;
};

export async function GET(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const councilId = urlParams.get("councilId");
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
		});

		if (!users) {
			return NextResponse.json({
				error: "There are no users in the council",
				status: 200,
			});
		}

		const postList = await db.dengueScreeningPost.findMany({
			where: {
				authorId: {
					in: users.map((user) => user.id),
				},
			},
			include: {
				author: true,
			},
			orderBy: {
				updatedAt: "desc",
			}
		});

		if (!postList) {
			return NextResponse.json({
				data: null,
				message: "There are no post in the council",
				status: 200,
			});
		}

		const posts = postList.map((post) => {
			return {
				postId: post.id,
				title: post.title,
				content: post.content,
				result: post.result,
				status: post.status,
				createdAt: post.createdAt.toLocaleString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
				updatedAt: post.updatedAt.toLocaleString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
				authorUsername: post.author.userName,
				authorEmail: post.author.email,
				authorRole: post.author.role,
			};
		});

		return NextResponse.json({
			data: posts,
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
