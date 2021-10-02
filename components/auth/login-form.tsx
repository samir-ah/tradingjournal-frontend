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
	password: string;
};
const schema = yup
	.object({
		email: yup
			.string()
			.email("Entrez un email valide")
			.required("Ce champ est nécessaire"),
		password: yup.string().required("Entrez un mot de passe"),
	})
	.required();

async function login(email: string, password: string) {
	const response = await fetch("/api/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
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


function LoginForm() {
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
		try {
			const result = await login(data.email, data.password);
			console.log(result);
		} catch (error) {
			console.log(error);
			router.replace("/profile");
		}
	};

	return (
		<AuthLayout authTitle="Connectez-vous">
			<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
				Ou <ButtonLink link="/auth/register">Créez un compte</ButtonLink>
			</p>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="email-address" className="sr-only">
						Email address
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

					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						type="password"
						autoComplete="current-password"
						className={`w-full textinput ${
							errors.password && "border-red-500"
						}`}
						placeholder="Password"
						{...register("password")}
					/>
					<p className="text-sm text-red-500">
						{errors.password?.message}
					</p>
				</div>

				<div className="flex justify-center">
					<div className="text-sm">
						<ButtonLink link="/auth/forget-password">Mot de passe oublié ?</ButtonLink>
					</div>
				</div>

				<div>
					<Button className="group relative w-full btn">
						<span>
							<LockClosedIcon
								className="h-5 w-5 text-green-100 group-hover:text-white mr-2"
								aria-hidden="true"
							/>
						</span>
						Se connecter
					</Button>
				</div>
			</form>
		</AuthLayout>
	);
}

export default LoginForm;
