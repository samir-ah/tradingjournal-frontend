/* eslint-disable @next/next/no-img-element */
import { XCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Fancybox from "../ui/fancybox";
import { DOMAIN_URL } from "../../constants";
import { myLoader } from "../../utils/utils";
import { Popup } from "../ui/popup";
import { PopupContext } from "../../context/popup-context";
import { useHttpClient } from "../../hooks/use-http";

const ImagesList: React.FC<{
	images: any[];
	edit?: boolean
}> = ({images,edit = true}) => {
	const { isLoading, axiosRequest } = useHttpClient();
	const popupCtx = useContext(PopupContext);
const [currentImages, seCurrentImages] = useState(images);
	async function onDeleteImageHandler(imageId: string) {
      
			try {
				const result = await deleteTradeImage(imageId);
				 seCurrentImages((prevImages) => {
						return prevImages.filter(
							(image) => image.id !== imageId
						);
					});
			} catch (error) {
				
			}
		
	}
	async function deleteTradeImage(tradeImageId: string) {
		return await axiosRequest(`/api/trade_images/${tradeImageId}`, {
			method: "delete",
		});
	}

	return (
		<>
			<div className="w-full max-w-sm md:max-w-lg ">
				{edit && <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
					Captures
				</label>}
				<div className="grid grid-rows-1 grid-flow-col gap-3 mt-1  overflow-x-auto w-full ">
					<Fancybox>
						{currentImages.map((image) => (
							<div
								key={image.id}
								className=" w-52  overflow-hidden "
							>
								<Image
									loader={myLoader}
									src={DOMAIN_URL + image.fileUrl}
									alt="trade screenshot"
									width={200}
									height={140}
									layout="responsive"
									data-fancybox="gallery"
									// data-src={DOMAIN_URL + image.fileUrl}
									className="rounded-md cursor-pointer"
								/>

								{edit && <div className="flex justify-center">
									<span
										className="mx-auto h-10 w-10 text-gray-400 hover:text-red-500 "
										onClick={() => {
											popupCtx.showPopupHandler({
												message:
													"Etes-vous sûr de vouloir supprimer cette image ? la supression est définitive",
												onConfirmTrue:
													onDeleteImageHandler.bind(
														null,
														image.id
													),
												title: null,
											});
										}}
									>
										<XCircleIcon></XCircleIcon>
									</span>
								</div>}
							</div>
						))}
					</Fancybox>
				</div>
			</div>
		</>
	);
};

export default ImagesList;
