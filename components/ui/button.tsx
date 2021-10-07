import Link from "next/link";
import LoadingBtn from "./loading-btn";

type Props = {
	link?: string;
	className?: string;
	onClick?: () => void;
	children?: React.ReactNode;
	isLoading?: boolean;
};
function Button({ link, className, onClick, children, isLoading }: Props) {
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
			{isLoading ? <span><LoadingBtn/></span> : ""}	
		</button>
	);
}

export default Button;
