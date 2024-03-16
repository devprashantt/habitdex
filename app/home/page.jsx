import CreateHabit from "@/containers/Forms/CreateHabit";
import RegisterUser from '@/app/home/components/RegisterUser';
import { UserButton, currentUser } from "@clerk/nextjs";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RegisterUser />
      <h2>{user?.firstName}</h2>
      <UserButton afterSignOutUrl="/"></UserButton>
      <CreateHabit />
    </div>
  );
};

export default page;
