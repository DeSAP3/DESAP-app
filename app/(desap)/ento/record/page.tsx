"use client";

import AnalysisTable from "@/shared/components/ento-record/AnalysisTable";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import materialUITheme from "@/shared/static/muiTheme";
import { Center, } from "@chakra-ui/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

export default function Record() {
	return (
		<>
			<PageHeader title={`Calculation Record`} />
			<Center mt={10}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={materialUITheme}>
						<AnalysisTable />
					</ThemeProvider>
				</AppRouterCacheProvider>
			</Center>
		</>
	);
}
