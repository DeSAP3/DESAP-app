"use client";
import AddCouncil from "@/shared/components/council-component/addCouncil";
import JoinedCouncil from "@/shared/components/council-component/joinedCouncil";
import CouncilList from "@/shared/components/council-component/listCouncil";
import ScreeningVerificationList from "@/shared/components/council-component/listScreenVerify";
import { useUser } from "@/shared/providers/userProvider";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

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
		component: <CouncilList />,
	},
	{
		scopeName: "Screenings Verification List",
        component: <ScreeningVerificationList />,
	},
];
const memberScope = [
	{
		scopeName: "My Council",
		component: <JoinedCouncil />,
	},
	{
		scopeName: "Council List",
		component: <CouncilList />,
	},
];

const CouncilPage = () => {
	const { userData } = useUser();
	return (
		<Box width={"90%"} marginY={5} marginX={"auto"}>
			<Tabs isFitted variant='soft-rounded' colorScheme='gray'>
				<TabList mb='1em'>
					{userData.role === "Community Leader"
						? leaderScope.map((scope) => (
								<Tab>{scope.scopeName}</Tab>
						  ))
						: memberScope.map((scope) => (
								<Tab>{scope.scopeName}</Tab>
						  ))}
				</TabList>
				<TabPanels>
					{userData.role === "Community Leader"
						? leaderScope.map((scope) => (
								<TabPanel>{scope.component}</TabPanel>
						  ))
						: memberScope.map((scope) => (
								<TabPanel>{scope.component}</TabPanel>
						  ))}
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default CouncilPage;
