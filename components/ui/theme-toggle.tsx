import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import React from "react";
import { Theme, ThemeContext } from "../../context/theme-context";

const ThemeToggle = () => {
	const { theme, setTheme } = React.useContext(ThemeContext);

	return (
		<div className="transition duration- ease-in-out rounded-full">
			{theme === Theme.DARK ? (
				<SunIcon
					onClick={() => setTheme(Theme.LIGHT)}
					className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer block h-6 w-6 group-hover:text-white "
				/>
			) : (
				<MoonIcon
					onClick={() => setTheme(Theme.DARK)}
					className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer block h-6 w-6 group-hover:text-white"
				/>
			)}
		</div>
	);
};

export default ThemeToggle;
