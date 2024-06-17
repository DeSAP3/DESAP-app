import { Role } from "@prisma/client";

export const roleOptions = Object.values(Role).map((role) => ({
	value: role,
	label: role,
}));
