import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TradeForm from "../../../components/trade/trade-form";
import { ProtectRoute } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/use-http";

const EditTrade: NextPage = () => {
	const [loadedTrade, setLoadedTrade] = useState();
	const { isLoading, axiosRequest } = useHttpClient();
    const router = useRouter();
      const tradeId = router.query.id;
	useEffect(() => {
      if(tradeId){
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
	return <TradeForm trade={loadedTrade}></TradeForm>;
};
export default ProtectRoute(EditTrade, "ROLE_USER");
