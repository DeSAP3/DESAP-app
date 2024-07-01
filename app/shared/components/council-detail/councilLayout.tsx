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
import ErrorComponent from "../error";

interface CouncilLayoutProps {
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
}

interface ApiResponseMembers {
	data: CouncilLayoutProps[];
	status: number;
	message: string;
}

interface ApiResponseLeaders {
	data: CouncilLayoutProps;
	status: number;
	message: string;
}

export const CouncilLayout = () => {
	const { userData } = useUser();
	const {
		data: membersResponse,
		isLoading: isLoadingMembersResponse,
		isValidating: isValidatingMembersResponse,
		error: membersError,
	} = useSWR<ApiResponseMembers>(
		`/api/council/readMemberByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	const {
		data: leaderResponse,
		isLoading: isLoadingLeaderResponse,
		isValidating: isValidatingLeaderResponse,
		error: leaderError,
	} = useSWR<ApiResponseLeaders>(
		`/api/council/readLeaderByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	if (
		!membersResponse ||
		!leaderResponse ||
		isLoadingMembersResponse ||
		isLoadingLeaderResponse ||
		isValidatingMembersResponse ||
		isValidatingLeaderResponse
	) {
		return <LoadingComponent text='Constructing Council Layout...' />;
	}

	if (membersError || membersResponse.status !== 200) {
		return <ErrorComponent error={membersResponse.message} />;
	}

	if (leaderError || leaderResponse.status !== 200) {
		return <ErrorComponent error={leaderResponse.message} />;
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
					{leaderResponse.data ? (
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
											{leaderResponse.data.livingAddress}
										</Text>
									</PopoverBody>
								</PopoverContent>
							</Portal>
						</Popover>
					) : (
						<Text border='1px' padding='3px' as='button'>
							Council Leader not found
						</Text>
					)}
				</Center>
				<Center>
					<SimpleGrid
						minChildWidth='120px'
						spacing='10px'
						display={"flex"}
					>
						{membersResponse.data.map((user) => (
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
												{user.livingAddress ?? "null"}
											</Text>
										</PopoverBody>
									</PopoverContent>
								</Portal>
							</Popover>
						))}
					</SimpleGrid>
				</Center>
			</>
		</Box>
	);
};
