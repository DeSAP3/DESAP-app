import { Center, Container, Heading, Text } from "@chakra-ui/react";

export default function PageHeader({ title }: { title: string }) {
	return (
		<Container maxW='container.md' paddingY={5}>
			<Center pt={3}>
				<Heading as='h1' size='lg' fontWeight='bold'>
					{title}
				</Heading>
			</Center>
		</Container>
	);
}
