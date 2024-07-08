"use client";
import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Button,
	Center,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Portal,
	SimpleGrid,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdExit } from "react-icons/io";
import useSWR, { mutate } from "swr";
import ErrorComponent from "../error";
import LoadingComponent from "../loading";
import { Role } from "@prisma/client";

interface CouncilLayoutProps {
	id: number;
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
}

interface ApiResponseMembers {
	data: CouncilLayoutProps[];
	status: number;
	message: string;
	error?: string;
}

interface ApiResponseLeaders {
	data: CouncilLayoutProps;
	status: number;
	message: string;
	error?: string;
}

export const CouncilLayout = () => {
	const toast = useToast();
	const { userData } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const {
		data: membersResponse,
		isLoading: isLoadingMembersResponse,
		isValidating: isValidatingMembersResponse,
		error: membersError,
		mutate: mutateMembersRes,
	} = useSWR<ApiResponseMembers>(
		userData.councilId !== null &&
			`/api/council/readMemberByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
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

	if (membersError) {
		return <ErrorComponent error={membersError} />;
	}

	if (isLoadingMembersResponse && isValidatingMembersResponse) {
		return (
			<LoadingComponent text='Constructing Council Layout...Searching members...' />
		);
	}

	if (leaderError) {
		return <ErrorComponent error={leaderError} />;
	}
	if (isLoadingLeaderResponse && isValidatingLeaderResponse) {
		return (
			<LoadingComponent text='Constructing Council Layout...Searching leader...' />
		);
	}

	if (!membersResponse || !leaderResponse) {
		return <ErrorComponent error='Error.Something went wrong' />;
	}

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			gap={"10px"}
			justifyContent={"center"}
		>
			<>
				<Center>
					{leaderResponse.data === null ? (
						<Text border='1px' padding='3px' as='button'>
							Council Leader not found
						</Text>
					) : (
						leaderResponse.data && (
							<Popover>
								<PopoverTrigger>
									<Text
										fontWeight={"bold"}
										border='1px'
										padding='3px'
										as='button'
									>
										{leaderResponse.data.userName}
									</Text>
								</PopoverTrigger>
								<Portal>
									<PopoverContent>
										<PopoverArrow />
										<PopoverCloseButton />
										<PopoverBody>
											<Text>
												<b>Role : </b>
												{leaderResponse.data.role}
											</Text>
											<Text>
												<b>Email : </b>
												{leaderResponse.data.email}
											</Text>
											<Text>
												<b>Living Address : </b>
												{
													leaderResponse.data
														.livingAddress
												}
											</Text>
										</PopoverBody>
									</PopoverContent>
								</Portal>
							</Popover>
						)
					)}
				</Center>
				<Center>
					<SimpleGrid
						minChildWidth='120px'
						spacing='10px'
						display={"flex"}
					>
						{(membersResponse && membersResponse.data === null) ||
						membersResponse.data.length === 0 ? (
							<Text border='1px' padding='3px' as='button'>
								Council Members not found
							</Text>
						) : (
							membersResponse.data.map((user) => (
								<Popover key={user.email}>
									<PopoverTrigger>
										<Text
											border='1px'
											padding='3px'
											as='button'
										>
											{user.userName}
										</Text>
									</PopoverTrigger>
									<Portal>
										<PopoverContent>
											<PopoverArrow />
											<PopoverCloseButton />
											<PopoverBody>
												<Text>
													<b>Role : </b>
													{user.role ?? "null"}
												</Text>
												<Text>
													<b>Email : </b>
													{user.email ?? "null"}
												</Text>
												<Text>
													<b>Living Address : </b>
													{user.livingAddress ??
														"null"}
												</Text>
												{userData.role ===
													Role.COMMUNITY_LEADER && (
													<Center>
														<Button
															colorScheme='red'
															bg={
																"brand.rejectbutton"
															}
															size={"sm"}
															onClick={async () => {
																setIsLoading(
																	true
																);
																const response =
																	await fetch(
																		`/api/council/deleteMember?memberId=${user.id}`,
																		{
																			method: "PUT",
																			headers:
																				{
																					"Content-Type":
																						"application/json",
																				},
																		}
																	).then(
																		(res) =>
																			res.json()
																	);
																toast({
																	title:
																		response.status ===
																		200
																			? response.message
																			: response.error,
																	status:
																		response.status ===
																		200
																			? "success"
																			: "error",
																	duration: 3000,
																	isClosable:
																		true,
																	position:
																		"bottom-right",
																});
																if (
																	response.status ===
																	200
																) {
																	mutateMembersRes();
																}
																setIsLoading(
																	false
																);
															}}
														>
															Remove
															<Box width='5px' />
															<IoMdExit />
														</Button>
													</Center>
												)}
											</PopoverBody>
										</PopoverContent>
									</Portal>
								</Popover>
							))
						)}
					</SimpleGrid>
				</Center>
			</>
		</Box>
	);
};
