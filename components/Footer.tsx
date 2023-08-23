"use client";

import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import Logo from "./Logo";


export default function Footer() {
	return (
		<Box
			as='footer'
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			p={10} // Add padding to give some spacing
			mt='auto' // Use margin-top: auto to push footer to the bottom
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Logo>DESAP@2022 Automated Calculation System</Logo>
				<Text>
					© Dengue Entomology Surveillance Application 2022. All
					rights reserved
				</Text>
			</Container>
		</Box>
	);
}
