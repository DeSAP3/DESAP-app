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
	Text,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import { ResponseOpenCv } from "./OpenCvForm";
import { useState } from "react";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	InfoOutlineIcon,
} from "@chakra-ui/icons";

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
			title: "Original Image",
			image: data.original,
		},
		{
			title: "Threshold Image",
			image: data.threshold,
		},
		{
			title: "Detected Object Image",
			image: data.objects,
		},
		{
			title: "Egg Outlined Image",
			image: data.outlines,
		},
		{
			title: "Overlay Result Image",
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
						<Card>
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
										src={
											imageIndex === 0
												? URL.createObjectURL(
														imageSet[0]
															.image as File
												  )
												: `data:image/jpeg;base64,${imageSet[imageIndex].image}`
										}
										alt={imageSet[imageIndex].title}
										objectFit='contain'
										fill
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
												<Td>
													<Tooltip
														hasArrow
														label='Represent the average area of a group of closely packed mosquito eggs'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
														>
															Average Cluster Area
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>{data?.avgClusterArea}</Td>
											</Tr>
											<Tr>
												<Td>
													<Tooltip
														hasArrow
														label='Represent the average number of mosquito eggs in a cluster'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
														>
															Average Eggs per
															Cluster
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>
													{data?.avgEggsPerCluster}
												</Td>
											</Tr>
											<Tr>
												<Td>
													<Tooltip
														hasArrow
														label='Represent the average area of individual mosquito eggs'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
														>
															Average Single Egg
															Area
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>{data?.singlesAvg}</Td>
											</Tr>
											<Tr>
												<Td>
													<Tooltip
														hasArrow
														label='Represent the number of individual mosquito eggs identified based on static (pre-define) area estimation'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
														>
															Total Single Eggs
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>
													{data?.singlesCalculated}
												</Td>
											</Tr>
											<Tr>
												<Td>
													<Tooltip
														hasArrow
														label='Represent the estimated total number of mosquito eggs based on dynamic area estimation'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
															fontWeight={"bold"}
														>
															Estimated Total Eggs
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>{data?.eggEstimate}</Td>
											</Tr>
											<Tr>
												<Td>
													<Tooltip
														hasArrow
														label='Represent the total counted mosquito eggs, including both single eggs and clusters'
													>
														<Box
															display={"flex"}
															alignItems={
																"center"
															}
															width={"100%"}
															fontWeight={"bold"}
														>
															Total Eggs
														</Box>
													</Tooltip>
												</Td>
												<Td>:</Td>
												<Td>{data?.totalEggs}</Td>
											</Tr>
										</Tbody>
									</Table>
								</TableContainer>
							</GridItem>
						</Grid>
						<Card>
							<CardHeader>
								<Center
									width={"15%"}
									marginX={"auto"}
									marginTop={5}
								>
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
										hidden={
											imageIndex === imageSet.length - 1
										}
									/>
								</Center>
							</CardHeader>
						</Card>
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
