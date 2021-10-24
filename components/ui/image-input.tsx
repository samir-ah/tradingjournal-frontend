/* eslint-disable @next/next/no-img-element */
import { XCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Fancybox from "./fancybox";

/* type ButtonProps = JSX.IntrinsicElements["button"];

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => (
		<button type="button" {...props} ref={ref}>
			{props.children}
		</button>
	)
);
Button.displayName = "Button"; */

const ImageInput: React.FC<{
	id: string;

	onInput: (imageFile: File | string | null) => void;
}> = (props) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>();

	const filePickerRef = useRef<HTMLInputElement>(null);
	const fileUrlRef = useRef<HTMLInputElement>(null);

	const pickedHandler = (event: any) => {
		if (fileUrlRef.current) {
			fileUrlRef.current.value = "";
		}

		if (event.target.files && event.target.files.length === 1) {
			const pickedFile: File = event.target.files[0];

			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreviewUrl(fileReader.result as string);
			};
			fileReader.readAsDataURL(pickedFile);

			props.onInput(pickedFile);
		}
	};
	const imageUrlHandler = async (event: any) => {
		const imageUrl: string = event.target.value;
		if (imageUrl) {
			if (filePickerRef.current) {
				filePickerRef.current.value = "";
			}

			setPreviewUrl(imageUrl);
		
			props.onInput(imageUrl);
			
		}
	};
	const clearImageInputHandler = () => {
		if (filePickerRef.current) {
			filePickerRef.current.value = "";
		}
		if (fileUrlRef.current) {
			fileUrlRef.current.value = "";
		}
		props.onInput(null);
		setPreviewUrl(null);
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
				Ajouter une capture
			</label>
			<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-400 border-dashed rounded-md">
				<div className="flex flex-col justify-center justify-items-center space-y-1 text-center ">
					{previewUrl && (
						<div className=" w-60 overflow-hidden mx-auto">
							<Fancybox>
							<img
								src={previewUrl}
								alt="Preview"
								className="rounded-md cursor-pointer"
								data-fancybox="gallery"
								data-src={previewUrl}
							/>
							</Fancybox>
							<div className="flex justify-center">
								<span
									className="mx-auto h-10 w-10 text-gray-400 hover:text-red-500"
									onClick={clearImageInputHandler}
								>
									<XCircleIcon></XCircleIcon>
								</span>
							</div>
						</div>
					)}
					{!previewUrl && (
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}

					<div className="flex justify-center text-sm text-gray-600">
						<label htmlFor="file" className="btn-link">
							<span>Choisir une image</span>
							<input
								name="file"
								type="file"
								className="sr-only"
								accept="image/png, image/jpeg"
								id={props.id}
								ref={filePickerRef}
								onChange={pickedHandler}
							/>
						</label>
						<p className="pl-1 dark:text-gray-100">
							Ou collez une url
						</p>
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-100">
						PNG, JPG maximum 2 mb
					</p>
					<div className="mt-1 flex rounded-md shadow-sm">
						<span className="dark:bg-gray-900 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:text-gray-200 text-sm">
							https://
						</span>
						<input
							type="url"
							ref={fileUrlRef}
							id="imageUrl"
							className="dark:bg-gray-900 dark:text-gray-200  flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
							placeholder="www.example.com"
							onChange={imageUrlHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageInput;
