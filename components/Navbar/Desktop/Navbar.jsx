import Link from "next/link";
import styles from "./Navbar.module.scss";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className={styles.navbar__container}>
      <Link className={styles.homepage__link} href="/">
        <h1>HabitDex</h1>
      </Link>
      <div className={styles.navbar__linkContainer}>
        <Link className={styles.navbar__links} href="/home">
          Home
        </Link>
        <SignedIn>
          <SignOutButton className={styles.signout__button} />
        </SignedIn>
        <SignedOut>
          <Link className={styles.button__solid} href="/sign-in">
            Sign In
          </Link>
          <Link className={styles.button__outline} href="/sign-up">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
