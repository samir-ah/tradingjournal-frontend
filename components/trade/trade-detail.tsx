import { PaperClipIcon, PencilIcon, XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { PopupContext } from "../../context/popup-context";
import { useHttpClient } from "../../hooks/use-http";
import ImagesList from "./tradeimage-list";

const TradeDetail: React.FC<{
	trade: any;
}> = (props) => {
	const { trade } = props;
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	const popupCtx = useContext(PopupContext);
	const owner = authCtx.user.id === parseInt(trade.author.id);

async function onDeleteTradeHandler(tradeId: string) {
	try {
		const result = await deleteTrade(tradeId);
		router.replace("/trades/my-trades")
	} catch (error) {}
}
async function deleteTrade(tradeId: string) {
	return await axiosRequest(`/api/trades/${tradeId}`, {
		method: "delete",
	});
}

	return (
		<div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mx-1">
			<div className="px-4 py-5 sm:px-6">
				<div className="flex justify-between">
					<div className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-50">
						{trade.tradeInstrument.name}
					</div>
					<div className="flex text-gray-800 dark:text-gray-100 mb-3 font-bold justify-start">
						<span
							className={`${
								trade.isGood == true
									? "bg-green-600"
									: "bg-red-900"
							} w-auto text-gray-50 rounded-full px-3 py-1  text-xs flex items-center mx-1`}
						>
							{trade.isGood == true ? "Bon" : "A améliorer"}
						</span>
						<span
							className={`${
								trade.finalRatio == 0
									? "bg-blue-500"
									: trade.finalRatio > 0.0
									? "bg-green-600"
									: "bg-red-400"
							} w-auto text-gray-50 rounded-full px-3 py-1  text-xs flex items-center mx-1`}
						>
							{trade.finalRatio == 0
								? trade.finalRatio
								: trade.finalRatio > 0.0
								? "+" + trade.finalRatio
								: "-" + trade.finalRatio}
							%
						</span>
					</div>
				</div>

				<div className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
					<span className="mx-1">Début: {trade.startAt}</span>
					{trade.endAt && (
						<span className="mx-1">Fin: {trade.endAt}</span>
					)}
				</div>
			</div>
			<div className="border-t border-gray-300">
				<dl>
					<div className="bg-gray-100 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-100">
							Raisons / Confirmations
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2">
							{trade.reasons}
						</dd>
					</div>
					<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-100">
							Résultat
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2">
							{trade.outcome}
						</dd>
					</div>
					<div className="bg-gray-100 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-100">
							Leçon
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2">
							{trade.lesson}
						</dd>
					</div>

					<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-100 mb-3">
							Captures{" "}
							<span className="font-light text-xs ">
								Cliquez sur une image pour agrandir
							</span>
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2 ">
							<ImagesList
								images={props.trade.tradeImages}
								edit={false}
							/>
						</dd>
					</div>
					<div className="bg-gray-100 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-100">
							Auteur
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2">
							{trade.author.username}
						</dd>
					</div>
					{owner && <div className="bg-white dark:bg-gray-800 px-4 py-5 flex justify-around">
						<div
							className="cursor-pointer w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center "
							onClick={() => {
								popupCtx.showPopupHandler({
									message:
										"Etes-vous sûr de vouloir supprimer ce trade ? la supression est définitive",
									onConfirmTrue: onDeleteTradeHandler.bind(
										null,
										trade.id
									),
									title: null,
								});
							}}
						>
							<XIcon width={20} height={20} />
						</div>
						<div
							className="cursor-pointer w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center mx-1"
							onClick={() => {
								router.push(`/trades/edit/${trade.id}`);
							}}
						>
							<PencilIcon width={20} height={20} />
						</div>
					</div>}
				</dl>
			</div>
		</div>
	);
};
export default TradeDetail;
