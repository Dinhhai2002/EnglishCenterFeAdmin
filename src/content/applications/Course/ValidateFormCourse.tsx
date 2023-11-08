import { object, string, TypeOf } from 'zod';

export const validateSchema = object({
  name: string()
    .trim()
    .nonempty('Tên khóa học không được trống')
    .max(40, 'Tên khóa học tối đa là 40 kí tự'),
  description: string().trim().nonempty('Mô tả không được trống'),
  price: string().default('0'),
  discount: string().default('0')
});

export type ValidateInput = TypeOf<typeof validateSchema>;
