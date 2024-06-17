"use client";
import AddCouncil from "@/shared/components/council-new/addCouncil";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";
import { Container, Text } from "@chakra-ui/react";

const AddNewCouncilPage = () => {
	return (
		<>
			<Container maxW='container.md' paddingY={5}>
				<PageHeader title={`Add New Council`} />
				<Text as={"p"} fontSize='medium'>
					As a community leader, you are able to create your council.
				</Text>
			</Container>
			<AddCouncil />
		</>
	);
};

export default AddNewCouncilPage;
