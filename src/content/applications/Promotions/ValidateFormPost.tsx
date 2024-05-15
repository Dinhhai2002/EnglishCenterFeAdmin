import { object, string, TypeOf } from "zod";

export const validateSchema = object({
  title: string().trim().nonempty("title không được trống"),
  description: string().trim().nonempty("description không được trống"),
});

export type ValidateInput = TypeOf<typeof validateSchema>;
