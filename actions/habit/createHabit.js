"use server";

import DB_MODELS from "@/utils/modelsEnum";
import { created } from "@/utils/responses";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const addPost = async (formData) => {
    const { userId } = auth();
    console.log(formData);
    const name = formData.get('name');
    const description = formData.get('description');
    const completions = formData.get('completions').split(" ")[0];
    const icon = formData.get('icon');
    const color = formData.get('color');

    const user = await DB_MODELS.USER.findOne({ clerk_user_id: userId });
    const user_id = await user._id;
    console.log(name, description, completions, icon, color, user_id);
    try {
        const new_chart = new DB_MODELS.CHART({
            name: name,
            description: description,
            user_id: user_id,
            icon: icon,
            contributions_per_day: completions,
            color: color,
            contributions: [],
        });
        await new_chart.save();
        revalidatePath("/home");
    }
    catch (error) {
    }
}
export default addPost;