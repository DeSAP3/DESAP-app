"use client";
import { ResponseImage } from "@/(desap)/ento/calculator/page";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Input,
	Text,
	useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaFileUpload } from "react-icons/fa";
import { VscCloudUpload } from "react-icons/vsc";

type ImageFormProps = {
	onImageUpload: (image: string, rawImage: File | null) => Promise<void>;
	rawImage: File | null;
	setRawImage: Dispatch<SetStateAction<File | null>>;
	setResponseImage: Dispatch<SetStateAction<any>>;
	responseImage?: ResponseImage;
	isLoading: boolean;
};

const ImageForm = ({
	onImageUpload,
	rawImage,
	setRawImage,
	setResponseImage,
	isLoading,
	responseImage,
}: ImageFormProps) => {
	const toast = useToast();
	const convertBase64 = (file: Blob | null) => {
		return new Promise<string>((resolve, reject) => {
			const fileReader = new FileReader();
			if (file) {
				fileReader.readAsDataURL(file);
			} else {
				reject(new Error("Invalid file"));
			}

			fileReader.onload = () => {
				resolve(fileReader.result as string);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const imageChange = async (e: any) => {
		const file = e.target.files ? e.target.files[0] : null;
		setRawImage(file);
	};

	const removeSelectedImage = () => {
		setRawImage(null);
		setResponseImage(null);
	};

	const handleSubmit = async () => {
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
		const base64 = await convertBase64(rawImage);
		onImageUpload(base64, rawImage);
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
							<Text>File should be image format .JPG, .JPEG</Text>
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
			{rawImage && !isLoading && !responseImage && (
				<Center padding={10}>
					<Button
						type='submit'
						rightIcon={<ViewIcon />}
						onClick={handleSubmit}
						bg={"brand.acceptbutton"}
					>
						Analyze Image
					</Button>
				</Center>
			)}
		</Flex>
	);
};

export default ImageForm;
