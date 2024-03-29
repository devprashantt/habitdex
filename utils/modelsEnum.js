import { Habit } from "@/lib/db/models/habit.model";
import { Contribution } from "@/lib/db/models/contribution.model";
import { User } from "@/lib/db/models/user.model";
import { Integration } from "@/lib/db/models/integration.model";

const DB_MODELS = {
  USER: User,
  CONTRIBUTION: Contribution,
  HABIT: Habit,
  INTEGRATION: Integration,
};

export default DB_MODELS;
