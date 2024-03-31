import styles from "./home.module.scss";

export default function Loader() {
  return <div className={styles.loader__container}>
    <div class={styles.loader}></div>
  </div>
  return <div className={styles.loading__page}>Loading</div>;
}
