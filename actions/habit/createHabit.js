"use server";

import { revalidatePath } from "next/cache";

const addPost = async (formData) => {
    
    console.log(formData);
    const name = formData.get('name');
    const description = formData.get('description');
    const completions = formData.get('completions');
    console.log(name, description, completions);
    revalidatePath("/home")
}
export default addPost;