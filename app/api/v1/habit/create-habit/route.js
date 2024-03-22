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
    const [User, userResultError] = await findOne({
      collection: DB_MODELS.USER,
      query: {
        clerk_user_id: userId,
      },
    });
    console.log(User,12)
    if (!User) {
      return unauthorized();
    }
    const [newChart, newChartResultError] = await insertOne({
      model: DB_MODELS.CHART,
      data: {
        name: data.name,
        description: data.description,
        user_id: User._id,
        icon: data.icon,
        contributions_per_day: data.contributions_per_day,
        contribs: [],
        color: data.color,
      }
    })
    return created();
  } catch (e) {
    console.log(e)
    return badRequest();
  }
}
