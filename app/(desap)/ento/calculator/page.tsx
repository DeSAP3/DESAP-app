"use client";
import { Box, Center, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import ImageForm from "@/shared/components/calculator-component/ImageForm";
import { useState } from "react";
import axios from "axios";

import ResultForm from "@/shared/components/calculator-component/ResultForm";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Loading from "@/shared/components/loading";

import supabase from "@/shared/providers/supabase";
import { useUser } from "@/shared/providers/userProvider";
import { v4 as uuidv4 } from "uuid";

export type ResponseImage = {
	imageDisplay?: string;
	time?: string;
	image?: {
		width: number;
		height: number;
	};
	predictions?: [
		{
			class: string;
			confidence: number;
			x: number;
			y: number;
			width: number;
			height: number;
		}
	];
};

export default function Calculator() {
	const { userData } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [responseImage, setResponseImage] = useState<ResponseImage>();

	const analyseImage = async (image: string, rawImage: File | null) => {
		setIsLoading(true);
		try {
			const predictions = await axios({
				method: "POST",
				url: "https://detect.roboflow.com/desap/1",
				params: {
					api_key: "sP59RbvvS6X3MWqmP5Sq",
				},
				data: image,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			if (rawImage === null) {
				console.log("No image to send");
				return;
			}
			const formData = new FormData();
			formData.append("image", rawImage);
			formData.append("predictions", JSON.stringify(predictions.data));
			const annotatedImage = await axios({
				method: "POST",
				url: "https://larvae-calculator-api.vercel.app/calculate/larvae",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				responseType: "blob",
			});
			console.log(annotatedImage);
			const imageUrl = URL.createObjectURL(annotatedImage.data);
			setResponseImage({
				imageDisplay: imageUrl,
				time: predictions.data.time,
				image: {
					width: predictions.data.image.width,
					height: predictions.data.image.height,
				},
				predictions: predictions.data.predictions,
			});

			const { data, error } = await supabase.storage
				.from("image")
				.upload(userData.id + "/" + uuidv4(), rawImage, {
					contentType: "image/jpeg",
				});
			console.log(data, error);
		} catch (error) {
			alert("Error analyzing image");
		}
		setIsLoading(false);
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
				<Flex justifyContent={"center"} alignItems={"flex-start"}>
					<Box
						maxW='800px'
						minW='400px'
						borderRadius='lg'
						overflow='hidden'
					>
						<ImageForm
							onImageUpload={analyseImage}
							setResponseImage={setResponseImage}
							responseImage={responseImage}
						/>
					</Box>
					{isLoading ? (
						<>
							<Spacer paddingX={3} marginY={"auto"}>
								<FaArrowAltCircleRight size={"2em"} />
							</Spacer>
							<Box
								maxW='800px'
								minW='400px'
								borderWidth='1px'
								borderRadius='lg'
								overflow='hidden'
								textAlign='center'
								padding={2}
							>
								<Loading loading='Analyzing image...' />
							</Box>
						</>
					) : (
						responseImage && (
							<>
								<Spacer paddingX={3} marginY={"auto"}>
									<FaArrowAltCircleRight size={"2em"} />
								</Spacer>
								<Box
									maxW='800px'
									minW='400px'
									borderWidth='1px'
									borderRadius='lg'
									overflow='hidden'
									textAlign='center'
									padding={2}
								>
									<ResultForm response={responseImage} />
								</Box>
							</>
						)
					)}
				</Flex>
			</Container>
		</>
	);
}
