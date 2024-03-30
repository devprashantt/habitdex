import connectDB from "@/lib/db/configs/connection";
import { findAndPopulate, findOne } from "@/lib/db/repository";
import logger from "@/lib/services/winston";
import DB_MODELS from "@/utils/modelsEnum";
import { internalServerError, sendData } from "@/utils/responses";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const data = await request.json();
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
    const [contributionResult, contributionResultError] = await findAndPopulate(
      {
        collection: DB_MODELS.HABIT,
        query: {
          _id: data._id,
        },
        populateOption: { path: "contributions" },
      },
    );
    return sendData({
      data: contributionResult,
      message: "Contributions fetched successfully",
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: "Error while fetching contributions",
    });
    return internalServerError({
      msg: "Error while fetching contributions",
      error: error.message,
    });
  }
}
