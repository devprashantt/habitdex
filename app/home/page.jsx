import RegisterUser from "@/app/home/components/RegisterUser/RegisterUser";
import { UserButton, currentUser } from "@clerk/nextjs";
import HabitControls from "./components/Habits/HabitControls";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RegisterUser />
      <h2>{user?.firstName}</h2>
      <UserButton afterSignOutUrl="/"></UserButton>
      <HabitControls />
    </div>
  );
};

export default page;
