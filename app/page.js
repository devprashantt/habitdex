// clerk service
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";

// modules
import Link from "next/link";

// components and styles
import styles from "./page.module.scss";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className={styles.main}>
      <div className={styles.main__part1}>
        <div className={styles.main__part1__left}>
          <h1>
            Welcome to our <br />
            Habit Tracking App
          </h1>
          <h6>Track your habit,achieve your goals,live your best life</h6>
          <SignedIn>
            <Link href="/home">
              <PrimaryButton>Home</PrimaryButton>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-up">
              <PrimaryButton>Get Started</PrimaryButton>
            </Link>
          </SignedOut>
        </div>
        <div className={styles.main__part1__right}>
          <Image width={500} priority={true}  height={500} src="/hero-image.png" alt="" />
        </div>
      </div>

      <div className={styles.main__part2}>
        <div className={styles.main__part2__sign_in}>
          <h1>Sign In</h1>
          <Link href="/sign-in">
            <PrimaryButton>Sign In</PrimaryButton>
          </Link>
        </div>
        <div className={styles.main__part2__or}>
          <h3>OR</h3>
        </div>
        <div className={styles.main__part2__sign_up}>
          <Link href="/sign-up">
            <PrimaryButton>Sign Up</PrimaryButton>
          </Link>
          <h1>Sign Up</h1>
        </div>
      </div>

      <div className={styles.main__part3}>
        <div className={styles.main__part3__right}>
          <h1>Track Your Habits,</h1>
          <h1>Achieve Your Goals</h1>
          <h6>
            Take control of your life and build healthy habits with our habit
            tracking app.
          </h6>
          <SignedIn>
            <Link href="/home">
              <PrimaryButton>Home</PrimaryButton>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-up">
              <PrimaryButton>Get Started</PrimaryButton>
            </Link>
          </SignedOut>
        </div>
        <div className={styles.main__part3__left}></div>
      </div>
    </main>
  );
}
