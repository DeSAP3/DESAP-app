"use client";

import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import LoadingComponent from "@/shared/components/loading";
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
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const handleLogin = async (e: any) => {
		setIsLoading(true);
		e.preventDefault();
		const signInData = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		
		if (signInData?.error) {
			toast({
				title: "Logged in failed",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		} else if (signInData?.ok) {
			router.push("/landing");
			toast({
				title: "Logged in successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			
		} else {
			toast({
				title: "Something went wrong. Please try again",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		}
		setIsLoading(false);
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			{isLoading ? (
				<LoadingComponent text='Logging in...' />
			) : (
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<PageHeader title={`Login`} />
					</Stack>
					<Box rounded={"lg"} boxShadow={"lg"} p={8}>
						<Stack spacing={4}>
							<FormControl id='email' isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									type='email'
									value={data.email}
									onChange={(e) =>
										setData({
											...data,
											email: e.target.value,
										})
									}
								/>
							</FormControl>
							<FormControl id='password' isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={
											showPassword ? "text" : "password"
										}
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
													(showPassword) =>
														!showPassword
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
							<Stack spacing={10} pt={2}>
								<Button
									loadingText='Submitting'
									size='lg'
									bg={"brand.acceptbutton"}
									colorScheme='green'
									onClick={handleLogin}
								>
									Login
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Not a member?
									<Link
										color={"blue.400"}
										href='/register'
									>
										&nbsp;Register
									</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			)}
		</Flex>
	);
}
