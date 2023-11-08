import { object, string, TypeOf } from 'zod';

export const validateSchema = object({
  name: string()
    .trim()
    .nonempty('Tên đề thi không được trống')
    .max(32, 'Tên đề thi tối đa là 32 kí tự'),
  description: string().trim().nonempty('Mô tả đề thi là bắt buộc'),
  // categoryExam: string().trim().nonempty('Danh mục đề thi là bắt buộc'),
  topic: string()
    .trim()
    .nonempty('topic đề thi là bắt buộc'),
  time: string()
    .trim()
    .nonempty('thời gian đề thi là bắt buộc')
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'thời gian phải là số'
    }),
  question: string()
    .trim()
    .nonempty('question  đề thi là bắt buộc')
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'question phải là số dương'
    })
});

export type ValidateInput = TypeOf<typeof validateSchema>;
