import Image from "next/image";
import Fancybox from "../../components/ui/fancybox";
import { XCircleIcon } from "@heroicons/react/solid";
import Button from "../../components/ui/button";
import { Theme, ThemeContext } from "../../context/theme-context";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useHttpClient } from "../../hooks/use-http";
import { toast } from "react-toastify";
import { format,parse } from "date-fns";
import ImageInput from "../ui/image-input";
import ImagesList from "./tradeimage-list";
import { string } from "yup/lib/locale";
import React from "react";

type Inputs = {
	startAt: string;
	endAt: string;
	reasons: string;
	outcome: string;
	lesson: string;
	finalRatio: number;
	tradeInstrument: { label: string; value: string };
	isGood: boolean;
	isPublished: boolean;
};
let instrumetOptions: { label: string; value: string }[] = [];
const TradeForm: React.FC<{ trade?: any }> = (props) => {
	const themeCtx = useContext(ThemeContext);
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	const [imageFile, setImageFile] = useState<File | string | null>(null);
	const { register, control, handleSubmit, setValue } = useForm<Inputs>({
		defaultValues: {
			startAt: props.trade?.startAt
				? format(
						parse(
							props.trade.startAt,
							"dd/MM/yyyy HH:mm",
							new Date()
						),
						"yyyy-MM-dd'T'HH:mm"
				  )
				: "",
			endAt: props.trade?.endAt
				? format(
						parse(
							props.trade.endAt,
							"dd/MM/yyyy HH:mm",
							new Date()
						),
						"yyyy-MM-dd'T'HH:mm"
				  )
				: "",
			reasons: props.trade?.reasons || "",
			outcome: props.trade?.outcome || "",
			lesson: props.trade?.lesson || "",
			finalRatio: props.trade?.finalRatio || 0,
			isGood: props.trade?.isGood || false,
			isPublished: props.trade?.isPublished || true,
		},
	});
	useEffect(() => {
		const fetchInstruments = async () => {
			try {
				const result = await axiosRequest("/api/trade_instruments");
				instrumetOptions = result.data["hydra:member"].map(
					(instrument: any) => {
						return {
							value: instrument.id,
							label: instrument.name,
						};
					}
				);

				setValue(
					"tradeInstrument",
					props.trade?.tradeInstrument?.id
						? instrumetOptions[
								instrumetOptions.findIndex(
									(el) =>
										el.value ==
										props.trade?.tradeInstrument?.id
								)
						  ]
						: instrumetOptions[0]
				);
			} catch (error: any) {
				// toast.error(error.data.detail);
			}
		};
		fetchInstruments();
	}, [axiosRequest, props.trade?.tradeInstrument?.id, setValue]);
	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		try {
			const result = await saveTrade({
				...data	
			},props.trade?.id || null);
			// console.log(result.data.id);

			if (imageFile) {
				try {
					const result2 = await postTradeImage(
						result.data.id,
						imageFile
					);

					toast.success("Trade enregistré");
				} catch (error: any) {
					console.log(error);
				}
			}
			router.push("/trades/my-trades")
		} catch (error: any) {
			console.log(error);
		}
	};
	async function saveTrade(
		{
		startAt,
		endAt,
		reasons,
		outcome,
		lesson,
		finalRatio,
		tradeInstrument,
		isGood,
		isPublished}:Inputs,
		tradeIdToUpdate?: number
	) {
		const urlRequest = tradeIdToUpdate
			? `/api/trades/${tradeIdToUpdate}`
			: `/api/trades`;
		const method = tradeIdToUpdate
			? "put"
			: "post";
		return await axiosRequest(urlRequest, {
			data: {
				startAt: startAt
					? format(new Date(startAt), "dd/MM/yyyy HH:mm")
					: null,
				endAt: endAt
					? format(new Date(endAt), "dd/MM/yyyy HH:mm")
					: null,
				reasons,
				outcome,
				lesson,
				finalRatio: finalRatio.toString(),
				tradeInstrument: `api/trade_instruments/${tradeInstrument.value}`,
				isGood,
				isPublished,
			},
			method: method,
		});
	}
	async function postTradeImage(tradeId: string, file: File | string) {
		const data = new FormData();
		data.append("trade", tradeId);
		if (file instanceof File) {
			data.append("file", file);
		} else {
			//file is an url (string)
			data.append("imageUrl", file);
		}

		return await axiosRequest("/api/trade_images", {
			data: data,
			method: "post",
			headers: { "Content-Type": "multipart/form-data" },
		});
	}
	
	function imageInputHandler(imageFile: File | string | null) {
		setImageFile(imageFile);
	}
	return (
		<>
			<div className="">
				<div className="mt-5 md:mt-0">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="px-4 py-5 bg-white shadow rounded-md dark:bg-gray-800 space-y-6 sm:p-6">
							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700 dark:text-gray-200"
									>
										Paire de devises
									</label>
									<Controller
										name="tradeInstrument"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												options={instrumetOptions}
												classNamePrefix="react-select"
												className="react-select"
											/>
										)}
									/>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="startAt"
										className="block text-sm font-medium text-gray-700 dark:text-gray-200"
									>
										Date de début
									</label>
									<input
										type="datetime-local"
										{...register("startAt")}
										id="startAt"
										required
										className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-900 dark:text-gray-200 rounded-md ${
											themeCtx.theme == Theme.DARK &&
											"input-datepicker__dark"
										}`}
									/>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="endAt"
										className="block text-sm font-medium text-gray-700 dark:text-gray-200"
									>
										Date de fin
									</label>
									<input
										type="datetime-local"
										id="endAt"
										{...register("endAt")}
										className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-900 dark:text-gray-200 rounded-md ${
											themeCtx.theme == Theme.DARK &&
											"input-datepicker__dark"
										}`}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="Reasons"
									className="block text-sm font-medium text-gray-700 dark:text-gray-200"
								>
									Confirmations
								</label>
								<div className="mt-1">
									<textarea
										id="Reasons"
										{...register("reasons")}
										rows={3}
										className="dark:bg-gray-900 shadow-sm dark:text-gray-200    mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
										placeholder="Rejet trendline..."
										defaultValue={""}
									/>
								</div>
								<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									Courte description des confirmations qui
									vous ont poussé à prendre ce trade
								</p>
							</div>
							<div>
								<label
									htmlFor="Outcome"
									className="block text-sm font-medium text-gray-700 dark:text-gray-200"
								>
									Résultat
								</label>
								<div className="mt-1">
									<textarea
										id="Outcome"
										{...register("outcome")}
										rows={3}
										className="dark:bg-gray-900 shadow-sm dark:text-gray-200    mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
										placeholder="Sorti à BE..."
										defaultValue={""}
									/>
								</div>
								<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									Quel a été le résultat du trade
								</p>
							</div>
							
							<div>
								<label
									htmlFor="Lesson"
									className="block text-sm font-medium text-gray-700 dark:text-gray-200"
								>
									Leçon
								</label>
								<div className="mt-1">
									<textarea
										id="Lesson"
										{...register("lesson")}
										rows={3}
										className="dark:bg-gray-900 shadow-sm dark:text-gray-200    mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
										placeholder="Attendre plus de confirmations..."
										defaultValue={""}
									/>
								</div>
								<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									Qu&apos;est-ce que vous avez appris de ce
									trade
								</p>
							</div>
							<div className="">
								<label
									htmlFor="Lesson"
									className="block text-sm font-medium text-gray-700 dark:text-gray-200"
								>
									Statut du trade (Bon/Mauvais et Ratio (en %)
									de gain/perte)
								</label>
								<div className="flex items-center justify-between mt-3">
									<div className="flex items-center">
										<input
											id="isgood"
											type="checkbox"
											{...register("isGood")}
											className=" h-4 w-4  text-green-500 hover:text-green-700 border-gray-300 rounded "
										/>
										<label
											htmlFor="isgood"
											className="ml-2 block text-sm text-gray-900 dark:text-gray-50 "
										>
											Bon trade
										</label>
									</div>
									<div className="flex items-center">
										<label
											htmlFor="isgood"
											className="mr-2 block text-sm text-gray-900 dark:text-gray-50 "
										>
											Ratio final (%)
										</label>
										<input
											type="number"
											min="-100"
											max="100"
											step="0.01"
											{...register("finalRatio")}
											className={`w-36 shadow-sm sm:text-sm border-gray-300 dark:bg-gray-900 dark:text-gray-200 rounded-md`}
										/>
									</div>
								</div>
								<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									Parfois un trade peut être bon, même
									s&apos;il est perdant
								</p>
							</div>

							{props.trade && (
								<ImagesList images={props.trade.tradeImages} />
							)}

							<ImageInput
								id={"file"}
								onInput={imageInputHandler}
							/>
							<div className=" flex justify-between sm:px-6">
								<div className="flex items-center">
									<input
										id="isPublished"
										{...register("isPublished")}
										type="checkbox"
										className=" h-4 w-4  text-green-500 hover:text-green-700 checked:text-green-700 border-gray-300 rounded "
									/>
									<label
										htmlFor="isPublished"
										className="ml-2 block text-sm text-gray-900 dark:text-gray-50 "
									>
										Visible aux autres
									</label>
								</div>
								<Button
									className="inline-flex"
									isLoading={isLoading}
								>
									Enregistrer
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default React.memo(TradeForm);
