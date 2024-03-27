import {SignIn, SignUp} from "@clerk/nextjs";
import styles from "./sign-up.module.scss";

export default function Page() {
  return <div className={styles.sign__up}>
    <SignUp />
  </div>;
}
