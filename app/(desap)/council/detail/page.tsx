"use client";
import CouncilDetail from "@/shared/components/council-detail/councilDetail";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";
import { Center, Text } from "@chakra-ui/react";
import { Role } from "@prisma/client";

const CouncilDetailPage = () => {
	const {userData} =useUser();

	if (userData.councilId === null) {
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
						{userData.role === Role.COMMUNITY_MEMBER && (
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
						{userData.role === Role.COMMUNITY_LEADER && (
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
