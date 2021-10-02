import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import RegisterForm from "../../components/auth/register-form";
function RegisterPage() {
	const [isLoading, setIsLoading] = useState(true);
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
	// 	return <p>Loading...</p>;
	// }

	return <RegisterForm />;
}

export default RegisterPage;
