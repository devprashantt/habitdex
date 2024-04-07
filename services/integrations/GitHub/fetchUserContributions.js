import INTEGRATION_URLS from "@/utils/integrationEnum";
import axios from "axios";

const fetchGithubData = async (username) => {
  try {
    const gqlData = {
      query: `
    query ContributionsByYear($login: String!) {
        user(login: $login){
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                        }
                    }
                }
                contributionYears
            }
        }
    }
    `,
      variables: {
        login: username,
      },
      operationName: "ContributionsByYear",
    };

    const response = await axios({
      url: INTEGRATION_URLS.GitHub,
      data: gqlData,
      method: "post",
      headers: {
        Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      },
    });
    const data = await response.data;
    const dateData =
      data.data.user.contributionsCollection.contributionCalendar.weeks;
    const formattedData = [];
    for (let i = 0; i < dateData.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (dateData[i].contributionDays[j]) {
          const tmp = {};
          tmp.date = dateData[i].contributionDays[j].date;
          tmp.count = dateData[i].contributionDays[j].contributionCount;
          formattedData.push(tmp);
        }
      }
    }

    return [formattedData, null];
  } catch (err) {
    return [null, err];
  }
};

export default fetchGithubData;
