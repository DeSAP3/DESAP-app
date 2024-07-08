"use client";
import { useUser } from "@/shared/providers/userProvider";
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Link,
	Select,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ErrorComponet from "../error";
import LoadingComponent from "../loading";
import { roleOptions } from "@/shared/static/app_role";
import { Role } from "@prisma/client";

const ProfileForm = () => {
	const toast = useToast();
	const { data: session } = useSession();
	const { userData, setUserData, isLoadingUserResponse } = useUser();
	const [isLoading, setIsLoading] = useState(false);

	if (
		userData.userName === "" &&
		userData.email === "" &&
		userData.role === "" &&
		!isLoadingUserResponse
	) {
		return (
			<ErrorComponet error='User information missing. Please contact the support team.' />
		);
	}

	if (!session && !isLoadingUserResponse) {
		return (
			<Center pt={3}>
				<Text fontWeight='bold'>
					Please login to access your profile,
				</Text>
				<Link color='blue.500' href='/login'>
					&nbsp;[Login]
				</Link>
			</Center>
		);
	}

	const handleSave = async () => {
		setIsLoading(true);
		const res = await fetch("/api/profile/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userData,
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
		if (confirm("Are you sure you want to delete your account?")) {
			setIsLoading(true);
			const res = await fetch(
				`/api/profile/delete?userId=${userData.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			).then((res) => res.json());
			toast({
				title: res.status === 200 ? res.message : res.error,
				status: res.status === 200 ? "success" : "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			signOut({
				callbackUrl: "/login",
			});
			setIsLoading(false);
		}
	};

	return isLoadingUserResponse ? (
		<LoadingComponent text='Getting user information...' />
	) : isLoading ? (
		<LoadingComponent text='Updating user information...' />
	) : (
		<>
			<Flex align={"center"} justify={"center"} width={"100%"}>
				<Box rounded={"lg"} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						{userData.userName && (
							<>
								<FormControl id='username' isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										value={userData.userName}
										onChange={(e) =>
											setUserData({
												...userData,
												userName: e.target.value,
											})
										}
									/>
								</FormControl>

								{userData.role !== Role.OPERATION_TEAM && (
									<FormControl id='address'>
										<FormLabel>Living Address</FormLabel>
										<Input
											type='text'
											placeholder={
												"Please enter your living address"
											}
											value={userData.livingAddress}
											onChange={(e) =>
												setUserData({
													...userData,
													livingAddress:
														e.target.value,
												})
											}
										/>
									</FormControl>
								)}

								<FormControl id='role' isRequired isDisabled>
									<FormLabel>Role</FormLabel>
									<Select
										placeholder={userData.role}
										onChange={(e) =>
											setUserData({
												...userData,
												role: e.target.value,
											})
										}
									>
										{roleOptions
											.filter(
												(role) =>
													userData.role !== role.value
											)
											.map(({ value, label }) => (
												<option
													key={value}
													value={value}
												>
													{label}
												</option>
											))}
									</Select>
								</FormControl>

								<FormControl id='email' isDisabled>
									<FormLabel>Email address</FormLabel>
									<Input
										type='email'
										value={userData.email}
									/>
								</FormControl>
								<Stack spacing={10} pt={2}>
									<Button
										size='lg'
										bg={"brand.acceptbutton"}
										colorScheme='green'
										color={"white"}
										onClick={handleSave}
									>
										Save
									</Button>
								</Stack>
								<Stack spacing={10} pt={2}>
									<Button
										size='lg'
										colorScheme='red'
										bg={"brand.rejectbutton"}
										onClick={handleDelete}
									>
										Delete
									</Button>
								</Stack>
							</>
						)}
					</Stack>
				</Box>
			</Flex>
		</>
	);
};

export default ProfileForm;
