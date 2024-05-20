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
import chapterApiService from 'src/services/API/ChapterApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import ChapterContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormCreateChapter';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [chapter, setChapter] = useState<any>(item);
  const [loading, setLoading] = useState(false);

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const chapterContext = useContext(ChapterContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    chapterApiService
      .findOne(id)
      .then((data) => {
        setChapter(data.data);
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
    if (values.name === chapter.name) {
      setLoading(false);
      return;
    }
    chapterApiService
      .update(id, values.name, chapter.course_id)
      .then((data: any) => {
        toast.success(EditSuccess);
        setChapter(data.data);
        handleCloseEdit(id);
        setLoading(false);
        chapterContext.onChangeValue();
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
        Thông tin chi tiết chương học
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
              defaultValue={chapter.name}
              required
              fullWidth
              label="Tên chương học khóa học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={chapter.course_name}
              required
              disabled
              fullWidth
              label="Khóa học"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="course"
              defaultValue={`${chapter.course_id}`}
              required
              fullWidth
              label="Mô tả"
              sx={{ mb: 2, display: 'none' }}
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
