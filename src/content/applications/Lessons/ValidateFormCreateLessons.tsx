import { object, string, TypeOf } from 'zod';

export const validateSchema = object({
  name: string()
    .trim()
    .nonempty('Tên bài học không được trống')
    .max(255, 'Tên bài học tối đa là 255 kí tự'),
  description: string().trim().nonempty('Mô tả bài học là bắt buộc'),
  content: string().trim().nonempty('Nội dung bài học là bắt buộc'),
  urlVideo: string().trim().default(''),
  // sort: string()
  //   .trim()
  //   .nonempty('Thứ tự là bắt buộc')
  //   .refine((value) => /^[0-9]+$/.test(value), {
  //     message: 'Thứ tự bài học phải là số dương'
  //   }),
  chapter: string().trim().nonempty('chương học là bắt buộc')
});

export type ValidateInput = TypeOf<typeof validateSchema>;
