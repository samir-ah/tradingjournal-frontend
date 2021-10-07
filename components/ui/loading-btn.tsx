import styles from "./loading-btn.module.css";

const LoadingBtn: React.FC = (props) => {
	return <div className={`${styles.loader} ml-5`}>Loading...</div>;
};

export default LoadingBtn;
