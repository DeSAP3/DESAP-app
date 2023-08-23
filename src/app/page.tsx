"use client";
import { Button, Center, Container, Flex, Spacer } from "@chakra-ui/react";
import { ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import ImageForm from "../../components/ImageForm";
import ResultForm from "../../components/ResultForm";

export default function Home() {
	return (
		<Container maxW='container.md' paddingY={5}>
			<Flex justifyContent={"center"} alignItems={"center"}>
				<ImageForm />
				{/* //TODO: Add a result after calculation */}
				{/* <Spacer />
				<ArrowForwardIcon />
				<Spacer />
				<ResultForm /> */}
			</Flex>
      <Center padding={10}>
        <Button type="submit" onClick={() => alert("Click")}>
          Analyze Image
        </Button>
      </Center>

		</Container>
	);
}
