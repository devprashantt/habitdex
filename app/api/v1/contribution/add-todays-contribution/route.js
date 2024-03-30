// auth
import { auth } from "@clerk/nextjs";

// db models
import DB_MODELS from "@/utils/modelsEnum";
import connectDB from "@/lib/db/configs/connection";
import logger from "@/lib/services/winston";

// response
import { created, internalServerError, notFound } from "@/utils/responses";
import { findOne, insertOne, update, updateOne } from "@/lib/db/repository";

export async function POST(request) {
  const data = await request.json();
  const { name, habitId } = await data;

  await connectDB();

  try {
    const { userId } = auth();
    if (!userId) {
      logger.log({
        level: "error",
        message: "User not found",
      });
      return unauthorized("User not found. Please authenticate and try again");
    }

    const [user, userError] = await findOne({
      collection: DB_MODELS.USER,
      query: { clerk_user_id: userId },
    });
    if (userError) {
      logger.log({
        level: "error",
        message: "Error while fetching user",
      });
      return notFound("Error while fetching user");
    }

    const [habit, habitError] = await findOne({
      collection: DB_MODELS.HABIT,
      query: { _id: habitId },
    });
    if (!habit) {
      logger.log({
        level: "error",
        message: "Habit not found",
      });
      return notFound("Habit not found");
    }

    const currentDate = new Date(new Date().toISOString().split("T")[0]);
    const [existingContribution, existingContributionError] = await findOne({
      collection: DB_MODELS.CONTRIBUTION,
      query: {
        user_id: user._id,
        name: name,
        date: currentDate,
      },
    });
    if (existingContributionError) {
      logger.log({
        level: "error",
        message: "Error while fetching existing contribution",
      });
      return internalServerError("Error while fetching existing contribution");
    }

    if (existingContribution) {
      const [_, updatedContributionError] = await updateOne({
        collection: DB_MODELS.CONTRIBUTION,
        query: { _id: existingContribution._id },
        data: { $inc: { count: 1 } },
      });
      if (updatedContributionError) {
        logger.log({
          level: "error",
          message: "Error while updating existing contribution",
        });
        return internalServerError(
          "Error while updating existing contribution",
        );
      }
    } else {
      const [newContribution, newContributionError] = await insertOne({
        collection: DB_MODELS.CONTRIBUTION,
        data: {
          name,
          date: currentDate,
          count: 1,
          user_id: user._id,
          habit_id: habitId,
        },
      });
      const [findNewContribution, findNewContributionError] = await findOne({
        collection: DB_MODELS.CONTRIBUTION,
        query: {
          name,
          date: currentDate,
        },
      })(findNewContribution);
      if (newContributionError) {
        newContributionError;
        logger.log({
          level: "error",
          message: "Error while adding new contribution",
        });
        return internalServerError("Error while adding new contribution");
      } else {
        habit.contributions.push(findNewContribution._id);
        habit.save();
      }
    }

    return created("Contribution added successfully", {});
  } catch (error) {
    logger.log({
      level: "error",
      message: error.message,
    });
    return internalServerError("Error processing contribution");
  }
}
