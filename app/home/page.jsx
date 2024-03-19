import CreateHabit from "@/containers/Forms/CreateHabit";
import RegisterUser from "@/app/home/components/RegisterUser/RegisterUser";
import { UserButton, currentUser } from "@clerk/nextjs";
import "./home.module.scss";
import { Suspense } from "react";
import AllHabit from "./components/Habits/AllHabit";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RegisterUser />
      <h2>{user?.firstName}</h2>
      <Suspense fallback={<p>Loading feed...</p>}>
        <UserButton afterSignOutUrl="/"></UserButton>
      </Suspense>
      {/* <CreateHabit /> */}
      <p>All Habits</p>
      <Suspense fallback={<p>Loading feed...</p>}>
        <AllHabit />
      </Suspense>
    </div>
  );
};

export default page;
