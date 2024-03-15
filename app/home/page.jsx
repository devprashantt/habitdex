import Create_Habit from "@/containers/Forms/CreateHabit";
import RegisterUser from '@/app/home/components/RegisterUser';
import { UserButton, currentUser } from "@clerk/nextjs";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RegisterUser />
      <h1>{user?.firstName}</h1>
      <UserButton afterSignOutUrl="/"></UserButton>
      <Create_Habit />
    </div>
  );
};

export default page;
