// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// response
import { created, internalServerError } from "@/utils/responses";
import { findOne, insert, insertOne } from "@/lib/db/repository";

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
  const [charts, chartsResultError] = await findOne({
    collection: DB_MODELS.CHART,
    query: {
      _id: habitId,
    },
  })

  let chartDetails = await charts.contributions;
  const date = new Date();
  const dateOnly = new Date(date.toLocaleDateString());
  // find the contribution for current day and if it doesn't exist create a new else increase the count by 1
  const [currentDayContribution, currentDayContributionError] = await findOne({
    collection: DB_MODELS.CONTRIBUTION,
    query: {
      user_id: User._id,
      name: name,
      date: dateOnly,
    },
  })
  
  // console.log(currentDayContribution)
  if (currentDayContribution) {
    currentDayContribution.count += 1;
    await currentDayContribution.save();
  } else {
    const [newContribution, newContributionError] = await insertOne({
      model: DB_MODELS.CONTRIBUTION,
      data: {
        name: name,
        date: dateOnly,
        count: 1,
        user_id: User._id,
      },
    })
    
    await charts.updateOne({
      $push: {
        contributions: newContribution._id,
      },
    });

  }
  return created(
    "Contribution added successfully",
    { status: 201 },
    { contribution: currentDayContribution },
  );
}
