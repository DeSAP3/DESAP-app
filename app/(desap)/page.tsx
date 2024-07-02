"use client";

import { useUser } from "@/shared/providers/userProvider";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { Role } from "@prisma/client";

export default function LandingPage() {
	const { userData } = useUser();
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
					{userData.role === Role.OPERATION_TEAM ? (
						<>
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
								Analyze Larvae Count in Image
							</Button>
							<Button
								as={"a"}
								href='/ento/record'
								colorScheme={"green"}
								bg={"#393E46"}
								rounded={"full"}
								px={6}
								_hover={{
									bg: "#222831",
								}}
							>
								Visualize Analyzed Image Result
							</Button>
						</>
					) : userData.role === Role.COMMUNITY_MEMBER ? (
						<>
							<Button
								as={"a"}
								href='/community/dahsboard'
								colorScheme={"green"}
								bg={"#393E46"}
								rounded={"full"}
								px={6}
								_hover={{
									bg: "#222831",
								}}
							>
								View Council Activity
							</Button>
							<Button
								as={"a"}
								href='/council/list'
								colorScheme={"green"}
								bg={"#393E46"}
								rounded={"full"}
								px={6}
								_hover={{
									bg: "#222831",
								}}
							>
								Join A Council
							</Button>
						</>
					) : userData.role === Role.COMMUNITY_LEADER ? (
						<>
							<Button
								as={"a"}
								href='/community/dahsboard'
								colorScheme={"green"}
								bg={"#393E46"}
								rounded={"full"}
								px={6}
								_hover={{
									bg: "#222831",
								}}
							>
								View Council Activity
							</Button>
							{userData.councilId === null ? (
								<Button
									as={"a"}
									href='/council/new'
									colorScheme={"green"}
									bg={"#393E46"}
									rounded={"full"}
									px={6}
									_hover={{
										bg: "#222831",
									}}
								>
									Become A Manager of Council
								</Button>
							) : (
								<Button
									as={"a"}
									href='/council/detail'
									colorScheme={"green"}
									bg={"#393E46"}
									rounded={"full"}
									px={6}
									_hover={{
										bg: "#222831",
									}}
								>
									View Your Council
								</Button>
							)}
						</>
					) : (
						<>
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
								Try Out Analyze Larvae Count in Image
							</Button>
							<Button
								as={"a"}
								href='/community/register'
								colorScheme={"green"}
								bg={"#393E46"}
								rounded={"full"}
								px={6}
								_hover={{
									bg: "#222831",
								}}
							>
								Register An Account for DESAP@2022
							</Button>
						</>
					)}
				</Stack>
			</Stack>
		</Container>
	);
}
