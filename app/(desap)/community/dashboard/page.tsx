"use client";
import InformationCard from "@/shared/components/dashboard-component/InformationCard";
import Loading from "@/shared/components/loading";
import { useUser } from "@/shared/providers/userProvider";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Center,
	Container,
	Flex,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();
	const { data: session } = useSession();
	const { userData, isLoadingUser } = useUser();

	if (!session) {
		return (
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Dashboard
				</Text>
			</Center>
		);
	}

	return (
		<>
			<Container maxW='container.md' paddingY={5}>
				<Center pt={3}>
					<Text as={"u"} fontSize='2xl' fontWeight='bold'>
						Dashboard
					</Text>
				</Center>
			</Container>
			{isLoadingUser ? (
				<Loading loading='Getting user information...' />
			) : (
				<Container maxW='90%' paddingY={5}>
					<Flex
						align='center'
						justifyContent={"space-between"}
						paddingBottom={2}
					>
						<Text>
							Welcome <b> {session?.user.username}</b>,
						</Text>
						<Button
							colorScheme={"green"}
							bg={"black"}
							_hover={{
								bg: "#222831",
							}}
							onClick={() => router.push("/community/screening")}
						>
							<SmallAddIcon />
						</Button>
					</Flex>
					<SimpleGrid columns={1} spacing='20px'>
						{userData.councilId === null && (
							<InformationCard
								description='Click the button below to create or join a council.'
								component={
									<ButtonGroup spacing='2'>
										{userData.role ===
											"Community Member" && (
											<Button
												variant='solid'
												colorScheme='blue'
												onClick={() => router.push("/council/join")}
											>
												Join Council
											</Button>
										)}
										{userData.role ===
											"Community Leader" && (
											<Button
												variant='ghost'
												colorScheme='blue'
												onClick={() => router.push("/council/create")}
											>
												Create Council
											</Button>
										)}
									</ButtonGroup>
								}
							/>
						)}
					</SimpleGrid>
				</Container>
			)}
		</>
	);
}
