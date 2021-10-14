import React, { useState, useRef, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/button";
import ButtonLink from "../ui/button-link";
import { useRouter } from "next/router";
import AuthLayout from "../layout/auth-layout";
import { useHttpClient } from "../../hooks/use-http";
import { toast } from "react-toastify";

const REQUIRED_FIELD_MESSAGE = "Ce champ est nécessaire";
type Input = {
	email: string;
	password: string;
	password_confirm: string;
};

const emailSchema = yup
	.object({
		email: yup
			.string()
			.email("Entrez un email valide")
			.required(REQUIRED_FIELD_MESSAGE),
	})
	.required();
const passwordSchema = yup
	.object({
		password: yup
			.string()
			.required("Entrez un mot de passe")
			.min(6, "minimum 6 charactères"),
		password_confirm: yup
			.string()
			.oneOf(
				[yup.ref("password"), null],
				"Les 2 mots de passe doivent correspondre"
			)
			.required(REQUIRED_FIELD_MESSAGE),
	})
	.required();

type Props = {
	resetToken?: string|string[];
	children?: React.ReactNode;
};
function ForgetPasswordForm({ resetToken, children }: Props) {
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	
	const onSubmitEmail: SubmitHandler<Input> = async (
		data,
		event
	) => {
		event?.preventDefault();
		try {
			const result = await requestPasswordReset(data.email);
			toast.success("Un email vous a été envoyé si votre compte existe");
			router.replace("/auth");
		} catch (error: any) {
			toast.error(error.data.detail);
		}
	};
	const onSubmitPassword: SubmitHandler<Input> = async (
		data,
		event
	) => {
		event?.preventDefault();
		try {
			const result = await passwordReset(
				data.password,
				data.password_confirm
			);
			toast.success("Votre mot de passe a été réinitialisé, veuillez vous connecter");
			router.replace("/auth");
		} catch (error: any) {
			console.log(data);
			
			toast.error(error);
		}
	};
	const onSubmit = resetToken ? onSubmitPassword : onSubmitEmail;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(resetToken ? passwordSchema : emailSchema),
	});
	
	async function requestPasswordReset(
		email: string,
	) {
		return await axiosRequest("/api/reset-password", {
			data: { email },
			method: "post",
		});
	}
	async function passwordReset(password: string, password_confirm: string) {
		return await axiosRequest(`/api/reset-password/reset/${resetToken}`, {
			data: { password, password_confirm },
			method: "post",
		});
	}

	return (
		<AuthLayout authTitle="Inscrivez-vous">
			<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
				Ou <ButtonLink link="/auth">Connectez-vous</ButtonLink>
			</p>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div>
					{resetToken ? (
						<>
							<label htmlFor="password" className="inputlabel">
								Mot de passe
							</label>
							<input
								id="password"
								type="password"
								className={`w-full textinput ${
									errors.password && "border-red-500"
								}`}
								placeholder="Password"
								{...register("password")}
							/>
							<p className="text-sm text-red-500">
								{errors.password?.message}
							</p>
							<label
								htmlFor="password_confirm"
								className="inputlabel"
							>
								Confirmation du mot de passe
							</label>
							<input
								id="password_confirm"
								type="password"
								className={`w-full textinput ${
									errors.password_confirm && "border-red-500"
								}`}
								placeholder="Password"
								{...register("password_confirm")}
							/>
							<p className="text-sm text-red-500">
								{errors.password_confirm?.message}
							</p>
						</>
					) : (
						<>
							<label
								htmlFor="email-address"
								className="inputlabel"
							>
								Adresse email
							</label>
							<input
								id="email-address"
								type="email"
								autoComplete="email"
								className={`w-full textinput ${
									errors.email && "border-red-500"
								}`}
								placeholder="Email address"
								{...register("email")}
							/>
							<p className="text-sm text-red-500">
								{errors.email?.message}
							</p>
						</>
					)}
				</div>

				<div>
					<Button
						className="group relative w-full btn"
						isLoading={isLoading}
					>
						<span>
							<LockClosedIcon
								className="h-5 w-5 text-green-100 group-hover:text-white mr-2"
								aria-hidden="true"
							/>
						</span>
						Envoyer
					</Button>
				</div>
			</form>
		</AuthLayout>
	);
}

export default ForgetPasswordForm;
