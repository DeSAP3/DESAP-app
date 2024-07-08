"use client";

import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import LoadingComponent from "@/shared/components/loading";
import { roleOptions } from "@/shared/static/app_role";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Select,
	Stack,
	Text,
	useToast
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [data, setData] = useState({
		userName: "",
		email: "",
		password: "",
		role: "",
	});

	const handleRegister = async (e: any) => {
		setIsLoading(true);
		e.preventDefault();
		if(data.password.length < 7) {
			toast({
				title: "Password must be at least 7 characters",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			setIsLoading(false);
			return
		}
		const res = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});
		const userInfo = await res.json();
		if (userInfo.status === 400 || userInfo.status === 500) {
			toast({
				title: userInfo.error,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		} else {
			router.push("/login");
			toast({
				title: `${userInfo.message}. Please login`,
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		}
		setIsLoading(false);
	};

	return isLoading ? (
		<LoadingComponent text='Registering...' />
	) : (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={"gray.50"}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<PageHeader title={`Register`} />
					<Text fontSize={"lg"} color={"gray.600"}>
						To enjoy DESAP cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={"white"}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id='username' isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								value={data.userName}
								onChange={(e) =>
									setData({
										...data,
										userName: e.target.value,
									})
								}
							/>
						</FormControl>

						<FormControl id='email' isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								value={data.email}
								onChange={(e) =>
									setData({ ...data, email: e.target.value })
								}
							/>
						</FormControl>
						<FormControl id='password' isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									value={data.password}
									onChange={(e) =>
										setData({
											...data,
											password: e.target.value,
										})
									}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword(
												(showPassword) => !showPassword
											)
										}
									>
										{showPassword ? (
											<ViewIcon />
										) : (
											<ViewOffIcon />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<FormControl id='role' isRequired>
							<FormLabel>Role</FormLabel>
							<Select
								placeholder='Please select your role'
								onChange={(e) =>
									setData({
										...data,
										role: e.target.value,
									})
								}
							>
								{roleOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Select>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={"brand.acceptbutton"}
								colorScheme='green'
								onClick={handleRegister}
							>
								Register
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link
									color={"blue.400"}
									href='/login'
								>
									&nbsp;Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
