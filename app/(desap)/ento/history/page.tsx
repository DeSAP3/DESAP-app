"use client";
import HistoryTable from "@/shared/components/history-component/HistoryTable";
import { Center, Text } from "@chakra-ui/react";

export default function History() {
	return (
		<>
			<Center pt={3}>
				<Text as={"u"} fontSize='2xl' fontWeight='bold'>
					Calculation History
				</Text>
			</Center>
			<Center mt={10}>
				<HistoryTable />
			</Center>
		</>
	);
}
