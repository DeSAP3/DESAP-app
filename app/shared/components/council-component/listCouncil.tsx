"use client";
import { useEffect, useMemo, useState } from "react";
import {
	useMaterialReactTable,
	MaterialReactTable,
	MRT_ColumnDef,
} from "material-react-table";
import useSWR from "swr";
import { Council } from "@prisma/client";

const CouncilList = () => {
	const [councils, setCouncils] = useState<Council[]>([]);
	const { data: councilsResponse, isLoading: isLoadingCouncilsResponse } = useSWR(
		"/api/council/readAll",
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (councilsResponse) {
			setCouncils(councilsResponse);
		} 
	}, [councilsResponse]);

	const columns = useMemo<MRT_ColumnDef<Council>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Council Name",
				size: 150,
			},
			{
				accessorKey: "address",
				header: "Address",
				size: 150,
			},
			{
				accessorKey: "city",
				header: "City",
				size: 50,
			},
			{
				accessorKey: "state",
				header: "State",
				size: 50,
			},
			{
				accessorKey: "leaderEmail",
				header: "State",
				size: 100,
			},
			{
				accessorKey: "createdAt",
				header: "Created At",
				size: 100,
			},
			{
				accessorKey: "createdBy",
				header: "Created By",
				size: 100,
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: councils,
	});

	return <MaterialReactTable table={table} />;
};

export default CouncilList;
