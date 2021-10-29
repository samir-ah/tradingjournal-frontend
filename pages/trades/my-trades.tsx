import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddContentAnimation from "../../components/lottie-animations/add-content";
import Button from "../../components/ui/button";
import GridLoader from "../../components/ui/grid-content-loader";
import Navbar from "../../components/ui/nav-bar";
import Pagination from "../../components/ui/pagination";
import { ProtectRoute } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-http";
import { getParamFromURLPath } from "../../utils/utils";

const MyTrades: NextPage = () => {
	const [loadedTrades, setLoadedTrades] = useState();
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(
		parseInt(router.query.currentPage?.toString() || "1") || 1
	);
	const [lastPage, setLastPage] = useState(1);
	const { isLoading, axiosRequest } = useHttpClient();

	useEffect(() => {
		const fetchTrades = async () => {
			try {
				const result = await axiosRequest(
					`/api/trades?page=${currentPage}`
				);
				setLoadedTrades(result.data["hydra:member"]);

				const lastPageParam = getParamFromURLPath(
					"page",
					result.data["hydra:view"]["hydra:last"]
				);
				if (lastPageParam) {
					setLastPage(parseInt(lastPageParam));
				}
			} catch (error: any) {
				// toast.error(error.data.detail);
			}
		};
		fetchTrades();
	}, [axiosRequest, currentPage]);

	function onPageChangeHandler(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className="w-full">
			<div className={`flex justify-end mx-3`}>
				<Button
					onClick={() => {
						router.push("/trades/new-trade");
					}}
				>
					Ajouter
				</Button>
			</div>
			{loadedTrades ? (
				<div className="mx-auto container py-20 px-6">
					{isLoading ? (
						<GridLoader />
					) : (
						<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							<div className="w-full h-64 flex flex-col justify-between bg-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4">
								<div>
									<h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
										13 things to work on
									</h4>
									<p className="text-gray-800 dark:text-gray-100 text-sm">
										Our interior design experts work with
										you to create the space that you have
										been dreaming about.
									</p>
								</div>
								<div>
									<div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
										<p className="text-sm">
											March 28, 2020
										</p>
										<div className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-pencil"
												width={20}
												height={20}
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path
													stroke="none"
													d="M0 0h24v24H0z"
												/>
												<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
												<line
													x1="13.5"
													y1="6.5"
													x2="17.5"
													y2="10.5"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
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
export default ProtectRoute(MyTrades, "ROLE_USER");
