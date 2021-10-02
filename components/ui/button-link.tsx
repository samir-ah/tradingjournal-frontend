import Link from "next/link";

type Props = {
	link: string;
	className?: string;
	children?: React.ReactNode;
};
function ButtonLink({ link, className, children }: Props) {
	return (
		<Link href={link}>
			<a className={`btn-link ${className || ""}`}>{children}</a>
		</Link>
	);
}

export default ButtonLink;
