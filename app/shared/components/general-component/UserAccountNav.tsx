"use client";
import {
	Button,
	Drawer,
	Text,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
	DrawerBody,
	Avatar,
	Stack,
	Divider,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@/shared/providers/userProvider";

export default function UserAccountNav() {
	const { data: session } = useSession();
	const { userData } = useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			{session?.user && userData.userName ? (
				<>
					<Button
						colorScheme={"green"}
						bg={"black"}
						_hover={{
							bg: "#222831",
						}}
						onClick={onOpen}
					>
						<CgProfile size={"1.5rem"} />
					</Button>

					<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Avatar bg='#222831' />
								<Text fontSize={"large"}>Welcome, </Text>
								<Text fontWeight={"bold"} fontSize={"large"}>
									{userData.userName}
								</Text>
							</DrawerHeader>
							<DrawerBody>
								<Stack direction='column'>
									<Divider />
									<Button
										as={"a"}
										href={"/community/profile"}
										variant='link'
										_hover={{
											textDecoration: "none",
											bg: "gray.100",
										}}
										marginY='auto'
										paddingY='1rem'
										paddingLeft='1rem'
										width='100%'
									>
										<Text
											fontSize='sm'
											fontWeight='normal'
											color='black'
										>
											Profile
										</Text>
									</Button>
									<Divider />
									{userData.role === "Community Leader" || userData.role === "Community Member" ? (
											<Button
												as={"a"}
												href={"/council"}
												variant='link'
												_hover={{
													textDecoration: "none",
													bg: "gray.100",
												}}
												marginY='auto'
												paddingY='1rem'
												paddingLeft='1rem'
												width='100%'
											>
												<Text
													fontSize='sm'
													fontWeight='normal'
													color='black'
												>
													Council
												</Text>
											</Button>
										):<></>}
									{/* Add more links here */}
								</Stack>
							</DrawerBody>
							<DrawerFooter>
								<Button
									fontSize={"sm"}
									fontWeight={400}
									variant='solid'
									colorScheme={"green"}
									bg={"#393E46"}
									_hover={{
										bg: "#222831",
									}}
									onClick={() =>
										signOut({
											callbackUrl: "/community/login",
										})
									}
								>
									Logout
								</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</>
			) : (
				<Button
					as={"a"}
					fontSize={"sm"}
					fontWeight={400}
					variant={"link"}
					href={"/community/login"}
				>
					Login
				</Button>
			)}
		</>
	);
}
