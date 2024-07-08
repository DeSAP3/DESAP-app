"use client";
import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdExit } from "react-icons/io";
import useSWR from "swr";
import LoadingComponent from "../loading";
import { CouncilLayout } from "./councilLayout";
import { Council } from "@prisma/client";
import ErrorComponent from "../error";

interface ApiResponse {
	data: Council;
	status: number;
	message: string;
	error?: string;
}

interface CouncilLayoutProps {
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
}
interface ApiResponseLeaders {
	data: CouncilLayoutProps;
	status: number;
	message: string;
	error?: string;
}

export default function CouncilDetail() {
	const toast = useToast();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { userData, setUserData, mutateUser, isLoadingUserResponse } =
		useUser();

	const {
		data: councilResponse,
		isLoading: isLoadingCouncil,
		isValidating: isValidatingCouncil,
		error,
	} = useSWR<ApiResponse>(
		userData.councilId !== null &&
			`/api/council/readByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request) => fetch(url).then((res) => res.json())
	);

	const {
		data: leaderResponse,
		isLoading: isLoadingLeaderResponse,
		isValidating: isValidatingLeaderResponse,
		error: leaderError,
	} = useSWR<ApiResponseLeaders>(
		userData.councilId !== null &&
			`/api/council/readLeaderByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	if (error) {
		return <ErrorComponent error={error} />;
	}

	if (isLoadingCouncil || isValidatingCouncil || isLoadingUserResponse) {
		return <LoadingComponent text='Retrieving council detail...' />;
	}
	if (!councilResponse) {
		return <ErrorComponent error='Error. Something went wrong' />;
	}

	if (leaderError) {
		return <ErrorComponent error={leaderError} />;
	}
	if (isLoadingLeaderResponse && isValidatingLeaderResponse) {
		return (
			<LoadingComponent text='Constructing Council Layout...Searching leader...' />
		);
	}

	const handleQuitCouncil = async () => {
		if (window.confirm("Are you sure you want to quit the council?")) {
			setIsLoading(true);
			const updatedUserData = {
				...userData,
				councilId: null,
			};
			setUserData(updatedUserData);
			const response = await fetch("/api/profile/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userData: updatedUserData,
				}),
			}).then((res) => res.json());
			if (userData.role === "COMMUNITY_LEADER") {
				await fetch(
					`/api/council/removeLeader?councilId=${userData.councilId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
			}
			if (response.status === 200) {
				mutateUser();
				toast({
					title: `You have successfully quit the council: ${councilResponse.data.name}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "bottom-right",
				});
			} else {
				toast({
					title: response.error,
					status: "error",
					duration: 3000,
					isClosable: true,
					position: "bottom-right",
				});
			}
		}
		router.push("/community/dashboard");
		setIsLoading(false);
	};

	return (
		<Container maxWidth={"80%"} paddingY={5} justifyContent={"center"}>
			<TableContainer marginY={5}>
				{isLoadingCouncil ? (
					<LoadingComponent text='Loading Council...' />
				) : councilResponse.data === null ? (
					<ErrorComponent error='There are no council.' />
				) : (
					councilResponse.data && (
						<>
							<Table size='sm'>
								<Tbody>
									<Tr>
										<Td fontWeight={"bold"}>
											Council Name
										</Td>
										<Td>{councilResponse.data.name}</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council Area Address
										</Td>
										<Td>{councilResponse.data.address}</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council City
										</Td>
										<Td>{councilResponse.data.city}</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council State
										</Td>
										<Td>{councilResponse.data.state}</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council Leader Contact
										</Td>
										<Td>
											{leaderResponse &&
											leaderResponse.data ? (
												leaderResponse.data.email
											) : (
												<i>Leader not found</i>
											)}
											&nbsp;
											{userData.id ===
												councilResponse.data
													.leaderId && <b>(YOU)</b>}
										</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council Created At
										</Td>
										<Td>
											{councilResponse.data.createdAt &&
												new Date(
													councilResponse.data.createdAt
												).toLocaleString()}
										</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>Created By</Td>
										<Td>
											{councilResponse.data.createdBy}
											&nbsp;
											{userData.id ===
												councilResponse.data
													.leaderId && <b>(YOU)</b>}
										</Td>
									</Tr>
									<Tr>
										<Td fontWeight={"bold"}>
											Council Layout
										</Td>
										<Td>
											<CouncilLayout />
										</Td>
									</Tr>
								</Tbody>
							</Table>
							<Center
								gap={3}
								paddingTop={5}
								display={"flex"}
								flexDirection={"column"}
							>
								{isLoading ? (
									<LoadingComponent text='Quiting...' />
								) : (
									<Button
										colorScheme='red'
										bg={"brand.rejectbutton"}
										onClick={handleQuitCouncil}
									>
										<Flex
											width='100%'
											justifyContent='space-between'
											align={"center"}
										>
											Quit
											<Box width='5px' />
											<IoMdExit />
										</Flex>
									</Button>
								)}
							</Center>
						</>
					)
				)}
			</TableContainer>
		</Container>
	);
}
