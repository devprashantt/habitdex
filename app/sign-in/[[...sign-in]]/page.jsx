import { SignIn } from "@clerk/nextjs";

import styles from "./sign-in.module.scss";

export default function Page() {
  return (
    <div className={styles.sign__in}>
      <SignIn />
    </div>
  );
}
