"use client";
import { Center, Spinner, Text, Container } from "@chakra-ui/react";

export default function Loading({ loading }: { loading: string }) {
	return (
		<Container>
			<Center pt={3}>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Center>
			<Center pt={3}>
				<Text color={"blue.500"}>{loading}</Text>
			</Center>
		</Container>
	);
}
