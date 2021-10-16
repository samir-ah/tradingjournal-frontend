import React, { useState, useEffect, useCallback, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { NextPage } from "next";
import LoadingPage from "../components/ui/loading-page";
import MainLayout from "../components/layout/main-layout";

let logoutTimer: number;
type AuthContextObj = {
	token: string | null | undefined;
	user: any;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (token: string) => void;
	logout: () => void;
};
export const AuthContext = React.createContext<AuthContextObj>({
	token: null,
	user: null,
	isLoggedIn: false,
	isLoading: true,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime: number | null | undefined) => {
	if (!expirationTime) {
		return 0;
	}
	const currentTime = new Date().getTime() / 1000;
	const adjExpirationTime = expirationTime;
	const remainingDuration = (adjExpirationTime - currentTime) * 1000;
	return remainingDuration;
};

const AuthContextProvider: React.FC = (props) => {
	const [token, setToken] = useState<string | null>();
	const [user, setUser] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const logoutHandler = useCallback(() => {
		setToken(null);
		setUser(null);
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("user");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
		router.replace("/auth");
	}, [router]);

	const loginHandler = (token: string) => {
		const user: any = jwtDecode(token);
		setToken(token);
		setUser(user);
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("user", JSON.stringify(user));
		const remainingTime = calculateRemainingTime(user.exp);
		logoutTimer = window.setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		const retrieveStoredToken = () => {
			const storedToken = window.localStorage.getItem("token");
			const storedUser = window.localStorage.getItem("user");
			let remainingTime = 0;
			let user: any;
			if (storedUser && storedToken) {
				user = JSON.parse(storedUser);
				setToken(storedToken);
				setUser(user);
				const storedExpirationDate = user.exp;
				remainingTime = calculateRemainingTime(storedExpirationDate);
				logoutTimer = window.setTimeout(logoutHandler, remainingTime);
			}
			if (remainingTime <= 3600) {
				window.localStorage.removeItem("token");
				window.localStorage.removeItem("user");
			}
			setIsLoading(false);
		};
		retrieveStoredToken();
	}, [logoutHandler]);

	const contextValue: AuthContextObj = {
		token: token,
		user: user,
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

type ProtectRouteFn = (
	Component: NextPage<any>,
	userRoles?: string
) => React.FC;
export const ProtectRoute: ProtectRouteFn = (Component, userRoles) => {
	const Authenticated: NextPage = (pageProps): JSX.Element | null => {
		const authContext = useContext(AuthContext);
		const router = useRouter();
		if (authContext.isLoading) {
			return <LoadingPage></LoadingPage>;
		}
		if (
			!authContext.isLoggedIn ||
			(authContext.isLoggedIn &&
				userRoles &&
				userRoles.indexOf(authContext.user.roles) === -1)
		) {
			router.replace("/auth");
			return <LoadingPage />;
		}

		return (
				<Component {...pageProps} />
		);
	};

	return Authenticated;
};
export default AuthContextProvider;
