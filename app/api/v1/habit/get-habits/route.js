export const dynamic = "force-dynamic";

// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// other imports
import { notFound, sendData, internalServerError } from "@/utils/responses";
import { findMany, findOne } from "@/lib/db/repository";
import logger from "@/lib/services/winston";

export async function GET() {
  try {
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

    const [habitsResult, habitsResultError] = await findMany({
      collection: DB_MODELS.HABIT,
      query: {
        user_id: userResult._id,
      },
    });
    if (habitsResultError) {
      console.log(habitsResultError);
      logger.log({
        level: "error",
        message: "Error while fetching habits 2",
      });
      return internalServerError({
        message: "Error while fetching habits 2",
        error: habitsResultError,
      });
    }
    if (!habitsResult) {
      logger.log({
        level: "error",
        message: "No habits found",
      });
      return notFound({
        message: "No habits found",
      });
    }

    return sendData({
      data: habitsResult,
      msg: "habits fetched successfully",
    });
  } catch (error) {
    console.log(error);
    logger.log({
      level: "error",
      message: "Error while fetching habits 1",
    });
    return internalServerError({
      message: "Error while fetching habits 1",
      error: error.message,
    });
  }
}
