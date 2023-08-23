import Image from "next/image";
import DESAPLogo from "../public/logo.svg";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from 'next/link'

export default function Logo (props: any) {
	return (
		<Flex alignItems='center'>
			<Link as={NextLink}  href='/'>
			<Image
				priority
				src={DESAPLogo}
				height={100}
				width={100}
				alt='DESAP Logo'
			/>
			</Link>
            {props.children? props.children : <></>}
		</Flex>
	);
};
