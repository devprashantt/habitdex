// auth
import { auth } from "@clerk/nextjs";

// logging imports
import logger from "@/lib/services/winston";

// curstom responses
import {
  badRequest,
  internalServerError,
  notFound,
  sendData,
} from "@/utils/responses";

// db queries
import { findOne } from "@/lib/db/repository";

// db imports
import connectDB from "@/lib/db/configs/connection";
import DB_MODELS from "@/utils/modelsEnum";

export async function POST(request) {
  try {
    await connectDB();
    const { habitId } = await request.json();
    // if no data bad response
    if (!habitId) {
      logger.log({
        level: "error",
        message: "No habitId provided",
      });
      return badRequest({ message: "No habitId provided" });
    }

    // user auth
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
      return internalServerError({
        message: "Error while fetching user",
        error: userResultError,
      });
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
        user_id: userResult._id,
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
      data: habitResult,
      msg: "Habit Fetched Successfully",
    });
  } catch (error) {
    // console.log(error)
    logger.log({
      level: "error",
      message: "Error while fetching habits",
    });
    return internalServerError({
      message: "Error while fetching habits",
      error: error.message,
    });
  }
}
