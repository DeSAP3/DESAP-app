"use client";
import { ResponseImage } from "@/(desap)/ento/calculator/page";
import { useUser } from "@/shared/providers/userProvider";
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { JsonObject } from "@prisma/client/runtime/library";
import Image from "next/image";
import LoadingComponent from "../loading";
import { Role } from "@prisma/client";

type ResultFormProps = {
	response: ResponseImage;
	predictionResponse?: JsonObject;
	isLoadingSaving: boolean;
	onImageSave: () => Promise<void>;
};

const ResultForm = ({
	response,
	predictionResponse,
	isLoadingSaving,
	onImageSave,
}: ResultFormProps) => {
	const { userData } = useUser();
	return (
		<>
			<Flex align='center' justify='center'>
				<Text fontWeight='bold'>Analyzed Image</Text>
				<Search2Icon style={{ marginLeft: "0.5rem" }} />
			</Flex>
			<Box textAlign={"center"} padding={2}>
				{response.imageDisplay && (
					<Image
						src={response.imageDisplay}
						width={500}
						height={360}
						alt='Uploaded image'
					/>
				)}
			</Box>
			<Flex direction={"column"} fontSize={"x-small"}>
				<Text>Analyse Time: {response.time}s</Text>
				{response.image && (
					<Text>
						Image Size: {response.image.height} x
						{response.image.width}
					</Text>
				)}
				{response.predictions && (
					<Text>
						Larvae Count:
						{response.predictions.some(
							(prediction) => prediction.class === "larvae"
						)
							? response.predictions.filter(
									(prediction) =>
										prediction.class === "larvae"
							  ).length
							: 0}
					</Text>
				)}
				{predictionResponse &&
					userData.email !== undefined &&
					userData.role === Role.OPERATION_TEAM && (
						<Center padding={10}>
							{isLoadingSaving ? (
								<LoadingComponent text='Saving Image...' />
							) : (
								<Button
									type='submit'
									onClick={onImageSave}
									bg={"brand.acceptbutton"}
								>
									Save Image
								</Button>
							)}
						</Center>
					)}
			</Flex>
		</>
	);
};

export default ResultForm;
