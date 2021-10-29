import React from "react";
import { useMemo } from "react";


export const DOTS = "...";

const range = (start: number, end: number):number[] => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};
type PaginationTypes = {
	lastPage: number;
	currentPage: number;
};
export const usePagination = ({ lastPage, currentPage }: PaginationTypes) => {
	const paginationRange = useMemo(() => {
		const maxPageNumbers = 4;
		const firstPageIndex = 1;
		const lastPageIndex = lastPage;

		if (maxPageNumbers >= lastPage) {
			return range(1, lastPage);
		}
		const shouldShowLeftDots = currentPage > 2;
		const shouldShowRightDots = currentPage < lastPage - 2;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftRange = range(1, maxPageNumbers);

			return [...leftRange, DOTS, lastPage];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightRange = range(lastPage - maxPageNumbers + 1, lastPage);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(currentPage-1, currentPage+1);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [currentPage, lastPage]);

	return paginationRange;
};
