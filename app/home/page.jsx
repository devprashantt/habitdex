import RegisterUser from "@/components/RegisterUser";
import { UserButton, currentUser } from "@clerk/nextjs";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RegisterUser />
      <h1>{user?.firstName}</h1>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
};

export default page;
