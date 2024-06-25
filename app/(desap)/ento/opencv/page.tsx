"use client";
import OpenCvForm from "@/shared/components/ento-opencv/OpenCvForm";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { Box, Container, Flex } from "@chakra-ui/react";

export default function OpenCV() {
	return (
		<>
			<PageHeader title='Analyze Image for Mosquito Eggs' />
			<Container maxW='container.md' paddingY={5}>
				<Flex justifyContent={"center"} alignItems={"flex-start"}>
					<Box
						maxW='1000px'
						minW='400px'
						borderRadius='lg'
						overflow='hidden'
					>
						<OpenCvForm />
					</Box>
				</Flex>
			</Container>
		</>
	);
}
