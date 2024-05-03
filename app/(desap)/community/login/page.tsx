"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Text, Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, useColorModeValue, useToast, } from "@chakra-ui/react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleLogin = async (e: any) => {
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
		} else {
			toast({
				title: "Logged in successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			})
			router.push("/");
		}
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
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
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
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
									href='/community/register'
								>
									&nbsp;Register
								</Link>
							</Text>
							<Text align={"center"}>
								Forget your password?
								<Link color={"blue.400"}>
									&nbsp;Reset Password
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
