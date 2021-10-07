import styles from "./loading-page.module.css";

const LoadingPage: React.FC = (props) => {
	return <div className={`${styles.loader}`}>Loading...</div>;
};

export default LoadingPage;
