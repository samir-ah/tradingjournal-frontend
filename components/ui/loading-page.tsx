import styles from "./loading-page.module.css";

const LoadingPage: React.FC = (props) => {
	return (
		<div
			className={`min-h-screen flex justify-center items-center content-center`}
		>
			<div
				className={`${styles.loader} ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32`}
			></div>
		</div>
	);
};

export default LoadingPage;
