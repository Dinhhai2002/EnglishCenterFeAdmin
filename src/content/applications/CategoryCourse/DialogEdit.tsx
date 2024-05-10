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
import categoryCourseAdminApiService from 'src/services/API/Admin/CategoryCourseAdminApiService';
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import CategoryCourseContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormEdit';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit }) {
  const [categoryCourse, setCategoryCourse] = useState<any>({});
  const [loading, setLoading] = useState(false);

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const categoryCourseContext = useContext(CategoryCourseContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    categoryCourseAdminApiService
      .findOne(id)
      .then((data) => {
        setCategoryCourse(data.data);
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

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);
    if (
      categoryCourse.name === values.name &&
      categoryCourse.description === values.description
    ) {
      setLoading(false);
      return;
    }
    const data = await categoryExamAdminApiService.update(
      id,
      values.name,
      values.description
    );
    setCategoryCourse(data.data);
    toast.success(EditSuccess);
    handleCloseEdit(id);
    setLoading(false);
    categoryCourseContext.onChangeValue();
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
        Thông tin chi tiết danh mục khóa học
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
              defaultValue={categoryCourse.name}
              required
              fullWidth
              label="Tên danh mục khóa học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={categoryCourse.description}
              required
              multiline
              fullWidth
              label="Mô tả"
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
