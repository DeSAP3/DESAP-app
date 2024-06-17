import db from "@/shared/providers/dbProvider";
import supabase from "@/shared/providers/supabase";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { userName, email, password, role } = body.data;

		if (!userName || !email || !password || !role) {
			return NextResponse.json({
				error: "Missing info",
				status: 400,
			});
		}

		const exist = await db.user.findUnique({
			where: {
				email: email,
			},
		});

		if (exist) {
			return NextResponse.json(
				{
					error: "User already exists OR Email already used",
					status: 400,
				},
	
			);
		}

		const user = await db.user.create({
			data: {
				userName: userName,
				email: email,
				password: password,
				role: role,
			},
		});

		return NextResponse.json(
			{
				data: user,
				message: "User created successfully",
				status: 201,
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Something went wrong",
				status: 500,
			}
		);
	}
}
