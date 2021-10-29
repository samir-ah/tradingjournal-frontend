import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { usePagination, DOTS } from "../../hooks/use-pagination";

const Pagination: React.FC<{
	onPageChange: (page: number) => void;
	lastPage: number;
	currentPage: number;
}> = (props) => {
	const { onPageChange, lastPage, currentPage } = props;
	const style = {
		current: "z-10 text-gray-50  bg-green-600  ",
		default:
			"dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
	};
	const paginationRange = usePagination({
		lastPage,
		currentPage,
	});

	// if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
	// 	return null;
	// }

	const onNext = () => {
		if (currentPage < lastPage) {
			onPageChange(currentPage + 1);
		}
	};

	const onPrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	return (
		<div className="max-w-full">
			<nav
				className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
				aria-label="Pagination"
			>
				<button
					onClick={onPrevious}
					disabled={currentPage === 1}
					className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
				>
					<span className="sr-only">Previous</span>
					<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
				</button>

				{paginationRange &&
					paginationRange.map((pageNumber, index) => {
						if (
							pageNumber === DOTS ||
							typeof pageNumber === "string"
						) {
							return (
								<span
									key={index}
									className="dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
								>
									...
								</span>
							);
						} else {
							return (
								<a
									key={index}
									onClick={() => {
										onPageChange(pageNumber);
									}}
									aria-current="page"
									className={`${
										pageNumber === currentPage
											? style.current
											: style.default
									} relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer`}
								>
									{pageNumber}
								</a>
							);
						}
					})}

				<button
					className="dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
					onClick={onNext}
					disabled={currentPage === lastPage}
				>
					<span className="sr-only">Next</span>
					<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
				</button>
			</nav>
		</div>
	);
};

export default Pagination;
