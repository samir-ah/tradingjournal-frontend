import Link from "next/link";

type Props = {
	link?: string;
	className?: string;
	onClick?: () => void;
	children?: React.ReactNode;
};
function Button({ link, className, onClick, children }: Props) {
	if (link) {
		return (
			<Link href={link}>
				<a className={`btn ${className || ""}`}>{children}</a>
			</Link>
		);
	}

	return (
		<button className={`btn ${className || ""}`} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
