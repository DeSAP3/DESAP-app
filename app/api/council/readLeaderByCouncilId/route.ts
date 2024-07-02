import db from "@/shared/providers/dbProvider";
import { Role } from "@prisma/client";
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
				leaderId: true,
			},
		});

		if (!council || !council.leaderId) {
			return NextResponse.json({
				data: null,
				message: "No leader in the council",
				status: 200,
			});
		}

		const leader = await db.user.findUnique({
			where: {
				id: council.leaderId,
			},
			select: {
				id: true,
				userName: true,
				email: true,
				role: true,
				livingAddress: true,
			},
		});

		if (!leader) {
			return NextResponse.json({
				data: null,
				message: "Leader not found",
				status: 200,
			});
		}

		return NextResponse.json({
			data: leader,
			message: "Council's Leader loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}

}
