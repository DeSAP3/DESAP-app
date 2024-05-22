"use client";
import { Center, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import ImageForm from "@/shared/components/calculator-component/ImageForm";
import { useState } from "react";
import axios from "axios";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ResultForm from "@/shared/components/calculator-component/ResultForm";

export type ResponseImage = {
	time: string;
	image:{
		width: number;
		height: number;
	}
	predictions: [{
		class: string;
		confidence: number;
		x: number;
		y: number;
		width: number;
		height: number;
	}]
}


export default function Calculator() {
	const [responseImage, setResponseImage] = useState<ResponseImage>();
	const analyseImage = async (image: string) => {
		try {
			await axios({
				method: "POST",
				url: "https://detect.roboflow.com/desap/1",
				params: {
					api_key: "sP59RbvvS6X3MWqmP5Sq",
				},
				data: image,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
				.then(function (response) {
					console.log(response.data);
					setResponseImage(response.data);
				})
				.catch(function (error) {
					console.log(error.message);
				});
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
					<ImageForm onImageUpload={analyseImage} setResponseImage={setResponseImage} />
					{responseImage  && (
						<>
							<Spacer />
							<ArrowForwardIcon />
							<Spacer />
							<ResultForm response={responseImage} />
						</>
					)}
				</Flex>
			</Container>
		</>
	);
}
