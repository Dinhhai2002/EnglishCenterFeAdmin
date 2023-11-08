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
import categoryExamAdminApiService from 'src/services/API/Admin/CategoryExamAdminApiService';
import categoryExamApiService from 'src/services/API/CategoryExamApiService';
import CategoryExamContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormEdit';
import { EditSuccess } from 'src/utils/MessageToast';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit }) {
  const [categoryExam, setCategoryExam] = useState<any>({});
  const [loading, setLoading] = useState(false);

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const categoryExamContext = useContext(CategoryExamContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    categoryExamApiService
      .findOne(id)
      .then((data) => {
        setCategoryExam(data.data);
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
    if (
      categoryExam.name === values.name &&
      categoryExam.description === values.description
    ) {
      setLoading(false);
      return;
    }
    categoryExamAdminApiService
      .update(id, values.name, values.description)
      .then((data: any) => {
        setCategoryExam(data.data);
        toast.success(EditSuccess);
        handleCloseEdit(id);
        setLoading(false);
        categoryExamContext.onChangeValue();
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
        Thông tin chi tiết danh mục đề thi
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
              defaultValue={categoryExam.name}
              required
              fullWidth
              label="Tên danh mục khóa học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={categoryExam.description}
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
