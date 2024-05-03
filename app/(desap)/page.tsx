"use client";

import {
	Box,
	Heading,
	Container,
	Text,
	Button,
	Stack,
} from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
	return (
		<Container maxW={"3xl"}>
			<Stack
				as={Box}
				textAlign={"center"}
				spacing={{ base: 8, md: 14 }}
				py={{ base: 20, md: 36 }}
			>
				<Heading
					fontWeight={600}
					fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}
				>
					Introducing DESAP: <br />
					<Text as={"span"} color={"#3e3030"}>
						Empowering Dengue Analysis Platform
					</Text>
				</Heading>
				<Text color={"gray.500"}>
					Welcome to DESAP, the revolutionary Environmental Analysis
					Platform that transforms data into actionable insights. With
					DESAP, you can effortlessly analyze key environmental
					indicators, predict dengue outbreaks, and make informed
					decisions to safeguard your community.
				</Text>
				<Stack
					direction={"row"}
					spacing={3}
					align={"center"}
					alignSelf={"center"}
					position={"relative"}
				>
					<Button
						as={"a"}
						href='/ento/calculator'
						colorScheme={"green"}
						bg={"#393E46"}
						rounded={"full"}
						px={6}
						_hover={{
							bg: "#222831",
						}}
					>
						Analyze Image
					</Button>
					<Button
						as={"a"}
						href='/community/dashboard'
						colorScheme={"green"}
						bg={"#393E46"}
						rounded={"full"}
						px={6}
						_hover={{
							bg: "#222831",
						}}
					>
						Dengue Surveillance Community Version
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
}
