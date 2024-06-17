"use client";
import CouncilDetail from "@/shared/components/council-detail/councilDetail";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";
import { Center, Text } from "@chakra-ui/react";
import { Role } from "@prisma/client";

const CouncilDetailPage = () => {
	const { userData } = useUser();

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
						To join a council, please visit the{" "}
						<i>
							<u>
								<a href='/council/list'>council list</a>
							</u>
						</i>
						{Role.COMMUNITY_LEADER.match(userData.role) ? (
							<>
								{" "}
								or create a new council via{" "}
								<i>
									<u>
										<a href='/council/new'>
											create council
										</a>
									</u>
								</i>
							</>
						) : (
							"."
						)}
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
