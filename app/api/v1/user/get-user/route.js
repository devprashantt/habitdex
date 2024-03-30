export const dynamic = "force-dynamic";

// auth
import { auth, currentUser } from "@clerk/nextjs";

// lib
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";
import logger from "@/lib/services/winston";

// responses
import {
  badRequest,
  sendData,
  unauthorized,
  internalServerError,
} from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

export async function GET() {
  try {
    const { userId } = auth();
    const clerkUser = await currentUser();

    if (!userId) {
      logger.log({
        level: "error",
        message: "User is not signed in",
      });
      return unauthorized({
        message: "User is not signed in",
        code: "USER_NOT_SIGNED_IN",
      });
    }

    await connectDB();

    const [userResult, userResultError] = await findOne({
      collection: DB_MODELS.USER,
      query: {
        clerk_user_id: userId,
      },
    });

    if (userResultError) {
      return internalServerError({
        message: "Error while fetching user",
        error: userResultError,
      });
    }

    if (userResult) {
      logger.log({
        level: "info",
        message: `User already exists for id: ${userId}`,
      });
      return sendData({
        data: userResult,
        msg: "User already exists",
      });
    } else {
      const email = clerkUser?.emailAddresses[0].emailAddress ?? "";

      const [newUserResult, newUserResultError] = insertOne({
        collection: DB_MODELS.USER,
        data: {
          primary_email: email,
          first_name: clerkUser?.firstName,
          last_name: clerkUser?.lastName,
          clerk_user_id: clerkUser?.id,
        },
      });
      if (newUserResultError) {
        // console.error(newUserResultError);
        logger.log({
          level: "error",
          message: newUserResultError,
        });
        return internalServerError({
          message: "Error while creating user",
          error: newUserResultError,
        });
      }

      return sendData({
        data: newUserResult,
        msg: "User created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    logger.log({
      level: "error",
      message: error.message,
    });
    return internalServerError({
      message: error.message,
      error: error,
    });
  }
}
