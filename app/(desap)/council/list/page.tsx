"use client";
import CouncilList from "@/shared/components/council-list/listCouncil";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";
import materialUITheme from "@/shared/static/muiTheme";
import { Center, Text } from "@chakra-ui/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Role } from "@prisma/client";

const CouncilListPage = () => {
	const { userData } = useUser();

	return (
		<>
			<PageHeader title={`Council List`} />
			<AppRouterCacheProvider>
				<ThemeProvider theme={materialUITheme}>
					<CouncilList />
				</ThemeProvider>
			</AppRouterCacheProvider>
		</>
	);
};

export default CouncilListPage;
