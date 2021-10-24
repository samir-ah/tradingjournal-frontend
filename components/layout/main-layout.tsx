import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import ButtonLink from "../ui/button-link";
import Navbar from "../ui/nav-bar";
import { Popup } from "../ui/popup";
type Props = {
	children?: React.ReactNode;
};
function MainLayout({ children }: Props) {
		const authContext = useContext(AuthContext);

	return (
		<div>
			{authContext.isLoggedIn && <Navbar></Navbar>}
			<main className="relative">
				<div className="py-6 sm:px-6 lg:px-8 flex items-center justify-center">
					{children}
				</div>
			</main>
			<Popup/>
		</div>
	);
}

export default MainLayout;
