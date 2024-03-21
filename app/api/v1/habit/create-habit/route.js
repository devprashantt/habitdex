// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// responses
import { badRequest, created, unauthorized } from "@/utils/responses";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    const { userId } = auth();
    if (!userId) {
      return unauthorized();
    }
    const individual = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
    if (!individual) {
      return unauthorized();
    }
    const new_chart = new DB_MODELS.CHART({
      name: data.name,
      description: data.description,
      user_id: individual._id,
      icon: data.icon,
      contributions_per_day: data.contributions_per_day,
      contribs: [],
      color: data.color,
    });
    await new_chart.save();
    return created();
  } catch (e) {
    return badRequest();
  }
}
