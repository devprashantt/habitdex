import axios from "axios";

const leetcodeGraphQLEndpoint = "https://leetcode.com/graphql/"; // Replace with LeetCode's endpoint if they have one

const fetchData = async (username) => {
  const graphqlData = {
    query:
      "\n  query userProfileCalendar($username: String!, $year: Int) {\n matchedUser(username: $username) {\n  userCalendar(year: $year) {\n   activeYears\n   streak\n   totalActiveDays\n   dccBadges {\n    timestamp\n    badge {\n     name\n     icon\n    }\n   }\n   submissionCalendar\n  }\n }\n}\n  ",
    variables: {
      username: username,
    },
    operationName: "userProfileCalendar",
  };
  const response = await axios.post(leetcodeGraphQLEndpoint, graphqlData);
  const data = await response.data;
  const calendar = JSON.parse(
    data.data.matchedUser.userCalendar.submissionCalendar,
  );

  const mordified = new Array();
  for (const day in calendar) {
    const date = new Date(Number(day + "000"));
    const mordifiedDate = date.toISOString().split("T")[0];
    const tmp = { date: mordifiedDate, count: calendar[day] };
    mordified.push(tmp);
  }

  // console.log(mordified)

  return mordified;
  // axios.post(leetcodeGraphQLEndpoint, graphqlData)
  //   .then(response => {
  //     console.log(response.data.data.matchedUser.userCalendar);
  //   })
  //   .catch(error => {
  //     console.error("Error fetching data:", error);
  //   });
};

export default fetchData;
