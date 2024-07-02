"use client";
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
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ErrorComponent from "../error";
import LoadingComponent from "../loading";

export default function CouncilManagement() {
	const toast = useToast();
	const router = useRouter();
	const { userData, mutateUser } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [council, setCouncil] = useState({
		name: "",
		state: "",
		city: "",
		address: "",
		createdBy: "",
		leaderEmail: "",
	});

	const {
		data: councilResponse,
		isLoading: isLoadingCouncil,
		isValidating: isValidatingCouncil,
		mutate: mutateCouncilRes,
		error,
	} = useSWR(
		`/api/council/readByCouncilId?councilId=${userData.councilId}`,
		(url: string | URL | Request) => fetch(url).then((res) => res.json())
	);
	
	useEffect(() => {
		if (councilResponse) {
			setCouncil(councilResponse.data);
		} else {
			setCouncil({
				name: "",
				state: "",
				city: "",
				address: "",
				createdBy: "",
				leaderEmail: "",
			});
		}
	}, [councilResponse]);

	if (!councilResponse || isLoadingCouncil || isValidatingCouncil) {
		return <LoadingComponent text='Retrieving councoul information...' />;
	}

	if (error || councilResponse.status !== 200) {
		return <ErrorComponent error={councilResponse.message} />;
	}

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
					To join a council, please visit the{" "}
					<i>
						<u>
							<a href='/council/list'>council list</a>
						</u>
					</i>
					{userData.role === Role.COMMUNITY_LEADER ? (
						<>
							{" "}
							or create a new council via{" "}
							<i>
								<u>
									<a href='/council/new'>create council</a>
								</u>
							</i>
						</>
					) : (
						"."
					)}
				</Text>
			</Center>
		);
	}

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

	const handleDelete = async () => {
		setIsLoading(true);
		const res = await fetch(
			`/api/council/delete?councilId=${userData.councilId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((res) => res.json());

		mutateCouncilRes();
		mutateUser();
		toast({
			title: res.status === 200 ? res.message : res.error,
			status: res.status === 200 ? "success" : "error",
			duration: 3000,
			isClosable: true,
			position: "bottom-right",
		});
		setIsLoading(false);
		router.push("/council/new");
	};

	return (
		<>
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Council Information
				</Text>
			</Center>
			{isLoadingCouncil ? (
				<LoadingComponent text='Getting council information...' />
			) : isLoading ? (
				<LoadingComponent text='Updating council information...' />
			) : (
				<Container
					maxWidth={"80%"}
					paddingY={5}
					justifyContent={"center"}
				>
					<Flex
						align={"center"}
						justify={"center"}
						width={"100%"}
						marginY={5}
					>
						<Box rounded={"lg"} boxShadow={"lg"} p={8}>
							<Stack spacing={3}>
								<FormControl id='name' isRequired>
									<FormLabel>Council Name</FormLabel>
									<Input
										type='text'
										value={council?.name}
										onChange={(e) =>
											setCouncil({
												...council,
												name: e.target.value,
											})
										}
									/>
								</FormControl>
								<FormControl id='address' isRequired>
									<FormLabel>Council Address</FormLabel>
									<Input
										type='text'
										value={council.address}
										onChange={(e) =>
											setCouncil({
												...council,
												address: e.target.value,
											})
										}
									/>
								</FormControl>
								<FormControl id='city' isDisabled>
									<FormLabel>City</FormLabel>
									<Input type='text' value={council.city} />
								</FormControl>
								<FormControl id='state' isDisabled>
									<FormLabel>State</FormLabel>
									<Input type='text' value={council.state} />
								</FormControl>
								<FormControl id='leaderEmail;' isDisabled>
									<FormLabel>Leader Email</FormLabel>
									<Input
										type='text'
										value={council.leaderEmail}
									/>
								</FormControl>
								<FormControl id='createdBy;' isDisabled>
									<FormLabel>Council Created By</FormLabel>
									<Input
										type='text'
										value={council.createdBy}
									/>
								</FormControl>

								<Stack spacing={5} pt={2}>
									<Button
										loadingText='Submitting'
										size='lg'
										bg='brand.acceptbutton'
										color={"white"}
										onClick={handleSave}
									>
										Save
									</Button>
									<Button
										size='lg'
										bg='brand.rejectbutton'
										colorScheme='red'
										onClick={handleDelete}
									>
										Delete Council
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Flex>
				</Container>
			)}
		</>
	);
}
