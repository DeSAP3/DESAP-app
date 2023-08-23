"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Cloudinary } from "@cloudinary/url-gen";


const inter = Inter({ subsets: ["latin"] });

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
				<ChakraProvider /* ... */>
					<Navbar />
					<Box style={{ flex: "1" }}>{children}</Box>
					<Footer />
				</ChakraProvider>
			</body>
		</html>
	);
}
