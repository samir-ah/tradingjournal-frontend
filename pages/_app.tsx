import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/auth-context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Head>
				<title>Journal de trading</title>
				<meta name="description" content="Journal de trading" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			
				<Component {...pageProps} />
		</AuthContextProvider>
	);
}
export default MyApp;
