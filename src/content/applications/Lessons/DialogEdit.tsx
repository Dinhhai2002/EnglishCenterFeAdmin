import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  Slide,
  useMediaQuery,
  useTheme,
  Zoom
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DropDownComponent from 'src/components/DropDownComponent/DropDownComponent';
import FormInput from 'src/components/FormReact/FormInput';
import lessonsApiService from 'src/services/API/LessonsApiService';
import { LessonsOptions } from 'src/utils/LabelTable';
import {
  EditSuccess,
  NoEdit,
  UrlVideoNoRegulation
} from 'src/utils/MessageToast';
import LessonsContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormCreateLessons';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [lessons, setLessons] = useState<any>(item);
  const [loading, setLoading] = useState(false);
  const [isFree, setIsFree] = useState(``);

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const lessonsContext = useContext(LessonsContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    lessonsApiService
      .findOne(id)
      .then((data) => {
        setLessons(data.data);
        setIsFree(data.data.is_free);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangeOptionsLessons = (event: SelectChangeEvent) => {
    setIsFree(event.target.value);
  };

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

    if (
      values.name === lessons.name &&
      values.description === lessons.description &&
      values.content === lessons.content &&
      Number(values.sort) === lessons.sort &&
      values.urlVideo === lessons.url_video
    ) {
      setLoading(false);
      toast.error(NoEdit);
      return;
    }
    if (
      lessons.video_type === 0 &&
      !values.urlVideo.startsWith('https://www.youtube.com/watch?v=')
    ) {
      setLoading(false);
      toast.error(UrlVideoNoRegulation);
      return;
    }

    lessonsApiService
      .update(
        id,
        values.name,
        values.description,
        values.content,
        lessons.video_type,
        values.urlVideo,
        lessons.course_id,
        lessons.chapter_id,
        Number(isFree)
      )
      .then((data: any) => {
        toast.success(EditSuccess);
        setLessons(data.data);
        handleCloseEdit(id);
        setLoading(false);
        lessonsContext.onChangeValue();
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
        Thông tin chi tiết bài học
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
              defaultValue={lessons.name}
              required
              multiline
              fullWidth
              label="Tên bài học"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="description"
              defaultValue={lessons.description}
              required
              multiline
              fullWidth
              label="Mô tả bài học"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="content"
              defaultValue={lessons.content}
              required
              multiline
              fullWidth
              label="Nội dung bài học"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="number"
              name="sort"
              defaultValue={`${lessons.sort}`}
              required
              disabled
              fullWidth
              label="thứ tự bài học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="type"
              defaultValue={
                lessons.video_type == 0 ? 'Link Youtube' : 'Link Driver'
              }
              required
              disabled
              fullWidth
              label="kiểu video"
              sx={{ mb: 2 }}
            />

            <DropDownComponent
              arr={LessonsOptions}
              label="Bài học miễn phí"
              value={isFree}
              handleStatusChange={handleChangeOptionsLessons}
              type={0}
            />

            {lessons.video_type == 0 && (
              <FormInput
                type="text"
                name="urlVideo"
                defaultValue={`https://www.youtube.com/watch?v=${lessons.id_video}`}
                required
                fullWidth
                label="Đường dẫn video"
                sx={{ mb: 2, mt: 2 }}
              />
            )}

            <FormInput
              type="text"
              name="course"
              defaultValue={lessons.course_name}
              required
              disabled
              fullWidth
              label="Tên khóa học"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="text"
              name="chapter"
              defaultValue={lessons.chapter_name}
              required
              disabled
              fullWidth
              label="Tên chương học"
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
