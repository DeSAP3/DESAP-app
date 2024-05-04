"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";

interface UserData {
	userName: string;
	email: string;
	role: string;
	councilId?: number | null;
}

interface UserContextType {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	isLoadingUserResponse: boolean;
	mutateUser: () => void;
}

const initialUserData: UserData = {
	userName: "",
	email: "",
	role: "",
	councilId: null,
};

const UserContext = createContext<UserContextType>({
	userData: initialUserData,
	setUserData: () => {},
	isLoadingUserResponse: false,
	mutateUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [userData, setUserData] = useState<UserData>(initialUserData);
	const { data: session } = useSession();

	const { data: userResponse, isLoading: isLoadingUserResponse, mutate: mutateUser } = useSWR(
		`/api/profile/readByEmail?email=${session?.user?.email}`,
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (userResponse) {
			setUserData({
				userName: userResponse?.username,
				email: userResponse?.email,
				role: userResponse?.role,
				councilId: userResponse?.councilId,
			});
		} else {
			setUserData(initialUserData);
		}
	}, [userResponse]);

	const value = React.useMemo(
		() => ({ userData, setUserData, isLoadingUserResponse, mutateUser }),
		[userData, setUserData, isLoadingUserResponse, mutateUser]
	);


	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};
