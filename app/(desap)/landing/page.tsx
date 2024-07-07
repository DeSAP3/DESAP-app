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
								href='/ento/opencv'
								rounded={"full"}
								px={6}
								colorScheme={"green"}
								bg={"brand.acceptbutton"}
							>
								Analyze Mosquito Larvae Count in Image
							</Button>
							<Button
								as={"a"}
								href='/ento/calculator'
								rounded={"full"}
								px={6}
								colorScheme={"green"}
								bg={"brand.acceptbutton"}
							>
								Analyze Larvae Count in Image
							</Button>
						</>
					) : userData.role === Role.COMMUNITY_MEMBER ? (
						<>
							<Button
								as={"a"}
								href='/community/dashboard'
								colorScheme={"green"}
								bg={"brand.acceptbutton"}
								rounded={"full"}
								px={6}
							>
								View Council Activity
							</Button>
							{userData.councilId === null && (
								<Button
									as={"a"}
									href='/council/list'
									rounded={"full"}
									px={6}
									colorScheme={"green"}
									bg={"brand.acceptbutton"}
								>
									Join A Council
								</Button>
							)}
						</>
					) : userData.role === Role.COMMUNITY_LEADER ? (
						<>
							<Button
								as={"a"}
								href='/community/dashboard'
								rounded={"full"}
								px={6}
								colorScheme={"green"}
								bg={"brand.acceptbutton"}
							>
								View Council Activity
							</Button>
							{userData.councilId === null ? (
								<Button
									as={"a"}
									href='/council/new'
									colorScheme={"green"}
									bg={"brand.acceptbutton"}
									rounded={"full"}
									px={6}
								>
									Become A Manager of Council
								</Button>
							) : (
								<Button
									as={"a"}
									href='/council/detail'
									colorScheme={"green"}
									bg={"brand.acceptbutton"}
									rounded={"full"}
									px={6}
								>
									View Your Council
								</Button>
							)}
						</>
					) : null}
				</Stack>
			</Stack>
		</Container>
	);
}
