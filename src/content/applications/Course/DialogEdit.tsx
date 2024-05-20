import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from 'src/components/FormReact/FormInput';
import courseAdminApiService from 'src/services/API/Admin/CourseAdminApiService';
import courseApiService from 'src/services/API/CourseApiService';
import { EditSuccess } from 'src/utils/MessageToast';
import CourseContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormCourse';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [course, setCourse] = useState<any>(item);
  const [loading, setLoading] = useState(false);
  const [isFree, setIsFree] = useState('');

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const courseContext = useContext(CourseContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangeIsFree = (event: SelectChangeEvent) => {
    setIsFree(event.target.value);
  };

  useLayoutEffect(() => {
    courseApiService
      .findOne(id)
      .then((data) => {
        setCourse(data.data);
        setIsFree(data.data.is_free);
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
    if (
      course.name === values.name &&
      course.description === values.description &&
      course.is_free === Number(isFree) &&
      course.price === Number(values.price) &&
      course.discount_percent === Number(values.discount)
    ) {
      setLoading(false);
      return;
    }
    courseAdminApiService
      .update(
        id,
        values.name,
        values.description,
        Number(values.price),
        Number(isFree),
        Number(values.discount)
      )
      .then((data: any) => {
        setCourse(data.data);
        toast.success(EditSuccess);
        handleCloseEdit(id);
        setLoading(false);
        //truyền sự kiện lên component cha để set dữ liệu lại
        courseContext.onChangeValue();
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
        Thông tin chi tiết khóa học
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
              defaultValue={course.name}
              required
              fullWidth
              label="Tên khóa học"
              sx={{ mb: 2 }}
            />
            <FormInput
              type="text"
              name="description"
              defaultValue={course.description}
              multiline
              required
              fullWidth
              label="Mô tả"
              sx={{ mb: 2 }}
            />
            <Box sx={{ marginTop: 2, marginBottom: 2, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="demo-simple-select-label">
                  Hình thức khóa học
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isFree}
                  label="Hình thức khóa học"
                  onChange={handleChangeIsFree}
                >
                  <MenuItem value={0}>Có phí</MenuItem>
                  <MenuItem value={1}>Miễn phí</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {isFree == '0' && (
              <>
                <FormInput
                  type="number"
                  name="price"
                  defaultValue={`${course.price}`}
                  fullWidth
                  label="Giá tiền"
                  sx={{ mb: 2 }}
                />

                <FormInput
                  type="number"
                  name="discount"
                  defaultValue={`${course.discount_percent}`}
                  fullWidth
                  label="giảm giá phần trăm"
                  sx={{ mb: 2 }}
                />
              </>
            )}
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
