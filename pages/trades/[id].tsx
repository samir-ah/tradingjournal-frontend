import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "react-select/dist/declarations/src/components/indicators";
import TradeDetail from "../../components/trade/trade-detail";
import GridLoader from "../../components/ui/grid-content-loader";
import { ProtectRoute } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-http";

const ViewTradeDetail: NextPage = ({tradeId}:any) => {
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
                    router.replace("/trades/my-trades")
				}
			};
			fetchInstruments();
		}
	}, [axiosRequest, router, tradeId]);
	return loadedTrade && !isLoading ? (
		<TradeDetail trade={loadedTrade} />
	) : (
		<GridLoader />
	);
};
export default ProtectRoute(ViewTradeDetail, "ROLE_USER");

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: true, //indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			tradeId: context.params?.id,
		},
	};
};
