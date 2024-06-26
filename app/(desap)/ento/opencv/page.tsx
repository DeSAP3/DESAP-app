"use client";
import OpenCvForm from "@/shared/components/ento-opencv/OpenCvForm";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
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
	Text,
	useDisclosure,
} from "@chakra-ui/react";

import Image1 from "/public/001.jpg";
import Image2 from "/public/002.jpg";
import { InfoIcon } from "@chakra-ui/icons";
import Image from "next/image";

export default function OpenCV() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<PageHeader title='Analyze Image for Mosquito Eggs' />
			<Box display={"flex"} justifyContent={"flex-end"} width={"90%"}>
				<IconButton
					variant={"ghost"}
					aria-label='Help'
					icon={<InfoIcon />}
					onClick={onOpen}
				/>
			</Box>
			<Container maxW='container.md' paddingY={5}>
				<Flex justifyContent={"center"}>
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
							src={Image1}
							alt='mosquito egg image 1'
							width={600}
							height={800}
						/>
						<Box h='1rem' />
						<Image
							src={Image2}
							alt='mosquito egg image 2'
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
