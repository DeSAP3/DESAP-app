"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

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
	isValidatingUserResponse: boolean;
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
	isValidatingUserResponse: false,
	mutateUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	// Set user data is needed since it will be use for the user management page
	const [userData, setUserData] = useState<UserData>(initialUserData);
	const { data: session } = useSession();

	const {
		data: userResponse,
		isLoading: isLoadingUserResponse,
		isValidating: isValidatingUserResponse,
		mutate: mutateUser,
	} = useSWR(
		session?.user && `/api/profile/readByEmail?email=${session.user.email}`,
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (userResponse && userResponse.data && session) {
			setUserData(userResponse.data);
		}
	}, [userResponse, session]);

	useEffect(() => {
		if (session) {
			mutateUser();
		}
	}, [session, mutateUser]);

	useEffect(() => {
		localStorage.setItem("userData", JSON.stringify(userData));
	}, [userData]);

	useEffect(() => {
		const storedUserData = localStorage.getItem("userData");
		if (storedUserData) {
			setUserData(JSON.parse(storedUserData));
		}
	}, []);

	const value = {
		userData,
		setUserData,
		isLoadingUserResponse,
		isValidatingUserResponse,
		mutateUser,
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};
