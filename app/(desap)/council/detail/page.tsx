"use client";
import CouncilDetail from "@/shared/components/council-detail/councilDetail";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import LoadingComponent from "@/shared/components/loading";
import NotFoundComponet from "@/shared/components/notfound";
import { useUser } from "@/shared/providers/userProvider";
import { Center, Text } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const CouncilDetailPage = () => {
	const { data: session } = useSession();
	const {
		data: userResponse,
		isLoading: isLoadingUserResponse,
		isValidating: isValidatingUserResponse,
		mutate: mutateUser,
		error,
	} = useSWR(
		session?.user?.email
			? `/api/profile/readByEmail?email=${session.user.email}`
			: null,
		(url) => fetch(url).then((res) => res.json())
	);

	if (error) return <NotFoundComponet notfound={userResponse.error} />;
	if (!userResponse || isValidatingUserResponse)
		return <LoadingComponent text='Retrieving user...' />;

	if (userResponse.data && userResponse.data.role === null) {
		return (
			<>
				<PageHeader title={`Council Detail`} />
				<Center
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					marginY={5}
				>
					<Text>You have not joined any council.</Text>
					<Text>
						{userResponse.data.role === Role.COMMUNITY_MEMBER && (
							<>
								To join a council as Community Member, please
								visit the{" "}
								<i>
									<u>
										<a href='/council/list'>council list</a>
									</u>
								</i>
							</>
						)}
						{userResponse.data.role === Role.COMMUNITY_LEADER && (
							<>
								{" "}
								To join a council as Community Leader, please
								create your council via{" "}
								<i>
									<u>
										<a href='/council/new'>
											create council
										</a>
									</u>
								</i>
							</>
						)}
						.
					</Text>
				</Center>
			</>
		);
	}

	return (
		<>
			<PageHeader title={`Council Detail`} />
			<CouncilDetail />
		</>
	);
};

export default CouncilDetailPage;
