"use client";
import { useUser } from "@/shared/providers/userProvider";
import { roles } from "@/shared/static/application_role";
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
import { useSession } from "next-auth/react";
import { useState } from "react";
import Error from "../error";
import Loading from "../loading";

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
			<Error error='User information missing. Please contact the support team.' />
		);
	}

	if (!session && !isLoadingUserResponse) {
		return (
			<Center pt={3}>
				<Text fontWeight='bold'>
					Please login to access your profile,
				</Text>
				<Link color='blue.500' href='/community/login'>
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

	return isLoadingUserResponse ? (
		<Loading loading='Getting user information...' />
	) : isLoading ? (
		<Loading loading='Updating user information...' />
	) : (
		<>
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Profile
				</Text>
			</Center>
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

								<FormControl id='role' isRequired>
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
										{roles
											.filter(
												(role) => role !== userData.role
											)
											.map((role) => (
												<option key={role} value={role}>
													{role}
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
							</>
						)}
					</Stack>
				</Box>
			</Flex>
		</>
	);
};

export default ProfileForm;
