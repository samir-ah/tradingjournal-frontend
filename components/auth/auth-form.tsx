import React, { useState, useRef } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/button";
import ButtonLink from "../ui/button-link";

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

async function createUser(email: string, password: string) {
	const response = await fetch("/api/register", {
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
async function signIn(
	email: string,
	username: string,
	password: string,
	password_confirm: string
) {
	const response = await fetch("/api/login", {
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

function AuthForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		alert(JSON.stringify(data));
	};

	// const emailInputRef = useRef<HTMLInputElement>(null);
	// const passwordInputRef = useRef<HTMLInputElement>(null);
	// const usernameInputRef = useRef<HTMLInputElement>(null);
	// const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

	// const [isLogin, setIsLogin] = useState(true);
	// const router = useRouter();

	// function switchAuthModeHandler() {
	// 	setIsLogin((prevState) => !prevState);
	// }

	// async function submitHandler(event: React.FormEvent) {
	// 	event.preventDefault();

	// 	const enteredEmail = emailInputRef.current!.value;
	// 	const enteredPassword = passwordInputRef.current!.value;
	// 	const enteredUsername = usernameInputRef.current!.value;
	// 	const enteredPasswordConfirm = passwordConfirmInputRef.current!.value;

	// 	// optional: Add validation

	// 	if (isLogin) {
	// 		try {
	// 			const result = await createUser(enteredEmail, enteredPassword);
	// 			console.log(result);
	// 			switchAuthModeHandler();
	// 		} catch (error) {
	// 			console.log(error);
	// 			router.replace("/profile");
	// 		}
	// 	} else {
	// 		try {
	// 			const result = await signIn(
	// 				enteredEmail,
	// 				enteredUsername,
	// 				enteredPassword,
	// 				enteredPasswordConfirm
	// 			);
	// 			console.log(result);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// }

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="flex justify-center">
						<Image
							src="/stock.png"
							alt="Workflow"
							width={65}
							height={65}
							className="mx-auto"
						/>
					</div>

					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
						Connectez-vous
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
						Ou <ButtonLink link="">Créez un compte</ButtonLink>
					</p>
				</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit(onSubmit)}
				>
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
							<ButtonLink link="">
								Mot de passe oublié ?
							</ButtonLink>
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
			</div>
		</div>
	);
	// return (
	// 	<section className="">
	// 		<h1>{isLogin ? "Login" : "Sign Up"}</h1>
	// 		<form onSubmit={submitHandler}>
	// 			<div className="">
	// 				<label htmlFor="email">Your Email</label>
	// 				<input
	// 					type="email"
	// 					id="email"
	// 					required
	// 					ref={emailInputRef}
	// 				/>
	// 			</div>
	// 			<div className="">
	// 				<label htmlFor="password">Your Password</label>
	// 				<input
	// 					type="password"
	// 					id="password"
	// 					required
	// 					ref={passwordInputRef}
	// 				/>
	// 			</div>
	// 			<div className="">
	// 				<button>{isLogin ? "Login" : "Create Account"}</button>
	// 				<button
	// 					type="button"
	// 					className=""
	// 					onClick={switchAuthModeHandler}
	// 				>
	// 					{isLogin
	// 						? "Create new account"
	// 						: "Login with existing account"}
	// 				</button>
	// 			</div>
	// 		</form>
	// 	</section>
	// );
}

export default AuthForm;
