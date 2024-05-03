"use client";

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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Screening() {
	const { data: session } = useSession();
	const [answers, setAnswers] = useState(Array(questions.length).fill(null));

	const handleAnswerChange = (index: number, answer: any) => {
		const newAnswers = [...answers];
		newAnswers[index] = answer;
		setAnswers(newAnswers);
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		console.log(answers);
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
			<Container maxW='container.md' paddingY={5}>
				<Center pt={3}>
					<Text as={"u"} fontSize='2xl' fontWeight='bold'>
						Dengue Screening
					</Text>
				</Center>
			</Container>
			<Container maxW='90%' paddingY={5}>
				<Flex>
					<Text>
						<b>DISCLAIMER:</b> &nbsp;
					</Text>
					<Text>
						<i>
							Mild symptoms of dengue can be confused with other
							illnesses that cause fever, aches and pains, or a
							rash. It is advised to consult a healthcare
							professional for a more accurate diagnosis.
						</i>
					</Text>
				</Flex>
				<Divider />
				<Flex paddingY={4}>
					<Text>
						Symptoms of dengue typically last 2-7 days. Most people
						will recover after about a week.
					</Text>
				</Flex>

				<Card variant='outline'>
					<CardBody>
						<form onSubmit={onSubmit}>
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
								colorScheme='blue'
								width='100%'
								marginTop={4}
								type='submit'
							>
								Submit
							</Button>
						</form>
					</CardBody>
				</Card>
			</Container>
		</>
	);
}

const questions = [
	{
		question:
			"Have you experienced mosquito bites within the previous 2 weeks?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you had a fever of 39°C or higher?",
		options: ["Yes", "No"],
	},
	{
		question:
			"Have you experienced biphasic fever (fever that comes and goes)?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you noticed a rash on your skin?",
		options: ["Yes", "No"],
	},
	{
		question:
			"Have you experienced petechiae (tiny red or purple spots on the skin)?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you had retroorbital pain (pain behind the eyes)?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you experienced bone pain (arthralgia)?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you been experiencing headaches?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you had muscle pain (myalgia)",
		options: ["Yes", "No"],
	},
	{
		question: "Have you had abdominal pain?",
		options: ["Yes", "No"],
	},
	{
		question: "Have you experienced anorexia (loss of appetite)?",
		options: ["Yes", "No"],
	},
];
