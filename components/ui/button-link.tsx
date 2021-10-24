import Link from "next/link";

type Props = {
	link?: string;
	className?: string;
	children?: React.ReactNode;
};
function ButtonLink({ link, className, children }: Props) {
	if(link){
		return (
		<Link href={link}>
			<a className={`btn-link ${className || ""}`}>{children}</a>
		</Link>
	);
	}
	return (
			<a className={`btn-link ${className || ""}`}>{children}</a>);
	
}

export default ButtonLink;
