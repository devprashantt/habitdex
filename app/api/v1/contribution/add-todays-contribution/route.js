// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// response
import { created, internalServerError } from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

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

  const [userResult, userResultError] = await findOne({
    collection: DB_MODELS.USER,
    query: {
      clerk_user_id: userId,
    },
  });
  if (userResultError) return internalServerError(userResultError);

  // find the chart
  const [chartsResult, chartsResultError] = await findOne({
    collection: DB_MODELS.CHART,
    query: {
      _id: habitId,
    },
  });
  if (chartsResultError) return internalServerError(chartsResultError);

  let chartDetails = await chartsResult.contributions;
  const date = new Date();
  const dateOnly = new Date(date.toLocaleDateString());
  // find the contribution for current day and if it doesn't exist create a new else increase the count by 1
  const [currentDayContributionResult, currentDayContributionError] =
    await findOne({
      collection: DB_MODELS.CONTRIBUTION,
      query: {
        user_id: userResult._id,
        name: name,
        date: dateOnly,
      },
    });
  if (currentDayContributionError)
    return internalServerError(currentDayContributionError);

  // console.log(currentDayContributionResult)
  if (currentDayContributionResult) {
    currentDayContributionResult.count += 1;
    await currentDayContributionResult.save();
  } else {
    const [newContributionResult, newContributionError] = await insertOne({
      model: DB_MODELS.CONTRIBUTION,
      data: {
        name: name,
        date: dateOnly,
        count: 1,
        user_id: userResult._id,
      },
    });
    if (newContributionError) return internalServerError(newContributionError);

    await chartsResult.updateOne({
      $push: {
        contributions: newContributionResult._id,
      },
    });
  }
  return created(
    "Contribution added successfully",
    { status: 201 },
    { contribution: currentDayContributionResult },
  );
}
