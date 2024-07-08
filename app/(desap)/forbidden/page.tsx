import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Forbidden() {
	return (
		<Box textAlign='center' py={10} px={6}>
			<Heading
				display='inline-block'
				as='h1'
				size='2xl'
				bgGradient='linear(to-r, teal.400, teal.600)'
				backgroundClip='text'
			>
				403 - Forbidden
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				You do not have permission to access this page.
			</Text>
		</Box>
	);
}
