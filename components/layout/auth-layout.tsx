import Image from "next/image";
import { useState } from "react";
import { myLoader } from "../../utils/utils";
import ButtonLink from "../ui/button-link";
type Props = {
	authTitle?: string;
	children?: React.ReactNode;
};
function AuthLayout({ authTitle, children }: Props) {
	return (
		<div className="w-10/12 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="flex justify-center">
					<Image
						loader={myLoader}
						src="/stock.png"
						alt="Workflow"
						width={65}
						height={65}
						className="mx-auto"
					/>
				</div>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
					{authTitle}
				</h2>
				{children}
			</div>
		</div>
	);
}

export default AuthLayout;
