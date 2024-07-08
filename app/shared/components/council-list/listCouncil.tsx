"use client";
import { useEffect, useMemo, useState } from "react";
import {
	useMaterialReactTable,
	MaterialReactTable,
	MRT_ColumnDef,
} from "material-react-table";
import useSWR from "swr";
import { Council, Role } from "@prisma/client";
import { ImEnter } from "react-icons/im";
import { Box, Button } from "@mui/material";
import { useUser } from "@/shared/providers/userProvider";
import { useToast } from "@chakra-ui/react";
import NotFoundComponet from "../notfound";
import { useRouter } from "next/navigation";
import LoadingComponent from "../loading";

type CouncilListProps = {
	id: number;
	name: string;
	city: string;
	state: string;
	address: string;
	leaderEmail: string;
	createdAt: Date;
	createdBy: string;
};

const CouncilList = () => {
	const toast = useToast();
	const router = useRouter();
	const [councils, setCouncils] = useState<CouncilListProps[]>([]);
	const { userData, setUserData, mutateUser } = useUser();
	const [isLoading, setIsLoading] = useState(false);

	const {
		data: councilsResponse,
		isLoading: isLoadingCouncilsResponse,
		isValidating: isValidatingCouncils,
		mutate: mutateCouncilsRes,
	} = useSWR(
		"/api/council/readAll",
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (councilsResponse && councilsResponse.data) {
			setCouncils(councilsResponse.data);
		} else {
			setCouncils([]);
		}
	}, [councilsResponse]);

	const columns = useMemo<MRT_ColumnDef<CouncilListProps>[]>(
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
				accessorKey: "leader.email",
				header: "Leader Email",
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
			density: "comfortable",
		},
		state: {
			isLoading:
				isLoadingCouncilsResponse || isValidatingCouncils || isLoading,
		},
		enableRowActions:
			userData.councilId === null &&
			userData.role !== Role.COMMUNITY_LEADER
				? true
				: false,
		renderRowActions: (row) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Button
					endIcon={<ImEnter />}
					color='success'
					variant='contained'
					size='small'
					onClick={async () => {
						setIsLoading(true);
						const updatedUserData = {
							...userData,
							councilId: row.row.original.id as any,
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
						toast({
							title:
								res.status === 200
									? `Successfully joined council: ${row.row.original.name}`
									: res.error,
							status: res.status === 200 ? "success" : "error",
							duration: 3000,
							isClosable: true,
							position: "bottom-right",
						});
						if (res.status === 200) {
							mutateUser();
							router.push("/community/dashboard");
						}
						setIsLoading(false);
					}}
				>
					Join
				</Button>
			</Box>
		),
	});

	return isLoadingCouncilsResponse || isValidatingCouncils ? (
		<LoadingComponent text='Loading...' />
	) : councils ? (
		<MaterialReactTable table={table} />
	) : (
		<NotFoundComponet notfound='No Councils' />
	);
};

export default CouncilList;
