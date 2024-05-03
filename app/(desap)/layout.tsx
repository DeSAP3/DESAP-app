import Footer from "@/shared/components/general-component/Footer";
import Navbar from "@/shared/components/general-component/Navbar";
import AuthProvider from "@/shared/providers/authProvider";
import { SWRProvider } from "@/shared/providers/swrProvider";
import { UserProvider } from "@/shared/providers/userProvider";
import { Box, ChakraProvider } from "@chakra-ui/react";
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
			<head />
			<body
				style={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<SWRProvider>
					<ChakraProvider>
						<AuthProvider>
							<UserProvider>
								<Navbar />
								<Box style={{ flex: "1" }}>{children}</Box>
								<Footer />
							</UserProvider>
						</AuthProvider>
					</ChakraProvider>
				</SWRProvider>
			</body>
		</html>
	);
}
