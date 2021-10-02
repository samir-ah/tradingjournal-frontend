import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoginForm from "../../../components/auth/login-form";
function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// getSession().then((session) => {
		// 	if (session) {
		// 		router.replace("/");
		// 	} else {
		// 		setIsLoading(false);
		// 	}
		// });
		setIsLoading(false);
	}, [router]);

	// if (isLoading) {
	// 	return null;
	// }

	return <LoginForm />;
}

export default LoginPage;
