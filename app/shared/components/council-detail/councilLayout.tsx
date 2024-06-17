import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingComponent from "../loading";

type CouncilLayoutProps = {
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
};

export const CouncilLayout = () => {
	const { userData } = useUser();
	const [councilLeader, setCouncilLeader] = useState<CouncilLayoutProps>();
	const [councilMembers, setCouncilMembers] = useState<CouncilLayoutProps[]>(
		[]
	);
	const { data: usersMemberResponse, isLoading: isLoadingUsersMember } =
		useSWR(
			`/api/council/readMemberByCouncilId?councilId=${userData?.councilId}`,
			(url: string | URL | Request): Promise<any> =>
				fetch(url)
					.then((res) => res.json())
					.then((res) => setCouncilMembers(res.data))
		);

	const { data: usersLeaderResponse, isLoading: isLoadingUsersLeader } =
		useSWR(
			`/api/council/readLeaderByCouncilId?councilId=${userData?.councilId}`,
			(url: string | URL | Request): Promise<any> =>
				fetch(url)
					.then((res) => res.json())
					.then((res) => setCouncilLeader(res.data))
		);

	// useEffect(() => {
	// 	console.log(usersLeaderResponse);
	// 	if (usersLeaderResponse) {
	// 		setCouncilLeader(usersLeaderResponse);
	// 	} else {
	// 		setCouncilLeader([]);
	// 	}
	// }, [usersLeaderResponse]);

	// useEffect(() => {
	// 	console.log(usersMemberResponse);
	// 	if (usersMemberResponse) {
	// 		setCouncilMembers(usersMemberResponse);
	// 	} else {
	// 		setCouncilMembers([]);
	// 	}
	// }, [usersMemberResponse]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			gap={"10px"}
			justifyContent={"center"}
		>
			{isLoadingUsersMember && isLoadingUsersLeader ? (
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
							{councilMembers.length > 0 ? (
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
								))
							) : (
								<></>
							)}
						</SimpleGrid>
					</Center>
				</>
			)}
		</Box>
	);
};
