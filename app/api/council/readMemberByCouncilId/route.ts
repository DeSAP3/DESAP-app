import db from "@/shared/providers/dbProvider";
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

        const users = await db.user.findMany({
            where: {
                councilId: parseInt(councilId),
            },
            select: {
                id: true,
                userName: true,
                email: true,
                role: true,
                livingAddress: true,
            }
        })

		if (!users) {
			return NextResponse.json({
				error: "No users in the council",
				status: 200,
			});
		}
		return NextResponse.json({
            data: users,
            message: "Council's users loaded",
            status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
