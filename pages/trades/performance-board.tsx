import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import PerformanceDetail from "../../components/performance/performance-detail";
import TradeForm from "../../components/trade/trade-form";
import { AuthContext, ProtectRoute } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-http";
import { getParamFromURLPath } from "../../utils/utils";

const PerformanceBoard: NextPage = () => {
	const [performanceData, setPerformanceData] = useState<any>();
	const { isLoading, axiosRequest } = useHttpClient();
	const router = useRouter();
	const authCtx = useContext(AuthContext);

	const fetchPerformanceData = useCallback(
		async () => {
			try {
				const result = await axiosRequest(
					`/api/performance`
				);

				setPerformanceData(result.data);
                

			} catch (error: any) {
				// toast.error(error.data.detail);
			}
		},
		[axiosRequest]
	);

	useEffect(() => {
		fetchPerformanceData();
	}, [fetchPerformanceData]);

	return (
		<PerformanceDetail
			totalTrades={performanceData?.totalTrades || 0}
			totalRatio={performanceData?.totalPerformance || 0}
			performanceByMonth={performanceData?.groupByMonth || []}
			cumulativePerformance={performanceData?.byTradePerformance || []}
		></PerformanceDetail>
	);
};
export default ProtectRoute(PerformanceBoard, "ROLE_USER");
