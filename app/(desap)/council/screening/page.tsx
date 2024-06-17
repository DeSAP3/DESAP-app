"use client";
import ScreeningVerificationList from "@/shared/components/council-screening/listScreenVerify";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";
import materialUITheme from "@/shared/static/muiTheme";
import { Center, Text } from "@chakra-ui/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Role } from "@prisma/client";

const CouncilScreeningVerificationPage = () => {
	const { userData } = useUser();

	if (userData.councilId === null) {
		return (
			<>
				<PageHeader title={`Council Screening Verification`} />
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
			<PageHeader title={`Council Screening Verification`} />
			<AppRouterCacheProvider>
				<ThemeProvider theme={materialUITheme}>
					<ScreeningVerificationList />
				</ThemeProvider>
			</AppRouterCacheProvider>
		</>
	);
};

export default CouncilScreeningVerificationPage;
