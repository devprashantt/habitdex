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
    const [User, userResultError] = await findOne({
      collection: DB_MODELS.USER,
      query: {
        clerk_user_id: userId,
      },
    });
    if (!User) {
      return unauthorized();
    }
    const [charts, chartsResultError] = await findMany({
      collection: DB_MODELS.CHART,
      query: {
        user_id: User._id,
      },
      options: {
        skip: (skip-1)*resultPerPage,
        limit: resultPerPage
      }
    })
    return Response.json(charts);
  } catch (e) {
    console.log(e);
  }
}
