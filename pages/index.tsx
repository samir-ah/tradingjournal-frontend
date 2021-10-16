import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/ui/nav-bar";
import {ProtectRoute } from "../context/auth-context";


// const Home: NextPage<{ protected: boolean; userRoles: string[] }> = (props) => {
const Home: NextPage = () => {
	
	return (
	<div className="text-white">Hello</div>
	);
};

// export const getStaticProps: GetStaticProps = async (context) => {
// 	return {
// 		props: {
// 			protected: true,
// 		},
// 	};
// };

export default ProtectRoute(Home,"ROLE_USER");
