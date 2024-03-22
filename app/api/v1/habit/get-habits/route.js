// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// other imports
import { resultPerPage } from "@/constants";
import { unauthorized } from "@/utils/responses";
import { findMany, findOne } from "@/lib/db/repository";

export async function POST(request) {
  try {
    const data = await request.json();
    const skip = data.skip;
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

    const [ChartResult, chartsResultError] = await findMany({
      collection: DB_MODELS.CHART,
      query: {
        user_id: userResult._id,
      },
      options: {
        skip: (skip - 1) * resultPerPage,
        limit: resultPerPage,
      },
    });
    if (chartsResultError) return internalServerError(chartsResultError);
    return Response.json(ChartResult);
  } catch (e) {
    console.log(e);
  }
}
