"use client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Input,
	Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { VscCloudUpload } from "react-icons/vsc";

type ImageFormProps = {
	onImageUpload: (image: any) => Promise<void>;
	setResponseImage: Dispatch<SetStateAction<any>>;
};

const ImageForm = ({ onImageUpload, setResponseImage }: ImageFormProps) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [displayUpload, setDisplayUpload] = useState<File | null>(null);

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
		setDisplayUpload(file);
	};

	const removeSelectedImage = () => {
		setDisplayUpload(null);
		setSelectedImage(null);
		setResponseImage(null);
	};

	const handleSubmit = async () => {
		const base64 = await convertBase64(displayUpload);
		onImageUpload(base64);
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
				{displayUpload ? (
					<Box textAlign={"center"} padding={2}>
						<Image
							src={URL.createObjectURL(displayUpload)}
							width={500}
							height={360}
							alt='Uploaded image'
						/>
						<Button
							onClick={removeSelectedImage}
							rightIcon={<DeleteIcon />}
							marginTop={2}
							background={"red.500"}
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
									<Button as='span'>Choose File</Button>
								</label>
							</Flex>
						</FormControl>
					</>
				)}
			</Box>
			<Center padding={10}>
				<Button type='submit' onClick={handleSubmit}>
					Analyze Image
				</Button>
			</Center>
		</Flex>
	);
};

export default ImageForm;
