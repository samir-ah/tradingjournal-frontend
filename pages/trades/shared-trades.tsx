import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import AddContentAnimation from "../../components/lottie-animations/add-content";
import TradeList from "../../components/trade/trade-list";
import Button from "../../components/ui/button";
import GridLoader from "../../components/ui/grid-content-loader";
import Navbar from "../../components/ui/nav-bar";
import Pagination from "../../components/ui/pagination";
import { AuthContext, ProtectRoute } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-http";
import { getParamFromURLPath } from "../../utils/utils";
import auth from "../auth";

const SharedTrades: NextPage = () => {
	const [loadedTrades, setLoadedTrades] = useState<any[]>();
	const router = useRouter();
		const authCtx = useContext(AuthContext);


	const [currentPage, setCurrentPage] = useState(
		parseInt(router.query.page?.toString() || "1") || 1
	);

	const [lastPage, setLastPage] = useState(1);
	const { isLoading, axiosRequest } = useHttpClient();
	const fetchTrades = useCallback(
		async (selectedPage: number) => {

			try {
				const result = await axiosRequest(
					`/api/trades?isPublished=1&page=${selectedPage}`
				);

				setLoadedTrades(result.data["hydra:member"]);
				
				
				if ("hydra:view" in result.data && "hydra:last" in result.data["hydra:view"]) {
					const hydraView = result.data["hydra:view"];
					const lastPageParam = getParamFromURLPath(
						"page",
						hydraView["hydra:last"]
					);
					setLastPage(parseInt(lastPageParam || "1"));
				} else {
					setLastPage(1);
				}
				
			} catch (error: any) {
				// toast.error(error.data.detail);
			}
		},
		[axiosRequest]
	);

	useEffect(() => {
		fetchTrades(currentPage);
	}, [currentPage, fetchTrades]);

	function onPageChangeHandler(page: number) {
		setCurrentPage(page);
		router.push(`/trades/shared-trades?page=${page}`);
	}
	async function onDeleteTradeHandler(tradeId: string) {
		try {
			const result = await deleteTrade(tradeId);
			if (
				(loadedTrades && loadedTrades.length > 1) ||
				currentPage - 1 === 0
			) {
				fetchTrades(currentPage);
			} else if (currentPage - 1 > 0) {
				onPageChangeHandler(currentPage - 1);
			}
		} catch (error) {}
	}
	async function deleteTrade(tradeId: string) {
		return await axiosRequest(`/api/trades/${tradeId}`, {
			method: "delete",
		});
	}
	return (
		<div className="w-full">
			{(loadedTrades && loadedTrades.length > 0) || isLoading ? (
				<div className="mx-auto container py-20 px-6">
					{isLoading ? (
						<GridLoader />
					) : (
						loadedTrades && (
							<TradeList
								trades={loadedTrades}
								onDeleteTrade={onDeleteTradeHandler}
							/>
						)
					)}
					<div className="flex justify-center mt-10">
						<Pagination
							onPageChange={onPageChangeHandler}
							lastPage={lastPage}
							currentPage={currentPage}
						/>
					</div>
				</div>
			) : (
				<AddContentAnimation>
					Aucun trade, veuillez en ajouter
				</AddContentAnimation>
			)}
		</div>
	);
};
export default ProtectRoute(SharedTrades, "ROLE_USER");
