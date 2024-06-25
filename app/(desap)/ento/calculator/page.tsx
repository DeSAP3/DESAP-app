"use client";
import ImageForm from "@/shared/components/ento-calculator/ImageForm";
import {
	Box,
	Container,
	Flex,
	Spacer,
	useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import ResultForm from "@/shared/components/ento-calculator/ResultForm";
import LoadingComponent from "@/shared/components/loading";
import { FaArrowAltCircleRight } from "react-icons/fa";

import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import supabase from "@/shared/providers/supabase";
import { useUser } from "@/shared/providers/userProvider";
import { Role } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
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
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingSaving, setIsLoadingSaving] = useState(false);
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [predictionsResponse, setPredictionsResponse] =
		useState<JsonObject>();
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
			setPredictionsResponse(predictions.data);
			if (rawImage === null) {
				return;
			}
			const formData = new FormData();
			formData.append("image", rawImage);
			formData.append("predictions", JSON.stringify(predictions.data));
			const annotatedImage = await axios({
				method: "POST",
				url: "https://larvae-calculator-api.onrender.com/calculate/larvae",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				responseType: "blob",
			});
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
		} catch (error) {
			alert("Error analyzing image");
		}
		setIsLoading(false);
	};

	const handleSaveImage = async () => {
		setIsLoadingSaving(true);
		if (
			userData.email === undefined &&
			userData.role === Role.OPERATION_TEAM
			// userData.role !== "Operation Team"
		) {
			toast({
				title: "Please login first",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			return;
		}
		const { data } = await supabase.storage
			.from("image")
			.upload("public/" + userData.id + "/" + uuidv4(), rawImage as File);
		if (data) {
			const res = await fetch("/api/calculator/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					createdByEmail: userData.email,
					predictions: predictionsResponse,
					imageURL: data.path,
				}),
			}).then((res) => res.json());
			if (res.status === 201) {
				toast({
					title: "Image saved successfully",
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "bottom-right",
				});
				window.location.reload();
			} else {
				toast({
					title: "Save image failed",
					status: "error",
					duration: 3000,
					isClosable: true,
					position: "bottom-right",
				});
			}
		} else {
			toast({
				title: "Save image failed",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
		}
		setIsLoadingSaving(false);
	};

	return (
		<>
			<PageHeader title='Analyze Image for Larvae' />
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
							rawImage={rawImage}
							setRawImage={setRawImage}
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
								<LoadingComponent text='Analyzing Image...' />
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
									<ResultForm
										response={responseImage}
										predictionResponse={predictionsResponse}
										onImageSave={handleSaveImage}
										isLoadingSaving={isLoadingSaving}
									/>
								</Box>
							</>
						)
					)}
				</Flex>
			</Container>
		</>
	);
}
