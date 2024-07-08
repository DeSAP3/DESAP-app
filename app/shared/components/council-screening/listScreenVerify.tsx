"use client";
import { useUser } from "@/shared/providers/userProvider";
import { useToast } from "@chakra-ui/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import { MenuItem } from "@mui/material";
import { CheckingStatus } from "@prisma/client";
import {
	MRT_ColumnDef,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import NotFoundComponent from "../notfound";
import LoadingComponent from "../loading";

type ScreeningVerificationListProps = {
	postId: number;
	title: string;
	content: string;
	result: string;
	status: string;
	createdAt: string;
	authorUsername: string;
	authorEmail: string;
	authorRole: string;
};

export default function ScreeningVerificationList() {
	const [posts, setPosts] = useState<ScreeningVerificationListProps[]>([]);
	const { userData } = useUser();
	const [isLoadingSaving, setIsLoadingSaving] = useState(false);
	const toast = useToast();
	const {
		data: councilPostsResponse,
		isLoading: isLoadingCouncilPostResponse,
		mutate: mutatePostsResponse,
		isValidating: isValidatingCouncilPostResponse,
	} = useSWR(
		userData?.councilId
			? `/api/dashboard/readAllByCouncilId?councilId=${userData?.councilId}`
			: null,
		(url: string | URL | Request) => fetch(url).then((res) => res.json())
	);

	const handleSavePost = async (row: ScreeningVerificationListProps) => {
		if (window.confirm("Are you sure?")) {
			setIsLoadingSaving(true);
			const res = await fetch("/api/dashboard/updateStatus", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(row),
			}).then((res) => res.json());
			toast({
				title: res.message,
				status: res.status === 200 ? "success" : "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			if (res.status === 200) mutatePostsResponse();
			setIsLoadingSaving(false);
		}
	};

	const handleSaveInfectionResult = async (id: number, result: string) => {
		if (window.confirm("Are you sure?")) {
			setIsLoadingSaving(true);
			const res = await fetch("/api/dashboard/updateInfection", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postId: id, result: result }),
			}).then((res) => res.json());
			toast({
				title: res.message,
				status: res.status === 200 ? "success" : "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			if (res.status === 200) mutatePostsResponse();
			setIsLoadingSaving(false);
		}
	};

	useEffect(() => {
		if (councilPostsResponse && councilPostsResponse.data) {
			setPosts(councilPostsResponse.data);
		} else {
			setPosts([]);
		}
	}, [councilPostsResponse, userData?.councilId]);

	const columns = useMemo<MRT_ColumnDef<ScreeningVerificationListProps>[]>(
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
				accessorKey: "authorEmail",
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
		enableRowActions: true,
		defaultColumn: {
			minSize: 20,
			maxSize: 50,
		},
		initialState: {
			density: "comfortable",
		},
		state: {
			isLoading:
				isLoadingCouncilPostResponse ||
				isLoadingSaving ||
				isValidatingCouncilPostResponse,
		},
		renderRowActionMenuItems: ({ row }) => [
			<MenuItem
				key='markChecked'
				onClick={() => {
					handleSavePost(row.original);
				}}
				hidden={
					CheckingStatus.CHECKED.toString() === row.original.status
				}
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				Mark CHECKED
				<CheckCircleIcon />
			</MenuItem>,
			<MenuItem
				key='markPostive'
				onClick={() => {
					handleSaveInfectionResult(row.original.postId, "positive");
				}}
				hidden={row.original.result === "positive"}
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				Mark as POSTIVE
				<CheckCircleIcon />
			</MenuItem>,
			<MenuItem
				key='markPostive'
				onClick={() => {
					handleSaveInfectionResult(row.original.postId, "negative");
				}}
				hidden={row.original.result === "negative"}
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				Mark as NEGATIVE
				<CheckCircleIcon />
			</MenuItem>,
			<MenuItem
				key='contact'
				onClick={() =>
					window.open(
						`mailto:${row.original.authorEmail}?subject=Confirmation of Dengue Infection (Post ID: ${row.original.postId})`
					)
				}
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				Contact
				<EmailIcon />
			</MenuItem>,
		],
	});

	return isLoadingCouncilPostResponse || isValidatingCouncilPostResponse ? (
		<LoadingComponent text='Loading...' />
	) : posts ? (
		<MaterialReactTable table={table} />
	) : (
		<NotFoundComponent notfound='No Councils' />
	);
}
