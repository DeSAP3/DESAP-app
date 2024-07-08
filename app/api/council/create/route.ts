import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { state, city, address, name, createdBy, leaderId } =
			body.council;
		if (!state || !city || !address || !name || !createdBy || !leaderId) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const council = await db.council.create({
			data: {
				state: state,
				city: city,
				address: address,
				name: name,
				createdBy: createdBy,
				leader: {
					connect: {
						id: leaderId,
					},
				},
			},
		});

		await db.user.update({
			where: {
				id: leaderId,
			},
			data: {
				council: {
					connect: {
						id: council.id,
					},
				},
			},
		});

		return NextResponse.json({
			data: council,
			message: "Council created successfully",
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({
			error: "Something went wrong",
			status: 400,
		});
	}
}
