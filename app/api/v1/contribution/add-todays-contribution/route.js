// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// response
import { created } from "@/utils/responses";

export async function POST(request) {
  // get request data, connect to database and auth
  const data = await request.json();
  const name = data.name;
  const habitId = data.habitId;
  await connectDB();

  const { userId } = auth();
  if (!userId) {
    return unauthorized();
  }
  const User = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
  if (!User) {
    return unauthorized();
  }

  // find the chart
  const charts = await DB_MODELS.CHART.find({
    _id: habitId,
  });
  // console.log(charts,habitId,name);
  var contribs = await charts[0].contributions;
  const date = new Date();
  const dateOnly = new Date(date.toDateString());

  // find the contribution for current day and if it doesnt exist create a new else increase the count by 1
  const currentDayContribution = await DB_MODELS.CONTRIBUTION.findOne({
    user_id: User._id,
    name: name,
    date: dateOnly,
  });

  if (currentDayContribution) {
    currentDayContribution.count = currentDayContribution.count + 1;
    currentDayContribution.save();
  } else {
    const newContribution = new DB_MODELS.CONTRIBUTION({
      name: name,
      date: dateOnly,
      count: 1,
      user_id: User._id,
    });
    contribs = [...contribs, newContribution];
    charts[0].contributions = contribs;
    // console.log(newContribution);
    await charts[0].save();
    await newContribution.save();
  }
  return created();
}
