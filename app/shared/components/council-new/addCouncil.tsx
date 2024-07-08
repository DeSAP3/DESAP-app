"use client";
import { useUser } from "@/shared/providers/userProvider";
import { cities, states } from "@/shared/static/state";
import {
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
	useToast
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../loading";

interface Council {
	state: string;
	city: string;
	address: string;
	name: string;
	createdBy: string;
	leaderId: string | null;
}

const AddCouncil = () => {
	const toast = useToast();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { userData, mutateUser } = useUser();
	const [council, setCouncil] = useState<Council>({
		state: "",
		city: "",
		address: "",
		name: "",
		createdBy: "",
		leaderId: null,
	});

	useEffect(() => {
		if (userData && userData.id !== null) {
			setCouncil((prevCouncil) => ({
				...prevCouncil,
				createdBy: userData.email,
				leaderId: userData.id,
			}));
		}
	}, [userData]);

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

		const response = await fetch("/api/council/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				council,
			}),
		}).then((res) => res.json());
		toast({
			title: response.message,
			status: response.status === 201 ? "success" : "error",
			duration: 3000,
			isClosable: true,
			position: "bottom-right",
		});
		mutateUser();
		if (response.status === 201) {
			router.push("/council/detail");
		}
		setIsLoading(false);
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
									bg='brand.acceptbutton'
									color={"white"}
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
