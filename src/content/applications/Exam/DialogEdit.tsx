import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from 'src/components/FormReact/FormInput';
import examAdminApiService from 'src/services/API/Admin/ExamAdminApiService';
import examApiService from 'src/services/API/ExamApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import ExamContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormCreateExam';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit }) {
  const [exam, setExam] = useState<any>({});
  const [loading, setLoading] = useState(false);

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const examContext = useContext(ExamContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    examApiService
      .findOne(id)
      .then((data) => {
        setExam(data.data);
      })
      .catch((error: any) => {});
  }, []);

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset
  } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);

    if (exam.name === values.name && exam.description === values.description) {
      setLoading(false);
      return;
    }
    examAdminApiService
      .update(
        id,
        values.name,
        values.description,
        exam.category_exam_id,
        exam.topic_id,
        exam.total_question,
        exam.time_minutes
      )
      .then((data: any) => {
        setExam(data.data);
        toast.success(EditSuccess);
        handleCloseEdit(id);
        setLoading(false);
        examContext.onChangeValue();
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMapEdit[id] || false}
      onClose={() => {
        handleCloseEdit(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: 20 }}
        id="responsive-dialog-title"
      >
        Thông tin chi tiết đề thi
      </DialogTitle>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="off"
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent>
            <FormInput
              type="text"
              name="name"
              defaultValue={exam.name}
              required
              fullWidth
              label="Tên danh mục khóa học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={exam.description}
              required
              multiline 
              fullWidth
              label="Mô tả"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="categoryExamName"
              defaultValue={exam.category_exam_name}
              disabled
              fullWidth
              label="Danh mục đề thi"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="topic"
              defaultValue={exam.topic_name}
              disabled
              fullWidth
              label="topic đề thi"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="question"
              defaultValue={`${exam.total_question}`}
              disabled
              fullWidth
              label="tổng số câu hỏi"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="time"
              defaultValue={`${exam.time_minutes}`}
              disabled
              fullWidth
              label="Thời gian làm bài"
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                reset();
                handleCloseEdit(id);
              }}
              variant="outlined"
            >
              Thoát
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              autoFocus
              variant="outlined"
            >
              cập nhật
            </LoadingButton>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
}

export default DialogEdit;
