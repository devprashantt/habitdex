// auth
import { auth, currentUser } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";

// responses
import { unauthorized } from "@/utils/responses";

export async function GET() {
  await connectDB();
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return unauthorized("You must be signed in to create a user");
  }
  const individual = await DB_MODELS.USER.findOne({ clerk_user_id: userId });

  if (!individual) {
    const fullName =
      user.firstName + (user.lastName ? " " + user.lastName : "");
    const new_individual = new DB_MODELS.USER({
      email: user.emailAddresses[0].emailAddress,
      name: fullName,
      clerk_user_id: user.id,
      charts: [],
    });
    await new_individual.save();
  }
  return new Response("OK", { status: 200 });
}
