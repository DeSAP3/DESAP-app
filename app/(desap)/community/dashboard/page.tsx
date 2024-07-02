"use client";
import InformationCard from "@/shared/components/community-dashboard/InformationCard";
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
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

type DashboardProps = {
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
};

export default function Dashboard() {
	const router = useRouter();
	const { data: session } = useSession();
	const { userData, isLoadingUserResponse } = useUser();
	const [postList, setPostList] = useState<DashboardProps[]>([]);

	const { data: postResponse, isLoading: isLoadingPostResponse } = useSWR(
		`/api/dashboard/readAllByCouncilId?councilId=${userData?.councilId}`,
		(url: string | URL | Request): Promise<any> =>
			fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (postResponse) {
			setPostList(postResponse.data);
		} else {
			setPostList([]);
		}
	}, [postResponse]);

	if (!session) {
		return <PageHeader title={`Dashboard`} />;
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
							Welcome <b> {session?.user.username}</b>,
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
								description='Click the button below to create or join a council.'
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
						{isLoadingPostResponse ? (
							<LoadingComponent text='Loading Posts...' />
						) : userData.councilId !== null &&
						  postList.length > 0 ? (
							postList.map((post) => (
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
						) : (
							<></>
						)}
					</SimpleGrid>
				</Container>
			)}
		</>
	);
}
