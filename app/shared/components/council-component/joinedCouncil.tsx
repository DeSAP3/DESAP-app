import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Input,
	SimpleGrid,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
	UseToastOptions,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdExit } from "react-icons/io";
import useSWR from "swr";
import Loading from "../loading";

const JoinedCouncil = () => {
	const toast = useToast();
	const { userData, setUserData } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [council, setCouncil] = useState({
		councilName: "",
		councilCity: "",
		councilState: "",
		councilAddress: "",
		councilCreatedAt: "",
		councilCreatedBy: "",
		councilLeaderEmail: "",
	});

	const { data: councilResponse, isLoading: isLoadingCouncil } = useSWR(
		`/api/council/readByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request) => fetch(url).then((res) => res.json())
	);

	if (userData.councilId === null) {
		return (
			<Center
				display={"flex"}
				flexDirection={"column"}
				gap={2}
				marginY={5}
			>
				<Text>You have not joined any council.</Text>
				<Text>
					To join a council, please visit the council list.
				</Text>
			</Center>
		);
	}

	useEffect(() => {
		if (councilResponse) {
			setCouncil({
				councilName: councilResponse.name,
				councilCity: councilResponse.city,
				councilState: councilResponse.state,
				councilAddress: councilResponse.address,
				councilCreatedAt: councilResponse.createdAt,
				councilCreatedBy: councilResponse.createdBy,
				councilLeaderEmail: councilResponse.leaderEmail,
			});
		}
	}, [councilResponse]);

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
			toast({
				title: `You have successfully quit the council: ${council.councilName}.`,
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		}
		setIsLoading(false);
	};

	return (
		<>
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Your Council
				</Text>
			</Center>
			{isLoadingCouncil ? (
				<Loading loading='Getting council information...' />
			) : isLoading ? <Loading loading='Updating council information...'/>: (
				<Container
					maxWidth={"80%"}
					paddingY={5}
					justifyContent={"center"}
				>
					{userData.role === "Community Member" &&
						MyCouncilTableView({ council, userData })}
					{userData.role === "Community Leader" &&
						MyCouncilTableEdit({
							council,
							userData,
							setCouncil,
							toast,
							setIsLoading,
						})}

					<Center>
						
							<Button
								colorScheme='red'
								_hover={{
									bg: "#b30000",
								}}
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
						
					</Center>
				</Container>
			)}
		</>
	);
};

const MyCouncilTableView = ({
	council,
	userData,
}: {
	council: any;
	userData: any;
}) => {
	return (
		<TableContainer marginY={5}>
			<Table size='sm'>
				<Tbody>
					<Tr>
						<Td fontWeight={"bold"}>Council Name</Td>
						<Td>{council.councilName}</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>Council Area Address</Td>
						<Td>{council.councilAddress}</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>City</Td>
						<Td>{council.councilCity}</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>State</Td>
						<Td>{council.councilState}</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>Council Leader Contact</Td>
						<Td>
							{council.councilLeaderEmail}
							&nbsp;
							{userData.email === council.councilCreatedBy && (
								<b>(YOU)</b>
							)}
						</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>Created At</Td>
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
							{userData.email === council.councilCreatedBy && (
								<b>(YOU)</b>
							)}
						</Td>
					</Tr>
					<Tr>
						<Td fontWeight={"bold"}>Member</Td>
						<Td>
							<SimpleGrid minChildWidth='100px' spacing='10px'>
								<Box bg='tomato' height='8px'></Box>
								<Box bg='tomato' height='8px'></Box>
								<Box bg='tomato' height='8px'></Box>
								<Box bg='tomato' height='8px'></Box>
								<Box bg='tomato' height='8px'></Box>
								<Box bg='tomato' height='8px'></Box>
							</SimpleGrid>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};

const MyCouncilTableEdit = ({
	council,
	userData,
	setCouncil,
	toast,
	setIsLoading,
}: {
	council: any;
	userData: any;
	setCouncil: (council: any) => void;
	toast: (options?: UseToastOptions) => string | number | undefined;
	setIsLoading: (isLoading: boolean) => void;
}) => {

	const handleSave = async () => {
		setIsLoading(true);
		const updatedCouncil = {
			...council,
			councilId: userData.councilId,
		};
		const res = await fetch("/api/council/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				council: updatedCouncil,
			}),
		}).then((res) => res.json());
		
		toast({
			title: res.status === 200 ? res.message : res.error,
			status: res.status === 200 ? "success" : "error",
			duration: 3000,
			isClosable: true,
			position: "bottom-right",
		});
		setIsLoading(false);
	};

	return (
		<Flex align={"center"} justify={"center"} width={"100%"} marginY={5}>
			<Box rounded={"lg"} boxShadow={"lg"} p={8}>
				<Stack spacing={3}>
					<FormControl id='name' isRequired>
						<FormLabel>Council Name</FormLabel>
						<Input
							type='text'
							value={council.councilName}
							onChange={(e) =>
								setCouncil({
									...council,
									councilName: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id='address' isRequired>
						<FormLabel>Council Address</FormLabel>
						<Input
							type='text'
							value={council.councilAddress}
							onChange={(e) =>
								setCouncil({
									...council,
									councilAddress: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl id='city' isDisabled>
						<FormLabel>City</FormLabel>
						<Input type='text' value={council.councilCity} />
					</FormControl>
					<FormControl id='state' isDisabled>
						<FormLabel>State</FormLabel>
						<Input type='text' value={council.councilState} />
					</FormControl>
					<FormControl id='leaderEmail;' isDisabled>
						<FormLabel>Leader Email</FormLabel>
						<Input type='text' value={council.councilLeaderEmail} />
					</FormControl>
					<FormControl id='createdBy;' isDisabled>
						<FormLabel>Council Created By</FormLabel>
						<Input type='text' value={council.councilCreatedBy} />
					</FormControl>

					<Stack spacing={10} pt={2}>
						<Button
							loadingText='Submitting'
							size='lg'
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.500",
							}}
							onClick={handleSave}
						>
							Save
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	);
};

export default JoinedCouncil;
