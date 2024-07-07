"use client";
import { useUser } from "@/shared/providers/userProvider";
import {
	Accordion,
	Avatar,
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import LoadingComponent from "../../loading";
import GeneralSidebarContent from "../sidebar-component/General";
import CommunityToolsSidebarContent from "../sidebar-component/community/CommunityTool";
import CouncilLeaderSidebarContent from "../sidebar-component/community/CouncilLeader";
import CouncilMemberSidebarContent from "../sidebar-component/community/CouncilMember";
import OperationTeamSidebarContent from "../sidebar-component/ento/OperationTeam";

export default function UserAccountNav() {
	const { data: session } = useSession();
	const { userData, isLoadingUserResponse, isValidatingUserResponse } =
		useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	
	if (session === null) {
		return (
			<Button
				as={"a"}
				fontSize={"sm"}
				fontWeight={400}
				variant={"solid"}
				href={"/login"}
				bg={"brand.acceptbutton"}
				colorScheme={"green"}
			>
				Login
			</Button>
		);
	}

	return isLoadingUserResponse || isValidatingUserResponse ? (
		<Box width={"auto"} height={"auto"}>
			<LoadingComponent text='' />
		</Box>
	) : (
		<>
			<Button
				colorScheme={"green"}
				bg={"brand.acceptbutton"}
				onClick={onOpen}
			>
				<CgProfile size={"1.2rem"} />
			</Button>

			<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Center display={"flex"} flexDirection={"column"}>
							<Avatar bg='brand.acceptbutton' size='xl' />
							<Text fontSize={"large"}>Welcome, </Text>
							<Text fontWeight={"bold"} fontSize={"large"}>
								{userData.userName}
							</Text>
						</Center>
					</DrawerHeader>
					<DrawerBody>
						<Stack direction='column'>
							<Accordion allowMultiple>
								<GeneralSidebarContent />

								{userData.role === Role.COMMUNITY_LEADER && (
									<CommunityToolsSidebarContent />
								)}
								{userData.role === Role.COMMUNITY_MEMBER && (
									<CommunityToolsSidebarContent />
								)}

								{userData.role === Role.COMMUNITY_LEADER && (
									<CouncilLeaderSidebarContent />
								)}

								{userData.role === Role.COMMUNITY_MEMBER && (
									<CouncilMemberSidebarContent />
								)}

								{userData.role === Role.OPERATION_TEAM && (
									<OperationTeamSidebarContent />
								)}
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
							onClick={() => {
								localStorage.removeItem("userData");
								signOut({
									callbackUrl: "/login",
								});
							}}
						>
							Logout
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
