import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fancyapps/ui/dist/fancybox.css";

import type { AppProps } from "next/app";
import AuthContextProvider, { AuthContext } from "../context/auth-context";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import MainLayout from "../components/layout/main-layout";
import { ThemeContextProvider } from "../context/theme-context";
import { Popup } from "../components/ui/popup";
import { PopupContextProvider } from "../context/popup-context";


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeContextProvider>
			<AuthContextProvider>
				<PopupContextProvider>
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
					theme="dark"
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<MainLayout>
					<Component {...pageProps} />
					
				</MainLayout>
				</PopupContextProvider>
			</AuthContextProvider>
		</ThemeContextProvider>
	);
}
export default MyApp;
