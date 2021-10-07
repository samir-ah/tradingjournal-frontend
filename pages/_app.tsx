import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/auth-context";
import Head from "next/head";
import { ToastContainer } from "react-toastify";


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
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme='dark'
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Component {...pageProps} />
		</AuthContextProvider>
	);
}
export default MyApp;
