import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(2, "Title is required").max(30),
  description: z.string().min(1, "Description is required"),
});
