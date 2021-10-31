/* eslint-disable @next/next/no-img-element */
import {
	EyeIcon,
	PencilAltIcon,
	PencilIcon,
	StarIcon,
	XCircleIcon,
	XIcon,
} from "@heroicons/react/solid";
import React, { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Fancybox from "../ui/fancybox";
import { DOMAIN_URL } from "../../constants";
import { limitStr, myLoader } from "../../utils/utils";
import { Popup } from "../ui/popup";
import { PopupContext } from "../../context/popup-context";
import { useHttpClient } from "../../hooks/use-http";
import { AuthContext } from "../../context/auth-context";
import { useRouter } from "next/router";

const TradeItem: React.FC<{
	trade: any;
	onDeleteTrade: (tradeId: string) => void;
	onDeleteLikeTrade?: (tradeId: string) => void;
}> = (props) => {
	const { trade } = props;
	const authCtx = useContext(AuthContext);
    const [likedByMe, setLikedByMe] = useState(!!trade.likedByMe);
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	const popupCtx = useContext(PopupContext);
	const owner = authCtx.user.id === parseInt(trade.author.id);
    async function likeToggleHandler(trade:any){
        
        if(likedByMe){
            try {
                const result = await deleteLikeTrade(trade.id,authCtx.user.id)
                 setLikedByMe((prev) => !prev);
                 props.onDeleteLikeTrade && props.onDeleteLikeTrade(trade.id);
            } catch (error) {
                
            }
        }else{
             try {
					const result = await likeTrade(trade.id);
					setLikedByMe((prev) => !prev);
				} catch (error) {}
        }
       
    }
    async function deleteLikeTrade(tradeId: string, authorId: string) {
		return await axiosRequest(
			`/api/trade_likes/trade=${tradeId};author=${authorId}`,
			{
				method: "delete",
			}
		);
	}
	async function likeTrade(tradeId: string) {
		return await axiosRequest(`/api/trade_likes`, {
			data: {
				trade: "api/trades/" + tradeId,
			},
			method: "post",
		});
	}
	return (
		<div className="group w-full h-64 flex flex-col justify-between bg-yellow-400 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-yellow-400 mb-6 py-5 px-4">
			<div>
				<div className="flex text-gray-800 dark:text-gray-100 mb-3 font-bold justify-between">
					<span className="">{trade.tradeInstrument.name}</span>
					<div className="flex ">
						<span className="min-w-max w-auto border border-gray-800 dark:border-gray-200 dark:text-gray-200 rounded-full px-3 py-1 text-gray-800 text-xs flex items-center">
							Le {trade.startAt}
						</span>
					</div>
				</div>
				<div className="flex text-gray-800 dark:text-gray-100 mb-3 font-bold justify-between">
					<div className="flex">
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
								: trade.finalRatio}
							%
						</span>
					</div>

					<div
						className={`cursor-pointer w-8 h-8 rounded-full bg-gray-100 ${
							likedByMe ? "text-yellow-400" : "text-gray-400"
						} flex items-center justify-center mx-1`}
						onClick={likeToggleHandler.bind(null, trade)}
					>
						<StarIcon width={25} height={25} />
					</div>
				</div>
				<p className="text-gray-800 dark:text-gray-100 text-sm">
					{limitStr(trade.lesson || trade.reasons, 100)}
				</p>
			</div>

			<div>
				<div className="flex justify-end my-2">
					<span className="min-w-max w-auto border border-gray-800 dark:border-gray-200 dark:text-gray-200 rounded-full px-3 py-1 text-gray-800 text-xs flex items-center">
						{trade.author.username}
					</span>
				</div>
				<div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
					{/* {owner && (
						<div
							className="cursor-pointer w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center "
							onClick={() => {
								popupCtx.showPopupHandler({
									message:
										"Etes-vous sûr de vouloir supprimer ce trade ? la supression est définitive",
									onConfirmTrue: props.onDeleteTrade.bind(
										null,
										trade.id
									),
									title: null,
								});
							}}
						>
							<XIcon width={20} height={20} />
						</div>
					)} */}
					
						{owner && (
							<div
								className="cursor-pointer w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mx-1"
								onClick={() => {
									router.push(`/trades/edit/${trade.id}`);
								}}
							>
								<PencilIcon width={20} height={20} />
							</div>
						)}
						<div
							className={`cursor-pointer w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center mx-1`}
							onClick={() => {
								router.push(`/trades/${trade.id}`);
							}}
						>
							<EyeIcon width={20} height={20} />
						</div>
					
				</div>
			</div>
		</div>
	);
};

const TradeList: React.FC<{
	trades: any[];
	onDeleteTrade: (tradeId: string) => void;
	onDeleteLikeTrade?: (tradeId: string) => void;
}> = (props) => {
	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{props.trades.map((trade) => {

				return (
					<TradeItem
						key={trade.id}
						trade={trade}
						onDeleteTrade={props.onDeleteTrade}
						onDeleteLikeTrade={props.onDeleteLikeTrade}
					/>
				);
			})}
		</div>
	);
};

export default TradeList;
