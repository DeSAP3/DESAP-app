"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
export default function ResultForm(props: any) {
	return (
		<Box
			maxW='800px'
			minW='400px'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
		>
			<Box textAlign='center' padding={2}>
				<Flex align='center' justify='center'>
					<Text fontWeight='bold'>Analyzed Image</Text>
					<Search2Icon style={{ marginLeft: "0.5rem" }} />
				</Flex>
				<Box>
                    <Text>Result Image</Text>
                </Box>
                
                
			</Box>
		</Box>
	);
}
