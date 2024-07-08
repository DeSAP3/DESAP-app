"use client";
import { AttachmentIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";

import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Text,
	useDisclosure,
	useToast,
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
	original: File;
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
	const { isOpen, onOpen, onClose } = useDisclosure();

	const useDemoImage = async () => {
		try {
			const response = await fetch(
				"https://wilrhxiajoxjpezcfyfx.supabase.co/storage/v1/object/sign/static/002.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdGF0aWMvMDAyLmpwZyIsImlhdCI6MTcyMDM1NTY3OSwiZXhwIjoxNzUxODkxNjc5fQ.bbT367x_RH-r3Av6gJCNe32w8sT5Bdz4HJm6Irvhn14&t=2024-07-07T12%3A34%3A40.560Z"
			);
			const blob = await response.blob();

			const file = new File([blob], "demo.jpg", {
				type: "image/jpeg",
			});

			setRawImage(file);
		} catch (error) {
			console.error("Error loading demo image:", error);
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
				url: `https://admijw.xyz/calculate-eggs`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}).then((res) => res.data);
			console.log(response);
			setOpenCvResponse({
				...response,
				original: rawImage,
			});
			onOpen();
		} catch (error) {
			alert("Error analyzing image");
		}
		setRawImage(null);
		setIsLoading(false);
	};

	return (
		<Flex direction={"column"} gap={2}>
			<Box display={"flex"} justifyContent={"flex-end"}>
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
			{rawImage && !isLoading &&  (
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
			{openCvResponse && (
				<OpenCVResponseModal
					isOpen={isOpen}
					onClose={() => {
						setOpenCvResponse(undefined);
						onClose();
					}}
					data={openCvResponse}
				/>
			)}
		</Flex>
	);
};

export default OpenCvForm;
