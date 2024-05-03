"use client";
import { Center, Container, Flex, Text } from "@chakra-ui/react";
import ImageForm from "@/shared/components/calculator-component/ImageForm";
import { useState } from "react";

export default function Home() {
	const [responseImage, setResponseImage]: any = useState(null);
	const analyseImage = async (image: any) => {
		try {
			// TODO: Make an API call to your backend to send the image for analysis
			// const response = await sendImageForAnalysis(image);
			// Update the state with the response from the backend
			// setResponseImage(response);
		} catch (error) {
			alert("Error analyzing image");
		}
	};

	return (
		<>
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Calculate Number of MosquitoeEggs, Larvae and Aedes
					Mosquitoes
				</Text>
			</Center>
			<Container maxW='container.md' paddingY={5}>
				<Flex justifyContent={"center"} alignItems={"center"}>
					<ImageForm onImageUpload={analyseImage} />
					{/* //TODO: Add a result after calculation */}
					{/* <Spacer />
				<ArrowForwardIcon />
				<Spacer />
			<ResultForm response{responseImage} /> */}
				</Flex>
			</Container>
		</>
	);
}
