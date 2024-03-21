// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// response
import { created, internalServerError } from "@/utils/responses";
import { findOne } from "@/lib/db/repository";

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

  const [User, userResultError] = await findOne({
    collection: DB_MODELS.USER,
    query: {
      clerk_user_id: userId,
    },
  });
  if (userResultError) return internalServerError(userResultError);

  // find the chart
  const charts = await DB_MODELS.CHART.find({
    _id: habitId,
  });

  let chartDetails = await charts[0].contributions;
  const date = new Date();
  const dateOnly = new Date(date.toDateString());

  // find the contribution for current day and if it doesn't exist create a new else increase the count by 1
  const currentDayContribution = await DB_MODELS.CONTRIBUTION.findOne({
    user_id: User._id,
    name: name,
    date: dateOnly,
  });

  if (currentDayContribution) {
    currentDayContribution.count += 1;
    await currentDayContribution.save();
  } else {
    const newContribution = new DB_MODELS.CONTRIBUTION({
      name: name,
      date: dateOnly,
      count: 1,
      user_id: User._id,
    });

    await charts[0].updateOne({
      $push: {
        contributions: newContribution._id,
      },
    });

    await newContribution.save();
    await charts[0].save();
  }
  return created(
    "Contribution added successfully",
    { status: 201 },
    { contribution: currentDayContribution },
  );
}
