import React, { useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";

let logoutTimer: NodeJS.Timeout;
type AuthContextObj = {
	token: string | null | undefined;
	jwtPayload: any;
	isLoggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
};
export const AuthContext = React.createContext<AuthContextObj>({
	token: "",
	jwtPayload: {},
	isLoggedIn: false,
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

const retrieveStoredToken = () => {
	const storedToken = window.localStorage.getItem("token");
	let storedjwtPayload = window.localStorage.getItem("jwtPayload");
	let remainingTime = 0;
	let jwtPayload: any;
	if (storedjwtPayload) {
		jwtPayload = JSON.parse(storedjwtPayload);
		const storedExpirationDate = jwtPayload.exp;
		remainingTime = calculateRemainingTime(
			storedExpirationDate
		);

		if (remainingTime <= 3600) {
			window.localStorage.removeItem("token");
			window.localStorage.removeItem("jwtPayload");
			return null;
		}
	}

	return {
		token: storedToken,
		jwtPayload: jwtPayload,
		duration: remainingTime,
	};
};

const AuthContextProvider: React.FC = (props) => {
	let tokenData;

	let initialToken;
	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);
	const [jwtPayload, setJwtPayload] = useState();

	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("jwtPayload");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token: string) => {
		setToken(token);
		const jwtPayload: any = jwtDecode(token);
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("jwtPayload", JSON.stringify(jwtPayload));

		const remainingTime = calculateRemainingTime(jwtPayload.exp);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		
		if (tokenData) {
			// console.log(tokenData.duration);
			setJwtPayload(tokenData.jwtPayload);
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue: AuthContextObj = {
		token: token,
		jwtPayload: jwtPayload,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
