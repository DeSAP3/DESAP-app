// app/providers.tsx
"use client";

import AuthProvider from "@/shared/providers/authProvider";
import { SWRProvider } from "@/shared/providers/swrProvider";
import { UserProvider } from "@/shared/providers/userProvider";
import { ChakraProvider } from "@chakra-ui/react";
import appTheme from "../static/theme";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRProvider>
			<ChakraProvider theme={appTheme}>
				<AuthProvider>
					<UserProvider>{children}</UserProvider>
				</AuthProvider>
			</ChakraProvider>
		</SWRProvider>
	);
}
