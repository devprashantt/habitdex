import RegisterUser from "@/app/home/components/RegisterUser/RegisterUser";
import { UserButton, currentUser } from "@clerk/nextjs";
import HabitControls from "./components/Habits/HabitControls";
import styles from "./home.module.scss";

const page = async () => {
  const user = await currentUser();
  return (
    <div className={styles.page__wrapper}>
      <RegisterUser />
      <h2>{user?.firstName}</h2>
      <UserButton afterSignOutUrl="/"></UserButton>
      <HabitControls />
    </div>
  );
};

export default page;
