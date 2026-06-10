import { z } from "zod";

export const artworkSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  categories: z.array(z.string()).min(1, "Select at least one category"),

});
