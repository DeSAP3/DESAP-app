"use client";
import Image from "next/image";
import DESAPLogo from "@/shared/image/logo.svg";
import NextLink from 'next/link'
import { Flex, Link } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Logo (props: any) {
	const { data: session } = useSession();
	return (
		<Flex alignItems='center'>
			<Link as={NextLink} href={session === null ? "/" : "/landing"}>
				<Image
					priority
					src={DESAPLogo}
					height='100'
					width='100'
					alt='DESAP Logo'
				/>
			</Link>
		</Flex>
	);
};
