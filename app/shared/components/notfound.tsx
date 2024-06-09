"use client";
import { Center, Container, Text } from "@chakra-ui/react";

export default function NotFound({ notfound }: { notfound: string }) {
	return (
		<Container>
			<Center pt={3}>
				<Text color={"blue.500"}>{notfound}</Text>
			</Center>
		</Container>
	);
}
