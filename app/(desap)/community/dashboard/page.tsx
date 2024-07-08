"use client";
import InformationCard from "@/shared/components/community-dashboard/InformationCard";
import ErrorComponent from "@/shared/components/error";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import LoadingComponent from "@/shared/components/loading";
import { useUser } from "@/shared/providers/userProvider";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	Flex,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { Box } from "@mui/material";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface DashboardProps {
	postId: number;
	title: string;
	content: string;
	result: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	authorUsername: string;
	authorEmail: string;
	authorRole: string;
}

interface ApiResponse {
	data: DashboardProps[];
	status: number;
	message: string;
}

export default function Dashboard() {
	const router = useRouter();
	const { data: session } = useSession();
	const { userData, isLoadingUserResponse } = useUser();

	const {
		data: postResponse,
		isLoading: isLoadingPostResponse,
		isValidating,
		error,
	} = useSWR<ApiResponse>(
		`/api/dashboard/readAllByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json()),
		{ revalidateOnMount: true }
	);

	if (error) {
		return <ErrorComponent error={error} />;
	}

	if (!postResponse || isLoadingPostResponse || isValidating) {
		return <LoadingComponent text='Retrieving council posts...' />;
	}

	if (!postResponse) {
		return <ErrorComponent error='Error. Something went wrong' />;
	}

	return (
		<>
			<PageHeader title={`Dashboard`} />
			{userData.livingAddress === null && (
				<Alert status='warning'>
					<AlertIcon />
					<AlertTitle>Living Address Not Added!</AlertTitle>
					<AlertDescription>
						Please procees to{" "}
						<a href='/community/profile'>
							<i>
								<u>user management</u>
							</i>
						</a>{" "}
						to upload your living address to allow leader to track
						you.
					</AlertDescription>
				</Alert>
			)}
			{isLoadingUserResponse ? (
				<LoadingComponent text='Getting user information...' />
			) : (
				<Container maxW='90%' paddingY={5}>
					<Flex
						align='center'
						justifyContent={"space-between"}
						paddingBottom={2}
					>
						<Text>
							Welcome <b> {session?.user.username as string}</b>,
						</Text>
						<Button
							colorScheme={"green"}
							bg={"brand.acceptbutton"}
							onClick={() => router.push("/community/screening")}
						>
							<SmallAddIcon />
						</Button>
					</Flex>
					<SimpleGrid columns={1} spacing='20px'>
						{userData.councilId === null && (
							<InformationCard
								description='Click the button below to create or join a council. Joining a council will automatically share your infection status.'
								component={
									<ButtonGroup spacing='2'>
										{userData.role ===
											Role.COMMUNITY_MEMBER && (
											<Button
												variant='solid'
												colorScheme='green'
												bg={"brand.acceptbutton"}
												onClick={() =>
													router.push("/council/list")
												}
											>
												Join Council
											</Button>
										)}
										{userData.role ===
											Role.COMMUNITY_LEADER && (
											<Button
												variant='solid'
												bg={"brand.acceptbutton"}
												color={"white"}
												onClick={() =>
													router.push("/council/new")
												}
											>
												Create Council
											</Button>
										)}
									</ButtonGroup>
								}
							/>
						)}
						{ userData.councilId !== null &&
						postResponse.data.length === 0 ? (
							<Box padding={5} bgcolor={"#b1c8c8"}>
								No Post in this council yet
							</Box>
						) : (
							postResponse.data.map((post) => (
								<InformationCard
									key={post.postId}
									showAvatar={true}
									title={post.title}
									description={post.content ?? ""}
									authorName={post.authorUsername}
									authorEmail={post.authorEmail}
									status={post.status}
									result={post.result}
									createdAt={post.createdAt}
									updatedAt={post.updatedAt}
								/>
							))
						)}
					</SimpleGrid>
				</Container>
			)}
		</>
	);
}
