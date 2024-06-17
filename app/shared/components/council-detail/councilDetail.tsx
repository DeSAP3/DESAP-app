import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import LoadingComponent from "../loading";
import { CouncilLayout } from "./councilLayout";
import { Role } from "@prisma/client";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function CouncilDetail() {
	const toast = useToast();
	const router = useRouter();
	const [council, setCouncil] = useState({
		councilName: "",
		councilCity: "",
		councilState: "",
		councilAddress: "",
		councilCreatedAt: "",
		councilCreatedBy: "",
		councilLeaderEmail: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { userData, setUserData, mutateUser } = useUser();

	const handleQuitCouncil = async () => {
		setIsLoading(true);
		if (window.confirm("Are you sure you want to quit the council?")) {
			const updatedUserData = {
				...userData,
				councilId: null,
			};
			setUserData(updatedUserData);
			await fetch("/api/profile/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userData: updatedUserData,
				}),
			});
			mutateUser();
			toast({
				title: `You have successfully quit the council: ${council.councilName}.`,
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		}
		router.push("/community/dashboard");
		setIsLoading(false);
	};

	const { isLoading: isLoadingCouncil } = useSWR(
		`/api/council/readByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request) =>
			fetch(url)
				.then((res) => res.json())
				.then((data) =>
					setCouncil({
						councilName: data.name,
						councilCity: data.city,
						councilState: data.state,
						councilAddress: data.address,
						councilCreatedAt: data.createdAt,
						councilCreatedBy: data.createdBy,
						councilLeaderEmail: data.leaderEmail,
					})
				)
	);

	
	return (
		<Container maxWidth={"80%"} paddingY={5} justifyContent={"center"}>
			<TableContainer marginY={5}>
				{isLoadingCouncil ? (
					<LoadingComponent text='Loading Council...' />
				) : (
					<>
						<Table size='sm'>
							<Tbody>
								<Tr>
									<Td fontWeight={"bold"}>Council Name</Td>
									<Td>{council.councilName}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Area Address
									</Td>
									<Td>{council.councilAddress}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Council City</Td>
									<Td>{council.councilCity}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Council State</Td>
									<Td>{council.councilState}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Leader Contact
									</Td>
									<Td>
										{council.councilLeaderEmail}
										&nbsp;
										{userData.email ===
											council.councilCreatedBy && (
											<b>(YOU)</b>
										)}
									</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Created At
									</Td>
									<Td>
										{new Date(
											council.councilCreatedAt
										).toLocaleDateString(undefined, {
											day: "numeric",
											month: "long",
											year: "numeric",
											hour: "numeric",
											minute: "numeric",
											second: "numeric",
										})}
									</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Created By</Td>
									<Td>
										{council.councilCreatedBy}
										&nbsp;
										{userData.email ===
											council.councilCreatedBy && (
											<b>(YOU)</b>
										)}
									</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Council Layout</Td>
									<Td>
										<CouncilLayout />
									</Td>
								</Tr>
							</Tbody>
						</Table>
						<Center
							gap={3}
							paddingTop={5}
							display={"flex"}
							flexDirection={"column"}
						>
							{isLoading ? (
								<LoadingComponent text='Quiting...' />
							) : (
								<Button
									colorScheme='red'
									bg={"brand.rejectbutton"}
									onClick={handleQuitCouncil}
								>
									<Flex
										width='100%'
										justifyContent='space-between'
										align={"center"}
									>
										Quit
										<Box width='5px' />
										<IoMdExit />
									</Flex>
								</Button>
							)}
						</Center>
					</>
				)}
			</TableContainer>
		</Container>
	);
}
