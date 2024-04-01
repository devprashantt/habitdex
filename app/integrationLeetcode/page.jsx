import LeetcodeCalendar from "./Calendar/LeetcodeCalendar";
import fetchData from "@/services/integrations/leetcode/fetchUserContributions";

const page = async () => {
  const username = "anuragdaksh";
  const response = await fetchData(username);
  return (
    <div>
      <LeetcodeCalendar calendar={response} />
    </div>
  );
};

export default page;
