import { extendTheme } from "@chakra-ui/react";
import { text } from "stream/consumers";

const appTheme = extendTheme({
	fonts: {
		heading: `'Roboto Mono', monospace`,
		body: `'Ubuntu Mono', monospace`,
	},
	colors: {
		brand: {
			infocard: "#edf2f7",
			header: "#e8e6e6",
			footer: "#e8e6e6",

			enhancetext: "#000000",
			text: "#222831",
			positivetext: "#38a169",
			negativetext: "#e53e3e",

			avatar: "#31363F",

			defaultbutton: "#000000",
			acceptbutton: "#4d8f8f",
			rejectbutton: "#e53e3e",
			uploadbutton: "#d9e9e9",
			infobutton: "#b1c8c8",

			shadow: "#eeeeee",
		},
	},
	colorScheme: {
		brand: {
			50: "#f0f5f5",
			100: "#d9e9e9",
			200: "#b3d3d3",
			300: "#8cbdbd",
			400: "#66a6a6",
			500: "#4d8f8f",
			600: "#3e7171",
			700: "#2f5353",
			800: "#203535",
			900: "#101a1a",
		},
	},
});

export default appTheme;
