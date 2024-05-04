// app/providers.tsx
"use client";

import AuthProvider from "@/shared/providers/authProvider";
import { SWRProvider } from "@/shared/providers/swrProvider";
import { UserProvider } from "@/shared/providers/userProvider";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRProvider>
			<ChakraProvider>
				<AuthProvider>
					<UserProvider>{children}</UserProvider>
				</AuthProvider>
			</ChakraProvider>
		</SWRProvider>
	);
}
