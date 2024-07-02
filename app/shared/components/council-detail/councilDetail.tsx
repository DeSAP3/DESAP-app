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
	Tr,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdExit } from "react-icons/io";
import useSWR from "swr";
import LoadingComponent from "../loading";
import { CouncilLayout } from "./councilLayout";
import { Council } from "@prisma/client";

export default function CouncilDetail() {
	const toast = useToast();
	const router = useRouter();
	const [council, setCouncil] = useState<Council>();
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
				title: `You have successfully quit the council: ${council?.name}.`,
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
				.then((data) => {
					setCouncil(data.data);
				})
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
									<Td>{council?.name}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Area Address
									</Td>
									<Td>{council?.address}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Council City</Td>
									<Td>{council?.city}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Council State</Td>
									<Td>{council?.state}</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Leader Contact
									</Td>
									<Td>
										{council?.leaderEmail}
										&nbsp;
										{userData.email ===
											council?.leaderEmail && (
											<b>(YOU)</b>
										)}
									</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>
										Council Created At
									</Td>
									<Td>
										{council?.createdAt &&
											new Date(
												council?.createdAt
											).toLocaleString()}
									</Td>
								</Tr>
								<Tr>
									<Td fontWeight={"bold"}>Created By</Td>
									<Td>
										{council?.createdBy}
										&nbsp;
										{userData.email ===
											council?.createdBy && <b>(YOU)</b>}
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
