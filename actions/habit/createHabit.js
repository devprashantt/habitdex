"use server";

import DB_MODELS from "@/utils/modelsEnum";
import { auth } from "@clerk/nextjs";

const addPost = async (formData) => {
  try {
    // extracting data from form
    const name = formData.get("name");
    const description = formData.get("description");
    const completions = formData.get("completions").split(" ")[0];
    const icon = formData.get("icon");
    const color = formData.get("color");

    // finding user from clerk -> our db
    const { userId } = auth();
    const user = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
    const user_id = await user._id;

    // creating chart for habit
    const newChart = new DB_MODELS.CHART({
      name: name,
      description: description,
      user_id: user_id,
      icon: icon,
      contributions_per_day: completions,
      color: color,
      contributions: [],
    });
    await newChart.save();
  } catch (error) {}
};
export default addPost;
