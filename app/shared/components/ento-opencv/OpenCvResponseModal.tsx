import {
	Box,
	Button,
	Card,
	CardHeader,
	Center,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { ResponseOpenCv } from "./OpenCvForm";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const OpenCVResponseModal = ({
	isOpen,
	onClose,
	data,
}: {
	isOpen: boolean;
	onClose: () => void;
	data: ResponseOpenCv;
}) => {
	const [imageIndex, setImageIndex] = useState(0);
	const [imageSet, setImageSet] = useState([
		{
			title: "Threshold Image",
			image: data.threshold,
		},
		{
			title: "Detected Object Image",
			image: data.objects,
		},
		{
			title: "Outline Image",
			image: data.outlines,
		},
		{
			title: "Overlay Image",
			image: data.overlay,
		},
	]);

	return (
		<>
			<Modal onClose={onClose} size={"full"} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textDecor={"underline"}>
						Analyze Result
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Card >
							<CardHeader>
								<Heading size={"md"}>
									{imageSet[imageIndex].title}
								</Heading>
							</CardHeader>
						</Card>
						<Grid
							h='500px'
							templateRows='repeat(1, 1fr)'
							templateColumns='3fr 1fr'
							gap={4}
                            mt={5}
						>
							<GridItem colSpan={1} position={"relative"}>
								<Box>
									<Image
										src={`data:image/jpeg;base64,${imageSet[imageIndex].image}`}
										alt={imageSet[imageIndex].title}
										objectFit='contain'
										fill
										// width={300}
										// height={450}
									/>
								</Box>
							</GridItem>
							<GridItem colSpan={1}>
								<TableContainer>
									<Table
										size={"sm"}
										variant='striped'
										colorScheme='teal'
									>
										<Thead>
											<Tr>
												<Th textAlign={"center"}>
													Metric
												</Th>
												<Th></Th>
												<Th textAlign={"center"}>
													Data
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Td>Avergae Cluster Area</Td>
												<Td>:</Td>
												<Td>{data?.avgClusterArea}</Td>
											</Tr>
											<Tr>
												<Td>
													Avergae Eggs Per Cluster
												</Td>
												<Td>:</Td>
												<Td>
													{data?.avgEggsPerCluster}
												</Td>
											</Tr>
											<Tr>
												<Td>
													AverageSingles Bound Area
												</Td>
												<Td>:</Td>
												<Td>{data?.singlesAvg}</Td>
											</Tr>
											<Tr>
												<Td>Number Singles Bound</Td>
												<Td>:</Td>
												<Td>
													{data?.singlesCalculated}
												</Td>
											</Tr>
											<Tr>
												<Td>Number Estimated Eggs</Td>
												<Td>:</Td>
												<Td>{data?.eggEstimate}</Td>
											</Tr>
											<Tr>
												<Td>Total Eggs</Td>
												<Td>:</Td>
												<Td>{data?.totalEggs}</Td>
											</Tr>
										</Tbody>
									</Table>
								</TableContainer>
							</GridItem>
						</Grid>
						<Center width={"15%"} marginX={"auto"}>
							<IconButton
								aria-label='previous'
								icon={<ChevronLeftIcon />}
								bg={"brand.acceptbutton"}
								isRound={true}
								onClick={() => {
									setImageIndex(imageIndex - 1);
								}}
								hidden={imageIndex === 0}
							/>
							<Spacer />
							<IconButton
								aria-label='next'
								icon={<ChevronRightIcon />}
								bg={"brand.acceptbutton"}
								isRound={true}
								onClick={() => {
									setImageIndex(imageIndex + 1);
								}}
								hidden={imageIndex === imageSet.length - 1}
							/>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default OpenCVResponseModal;
