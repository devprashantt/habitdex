// auth
import { auth, currentUser } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// responses
import { unauthorized } from "@/utils/responses";
import { findOne, insertOne } from "@/lib/db/repository";

export async function GET() {
  await connectDB();
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return unauthorized("You must be signed in to create a user");
  }

  const [UserResult, userResultError] = await findOne({
    collection: DB_MODELS.USER,
    query: {
      clerk_user_id: userId,
    },
  });

  if (!UserResult) {
    const fullName =
      user.firstName + (user.lastName ? " " + user.lastName : "");
    const [newUser, newUserResultError] = insertOne({
      collection: DB_MODELS.USER,
      data: {
        email: user.emailAddresses[0].emailAddress,
        name: fullName,
        clerk_user_id: user.id,
        charts: [],
      },
    });
  }
  return new Response("OK", { status: 200 });
}
