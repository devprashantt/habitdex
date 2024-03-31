import { habitFormIcons, themeColors } from "@/constants";
import { z } from "zod";

export const createHabitSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(24, "Name must be at most 24 characters"),
  description: z.string().optional(), // Optional description
  completion: z
    .number()
    .min(1, "Minimum completion is 1")
    .max(9, "Maximum completion is 9"),
  icon: z
    .string()
    .refine((val) => habitFormIcons.some((icon) => icon.name === val), {
      message: "Icon must be from the available choices",
    }),
  color: z
    .string()
    .refine((val) => themeColors.some((color) => color.name === val), {
      message: "Color must be from the available choices",
    }),
});
