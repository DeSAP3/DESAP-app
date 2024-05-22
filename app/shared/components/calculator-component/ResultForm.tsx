"use client";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import { ResponseImage } from "@/(desap)/ento/calculator/page";

type ResultFormProps = {
	response: ResponseImage;
};

const ResultForm = ({ response }: ResultFormProps) => {
	return (
		<Box
			maxW='800px'
			minW='400px'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			textAlign='center'
			padding={2}
		>
			<Flex align='center' justify='center'>
				<Text fontWeight='bold'>Analyzed Image</Text>
				<Search2Icon style={{ marginLeft: "0.5rem" }} />
			</Flex>
			<Box></Box>
			<Flex direction={"column"} fontSize={"x-small"}>
				<Text>Analyse Time: {response.time}s</Text>
				<Text>
					Image Size: {response.image.height} x {response.image.width}
				</Text>
				<Text>
					{/* Calculate the number of class="larvae" */}
					Larvae Count: {response.predictions.some((prediction) => prediction.class === "larvae") ? response.predictions.filter((prediction) => prediction.class === "larvae").length : 0}
				</Text>
			</Flex>
		</Box>
	);
};

export default ResultForm;
