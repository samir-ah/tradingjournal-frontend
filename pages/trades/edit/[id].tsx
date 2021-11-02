import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "react-select/dist/declarations/src/components/indicators";
import TradeForm from "../../../components/trade/trade-form";
import LoadingPage from "../../../components/ui/loading-page";
import { ProtectRoute } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/use-http";

const EditTrade: NextPage = ({ tradeId }: any) => {
	const [loadedTrade, setLoadedTrade] = useState();
	const { isLoading, axiosRequest } = useHttpClient();
	const router = useRouter();
	// const tradeId = router.query.id;
	useEffect(() => {
		if (tradeId) {
			const fetchInstruments = async () => {
				try {
					const result = await axiosRequest(`/api/trades/${tradeId}`);
					setLoadedTrade(result.data);
				} catch (error: any) {
					// toast.error(error.data.detail);
				}
			};
			fetchInstruments();
		}
	}, [axiosRequest, tradeId]);
	return loadedTrade ? <TradeForm trade={loadedTrade} /> : <LoadingPage />;
};
export default ProtectRoute(EditTrade, "ROLE_USER");
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: false, //indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			tradeId: context.params?.id,
		},
	};
};