import styles from "./home.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
    </div>
  );
  return <div className={styles.loading__page}>Loading</div>;
}
