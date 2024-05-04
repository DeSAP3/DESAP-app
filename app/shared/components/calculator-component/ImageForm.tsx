"use client";
import { Box, FormControl, Flex, Input, Text, Button, Center } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { VscCloudUpload } from "react-icons/vsc";
import Image from "next/image";
import { useState } from "react";

export default function ImageForm(props: any) {
	const [selectedImage, setSelectedImage]: any = useState();

	const imageChange = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
	};

	const removeSelectedImage = () => {
		setSelectedImage();
	};

	const onSubmit = async (image: any) => {
		console.log(image);
		alert("Image Submitted");
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
				<Box>
					<Box>
						{selectedImage ? (
							<Box textAlign={"center"} padding={2}>
								<Image
									src={URL.createObjectURL(selectedImage)}
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
										<Text fontWeight='bold'>
											Upload your image
										</Text>
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
											<Button as='span'>
												Choose File
											</Button>
										</label>
									</Flex>
								</FormControl>
							</>
						)}
					</Box>
				</Box>
			</Box>
			<Center padding={10}>
				<Button type='submit' onClick={onSubmit}>
					Analyze Image
				</Button>
			</Center>
		</Flex>
	);
}
