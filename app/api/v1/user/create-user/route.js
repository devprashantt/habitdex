// auth
import { auth, currentUser } from "@clerk/nextjs";

// lib
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";
import logger from "@/lib/services/winston";

// responses
import { ok, unauthorized } from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

export async function GET() {
  logger.log({
    level: "info",
    message: "creating a new user",
    meta: {
      route: "create-user",
    },
  });

  await connectDB();
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return unauthorized("You must be signed in to create a user");
  }

  const [userResult, userResultError] = await findOne({
    collection: DB_MODELS.USER,
    query: {
      clerk_user_id: userId,
    },
  });

  if (!userResult) {
    const fullName =
      user.firstName + (user.lastName ? " " + user.lastName : "");
    const [newUserResult, newUserResultError] = insertOne({
      collection: DB_MODELS.USER,
      data: {
        email: user.emailAddresses[0].emailAddress,
        name: fullName,
        clerk_user_id: user.id,
        charts: [],
      },
    });
    if (newUserResultError) return internalServerError(newUserResultError);
  }
  return ok();
}
