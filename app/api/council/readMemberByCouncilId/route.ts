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

        const members = await db.user.findMany({
            where: {
                councilId: parseInt(councilId),
				role: Role.COMMUNITY_MEMBER
            },
            select: {
                id: true,
                userName: true,
                email: true,
                role: true,
                livingAddress: true,
            }
        })

		if (!members) {
			return NextResponse.json({
				data: null,
				message: "No users in the council",
				status: 200,
			});
		}
		return NextResponse.json({
			data: members,
			message: "Council's Members loaded",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
