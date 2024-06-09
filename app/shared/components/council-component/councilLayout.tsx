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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

type CouncilLayoutProps = {
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
};

export const CouncilLayout = () => {
	const { userData, isLoadingUserResponse } = useUser();
	const [councilLeader, setCouncilLeader] = useState<CouncilLayoutProps>();
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
		const leader = userList.find((user) => user.role === "Community Leader");
        console.log(userList);
	}, [userList]);

	return (
		<>
			<Box display={"flex"} flexDirection={"column"} gap={"10px"}>
				<Box fontWeight={"bold"}>
					<Popover>
						<PopoverTrigger>
							<Text>{councilLeader?.userName ?? "No"}</Text>
						</PopoverTrigger>
						<Portal>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverBody>
									<Text>Content</Text>
								</PopoverBody>
							</PopoverContent>
						</Portal>
					</Popover>
				</Box>
				{/* <SimpleGrid minChildWidth='100px' spacing='10px'>
						{userList.length > 0 && userList.map((user) => (
							<Popover key={user.email}>
								<PopoverTrigger>
									<Text>{user.userName}</Text>
								</PopoverTrigger>
								<Portal>
									<PopoverContent>
										<PopoverArrow />
										<PopoverCloseButton />
										<PopoverBody>
											<Text>Content</Text>
										</PopoverBody>
									</PopoverContent>
								</Portal>
							</Popover>
						))}
					</SimpleGrid> */}
			</Box>
		</>
	);
};
