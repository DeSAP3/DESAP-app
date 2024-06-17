import Footer from "@/shared/components/general-component/layout-component/Footer";
import Navbar from "@/shared/components/general-component/layout-component/Navbar";
import { Providers } from "@/shared/providers/providers";
import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "DESAP@2022 Automated Calculation System",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
				<Providers>
					<Flex direction='column' minHeight='100vh'>
						<Navbar />
						<Box flex='1'>{children}</Box>
						<Footer />
					</Flex>
				</Providers>
			</body>
		</html>
	);
}
