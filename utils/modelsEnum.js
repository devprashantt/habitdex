// models
import { Chart } from "@/lib/db/models/chart.model";
import { Contribution } from "@/lib/db/models/contribution.model";
import { User } from "@/lib/db/models/user.model";

const DB_MODELS = {
  USER: User,
  CONTRIBUTION: Contribution,
  CHART: Chart,
};

export default DB_MODELS;
