"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";

export interface UserData {
	id: number|null;
	userName: string;
	email: string;
	role: string;
	livingAddress?: string;
	councilId?: number | null;
}

interface UserContextType {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	isLoadingUserResponse: boolean;
	mutateUser: () => void;
	dataLoaded: boolean;
}

const initialUserData: UserData = {
	id: null,
	userName: "",
	email: "",
	role: "",
	livingAddress: "",
	councilId: null,
};

const UserContext = createContext<UserContextType>({
	userData: initialUserData,
	setUserData: () => {},
	isLoadingUserResponse: false,
	dataLoaded: false,
	mutateUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [userData, setUserData] = useState<UserData>(initialUserData);
	const [dataLoaded, setDataLoaded] = useState(false);
	const { data: session } = useSession();

	const { data: userResponse, isLoading: isLoadingUserResponse, mutate: mutateUser } = useSWR(
		`/api/profile/readByEmail?email=${session?.user?.email}`,
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (userResponse) {
			setUserData({
				id: userResponse?.id,
				userName: userResponse?.username,
				email: userResponse?.email,
				role: userResponse?.role,
				livingAddress: userResponse?.livingAddress,
				councilId: userResponse?.councilId,
			});
			setDataLoaded(true)
		} else {
			setUserData(initialUserData);
			setDataLoaded(false)
		}
	}, [userResponse]);

	const value = React.useMemo(
		() => ({ userData, setUserData, isLoadingUserResponse, mutateUser, dataLoaded }),
		[userData, setUserData, isLoadingUserResponse, mutateUser]
	);


	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};
