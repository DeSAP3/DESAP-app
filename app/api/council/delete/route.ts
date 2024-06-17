import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const councilId = urlParams.get("councilId");
		if (!councilId) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

        const council = await db.council.delete({
            where: {
                id: parseInt(councilId),
            },
        });

        return NextResponse.json({
            data: council,
            message: "Council deleted successfully",
            status: 200,
        });
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
