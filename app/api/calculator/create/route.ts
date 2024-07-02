import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { createdByEmail, predictions, imageURL } = body;
		if (!createdByEmail || !predictions || !imageURL) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const createdById = await db.user
			.findUnique({
				where: {
					email: createdByEmail,
				},
			})
			.then((user) => {
				return user?.id;
			});

		if (!createdById) {
			return NextResponse.json({
				error: "User not found",
				status: 404,
			});
		}

		const analytics = await db.analytics.create({
			data: {
				createdById: createdById,
				predictions: predictions,
				imageURL: imageURL,
			},
		});

		return NextResponse.json({
			data: analytics,
			message: "Analytics saved successfully",
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
