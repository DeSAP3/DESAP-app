"use client";

import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Logo from "./Logo";


export default function Footer() {
	return (
		<Box
			as='footer'
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			p={10} 
			mt='auto' 
			position={"relative"}
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
