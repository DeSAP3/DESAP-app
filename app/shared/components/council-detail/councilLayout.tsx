import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Popover,
	PopoverArrow,
	Text,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Portal,
	SimpleGrid,
	Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingComponent from "../loading";
import useSWR from "swr";
import { Role } from "@prisma/client";

type CouncilLayoutProps = {
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
};

export const CouncilLayout = () => {
	const { userData } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [councilLeader, setCouncilLeader] = useState<CouncilLayoutProps>();
	const [councilMembers, setCouncilMembers] = useState<CouncilLayoutProps[]>(
		[]
	);
	const [userList, setUserList] = useState<CouncilLayoutProps[]>([]);
	const { data: usersResponse, isLoading: isLoadingUsers } = useSWR(
		`/api/council/readMemberByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (usersResponse) {
			setUserList(usersResponse.data);
		}
	}, [usersResponse]);

	useEffect(() => {
		setIsLoading(true);
		const leader = userList.find(
			(user) => user.role === Role.COMMUNITY_LEADER.valueOf()
		);
		const newUserList = userList.filter(
			(user) => user.role !== Role.COMMUNITY_LEADER.valueOf()
		);
		setCouncilLeader(leader);
		setCouncilMembers(newUserList);
		setIsLoading(false);
	}, [userList]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			gap={"10px"}
			justifyContent={"center"}
		>
			{isLoadingUsers && isLoading ? (
				<LoadingComponent text='Loading Council Layout...' />
			) : (
				<>
					<Center>
						<Popover>
							<PopoverTrigger>
								<Text
									fontWeight={"bold"}
									border='1px'
									padding='3px'
									as='button'
								>
									{councilLeader?.userName ?? "No"}
								</Text>
							</PopoverTrigger>
							<Portal>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverBody>
										<Text>
											<b>Role : </b>
											{councilLeader?.role ?? "null"}
										</Text>
										<Text>
											<b>Email : </b>
											{councilLeader?.email ?? "null"}
										</Text>
										<Text>
											<b>Living Address : </b>
											{councilLeader?.livingAddress ??
												"null"}
										</Text>
									</PopoverBody>
								</PopoverContent>
							</Portal>
						</Popover>
					</Center>
					<Center>
						<SimpleGrid
							minChildWidth='120px'
							spacing='10px'
							display={"flex"}
						>
							{councilMembers.length > 0 &&
								councilMembers.map((user) => (
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
														{user?.role ?? "null"}
													</Text>
													<Text>
														<b>Email : </b>
														{user?.email ?? "null"}
													</Text>
													<Text>
														<b>Living Address : </b>
														{user?.livingAddress ??
															"null"}
													</Text>
												</PopoverBody>
											</PopoverContent>
										</Portal>
									</Popover>
								))}
						</SimpleGrid>
					</Center>
				</>
			)}
		</Box>
	);
};
