import { useUser } from "@/shared/providers/userProvider";
import {
	Avatar,
	Badge,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Text,
} from "@chakra-ui/react";
import { CheckingStatus } from "@prisma/client";

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
					<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
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
				)}

				{result && (
					<Heading
						size='md'
						color={result === "negative" ? "green.500" : "red.500"}
						textTransform={"capitalize"}
					>
						Infection Result - {result}
					</Heading>
				)}
			</CardHeader>
			<CardBody>
				<Text>{description}</Text>
				<Box mt='2'>{component}</Box>
			</CardBody>
			<CardFooter justify='end'>
				{status && (
					<Badge
						colorScheme={
							status === CheckingStatus.CHECKED ? "green" : "red"
						}
					>
						{status}
					</Badge>
				)}
			</CardFooter>
		</Card>
	);
};

export default InformationCard;
