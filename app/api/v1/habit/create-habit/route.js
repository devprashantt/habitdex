// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// responses
import { badRequest, created, unauthorized } from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

export async function POST(request) {
  try {
    const data = await request.json();
    
    await connectDB();
    const { userId } = auth();
    if (!userId) {
      return unauthorized();
    }
    const [UserResult, userResultError] = await findOne({
      collection: DB_MODELS.UserResult,
      query: {
        clerk_user_id: userId,
      },
    });
    
    if (!UserResult) {
      return unauthorized();
    }
    const [newChart, newChartResultError] = await insertOne({
      model: DB_MODELS.CHART,
      data: {
        name: data.name,
        description: data.description,
        user_id: UserResult._id,
        icon: data.icon,
        contributions_per_day: data.contributions_per_day,
        contribs: [],
        color: data.color,
      }
    })
    await UserResult.updateOne({
      $push: {
        charts: newChart._id,
      },
    });
    return created();
  } catch (e) {
    console.log(e)
    return badRequest();
  }
}
