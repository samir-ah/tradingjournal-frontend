import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/ui/nav-bar";
import {ProtectRoute } from "../context/auth-context";

const MyTrades: NextPage = () => {
	
	return (
	<div className="text-white"> Mes Trades </div>
	);
};
export default ProtectRoute(MyTrades,"ROLE_USER");
