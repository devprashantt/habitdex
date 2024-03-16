import Link from "next/link";
import styles from "./page.module.scss";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();
	return (
		<main className={styles.main}>
			<div id="first">
				<div id="first-1">
					<h1>Welcome to our Habit Tracking App</h1>
					<h6>Track your habit,achieve your goals,live your best life</h6>
					<SignedIn>
						<Link href="/home"><button>Home</button></Link>						
					</SignedIn>
					<SignedOut>
						<Link href="/sign-up"><button>Get Started</button></Link>
					</SignedOut>
				</div>
				<div id="first-2">

				</div>
			</div>
			<div id="second">
				<div>
					<h1>Sign In</h1>
				</div>
			</div>
			<div>
				{
					(!user) ? <><Link href="/sign-in"><button>Sign In</button></Link>
						<Link href="/sign-up"><button>Sign Up</button></Link></> : <>
						<Link href="/home"><button>Home</button></Link>
					</>
				}
			</div>
		</main>
	);
}