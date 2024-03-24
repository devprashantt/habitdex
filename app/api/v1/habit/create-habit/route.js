// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// responses
import {
  badRequest,
  created,
  internalServerError,
  unauthorized,
} from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

export async function POST(request) {
  try {
    const data = await request.json();

    // if no data bad response
    if (!data) return badRequest({ message: "No data provided" });

    await connectDB();
    const { userId } = auth();
    if (!userId) {
      return unauthorized({
        message: "User not found. Please authenticate and try again",
        error: "User not found",
      });
    }
    const [userResult, userResultError] = await findOne({
      collection: DB_MODELS.USER,
      query: {
        clerk_user_id: userId,
      },
    });
    if (userResultError)
      return internalServerError({
        message: "Error while fetching user",
        error: userResultError,
      });
    if (!userResult)
      return unauthorized({
        message: "User not found. Please authenticate and try again",
        error: "User not found",
      });

    const [newHabitResult, newHabitResultError] = await insertOne({
      model: DB_MODELS.HABIT,
      data: {
        habit_name: data?.name,
        description: data?.description,
        icon: data?.icon,
        color_theme: data?.color,
        contributions_per_day: data?.contributions_per_day,
        user_id: userResult?._id,
      },
    });
    if (newHabitResultError)
      return internalServerError({
        message: "Error while creating habit",
        error: newHabitResultError,
      });
    if (!newHabitResult)
      return badRequest({
        message: "Error while creating habit",
        error: newHabitResultError,
      });

    return created({
      message: "Habit created successfully",
      data: newHabitResult,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
    });
    return internalServerError({
      message: "Error while creating habit",
      error: error.message,
    });
  }
}
