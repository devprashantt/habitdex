import fetchGithubData from "@/services/integrations/GitHub/fetchUserContributions"
import GithubCalendar from "./Calendar/GithubCalendar";

const page = async () => {

  const [calendar,error] = await fetchGithubData("anuragdaksh7");

  return (
    <div>
      <GithubCalendar calendar={calendar} error={Boolean(error)}/>
    </div>
  )
}

export default page