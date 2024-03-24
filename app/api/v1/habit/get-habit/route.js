// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// other imports
import { resultPerPage } from "@/constants";
import { notFound, sendData, unauthorized } from "@/utils/responses";
import { findMany, findOne } from "@/lib/db/repository";
import logger from "@/lib/services/winston";

export async function GET(request) {
  try {
    const data = await request.json();
    const habitId = data.habitId;

    await connectDB();
    const { userId } = auth();
    if (!userId) {
      logger.log({
        level: "error",
        message: "User not found",
      });
      return notFound({
        message: "User not found. Please authenticate and try again",
      });
    }

    const [userResult, userResultError] = await findOne({
      collection: DB_MODELS.USER,
      query: {
        clerk_user_id: userId,
      },
    });
    if (userResultError) {
      logger.log({
        level: "error",
        message: "Error while fetching user",
      });
      return internalServerError(userResultError);
    }
    if (!userResult) {
      logger.log({
        level: "error",
        message: `User not found for id: ${userId}`,
      });
      return notFound({
        message: `User not found for id: ${userId}`,
      });
    }

    const [habitResult, habitResultError] = await findOne({
      collection: DB_MODELS.HABIT,
      query: {
        _id: habitId,
      },
    });
    if (habitResultError) {
      logger.log({
        level: "error",
        message: "Error while fetching habit",
      });
      return internalServerError({
        message: "Error while fetching habit",
        error: habitResultError,
      });
    }
    if (!habitResult) {
      logger.log({
        level: "error",
        message: `Habit not found for id: ${habitId}`,
      });
      return notFound({
        message: `Habit not found for id: ${habitId}`,
      });
    }

    return sendData({
      message: "Habit fetched successfully",
      data: habitResult,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: "Error while fetching habit",
    });
    return internalServerError({
      message: "Error while fetching habit",
      error: error.message,
    });
  }
}
