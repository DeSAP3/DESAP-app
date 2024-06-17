"use client";
import { accountProfileRoutes } from "@/shared/static/sidebar_link";
import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function GeneralSidebarContent() {
	const router = useRouter();
	return (
		<AccordionItem>
			<AccordionButton
				_expanded={{
					bg: "rgba(0, 0, 0, 0.04)",
				}}
			>
				<Box
					as='span'
					flex='1'
					textAlign='left'
					fontSize='medium'
					fontWeight='normal'
					color='black'
					marginY='auto'
					paddingY='1rem'
					paddingLeft='1rem'
				>
					Account
				</Box>
				<AccordionIcon />
			</AccordionButton>

			{accountProfileRoutes.map((route, index) => (
				<AccordionPanel
					key={index}
					py={4}
					_hover={{
						textDecoration: "none",
						bg: "rgba(0, 0, 0, 0.04)",
					}}
					cursor={"pointer"}
					onClick={() => router.push(route.route)}
					fontSize='small'
					textAlign='center'
				>
					{route.name}
				</AccordionPanel>
			))}
		</AccordionItem>
	);
}
