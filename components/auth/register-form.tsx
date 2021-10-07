import React, { useState, useRef } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/button";
import ButtonLink from "../ui/button-link";
import { useRouter } from "next/router";
import AuthLayout from "../layout/auth-layout";

type Inputs = {
	email: string;
	username: string;
	password: string;
	password_confirm: string;
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
		password_confirm: yup
			.string()
			.oneOf(
				[yup.ref("password"), null],
				"Les 2 mots de passe doivent correspondre"
			)
			.required(REQUIRED_FIELD_MESSAGE),
		rgpd: yup
			.boolean()
			.oneOf([true], "Vous devez accepter nos conditions, en cochant cette case")
			.required(),
	})
	.required();

async function registerUser(
	email: string,
	username: string,
	password: string,
	password_confirm: string
) {
	alert(JSON.stringify({ email, username, password, password_confirm }));
	const response = await fetch("/api/register", {
		method: "POST",
		body: JSON.stringify({ email, username, password, password_confirm }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong!");
	}

	return data;
}

function RegisterForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		// alert(JSON.stringify(data))
		try {
			const result = await registerUser(
				data.email,
				data.username,
				data.password,
				data.password_confirm
			);
			router.replace("/auth");
			// console.log(result);
		} catch (error) {
			console.log(error);
			
		}
	};

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
					<label htmlFor="password_confirm" className="inputlabel">
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
					<Button className="group relative w-full btn">
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
