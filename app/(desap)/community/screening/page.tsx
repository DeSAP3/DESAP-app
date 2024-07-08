"use client";

import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import LoadingComponent from "@/shared/components/loading";
import { useUser } from "@/shared/providers/userProvider";
import { questions } from "@/shared/static/screening_question";
import {
	Button,
	Card,
	CardBody,
	Center,
	Container,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Radio,
	RadioGroup,
	Text,
	theme,
	useToast,
} from "@chakra-ui/react";
import { CheckingStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Screening() {
	const { data: session } = useSession();
	const toast = useToast();
	const router = useRouter();
	const { userData } = useUser();
	const [answers, setAnswers] = useState(Array(questions.length).fill(null));
	const [isLoading, setIsLoading] = useState(false);

	const handleAnswerChange = (index: number, answer: any) => {
		const newAnswers = [...answers];
		newAnswers[index] = answer;
		newAnswers[index] = newAnswers[index] === "Yes" ? 1 : 0;
		setAnswers(newAnswers);
	};

	const handleSubmit = async () => {
		if (answers.includes(null)) {
			toast({
				title: "Error",
				description: "Please answer all questions",
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "bottom-right",
			});
			return;
		}
		setIsLoading(true);
		const threshold = 0.6;
		const score = parseFloat(
			(
				answers.reduce((acc, cur) => acc + cur, 0) / answers.length
			).toFixed(2)
		);
		const result = score > threshold ? "positive" : "negative";
		toast({
			title: `Tested ${result}`,
			description: `Your screening score is ${score * 100}%.`,
			status: "success",
			duration: 9000,
			isClosable: true,
			position: "bottom-right",
		});
		const res = await fetch("/api/screening/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: "Dengue Screening Result",
				content: `I am tested ${result} from the dengue screening assessment. My screening score is ${
					score * 100
				}%`,
				result: result,
				status: CheckingStatus.UNCHECK,
				authorEmail: userData.email,
			}),
		}).then((res) => res.json());
		toast({
			title: res.status === 201 ? res.message : res.error,
			status: res.status === 201 ? "success" : "error",
			duration: 3000,
			isClosable: true,
			position: "bottom-right",
		});
		if (res.status === 201) {
			router.push("/community/dashboard");
		}
		setIsLoading(false);
	};

	if (!session) {
		return (
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Dashboard
				</Text>
			</Center>
		);
	}

	return (
		<>
			<PageHeader title={`Dengue Screening`} />
			{isLoading ? (
				<LoadingComponent text='Submitting...' />
			) : (
				<Container maxW='90%' paddingY={5}>
					<Flex gap={2}>
						<Text>
							<b>DISCLAIMER:</b> &nbsp;
						</Text>
						<Text>
							<i>
								Mild symptoms of dengue can be confused with
								other illnesses that cause fever, aches and
								pains, or a rash. It is advised to consult a
								healthcare professional for a more accurate
								diagnosis.
							</i>
						</Text>
					</Flex>
					<Divider />
					<Flex paddingY={4}>
						<Text>
							Symptoms of dengue typically last 2-7 days. Most
							people will recover after about a week.
						</Text>
					</Flex>

					<Card variant='outline'>
						<CardBody>
							{questions.map((question, index) => (
								<FormControl
									key={index}
									paddingY={4}
									isRequired
								>
									<FormLabel>
										<b>{index + 1}. </b>
										{question.question}
									</FormLabel>
									<RadioGroup
										onChange={(e) =>
											handleAnswerChange(index, e)
										}
									>
										<HStack spacing='24px'>
											{question.options.map((option) => (
												<Radio
													size='lg'
													key={option}
													value={option}
												>
													{option}
												</Radio>
											))}
										</HStack>
									</RadioGroup>
								</FormControl>
							))}
							<Button
								bg={"brand.acceptbutton"}
								width='100%'
								marginTop={4}
								type='submit'
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</CardBody>
					</Card>
				</Container>
			)}
		</>
	);
}
