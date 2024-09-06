import { z } from "zod";

// Define the Tag schema
const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Export the Tag schema
export { TagSchema };
export type Tag = z.infer<typeof TagSchema>;
