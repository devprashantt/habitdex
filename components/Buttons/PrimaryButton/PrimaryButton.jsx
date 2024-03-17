import styles from "./PrimaryButton.module.scss"
const PrimaryButton = ({ children, ...props }) => {
	return (
		<div>
			<button className={styles.button} {...props}>{children}</button>
		</div>
	);
};

export default PrimaryButton;
