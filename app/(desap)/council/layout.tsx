import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box width={"90%"} marginY={5} marginX={"auto"}>
			{children}
		</Box>
	);
}
