import { resultPerPage } from "@/constants";
import connectDB from "@/lib/db/configs/connection";
import DB_MODELS from "@/utils/modelsEnum";
import { unauthorized } from "@/utils/responses";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  try {
    const data = await request.json();
    const skip = data.skip;
    const limit = resultPerPage;
    await connectDB();
    const { userId } = auth();
    if (!userId) {
      return unauthorized();
    }
    const User = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
    if (!User) {
      return unauthorized();
    }
    const charts = await DB_MODELS.CHART.find({ user_id: User._id })
      .skip((skip - 1) * limit)
      .limit(limit);
    return Response.json(charts);
  } catch (e) {
    console.log(e);
  }
}
