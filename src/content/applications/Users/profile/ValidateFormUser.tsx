import { object, string, TypeOf } from "zod";

export const validateSchema = object({
  fullName: string()
    .trim()
    .nonempty("Tên đầy đủ của người dùng không được trống"),
  email: string()
    .trim()
    .nonempty("Email là bắt buộc")
    .email("Email không hợp lệ"),
  phone: string()
    .trim()
    .nonempty("số điện thoại là bắt buộc")
    .refine((value) => /^(\+\d{1,3}[- ]?)?\d{9,}$/.test(value), {
      message: "số điện thoại không hợp lệ",
    }),
  address: string().trim().nonempty("địa chỉ không được trống"),
});

export type ValidateInput = TypeOf<typeof validateSchema>;
