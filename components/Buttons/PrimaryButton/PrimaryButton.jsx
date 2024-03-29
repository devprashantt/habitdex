import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
