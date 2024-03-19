import connectDB from "@/lib/db/configs/connection";
import { Contribution } from "@/lib/db/models/contribution.model";
import DB_MODELS from "@/utils/modelsEnum";
import { created } from "@/utils/responses";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const data = await request.json();
  const name = data.name;
  await connectDB();

  const { userId } = auth();
  if (!userId) {
    return unauthorized();
  }
  const User = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
  if (!User) {
    return unauthorized();
  }
  const charts = await DB_MODELS.CHART.find({ user_id: User._id, name: name });
  var contribs = await charts[0].contributions;
  const tmp = new Date();
  const date = tmp.getDate() + "-" + tmp.getMonth() + "-" + tmp.getFullYear();
  const currentDayContribution = await DB_MODELS.CONTRIBUTION.findOne({
    name: name,
    date: date,
  });

  if (currentDayContribution) {
    currentDayContribution.count = currentDayContribution.count + 1;
    currentDayContribution.save();
  } else {
    const newContribution = new DB_MODELS.CONTRIBUTION({
      name: name,
      date: date,
      count: 1,
    });
    contribs = [...contribs, newContribution];
    charts[0].contributions = contribs;
    await charts[0].save();

    await newContribution.save();
  }
  return created();
}
