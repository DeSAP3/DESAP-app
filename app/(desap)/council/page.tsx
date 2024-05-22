"use client";
import AddCouncil from "@/shared/components/council-component/addCouncil";
import JoinedCouncil from "@/shared/components/council-component/joinedCouncil";
import CouncilList from "@/shared/components/council-component/listCouncil";
import ScreeningVerificationList from "@/shared/components/council-component/listScreenVerify";
import { useUser } from "@/shared/providers/userProvider";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/(desap)/theme";

const leaderScope = [
	{
		scopeName: "Create Council",
		component: <AddCouncil />,
	},
	{
		scopeName: "My Council",
		component: <JoinedCouncil />,
	},
	{
		scopeName: "Council List",
		component: (
			<AppRouterCacheProvider>
				<ThemeProvider theme={theme}>
					<CouncilList />
				</ThemeProvider>
			</AppRouterCacheProvider>
		),
	},
	{
		scopeName: "Screenings Verification List",
		component: (
			<AppRouterCacheProvider>
				<ThemeProvider theme={theme}>
					<ScreeningVerificationList />
				</ThemeProvider>
			</AppRouterCacheProvider>
		),
	},
];
const memberScope = [
	{
		scopeName: "My Council",
		component: <JoinedCouncil />,
	},
	{
		scopeName: "Council List",
		component: (
			<AppRouterCacheProvider>
				<ThemeProvider theme={theme}>
					<CouncilList />
				</ThemeProvider>
			</AppRouterCacheProvider>
		),
	},
];

const CouncilPage = () => {
	const { userData } = useUser();
	return (
		<Box width={"90%"} marginY={5} marginX={"auto"}>
			<Tabs isFitted variant='soft-rounded' colorScheme='gray'>
				<TabList mb='1em'>
					{userData.role === "Community Leader"
						? leaderScope.map((scope, index) => (
								<Tab key={index}>{scope.scopeName}</Tab>
						  ))
						: memberScope.map((scope, index) => (
								<Tab key={index}>{scope.scopeName}</Tab>
						  ))}
				</TabList>
				<TabPanels>
					{userData.role === "Community Leader"
						? leaderScope.map((scope, index) => (
								<TabPanel key={index}>
									{scope.component}
								</TabPanel>
						  ))
						: memberScope.map((scope, index) => (
								<TabPanel key={index}>
									{scope.component}
								</TabPanel>
						  ))}
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default CouncilPage;
