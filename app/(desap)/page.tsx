"use client";

import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function LandingPage() {
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
					Welcome to DESAP, the cutting-edge Environmental Analysis
					Platform, you can seamlessly analyze mosquito eggs and
					larvae through advanced image analysis and engage with your
					community. Whether you're part of the operation team saving
					calculation results, a community user conducting dengue
					screenings, sharing infection results
				</Text>
				<Stack
					direction={"row"}
					align={"center"}
					alignSelf={"center"}
					position={"relative"}
				>
					<Button
						as={"a"}
						href='/ento/opencv'
						colorScheme={"green"}
						bg={"brand.acceptbutton"}
						rounded={"full"}
						px={6}
					>
						Try Out Mosquito Egg Calculator
					</Button>
					<Button
						as={"a"}
						href='/ento/calculator'
						colorScheme={"green"}
						bg={"brand.acceptbutton"}
						rounded={"full"}
						px={6}
					>
						Try Out Larvae Calculator
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
}
