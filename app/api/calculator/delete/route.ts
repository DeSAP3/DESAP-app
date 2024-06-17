import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
	try {
		const urlParams = new URL(request.url).searchParams;
		const id = urlParams.get("id");
		if (!id) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		await db.analytics.delete({
			where: {
				id: parseInt(id),
			},
		});

		return NextResponse.json({
			message: "Analytics deleted successfully",
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
