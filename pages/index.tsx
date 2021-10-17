import type { GetStaticProps, NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import {ProtectRoute } from "../context/auth-context";
import { useRef } from "react";
import ComingSoonAnimation from "../components/lottie-animations/cooming-soon";


// const Home: NextPage<{ protected: boolean; userRoles: string[] }> = (props) => {
const Home: NextPage = () => {
	return (
		<ComingSoonAnimation></ComingSoonAnimation>
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
