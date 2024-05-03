import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Heading,
	ButtonGroup,
	Button,
} from "@chakra-ui/react";

interface InformationCardProps {
	title?: string;
	description?: string;
	component?: React.ReactNode;
}

const InformationCard = ({
	title,
	description,
	component,
}: InformationCardProps) => {
	return (
		<Card variant={"elevated"}>
			<CardHeader>
				<Heading size='md'>{title}</Heading>
			</CardHeader>
			<CardBody>
				<Text>{description}</Text>
			</CardBody>
			<CardFooter>{component}</CardFooter>
		</Card>
	);
};

export default InformationCard;
