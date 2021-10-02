import React, { useState, useEffect, useCallback, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

let logoutTimer: NodeJS.Timeout;
type AuthContextObj = {
	token: string | null | undefined;
	jwtPayload: any;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (token: string) => void;
	logout: () => void;
};
export const AuthContext = React.createContext<AuthContextObj>({
	token: "",
	jwtPayload: {},
	isLoggedIn: false,
	isLoading: true,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime: number | null | undefined) => {
	if (!expirationTime) {
		return 0;
	}
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();
	const remainingDuration = adjExpirationTime - currentTime;
	return remainingDuration;
};

const AuthContextProvider: React.FC = (props) => {
	const [token, setToken] = useState<string | null>();
	const [jwtPayload, setJwtPayload] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const logoutHandler = useCallback(() => {
		setToken(null);
		setJwtPayload(null);
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("jwtPayload");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
		router.replace("/auth");
	}, [router]);

	const loginHandler = (token: string) => {
		setToken(token);
		const jwtPayload: any = jwtDecode(token);
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("jwtPayload", JSON.stringify(jwtPayload));

		const remainingTime = calculateRemainingTime(jwtPayload.exp);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		const retrieveStoredToken = () => {
			setIsLoading(true);
			const storedToken = localStorage.getItem("token");
			const storedjwtPayload = window.localStorage.getItem("jwtPayload");
			let remainingTime = 0;
			let jwtPayload: any;
			if (storedjwtPayload && storedToken) {
				jwtPayload = JSON.parse(storedjwtPayload);
				setToken(storedToken);
				setJwtPayload(jwtPayload);
				const storedExpirationDate = jwtPayload.exp;
				remainingTime = calculateRemainingTime(storedExpirationDate);
				logoutTimer = setTimeout(logoutHandler, remainingTime);
			}
			if (remainingTime <= 3600) {
				window.localStorage.removeItem("token");
				window.localStorage.removeItem("jwtPayload");
			}
			setIsLoading(false);
		};
		retrieveStoredToken();
	}, [logoutHandler]);

	const contextValue: AuthContextObj = {
		token: token,
		jwtPayload: jwtPayload,
		isLoggedIn: !!token,
		isLoading: isLoading,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn, isLoading } = useContext(AuthContext);
	if (isLoading || !isLoggedIn) {
		return <p>loading...</p>;
	}
	return children;
};

export default AuthContextProvider;
