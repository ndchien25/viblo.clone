import { z } from "zod";
import { TagSchema } from "./TagSchema"; // Adjust the import path as needed
const postCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  tag: z.array(TagSchema).min(1).max(5),
});

export type PostCreate = z.infer<typeof postCreateSchema>
export { postCreateSchema };
