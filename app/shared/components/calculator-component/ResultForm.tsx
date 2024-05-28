"use client";
import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import { ResponseImage } from "@/(desap)/ento/calculator/page";
import Image from "next/image";


type ResultFormProps = {
	response: ResponseImage;
};

const ResultForm = ({ response }: ResultFormProps) => {
	// const { userData } = useUser();
	// const handleSubmit = async () => {
	// 	const { data, error } = await supabase.storage
	// 		.from("analyzedImage")
	// 		.upload(userData.email+"/"+uuidv4(), response.imageDisplay);
	// };

	return (
		<>
			<Flex align='center' justify='center'>
				<Text fontWeight='bold'>Analyzed Image</Text>
				<Search2Icon style={{ marginLeft: "0.5rem" }} />
			</Flex>
			<Box textAlign={"center"} padding={2}>
				{response.imageDisplay && (
					<Image
						src={response.imageDisplay}
						width={500}
						height={360}
						alt='Uploaded image'
					/>
				)}
			</Box>
			<Flex direction={"column"} fontSize={"x-small"}>
				<Text>Analyse Time: {response.time}s</Text>
				{response.image && (
					<Text>
						Image Size: {response.image.height} x{" "}
						{response.image.width}
					</Text>
				)}
				{response.predictions && (
					<Text>
						Larvae Count:{" "}
						{response.predictions.some(
							(prediction) => prediction.class === "larvae"
						)
							? response.predictions.filter(
									(prediction) =>
										prediction.class === "larvae"
							  ).length
							: 0}
					</Text>
				)}
			</Flex>
			
		</>
	);
};

export default ResultForm;

// {
// 	response.image && (
// 		<Center padding={10}>
// 			<Button type='submit' onClick={handleSubmit}>
// 				Save Image
// 			</Button>
// 		</Center>
// 	);
// }