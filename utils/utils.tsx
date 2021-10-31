export const myLoader = ({ src, width, quality }: any) =>
	`${src}?w=${width}&q=${quality || 75}`;
export const getParamFromURLPath = (param: string, urlPath: string) => {
	const urlParams = new URLSearchParams(new URL(window.location.origin + urlPath).search);
	return urlParams.get(param);
};
export const limitStr= (text:string, count:number, insertDots:boolean = true) => {
	return (
		text.slice(0, count) + (text.length > count && insertDots ? "..." : "")
	);
}
export const range = (start: number, end: number): number[] => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};