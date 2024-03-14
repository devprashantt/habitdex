import Link from "next/link";
import styles from "./page.module.scss";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();

	return (
		<main className={styles.main}>
			<div>
				<h1 className={styles.title}>Habit-Dex</h1>
				{!user ? (
					<>
						<Link href='/sign-in'>
							<button>Sign In</button>
						</Link>
						<Link href='/sign-up'>
							<button>Sign Up</button>
						</Link>
					</>
				) : (
					<>
						<Link href='/home'>
							<button>Home</button>
						</Link>
					</>
				)}
			</div>
		</main>
	);
}
