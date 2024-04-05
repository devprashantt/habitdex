import LeetcodeCalendar from "./Calendar/LeetcodeCalendar";
import fetchData from "@/services/integrations/leetcode/fetchUserContributions";

const page = async () => {
  const username = "anuragdaksh";
  const [response, error] = await fetchData(username);
  return (
    <div>
      <LeetcodeCalendar calendar={response} error={Boolean(error)} />
    </div>
  );
};

export default page;
