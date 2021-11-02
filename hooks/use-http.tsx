import { useState, useCallback, useRef, useEffect, useContext } from "react";
import axios, { AxiosPromise } from "axios";
import { AuthContext } from "../context/auth-context";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const authContext = useContext(AuthContext);
	const activeHttpRequests = useRef<AbortController[]>([]);

	const axiosRequest = useCallback(async (url, config = {}) => {
		setIsLoading(true);
		const httpAbortCtrl = new AbortController();
		activeHttpRequests.current.push(httpAbortCtrl);
		
		try {
			const response: any = await axios(url, {
				...config,
				headers: {
					...config.headers,
					Accept: "application/ld+json",
					...(authContext.token && {
						Authorization: `Bearer ${authContext.token}`,
					}),
				},
				signal: httpAbortCtrl.signal,
				baseURL: "https://tradingjournal.solutionswebelegantes.fr",
			});
			activeHttpRequests.current = activeHttpRequests.current.filter(
				(reqCtrl) => reqCtrl !== httpAbortCtrl
			);
			// console.log(response);
			setIsLoading(false);
			return response;
		} catch (error: any) {
			setIsLoading(false);
			throw error.response;
		}
	}, [authContext.token]);

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) =>
				abortCtrl.abort()
			);
		};
	}, []);

	return { isLoading, axiosRequest };
};
