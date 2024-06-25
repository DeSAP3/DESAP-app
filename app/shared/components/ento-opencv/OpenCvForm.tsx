"use client";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";

import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Text,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { VscCloudUpload } from "react-icons/vsc";
import LoadingComponent from "../loading";
import OpenCVResponseModal from "./OpenCvResponseModal";

export type ResponseOpenCv = {
	avgClusterArea: number;
	avgEggsPerCluster: number;
	singlesAvg: number;
	singlesCalculated: number;
	eggEstimate: number;
	totalEggs: number;
	objects: string;
	overlay: string;
	outlines: string;
	threshold: string;
};

const OpenCvForm = () => {
	const toast = useToast();
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [openCvResponse, setOpenCvResponse] = useState<ResponseOpenCv>();
	const { isOpen, onOpen, onClose } = useDisclosure()
	
	const imageChange = async (e: any) => {
		const file = e.target.files ? e.target.files[0] : null;
		setRawImage(file);
	};

	const removeSelectedImage = () => {
		setRawImage(null);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		if (!rawImage) {
			toast({
				title: "Please upload an image",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-right",
			});
			return;
		}
		try {
			const formData = new FormData();
			formData.append("imageType", "0");
			formData.append("src", rawImage);
			const response = await axios({
				method: "POST",
				url: "https://larvae-calculator-api.onrender.com/calculate-eggs",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}).then((res) => res.data);
			setOpenCvResponse(response);
			console.log(response);
			onOpen();
		} catch (error) {
			alert("Error analyzing image");
		}
		setIsLoading(false);
	};

	return (
		<Flex direction={"column"}>
			<Box
				maxW='800px'
				minW='400px'
				borderWidth='1px'
				borderRadius='lg'
				overflow='hidden'
			>
				{rawImage ? (
					<Box textAlign={"center"} padding={2}>
						<Flex align='center' justify='center'>
							<Text fontWeight='bold'>Uploaded Image</Text>
							<FaFileUpload style={{ marginLeft: "0.5rem" }} />
						</Flex>
						<Image
							src={URL.createObjectURL(rawImage)}
							width={500}
							height={360}
							alt='Uploaded image'
						/>
						<Button
							onClick={removeSelectedImage}
							rightIcon={<DeleteIcon />}
							marginTop={2}
							bg={"brand.rejectbutton"}
						>
							Remove This Image
						</Button>
					</Box>
				) : (
					<>
						<Box textAlign='center' padding={2}>
							<Flex align='center' justify='center'>
								<Text fontWeight='bold'>Upload your image</Text>
								<VscCloudUpload
									style={{ marginLeft: "0.5rem" }}
								/>
							</Flex>
							<Text>File should be of format .JPG</Text>
						</Box>
						<FormControl isRequired padding={2}>
							<Flex justify={"center"}>
								<Input
									type='file'
									onChange={imageChange}
									display={"none"}
									id='fileInput'
								/>
								<label htmlFor='fileInput'>
									<Button as='span' bg={"brand.uploadbutton"}>
										Choose File
									</Button>
								</label>
							</Flex>
						</FormControl>
					</>
				)}
			</Box>
			{rawImage && !isLoading && (
				<Box textAlign={"center"} padding={2}>
					<Button
						onClick={handleSubmit}
						rightIcon={<ViewIcon />}
						marginTop={2}
						bg={"brand.acceptbutton"}
					>
						Analyze Image
					</Button>
				</Box>
			)}

			{isLoading && <LoadingComponent text='Analyzing Image...' />}
			{openCvResponse && <OpenCVResponseModal
				isOpen={isOpen}
				onClose={onClose}
				data={openCvResponse}
			/>}

			{/* {testImage && (
				<Image
					src={`data:image/jpeg;base64,${testImage}`}
					alt='Base64 Encoded'
					width={500} // Specify a width
					height={300} // And a height
				/>
			)} */}
		</Flex>
	);
};

export default OpenCvForm;
