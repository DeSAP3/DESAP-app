import { useUser } from "@/shared/providers/userProvider";
import {
	Avatar,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Text,
} from "@chakra-ui/react";

interface InformationCardProps {
	showAvatar?: boolean;
	title?: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
	status?: string;
	result?: string;
	authorName?: string;
	authorEmail?: string;
	component?: React.ReactNode;
}

const InformationCard = ({
	showAvatar,
	title,
	description,
	createdAt,
	updatedAt,
	status,
	result,
	authorName,
	authorEmail,
	component,
}: InformationCardProps) => {
	const { userData } = useUser();
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
							<Avatar bg='#31363F' />
							<Box>
								<Heading size='sm'>
									{authorName}{" "}
									{userData.email === authorEmail && "(YOU)"}
								</Heading>
								<Text>{authorEmail}</Text>
								<Text>
									<b>Created At : </b>
									{createdAt}
								</Text>
								{updatedAt === createdAt ? null : (
									<Text>
										<b>Updated At : </b>
										{updatedAt}
									</Text>
								)}
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
				{result && (
					<Heading
						size='md'
						color={result === "negative" ? "green.500" : "red.500"}
					>
						Latest Infection Result - {result}
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
