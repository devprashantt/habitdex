// auth
import { UserButton, currentUser } from "@clerk/nextjs";

// components
import RegisterUser from "@/app/home/components/RegisterUser/RegisterUser";
import HabitControls from "./components/Habits/HabitControls";

// styles
import styles from "./home.module.scss";

const page = async () => {
  const user = await currentUser();
  return (
    <>
      <div className={styles.page__wrapper}>
        <RegisterUser classname={styles.user__button} />
        <h2>Welcome {user?.firstName}</h2>
        <UserButton
          classname={styles.user__button}
          afterSignOutUrl="/"
        ></UserButton>
        <HabitControls />
      </div>
    </>
  );
};

export default page;
