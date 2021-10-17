import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AddContentAnimation from "../../components/lottie-animations/add-content";
import Button from "../../components/ui/button";
import Navbar from "../../components/ui/nav-bar";
import { ProtectRoute } from "../../context/auth-context";

const MyTrades: NextPage = () => {
		const router = useRouter();
	return (
		<div>
			<div className={`flex justify-end mx-3`}><Button onClick={()=>{router.push("/trades/new-trade")}}>Ajouter</Button></div>
			<AddContentAnimation>
			Aucun trade, veuillez en ajouter
		</AddContentAnimation></div>
		
	);
};
export default ProtectRoute(MyTrades, "ROLE_USER");
