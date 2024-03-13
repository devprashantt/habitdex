import connectDB from "@/lib/db/configs/connection";

import { Individual } from "@/lib/models/user.model";
import { auth, currentUser } from "@clerk/nextjs";

export async function GET() {
  await connectDB();
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const individual = await Individual.findOne({ clerk_user_id: userId });
  if (!individual) {
    const new_individual = new Individual({
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName + " " + user.lastName,
      clerk_user_id: user.id,
      charts: [],
    });
    await new_individual.save();
  }
  return new Response("OK", { status: 200 });
}
