"use client";
import { useUser } from "@/shared/providers/userProvider";
import {
	Accordion,
	Avatar,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Stack,
	Text,
	useDisclosure
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import GeneralSidebarContent from "../sidebar-component/General";
import CommunityToolsSidebarContent from "../sidebar-component/community/CommunityTool";
import CouncilLeaderSidebarContent from "../sidebar-component/community/CouncilLeader";
import CouncilMemberSidebarContent from "../sidebar-component/community/CouncilMember";
import OperationTeamSidebarContent from "../sidebar-component/ento/OperationTeam";

export default function UserAccountNav() {
	const { data: session } = useSession();
	const { userData } = useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

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
									<Accordion allowMultiple>
										<GeneralSidebarContent />

										{Role.COMMUNITY_LEADER.match(
											userData.role
										) && <CommunityToolsSidebarContent />}
										{Role.COMMUNITY_MEMBER.match(
											userData.role
										) && <CommunityToolsSidebarContent />}

										{Role.COMMUNITY_LEADER.match(
											userData.role
										) && <CouncilLeaderSidebarContent />}

										{Role.COMMUNITY_MEMBER.match(
											userData.role
										) && <CouncilMemberSidebarContent />}

										{Role.OPERATION_TEAM.match(
											userData.role
										) && <OperationTeamSidebarContent />}
									</Accordion>
								</Stack>
							</DrawerBody>
							<DrawerFooter>
								<Button
									fontSize={"sm"}
									fontWeight={400}
									variant='solid'
									colorScheme={"red"}
									bg={"brand.rejectbutton"}
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
					variant={"solid"}
					href={"/community/login"}
					bg={"brand.acceptbutton"}
					colorScheme={"green"}
				>
					Login
				</Button>
			)}
		</>
	);
}
