import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

// Assuming UserData and UserContextType are defined elsewhere
interface UserData {
	id: string | null;
	userName: string;
	email: string;
	role: string;
	livingAddress: string;
	councilId: string | null;
}

interface UserContextType {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	isLoadingUserResponse: boolean;
	mutateUser: () => void;
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
	mutateUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [userData, setUserData] = useState<UserData>(initialUserData);
	const { data: session } = useSession();

	const {
		data: userResponse,
		isLoading: isLoadingUserResponse,
		mutate: mutateUser,
	} = useSWR(
		session?.user?.email
			? `/api/profile/readByEmail?email=${session.user.email}`
			: null,
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (userResponse) {
			setUserData(userResponse.data);
		} else {
			setUserData(initialUserData);
		}
	}, [userResponse]);

	useEffect(() => {
		if (session?.user?.email) {
			mutateUser();
		}
	}, [session?.user?.email, mutateUser]);

	const value = {
		userData,
		setUserData,
		isLoadingUserResponse,
		mutateUser,
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};
