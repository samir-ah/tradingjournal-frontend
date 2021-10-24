export const myLoader = ({ src, width, quality }: any) =>
	`${src}?w=${width}&q=${quality || 75}`;