import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import ButtonLink from "../ui/button-link";
import Navbar from "../ui/nav-bar";
type Props = {
	children?: React.ReactNode;
};
function MainLayout({ children }: Props) {
		const authContext = useContext(AuthContext);

	return (
		<div>
			{authContext.isLoggedIn && <Navbar></Navbar>}
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	);
}

export default MainLayout;
