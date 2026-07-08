import { z } from "zod";

const createCategory = z.object({
  name: z.string().trim(),
  description: z.string().trim().optional(),
});

export const categoryValidations = {
  createCategory,
};
