import Link from "next/link";
import styles from "./globals.scss";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className={styles.main}>
      <div id="first">
        <div id="first-1">
          <h1>Welcome to our Habit Tracking App</h1>
          <h6>Track your habit,achieve your goals,live your best life</h6>
          <Link href="/sign-up"><button>Get Started</button></Link>
        </div>
        <div id="first-2">

        </div>
      </div>
      <div id="second">
        <div>
          <h1>Sign In</h1>
          <h6>Sign into your existing account</h6>
          {
            (!user) ? <><Link href="/sign-in"><button>Sign In</button></Link></> : <><Link href="/home"><button>Home</button></Link>
            </>
          }
        </div>
        <div id="second-2">
          <h1>OR</h1>
        </div>
        <div id="second-3">
          <h1>Sign Up</h1>
          <h6>Create new account and Sign In</h6>
          <Link href="/sign-up"><button>Sign Up</button></Link>
        </div>
      </div>
      <div id="third">
        <div id="third-1">
          <h1>Track Your Habits,</h1>
          <h1>Achieve Your Goals</h1>
          <h6>Take control of your life and build healthy habits with our habit tracking app.</h6>
          <Link href="/sign-up"><button>Get Started</button></Link>
        </div>
        <div id="third-2">

        </div>
      </div>
    </main>
  );
}
