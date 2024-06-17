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
import LoadingComponent from "../loading";
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

	useEffect(() => {
		if (userData.email) {
			setCouncil((prevCouncil) => ({
				...prevCouncil,
				createdBy: userData.email,
				leaderEmail: userData.email,
			}));
		}
	}, [userData.email]);

	if (userData.councilId !== null) {
		return (
			<Center
				display={"flex"}
				flexDirection={"column"}
				gap={2}
				marginY={5}
			>
				<Text>You are already a leader of a council.</Text>
				<Text>
					To create a new council, please quit the previous council
				</Text>
			</Center>
		);
	}

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
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				const updatedUserData = {
					...userData,
					councilId: data.data.id,
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
			
			{isLoading ? (
				<LoadingComponent text='Creating Council...' />
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

							{council.state &&
								cities
									.filter(
										(city) => city.state === council.state
									)
									.map(
										(city, index) =>
											city.cities.length !== 0 && (
												<FormControl
													id='city'
													isRequired
													key={index}
												>
													<FormLabel>City</FormLabel>
													<Select
														placeholder={
															"Select city"
														}
														onChange={(e) =>
															setCouncil({
																...council,
																city: e.target
																	.value,
															})
														}
													>
														{city.cities.map(
															(c) => (
																<option
																	key={c}
																	value={c}
																>
																	{c}
																</option>
															)
														)}
													</Select>
												</FormControl>
											)
									)}

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
