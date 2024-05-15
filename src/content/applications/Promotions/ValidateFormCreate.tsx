import { object, string, TypeOf } from 'zod';

export const validateSchema = object({
  description: string().trim().nonempty('Mô tả đề thi là bắt buộc'),
  promotion_value: string()
    .trim()
    .nonempty('giá trị khuyến mãi là bắt buộc')
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'giá trị khuyến mãi phải là số dương'
    }),
  point: string()
    .trim()
    .nonempty('điểm quy đổi là bắt buộc')
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'điểm quy đổi phải là số dương'
    })
});

export type ValidateInput = TypeOf<typeof validateSchema>;
