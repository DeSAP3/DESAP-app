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
