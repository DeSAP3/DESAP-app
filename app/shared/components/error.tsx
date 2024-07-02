"use client";
import { Center, Container, Text } from "@chakra-ui/react";

export default function ErrorComponent({ error }: Readonly<{ error: string }>) {
	return (
		<Container>
			<Center pt={3}>
				<Text
					as={"u"}
					fontSize='xl'
					fontWeight='bold'
					color={"red.500"}
				>
					Error
				</Text>
			</Center>

			<Text color={"red.500"} >{error}</Text>
		</Container>
	);
}
