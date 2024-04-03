import fetchGithubData from "@/services/integrations/GitHub/fetchUserContributions"
import GithubCalendar from "./Calendar/GithubCalendar";

const page = async () => {

  const calendar = await fetchGithubData("anuragdaksh7");

  return (
    <div>
      <GithubCalendar calendar={calendar}/>
    </div>
  )
}

export default page