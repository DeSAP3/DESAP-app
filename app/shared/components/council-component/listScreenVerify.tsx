"use client";
import { useEffect, useMemo, useState } from "react";
import {
	useMaterialReactTable,
	MaterialReactTable,
	MRT_ColumnDef,
} from "material-react-table";
import useSWR from "swr";
import { Council, DengueScreeningPost } from "@prisma/client";
import { ImEnter } from "react-icons/im";
import { Box, IconButton } from "@mui/material";
import { useUser } from "@/shared/providers/userProvider";
import { useToast } from "@chakra-ui/react";
import NotFound from "../notfound";
const ScreeningVerificationList = () => {
	const toast = useToast();
	const [posts, setPosts] = useState<DengueScreeningPost[]>([]);
	const { userData, setUserData } = useUser();

	const {
		data: councilPostsResponse,
		isLoading: isLoadingCouncilPostResponse,
	} = useSWR(
		`/api/dashboard/readAllByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		console.log(userData?.councilId);
		if (councilPostsResponse && councilPostsResponse.data) {
			setPosts(councilPostsResponse.data);
		} else {
			setPosts([]);
		}
	}, [councilPostsResponse]);

	const columns = useMemo<MRT_ColumnDef<DengueScreeningPost>[]>(
		() => [
			{
				accessorKey: "title",
				header: "Title",
			},
			{
				accessorKey: "content",
				header: "Description",
			},
			{
				accessorKey: "result",
				header: "Result",
			},
			{
				accessorKey: "createdAt",
				header: "Created At",
			},
			{
				accessorKey: "authorId",
				header: "Belongs To",
			},
			{
				accessorKey: "status",
				header: "Status",
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: posts,
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
			isLoading: isLoadingCouncilPostResponse,
		},
		//TODO: update the status of post
	});

	return posts ? (
		<MaterialReactTable table={table} />
	) : (
		<NotFound notfound='No Councils' />
	);
};

export default ScreeningVerificationList;
