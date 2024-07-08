"use client";
import ImageForm from "@/shared/components/ento-calculator/ImageForm";
import {
	Box,
	Button,
	Container,
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	useDisclosure,
	useToast,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import ResultForm from "@/shared/components/ento-calculator/ResultForm";
import LoadingComponent from "@/shared/components/loading";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Image3 from "/public/003.jpg";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import supabase from "@/shared/providers/supabase";
import { useUser } from "@/shared/providers/userProvider";
import { Role } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { v4 as uuidv4 } from "uuid";
import { AttachmentIcon, InfoIcon } from "@chakra-ui/icons";

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
	const { isOpen, onOpen, onClose } = useDisclosure();

	const useDemoImage = async () => {
		try {
			const response = await fetch(
				"https://wilrhxiajoxjpezcfyfx.supabase.co/storage/v1/object/sign/static/003.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdGF0aWMvMDAzLmpwZyIsImlhdCI6MTcyMDM1ODk4NiwiZXhwIjoxNzUxODk0OTg2fQ.9D2dBW9hbf2hUHMKdaKbdnVA0AXweVD0i48yjIFpHxQ&t=2024-07-07T13%3A29%3A47.837Z"
			);
			const blob = await response.blob();

			const file = new File([blob], "demo.jpg", {
				type: "image/jpeg",
			});

			setRawImage(file);
		} catch (error) {
			toast({
				title: "Error loading demo image",
				description: "Unable to load the demo image.",
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "bottom-right",
			});
		}
	};
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
				url: `https://admijw.xyz/calculate/larvae`,
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
			setIsLoadingSaving(false);
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

			<Box display={"flex"} justifyContent={"flex-end"} width={"90%"}>
				<IconButton
					variant={"ghost"}
					aria-label='Help'
					icon={<InfoIcon />}
					onClick={onOpen}
				/>
			</Box>
			<Flex direction={"column"} gap={2} justifyContent={"center"} marginY={"2rem"}>
				<Flex justifyContent={"center"} alignItems={"flex-start"}>
					<Box
						minW='400px'
						borderRadius='lg'
						overflow='hidden'
					>
						<Box
							display={"flex"}
							justifyContent={"flex-end"}
							marginY={2}
						>
							<Button
								onClick={useDemoImage}
								gap={2}
								size={"xs"}
								bg={"brand.infobutton"}
							>
								Use Demo Image
								<AttachmentIcon />
							</Button>
						</Box>
						<Box display={"flex"} justifyContent={"center"}>
							<ImageForm
								onImageUpload={analyseImage}
								rawImage={rawImage}
								setRawImage={setRawImage}
								setResponseImage={setResponseImage}
								responseImage={responseImage}
								isLoading={isLoading}
							/>

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
											<FaArrowAltCircleRight
												size={"2em"}
											/>
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
												predictionResponse={
													predictionsResponse
												}
												onImageSave={handleSaveImage}
												isLoadingSaving={
													isLoadingSaving
												}
											/>
										</Box>
									</>
								)
							)}
						</Box>
					</Box>
				</Flex>
			</Flex>
			<Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>What type of image can I analyze?</ModalHeader>
					<ModalCloseButton />
					<ModalBody gap={2}>
						<Text fontWeight='bold' mb='1rem'>
							The image example below is an image of a mosquitos
							egg
						</Text>
						<Image
							src={Image3}
							alt='mosquito egg image 1'
							width={600}
							height={800}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							bg='brand.rejectbutton'
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
