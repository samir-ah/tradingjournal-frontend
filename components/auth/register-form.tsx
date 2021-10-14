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
import { AuthContext } from "../../context/auth-context";
import { toast } from "react-toastify";

type Inputs = {
	email: string;
	username: string;
	password: string;
	confirm_password: string;
	rgpd: boolean;
};

const REQUIRED_FIELD_MESSAGE = "Ce champ est nécessaire";
const schema = yup
	.object({
		email: yup
			.string()
			.email("Entrez un email valide")
			.required(REQUIRED_FIELD_MESSAGE),
		username: yup
			.string()
			.min(3, "minimum 3 charactères")
			.required(REQUIRED_FIELD_MESSAGE),
		password: yup
			.string()
			.required("Entrez un mot de passe")
			.min(6, "minimum 6 charactères"),
		confirm_password: yup
			.string()
			.oneOf(
				[yup.ref("password"), null],
				"Les 2 mots de passe doivent correspondre"
			)
			.required(REQUIRED_FIELD_MESSAGE),
		rgpd: yup
			.boolean()
			.oneOf(
				[true],
				"Vous devez accepter nos conditions, en cochant cette case"
			)
			.required(),
	})
	.required();



function RegisterForm() {
	const router = useRouter();
	const { isLoading, axiosRequest } = useHttpClient();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		try {
			const result = await registerUser(
				data.email,
				data.username,
				data.password,
				data.confirm_password
			);
			toast.success("Votre compte a été crée");
			router.replace("/auth");
		} catch (error: any) {
			toast.error(error.data.detail);
		}
	};
	async function registerUser(
		email: string,
		username: string,
		password: string,
		confirm_password: string
	) {
		return await axiosRequest("/api/register", {
			data: { email, username, password, confirm_password,rgpd: true },
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
					<label htmlFor="email-address" className="inputlabel">
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
					<label htmlFor="username" className="inputlabel">
						Pseudo
					</label>
					<input
						id="username"
						type="text"
						className={`w-full textinput ${
							errors.email && "border-red-500"
						}`}
						placeholder="Username"
						{...register("username")}
					/>
					<p className="text-sm text-red-500">
						{errors.username?.message}
					</p>

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
					<label htmlFor="confirm_password" className="inputlabel">
						Confirmation du mot de passe
					</label>
					<input
						id="confirm_password"
						type="password"
						className={`w-full textinput ${
							errors.confirm_password && "border-red-500"
						}`}
						placeholder="Password"
						{...register("confirm_password")}
					/>
					<p className="text-sm text-red-500">
						{errors.confirm_password?.message}
					</p>
				</div>
				<div className="flex items-center">
					<input
						id="rgpd"
						{...register("rgpd")}
						type="checkbox"
						className="dark:bg-gray-500 h-4 w-4  text-green-500 hover:text-green-700 border-gray-300 rounded"
					/>
					<label
						htmlFor="rgpd"
						className="ml-2 block text-sm text-gray-900 dark:text-gray-50 "
					>
						Vous acceptez notre réglement et notre politique de
						confidentialité
					</label>
				</div>
				<p className="text-sm text-red-500">{errors.rgpd?.message}</p>

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
						S&apos;inscrire
					</Button>
				</div>
			</form>
		</AuthLayout>
	);
}

export default RegisterForm;
