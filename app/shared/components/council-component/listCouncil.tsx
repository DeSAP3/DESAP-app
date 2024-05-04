"use client";
import { useEffect, useMemo, useState } from "react";
import {
	useMaterialReactTable,
	MaterialReactTable,
	MRT_ColumnDef,
} from "material-react-table";
import useSWR from "swr";
import { Council } from "@prisma/client";
import { ImEnter } from "react-icons/im";
import { Box, IconButton } from "@mui/material";
import { useUser } from "@/shared/providers/userProvider";
import { useToast } from "@chakra-ui/react";

const CouncilList = () => {
	const toast = useToast();
	const [councils, setCouncils] = useState<Council[]>([]);
	const { userData, setUserData } = useUser();

	const { data: councilsResponse, isLoading: isLoadingCouncilsResponse } =
		useSWR("/api/council/readAll", (url) =>
			fetch(url).then((res) => res.json())
		);

	useEffect(() => {
		if (councilsResponse) {
			setCouncils(councilsResponse.councils);
		} else {
			setCouncils([]);
		}
	}, [councilsResponse]);

	const columns = useMemo<MRT_ColumnDef<Council>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Council Name",
			},
			{
				accessorKey: "address",
				header: "Address",
			},
			{
				accessorKey: "city",
				header: "City",
			},
			{
				accessorKey: "state",
				header: "State",
			},
			{
				accessorKey: "leaderEmail",
				header: "State",
			},
			{
				accessorKey: "createdBy",
				header: "Created By",
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: councils,
		enableHiding: false,
		enableDensityToggle: false,
		defaultColumn: {
			minSize: 20,
			maxSize: 50,
		},
		initialState: {
			density: "compact",
		},
		state: {
			isLoading: isLoadingCouncilsResponse,
		},
		enableRowActions: userData.councilId === null ? true : false,
		renderRowActions: (row) => (
			<Box>
				<IconButton
					color='success'
					onClick={async () => {
						const updatedUserData = {
							...userData,
							councilId: row.row.original.id,
						};
						setUserData(updatedUserData);
						const res = await fetch("/api/profile/update", {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								userData: updatedUserData,
							}),
						}).then((res) => res.json());
						console.log(res);
						toast({
							title: res.status === 200 ? res.message : res.error,
							status: res.status === 200 ? "success" : "error",
							duration: 3000,
							isClosable: true,
							position: "bottom-right",
						});
					}}
				>
					<ImEnter />
				</IconButton>
			</Box>
		),
	});

	return <MaterialReactTable table={table} />;
};

export default CouncilList;
