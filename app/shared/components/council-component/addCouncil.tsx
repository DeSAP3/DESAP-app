"use client";
import { useUser } from "@/shared/providers/userProvider";
import { cities, states } from "@/shared/static/state";
import {
	Container,
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";

const AddCouncil = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { userData, setUserData } = useUser();
	const [council, setCouncil] = useState({
		state: "",
		city: "",
		address: "",
		name: "",
		createdBy: "",
		leaderEmail: "",
	});

	if (userData.councilId !== null) {
		return (
			<Center display={"flex"} flexDirection={"column"} gap={2} marginY={5}>
				<Text>You are already a leader of a council.</Text>
				<Text>To create a new council, please quit the previous council</Text>
			</Center>
		);
	}

	
	useEffect(() => {
		if (userData.email) {
			setCouncil((prevCouncil) => ({
				...prevCouncil,
				createdBy: userData.email,
				leaderEmail: userData.email,
			}));
		}
	}, [userData.email]);

	const handleSubmit = async () => {
		setIsLoading(true);

		await fetch("/api/council/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				council,
			}),
		}).then(async (res) => {
			if (res.status === 201) {
				const data = await res.json();
				const updatedUserData = {
					...userData,
					councilId: data.council.id,
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
			}
		});
		setIsLoading(false);
		router.push("/council/detail");
	};

	return (
		<>
			<Container maxW='container.md' paddingY={5}>
				<Center py={3}>
					<Text as={"u"} fontSize='2xl' fontWeight='bold'>
						Create Council
					</Text>
				</Center>
				<Text as={"p"} fontSize='medium'>
					As a community leader, you are able to create your council. Or you can proceed to join other's council.
				</Text>
			</Container>
			{isLoading ? (
				<Loading loading='Creating Council...' />
			) : (
				<Flex align={"center"} justify={"center"} width={"100%"}>
					<Box rounded={"lg"} boxShadow={"lg"} p={8}>
						<Stack spacing={4}>
							<FormControl id='state' isRequired>
								<FormLabel>State</FormLabel>
								<Select
									placeholder={"Select state"}
									onChange={(e) =>
										setCouncil({
											...council,
											state: e.target.value,
										})
									}
								>
									{states.map((state, index) => (
										<option key={index} value={state}>
											{state}
										</option>
									))}
								</Select>
							</FormControl>

							<FormControl id='city' isRequired>
								<FormLabel>City</FormLabel>
								<Select
									placeholder={"Select city"}
									onChange={(e) =>
										setCouncil({
											...council,
											city: e.target.value,
										})
									}
								>
									{council.state &&
										cities
											.filter(
												(city) =>
													city.state === council.state
											)
											.map((city, index) =>
												city.cities.map((c, index) => (
													<option
														key={index}
														value={c}
													>
														{c}
													</option>
												))
											)}
								</Select>
							</FormControl>

							<FormControl id='address' isRequired>
								<FormLabel>Address</FormLabel>
								<Input
									type='text'
									onChange={(e) =>
										setCouncil({
											...council,
											address: e.target.value,
										})
									}
								/>
							</FormControl>

							<FormControl id='locationName' isRequired>
								<FormLabel>Location Name</FormLabel>
								<Input
									type='text'
									onChange={(e) =>
										setCouncil({
											...council,
											name: e.target.value,
										})
									}
								/>
								<FormHelperText>
									Please use the exact location name such as
									Apartment Name or Taman Name
								</FormHelperText>
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
									onClick={handleSubmit}
								>
									Create Council
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Flex>
			)}
		</>
	);
};

export default AddCouncil;
