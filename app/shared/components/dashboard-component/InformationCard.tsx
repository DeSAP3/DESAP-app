import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Heading,
	ButtonGroup,
	Button,
	Flex,
	Avatar,
	Box,
} from "@chakra-ui/react";
import { User } from "@prisma/client";

interface InformationCardProps {
	showAvatar?: boolean;
	title?: string;
	description?: string;
	createdAt?: String;
	status?: string;
	authorName?: string;
	authorEmail?: string;
	component?: React.ReactNode;
}

const InformationCard = ({
	showAvatar,
	title,
	description,
	createdAt,
	status,
	authorName,
	authorEmail,
	component,
}: InformationCardProps) => {
	return (
		<Card variant={"filled"}>
			<CardHeader>
				{showAvatar && (
					<Flex>
						<Flex
							flex='1'
							gap='4'
							alignItems='center'
							flexWrap='wrap'
						>
							<Avatar bg='teal.500' />
							<Box>
								<Heading size='sm'>{authorName}</Heading>
								<Text>{authorEmail}</Text>
								<Text>{createdAt}</Text>
							</Box>
						</Flex>
					</Flex>
				)}
				{status && (
					<Heading
						size='md'
						color={status === "CHECKED" ? "green.500" : "red.500"}
					>
						{title} - {status}
					</Heading>
				)}
			</CardHeader>
			<CardBody>
				<Text>{description}</Text>
			</CardBody>
			<CardFooter>{component}</CardFooter>
		</Card>
	);
};

export default InformationCard;
