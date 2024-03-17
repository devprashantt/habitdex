import Link from "next/link";
import styles from "./page.module.scss";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

export default async function Home() {
	const user = await currentUser();
	return (
		<main className={styles.main}>
			<div className={styles.main__part1}>
				<div className={styles.main__part1__left}>
					<h1>Welcome to our</h1>
					<h1>Habit Tracking App</h1>
					<h6>Track your habit,achieve your goals,live your best life</h6>
					<SignedIn>
						<Link href="/home"><PrimaryButton children={"Home"}/></Link>
					</SignedIn>
					<SignedOut>
						<Link href="/sign-up"><PrimaryButton children={"Get Started"}/></Link>
					</SignedOut>
				</div>
				<div className={styles.main__part1__right}>

				</div>
			</div>

			<div className={styles.main__part2}>
				<div className={styles.main__part2__sign_in}>
					<h1>Sign In</h1>
					<Link href="/sign-in"><PrimaryButton children={"Sign In"}/></Link>
				</div>
				<div className={styles.main__part2__or}>
					<h3>OR</h3>
				</div>
				<div className={styles.main__part2__sign_up}>
					<h1>Sign Up</h1>
					<Link href="/sign-up"><PrimaryButton children={"Sign Up"}/></Link>
				</div>
			</div>

				<div className={styles.main__part3}>
					<div className={styles.main__part3__right}>
						<h1>Track Your Habits,</h1>
						<h1>Achieve Your Goals</h1>
						<h6>Take control of your life and build healthy habits with our habit tracking app.</h6>
						<SignedIn>
							<Link href="/home"><PrimaryButton children={"Home"}/></Link>
						</SignedIn>
						<SignedOut>
							<Link href="/sign-up"><PrimaryButton children={"Get Started"}/></Link>
						</SignedOut>
					</div>
					<div className={styles.main__part3__left}>

					</div>
				</div>
			{/*<div>*/}
			{/*	{*/}
			{/*		(!user) ? <><Link href="/sign-in"><PrimaryButton children={"Sign In"}/></Link>*/}
			{/*			<Link href="/sign-up"><PrimaryButton children={"Sign Up"}/></Link></> : <>*/}
			{/*			<Link href="/home"><PrimaryButton children={"Home"}/></Link>*/}
			{/*		</>*/}
			{/*	}*/}
			{/*</div>*/}
		</main>
	);
}