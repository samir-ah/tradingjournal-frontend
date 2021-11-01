import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
	MenuIcon,
	XIcon,
	AdjustmentsIcon,
	UserIcon,
	LogoutIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth-context";
import ThemeToggle from "./theme-toggle";
import { myLoader } from "../../utils/utils";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const authContext = useContext(AuthContext);
	const router = useRouter();

	const navigation = [
		// { name: "Tableau de bord", href: "/", activePaths: [] },
		{
			name: "Mes trades",
			href: "/trades/my-trades",
			activePaths: ["/trades/new-trade","/"],
		},
		{ name: "Trades partagés", href: "/trades/shared-trades" },
		{ name: "Trades favoris", href: "/trades/liked-trades" },
		{ name: "Performances", href: "/trades/performance-board" },
	];
	const userNavigation = [
		{ name: "Paramètres", href: "#" },
		{
			name: "Se déconnecter",
			href: "#",
			onclick: () => {
				authContext.logout();
			},
		},
	];
	const user = {
		name: `${authContext.user?.username}`,
		email: `${authContext.user?.email}`,
	};

	return (
		<Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
			{({ open, close }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Image
										loader={myLoader}
										className="h-8 w-8"
										src="/stock.png"
										alt="Workflow"
										width={35}
										height={35}
									/>
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										{navigation.map((item) => (
											<Link
												href={item.href}
												key={item.name}
											>
												<a
													className={classNames(
														router.pathname ==
															item.href ||
															item.activePaths?.includes(
																router.pathname
															)
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"px-3 py-2 rounded-md text-sm font-medium"
													)}
												>
													{item.name}
												</a>
											</Link>
										))}
									</div>
								</div>
							</div>

							<div className="-mr-2 flex justify-end">
								<div className=" align-middle group hover:bg-gray-700  p-2 rounded-md">
									<ThemeToggle />
								</div>
								<div className="hidden md:block">
									<div className=" flex items-center ">
										{/* Profile dropdown */}
										<Menu
											as="div"
											className="ml-3 relative"
										>
											<div>
												<Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
													<span className="sr-only">
														Open user menu
													</span>
													<UserIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
													{userNavigation.map(
														(item) => (
															<Menu.Item
																key={item.name}
															>
																{({
																	active,
																}) => (
																	<Link
																		href={
																			item.href
																		}
																	>
																		<a
																			onClick={
																				item.onclick
																			}
																			className={classNames(
																				"block px-4 py-2 text-sm text-gray-800 dark:text-gray-50 hover:bg-gray-100  dark:hover:bg-gray-600"
																			)}
																		>
																			{
																				item.name
																			}
																		</a>
																	</Link>
																)}
															</Menu.Item>
														)
													)}
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
								<div className="md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<MenuIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigation.map((item) => (
								<Link href={item.href} key={item.name}>
									<a
										onClick={() => {
											close();
										}}
										className={classNames(
											router.pathname == item.href ||
												item.activePaths?.includes(
													router.pathname
												)
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
									>
										{item.name}
									</a>
								</Link>
							))}
						</div>
						<div className="pt-4 pb-3 border-t border-gray-700">
							<div className="flex items-center px-5">
								<div className="flex-shrink-0 text-gray-400">
									<UserIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium leading-none text-white">
										{user.name}
									</div>
									<div className="text-sm font-medium leading-none text-gray-400">
										{user.email}
									</div>
								</div>
								<button
									type="button"
									className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
								>
									<span className="sr-only">
										View notifications
									</span>
									<AdjustmentsIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>
							<div className="mt-3 px-2 space-y-1">
								{userNavigation.map((item) => (
									<Link href={item.href} key={item.name}>
										<a
											onClick={item.onclick}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
										>
											{item.name}
										</a>
									</Link>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
