import { object, string, TypeOf } from 'zod';

export const validateSchema = object({
  name: string()
    .trim()
    .nonempty('Tên chương học không được trống')
    .max(40, 'Tên chương học tối đa là 40 kí tự'),
  course: string().trim().nonempty('khóa học là bắt buộc')
});

export type ValidateInput = TypeOf<typeof validateSchema>;
